import './App.css';
import { memo } from 'react';
import FeatureCard from './components/custom/FeatureCard';
import Hero from './components/custom/Hero';
import HowItWorks from './components/custom/HowItWorks';
import Testimonials from './components/custom/Testimonials';

const MemoizedFeatureCard = memo(FeatureCard);
const MemoizedHero = memo(Hero);
const MemoizedHowItWorks = memo(HowItWorks);
const MemoizedTestimonials = memo(Testimonials);

function App() {
  return (
    <>
      <MemoizedHero />
      <MemoizedFeatureCard />
      <MemoizedHowItWorks />
      <MemoizedTestimonials />
    </>
  );
}

export default App;
