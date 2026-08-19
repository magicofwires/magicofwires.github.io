import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone, Menu, X } from 'lucide-react';
import mow_logo from '../assets/mow_logo.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: "Services", hash: "services" },
        { name: "Portfolio", hash: "portfolio" },
        { name: "About", hash: "about" },
        { name: "Contact", hash: "contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/' || location.pathname === '';

    const handleNavClick = (hash) => {
        setIsOpen(false);
        if (isHome) {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-lg shadow-lg shadow-black/30 border-b border-slate-800/80' : 'bg-transparent'}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-slate-900/95 backdrop-blur-md mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link 
                        to="/#home" 
                        onClick={() => handleNavClick('home')} 
                        className="flex items-center space-x-3 group"
                    >
                        <img className="w-auto h-14 sm:h-16 transition-transform group-hover:scale-105" src={mow_logo} alt='Magic Of Wires Logo' />
                        <span className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-200 to-orange-500">
                            Magic Of Wires
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={`/#${link.hash}`} 
                                onClick={() => handleNavClick(link.hash)}
                                className="text-base font-medium text-slate-200 hover:text-orange-400 transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="p-2 rounded-lg text-slate-300 hover:text-orange-400 hover:bg-slate-800 transition-colors"
                            aria-label="Toggle navigation menu"
                        >
                            {isOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-slate-800/95 backdrop-blur-xl border-b border-slate-700 shadow-2xl"
                >
                    <nav className="flex flex-col items-center space-y-4 py-6">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={`/#${link.hash}`} 
                                onClick={() => handleNavClick(link.hash)} 
                                className="text-lg font-medium text-slate-200 hover:text-orange-400 transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </motion.div>
            )}
        </motion.header>
    );
};

export default Header;