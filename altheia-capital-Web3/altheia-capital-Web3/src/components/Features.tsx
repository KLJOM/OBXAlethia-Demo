import { Card } from "@/components/ui/card";
import { Brain, Shield, Zap, Network, TrendingUp, Lock } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Capital Structuring",
    description: "Anticipatory smart contracts that predict capital needs, regulatory requirements, and optimal deal structures before you ask."
  },
  {
    icon: Network,
    title: "Multi-Party Orchestration",
    description: "Seamlessly coordinate PE firms, investment banks, hedge funds, and institutional partners in real-time collaboration."
  },
  {
    icon: Shield,
    title: "Regulatory Compliance",
    description: "Automated compliance monitoring across jurisdictions with built-in risk mitigation and anticipatory regulatory frameworks."
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    description: "Blockchain-powered instant settlements with reduced friction in cross-border payments and remittances."
  },
  {
    icon: TrendingUp,
    title: "Quantitative Analytics",
    description: "CFA-grade portfolio analytics, risk metrics, and valuation models integrated directly into every transaction."
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade encryption, multi-sig wallets, and institutional custody solutions for peace of mind."
  }
];

const industries = [
  "Art & Culture",
  "Private Equity",
  "Investment Banking",
  "Commercial Real Estate",
  "Mining & Energy",
  "Educational Institutions",
  "Agriculture & Wine"
];

export const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="space-y-16">
          {/* Features Grid */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">
                Enterprise-Grade <span className="text-primary">Infrastructure</span>
              </h2>
              <p className="text-muted-foreground">
                Built on expertise in DeFi, CeFi, quantitative finance, and blockchain technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card 
                  key={feature.title}
                  className="p-6 bg-card/50 border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group"
                >
                  <feature.icon className="w-10 h-10 text-primary mb-4 group-hover:text-accent transition-colors" />
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">
                Industry <span className="text-accent">Coverage</span>
              </h2>
              <p className="text-muted-foreground">
                Serving diverse sectors with specialized capital structuring solutions
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="px-6 py-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer group"
                >
                  <span className="font-mono text-sm group-hover:text-primary transition-colors">
                    {industry}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl" />
            <Card className="relative p-12 bg-card/80 backdrop-blur-xl border-primary/30">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold font-mono">
                  Ready to Transform Your Deal Flow?
                </h2>
                <p className="text-muted-foreground text-lg">
                  Join 1,200+ financial institutions using OBXAlethia for smarter capital structuring
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-mono rounded-lg glow-neon transition-all">
                    Request Demo
                  </button>
                  <button className="px-8 py-3 border border-primary/30 hover:bg-primary/10 font-mono rounded-lg transition-all">
                    Talk to Sales
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
