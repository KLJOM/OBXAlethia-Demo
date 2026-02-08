import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, FileText, DollarSign } from "lucide-react";

const activeProposals = [
  {
    id: "PROP-2024-001",
    title: "Gallery Acquisition - Contemporary Art",
    sector: "Art & Culture",
    value: "$12.5M",
    parties: 8,
    status: "Active",
    progress: 65
  },
  {
    id: "PROP-2024-002",
    title: "Commercial Real Estate - Manhattan",
    sector: "Real Estate",
    value: "$450M",
    parties: 12,
    status: "Due Diligence",
    progress: 45
  },
  {
    id: "PROP-2024-003",
    title: "Mining Rights - Lithium Project",
    sector: "Mining & Energy",
    value: "$89M",
    parties: 6,
    status: "Structuring",
    progress: 30
  },
  {
    id: "PROP-2024-004",
    title: "Hedge Fund LBO",
    sector: "Financial Services",
    value: "$2.1B",
    parties: 15,
    status: "Active",
    progress: 78
  }
];

export const Dashboard = () => {
  return (
    <section id="dashboard" className="py-20 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-6">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold font-mono mb-2">Active Proposals</h2>
              <p className="text-muted-foreground">Real-time capital structuring pipeline</p>
            </div>
            <Badge className="bg-accent/20 text-accent border-accent/30 font-mono">
              Live Data
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6 bg-card/50 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-primary" />
                <Badge variant="outline" className="border-primary/30 text-primary">+12%</Badge>
              </div>
              <div className="text-2xl font-bold font-mono mb-1">$3.2B</div>
              <div className="text-sm text-muted-foreground">Total Deal Flow</div>
            </Card>

            <Card className="p-6 bg-card/50 border-accent/20 hover:border-accent/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-accent" />
                <Badge variant="outline" className="border-accent/30 text-accent">+8</Badge>
              </div>
              <div className="text-2xl font-bold font-mono mb-1">47</div>
              <div className="text-sm text-muted-foreground">Active Proposals</div>
            </Card>

            <Card className="p-6 bg-card/50 border-terminal-green/20 hover:border-terminal-green/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-terminal-green" />
                <Badge variant="outline" className="border-terminal-green/30 text-terminal-green">+24</Badge>
              </div>
              <div className="text-2xl font-bold font-mono mb-1">156</div>
              <div className="text-sm text-muted-foreground">Connected Parties</div>
            </Card>

            <Card className="p-6 bg-card/50 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
                <Badge variant="outline" className="border-primary/30 text-primary">+18%</Badge>
              </div>
              <div className="text-2xl font-bold font-mono mb-1">94%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </Card>
          </div>

          {/* Proposals Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeProposals.map((proposal) => (
              <Card 
                key={proposal.id} 
                className="p-6 bg-card/50 border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-muted-foreground">{proposal.id}</div>
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {proposal.title}
                      </h3>
                      <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                        {proposal.sector}
                      </Badge>
                    </div>
                    <Badge className={`
                      ${proposal.status === 'Active' ? 'bg-terminal-green/20 text-terminal-green border-terminal-green/30' : ''}
                      ${proposal.status === 'Due Diligence' ? 'bg-accent/20 text-accent border-accent/30' : ''}
                      ${proposal.status === 'Structuring' ? 'bg-primary/20 text-primary border-primary/30' : ''}
                    `}>
                      {proposal.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="font-mono">{proposal.value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="font-mono">{proposal.parties} parties</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-mono text-primary">{proposal.progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                        style={{ width: `${proposal.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
