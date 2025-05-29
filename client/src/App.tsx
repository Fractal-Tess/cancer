import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import PageLayout from "./components/layout/PageLayout";
import LandingPage from "./pages/LandingPage";
import CalculatorPage from "./pages/CalculatorPage";
import InsurancesPage from "./pages/InsurancesPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <PageLayout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route 
                path="/insurances" 
                element={
                  <ProtectedRoute>
                    <InsurancesPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageLayout>
        </HashRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
