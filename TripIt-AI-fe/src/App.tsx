import './App.css'
import FeatureCard from './components/custom/FeatureCard'
import Hero from './components/custom/Hero'
import HowItWorks from './components/custom/HowItWorks'
import Testimonials from './components/custom/Testimonials'

function App() {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      {/* FeatureCards Section*/}
      <FeatureCard/>
      {/* HowItWorks Section*/}
      <HowItWorks/>
      {/* Testimonials Section */}
      <Testimonials/>
    </>
  )
}

export default App
