import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <ReactLenis root>
            <div className="bg-background min-h-screen text-foreground selection:bg-signal/30 selection:text-foreground">
                <main>
                    {children}
                </main>
            </div>
        </ReactLenis>
    );
};

export default MainLayout;
