import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          opacity: 0.1
        }} />
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-primary/30 text-sm font-mono animate-float">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-primary">Series A: $35B Raised</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-mono leading-tight">
            AI-Powered
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient">
              Capital Structuring
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Anticipatory smart contracts that automate complex financial transactions. 
            From M&A to LBOs, we structure deals with blockchain precision and AI intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono glow-neon group">
              Launch Platform
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 font-mono">
              View Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl font-bold font-mono text-primary">$35B</div>
              <div className="text-sm text-muted-foreground">Series A Funding</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold font-mono text-accent">1,247</div>
              <div className="text-sm text-muted-foreground">Active Contracts</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold font-mono text-terminal-green">6</div>
              <div className="text-sm text-muted-foreground">Industry Sectors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
