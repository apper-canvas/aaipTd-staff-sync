import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import MainFeature from '../components/MainFeature';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <MainFeature />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;