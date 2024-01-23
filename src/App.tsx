import { BrowserRouter } from "react-router-dom";
import Routes from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme/themeProvider";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <BrowserRouter>
            <Routes />
            <Toaster />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
