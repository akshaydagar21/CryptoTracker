import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/toolpit";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { queryClient } from "@/lib/queryClient";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Watchlist from "./pages/Watchlist";
import Portfolio from "./pages/Portfolio";
import Market from "./pages/Market";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/dashboard" component={Index} />
        <Route path="/watchlist" component={Watchlist} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/market" component={Market} />
        <Route path="/settings" component={Settings} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route component={NotFound} />
      </Switch>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
