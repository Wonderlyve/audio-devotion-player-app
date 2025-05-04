
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import { FavoritesProvider } from "./context/FavoritesContext";

import Layout from "./components/Layout";
import Index from "./pages/Index";
import AllSermons from "./pages/AllSermons";
import SermonDetails from "./pages/SermonDetails";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PlayerProvider>
        <FavoritesProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="/sermons" element={<AllSermons />} />
                <Route path="/sermon/:id" element={<SermonDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </PlayerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
