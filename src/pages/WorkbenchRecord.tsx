import WorkbenchLayout from "@/layouts/WorkbenchLayout";
import { Headline, Text } from "@/design-system/Typography";
import { Mic } from "lucide-react";

const WorkbenchRecord = () => {
    return (
        <WorkbenchLayout>
            <div className="p-8 max-w-7xl mx-auto h-[80vh] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-signal/10 rounded-full flex items-center justify-center mb-6 text-signal border border-signal/20 animate-pulse shadow-[0_0_30px_rgba(var(--signal),0.15)]">
                    <Mic size={32} />
                </div>
                <Headline as="h1" className="text-3xl font-display mb-4 text-foreground">Live Recording Environment</Headline>
                <Text className="text-muted-foreground max-w-md">
                    This module will support real-time audio capture, streaming transcription, and connected metadata tagging.
                </Text>
            </div>
        </WorkbenchLayout>
    );
};

export default WorkbenchRecord;
