import { Shell } from "@/design-system/Layout";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import ForLinguists from "@/components/ForLinguists";
import ForLearners from "@/components/ForLearners";
import WhyVerbaitim from "@/components/WhyVerbaitim";
import JoinBeta from "@/components/JoinBeta";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <Shell>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <ForLinguists />
      <ForLearners />
      <WhyVerbaitim />
      <JoinBeta />
      <Footer />
    </Shell>
  );
};

export default Index;
