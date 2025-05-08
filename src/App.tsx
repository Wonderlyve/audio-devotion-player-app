
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import { FavoritesProvider } from "./context/FavoritesContext";

import Layout from "./components/Layout";
import Index from "./pages/Index";
import AllCourses from "./pages/AllCourses";
import Tutorials from "./pages/Tutorials";
import CourseDetails from "./pages/CourseDetails";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
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
                <Route path="/courses" element={<AllCourses />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/course/:id" element={<CourseDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profile" element={<Profile />} />
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
