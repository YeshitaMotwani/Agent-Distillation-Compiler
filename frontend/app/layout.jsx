import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata = {
  title: "Agent Distillation Compiler",
  description: "Hybrid Student–Teacher AI Code Generation Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}