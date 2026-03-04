import { create } from 'zustand';
import { persist } from "zustand/middleware";
import { type StoredSession } from "./useAudioStore";

export type LanguageCourse = {
    id: string;
    name: string;
    region: string;
    learnerCount: string;
    creatorName: string;
    themeColor: string;
    symbol: string;
};

export type LessonUnit = {
    id: string;             // This maps to session.id
    title: string;
    description: string;
    iconName: string;
    status: 'completed' | 'active' | 'locked';
    totalLessons: number;
    completedLessons: number;
    culturalContext?: string;
};

interface LearnerState {
    // Course State
    courses: LanguageCourse[];
    activeCourseId: string | null;
    setActiveCourse: (id: string) => void;

    // Derived Units for active course
    units: LessonUnit[];

    // Progress State (persisted across sessions)
    // Map of session.id -> number of completed segments
    progressMap: Record<string, number>;
    dailyGoal: number;
    lessonsCompletedToday: number;
    lives: number;

    // Actions
    syncWithAudioStore: (sessions: StoredSession[]) => void;
    completeLesson: (unitId: string) => void;
    deductLife: () => void;
    resetProgress: () => void;
}

const DEFAULT_COURSE_THEMES = ['#E8F0EA', '#FDF0E5', '#F1F5F9'];

export const useLearnerStore = create<LearnerState>()(
    persist(
        (set, get) => ({
            courses: [],
            activeCourseId: null,
            units: [],
            progressMap: {},
            dailyGoal: 5,
            lessonsCompletedToday: 0,
            lives: 5,

            setActiveCourse: (id) => {
                set({ activeCourseId: id });
                // We shouldn't need to manually re-sync here if App calls sync on shift, 
                // but setting it triggers re-render anyway. 
                // A true architecture would derive units on the fly using a selector.
            },

            syncWithAudioStore: (sessions: StoredSession[]) => {
                const { activeCourseId, progressMap } = get();

                // 1. Generate unique language courses
                const uniqueLangs = Array.from(new Set(sessions.map(s => s.language)));
                const newCourses: LanguageCourse[] = uniqueLangs.map((lang, index) => ({
                    id: lang.toLowerCase(),
                    name: lang,
                    region: 'Community Generated',
                    learnerCount: '1',
                    creatorName: 'Field Linguist',
                    themeColor: DEFAULT_COURSE_THEMES[index % DEFAULT_COURSE_THEMES.length],
                    symbol: lang.charAt(0).toUpperCase()
                }));

                // Ensure we have an active course
                let nextActiveId = activeCourseId;
                if (!nextActiveId && newCourses.length > 0) {
                    nextActiveId = newCourses[0].id;
                } else if (nextActiveId && !newCourses.find(c => c.id === nextActiveId)) {
                    nextActiveId = newCourses.length > 0 ? newCourses[0].id : null;
                }

                // 2. Generate units for the ACTIVE course
                const activeSessions = sessions.filter(s => s.language.toLowerCase() === (nextActiveId || ""));

                // Sort by oldest first so progression makes sense
                const sortedSessions = [...activeSessions].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

                let anyActive = false;
                const generatedUnits: LessonUnit[] = sortedSessions.map((session, idx) => {
                    // Only segments that actually have an IPA and Meaning can be tested
                    const validSegments = session.segments.filter(s => !!s.meaning && !!s.ipa);
                    const totalLessons = validSegments.length;
                    const completedLessons = progressMap[session.id] || 0;

                    let status: 'completed' | 'active' | 'locked' = 'locked';

                    if (totalLessons === 0) {
                        status = 'completed'; // Skip empty sessions
                    } else if (completedLessons >= totalLessons) {
                        status = 'completed';
                    } else if (!anyActive) {
                        status = 'active';
                        anyActive = true;
                    }

                    // Pull first available cultural context in the session
                    const contextSegment = session.segments.find(s => !!s.culturalContext);

                    return {
                        id: session.id,
                        title: session.fileName.replace(/\.[^/.]+$/, ""), // Remove extension
                        description: `Learn from ${session.segments[0]?.speaker || "community member"}`,
                        iconName: 'MapPin', // Default for generated
                        status,
                        totalLessons,
                        completedLessons,
                        culturalContext: contextSegment?.culturalContext
                    };
                });

                set({
                    courses: newCourses,
                    activeCourseId: nextActiveId,
                    units: generatedUnits
                });
            },

            completeLesson: (unitId) => {
                const { progressMap, units, dailyGoal, lessonsCompletedToday } = get();

                const unit = units.find(u => u.id === unitId);
                if (!unit) return;

                const newCompleted = Math.min((progressMap[unitId] || 0) + 1, unit.totalLessons);

                // Update persistent progress map
                const nextProgressMap = {
                    ...progressMap,
                    [unitId]: newCompleted
                };

                // Re-calculate unit status locally so we don't have to require full session list here
                let anyActive = false;
                const updatedUnits = units.map(u => {
                    if (u.id === unitId) {
                        const newStatus = newCompleted >= u.totalLessons ? 'completed' : 'active';
                        return { ...u, completedLessons: newCompleted, status: newStatus as 'completed' | 'active' };
                    }
                    return u;
                });

                // Unlock next sequentially if this one just completed
                for (let i = 0; i < updatedUnits.length; i++) {
                    const u = updatedUnits[i];
                    if (u.status === 'completed') continue;

                    if (!anyActive) {
                        u.status = 'active';
                        anyActive = true;
                    } else {
                        u.status = 'locked';
                    }
                }

                set({
                    progressMap: nextProgressMap,
                    units: updatedUnits,
                    lessonsCompletedToday: lessonsCompletedToday + 1
                });
            },

            deductLife: () => {
                const { lives } = get();
                if (lives > 0) {
                    set({ lives: lives - 1 });
                }
            },

            resetProgress: () => set({
                progressMap: {},
                lessonsCompletedToday: 0
                // Caller must call syncWithAudioStore after reset to rebuild units
            })
        }),
        {
            name: "learner-progress-storage",
            partialize: (state) => ({
                progressMap: state.progressMap,
                lessonsCompletedToday: state.lessonsCompletedToday,
                lives: state.lives,
            }),
        }
    )
);
