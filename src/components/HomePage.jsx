import React from 'react';
import Hero from './Hero';
import Services from './Services';
import Portfolio from './Portfolio';
import About from './About';
import Contact from './Contact';

const HomePage = () => {
    return (
        <main>
            <Hero />
            <Services />
            <Portfolio />
            <About />
            <Contact />
        </main>
    );
};

export default HomePage;
