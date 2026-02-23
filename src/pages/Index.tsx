import { Shell } from "@/design-system/Layout";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import ForLinguists from "@/components/ForLinguists";
import ForLearners from "@/components/ForLearners";
import HowItWorks from "@/components/HowItWorks";
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
      <ForLinguists />
      <ForLearners />
      <HowItWorks />
      <WhyVerbaitim />
      <JoinBeta />
      <Footer />
    </Shell>
  );
};

export default Index;
