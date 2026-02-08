import { Button } from "@/components/ui/button";
import { Menu, Wallet } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold font-mono">
              <span className="text-neon-blue">OBX</span>
              <span className="text-foreground">Alethia</span>
            </h1>
            <div className="hidden md:flex items-center gap-6">
              <a href="#dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="#proposals" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Proposals
              </a>
              <a href="#markets" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Markets
              </a>
              <a href="#network" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Network
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex text-muted-foreground hover:text-foreground">
              Docs
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono glow-neon">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
