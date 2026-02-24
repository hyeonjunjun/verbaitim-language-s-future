import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LinguistDashboard from "./pages/LinguistDashboard";
import LearnerDashboard from "./pages/LearnerDashboard";
import WorkbenchDashboard from "./pages/WorkbenchDashboard";
import WorkbenchEditor from "./pages/WorkbenchEditor";
import CorpusLibrary from "./pages/CorpusLibrary";
import SessionHistory from "./pages/SessionHistory";
import WorkbenchSettings from "./pages/WorkbenchSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import MainLayout from "@/layouts/MainLayout";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MainLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/linguist" element={<LinguistDashboard />} />
            <Route path="/learner" element={<LearnerDashboard />} />

            {/* Professional Workbench - Immersive App Routes */}
            <Route path="/workbench" element={<WorkbenchDashboard />} />
            <Route path="/workbench/editor" element={<WorkbenchEditor />} />
            <Route path="/workbench/corpus" element={<CorpusLibrary />} />
            <Route path="/workbench/history" element={<SessionHistory />} />
            <Route path="/workbench/settings" element={<WorkbenchSettings />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MainLayout>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
