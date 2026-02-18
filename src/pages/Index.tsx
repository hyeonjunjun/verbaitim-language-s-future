import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureShowcase from "@/components/FeatureShowcase";
import ChainOfCustody from "@/components/ChainOfCustody";
import DualCTA from "@/components/DualCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <FeatureShowcase />
        <ChainOfCustody />
        <DualCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
