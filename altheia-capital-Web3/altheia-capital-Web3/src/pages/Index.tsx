import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { Features } from "@/components/Features";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Dashboard />
      <Features />
    </main>
  );
};

export default Index;
