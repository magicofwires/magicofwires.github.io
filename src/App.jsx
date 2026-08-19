import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import HomePage from './components/HomePage';
import PortfolioDetail from './components/PortfolioDetail';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Helmet>
        <title>Magic Of Wires | Wiring Innovation Into Mobile.</title>
        <meta name="description" content="Magic Of Wires specializes in crafting bespoke mobile applications for iOS and Android. Turn your ideas into powerful, user-centric mobile experiences." />
        <meta property="og:title" content="Magic Of Wires | Mobile App Development Experts" />
        <meta property="og:description" content="Magic Of Wires specializes in crafting bespoke mobile applications for iOS and Android. Turn your ideas into powerful, user-centric mobile experiences." />
      </Helmet>
      <div className="bg-slate-900 text-white min-h-screen font-sans flex flex-col justify-between selection:bg-orange-500 selection:text-white">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio/:projectId" element={<PortfolioDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;