import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index.tsx";
import AnimeDetail from "./pages/AnimeDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import FigurePage from "./pages/FigurePage.tsx";
import FigureAliasPage from "./pages/FigureAliasPage.tsx";
import FigureSourceListingPage from "./pages/FigureSourceListingPage.tsx";
import FranchisePage from "./pages/FranchisePage.tsx";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />

            <BrowserRouter basename="/anime-figure-market">
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/anime/:animeId" element={<AnimeDetail />} />
                    <Route path="/work/figure" element={<FigurePage />} />
                    <Route path="/work/figure-alias" element={<FigureAliasPage />} />
                    <Route path="/work/figure-source-listing" element={<FigureSourceListingPage />} />
                    <Route path="/work/figure-listing" element={<FigureSourceListingPage />} />
                    <Route path="/work/franchises" element={<FranchisePage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
