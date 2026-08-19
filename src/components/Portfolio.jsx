import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Sparkles, Smartphone, ShieldCheck } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { projects } from '../data/projects';
import { openInNewTab } from './../lib/utils';

const Portfolio = () => {
    const { toast } = useToast();
    
    const handleNotImplemented = () => {
        toast({
            title: "More Projects Coming Soon",
            description: "🚀 We are continuously developing innovative mobile experiences. Stay tuned!",
            variant: "default",
        });
    };

    const handleLinkClick = (e, url) => {
        e.stopPropagation();
        openInNewTab(url);
    };

    return (
        <section id="portfolio" className="py-20 md:py-32 bg-slate-900 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-4">
                        <Sparkles size={14} />
                        <span>Featured Showcase</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-200 to-orange-500">
                        Our Recent Work
                    </h2>
                    <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                        We're proud of the bespoke solutions we've delivered. Explore our featured case studies below.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id || index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="bg-slate-800/90 border-slate-700 overflow-hidden group h-full flex flex-col hover:border-orange-500/60 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500">
                                <Link to={`/portfolio/${project.id}`} className="block relative overflow-hidden bg-slate-950/40 p-4">
                                    <img 
                                        className="w-full h-60 object-contain transition-transform duration-500 group-hover:scale-105" 
                                        alt={project.title} 
                                        src={project.image} 
                                    />
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-all duration-300"></div>
                                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur border border-slate-700 text-xs text-orange-400 font-semibold px-2.5 py-1 rounded-full">
                                        {project.category}
                                    </div>
                                </Link>

                                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                                    <div>
                                        <div className="flex items-center space-x-2 text-xs text-slate-400 mb-2">
                                            <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                                            <span>{project.platform}</span>
                                            <span>•</span>
                                            <span className="text-emerald-400 font-medium">{project.status}</span>
                                        </div>
                                        <Link to={`/portfolio/${project.id}`}>
                                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-2">
                                                {project.title}
                                            </h3>
                                        </Link>
                                        <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
                                            {project.summary || project.description}
                                        </p>
                                    </div>

                                    <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between gap-2">
                                        <Link to={`/portfolio/${project.id}`} className="flex-1">
                                            <Button 
                                                variant="default" 
                                                className="w-full bg-blue-600 hover:bg-orange-500 text-white font-semibold text-xs py-2 rounded-lg transition-colors flex items-center justify-center space-x-1"
                                            >
                                                <span>View Case Study</span>
                                                <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                            </Button>
                                        </Link>

                                        {project.url && (
                                            <Button 
                                                onClick={(e) => handleLinkClick(e, project.url)} 
                                                variant="outline" 
                                                size="sm"
                                                className="border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg text-xs"
                                                title="Open on Google Play"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Button 
                        onClick={handleNotImplemented} 
                        size="lg" 
                        variant="outline" 
                        className="text-slate-200 border-slate-700 bg-slate-800/60 hover:bg-slate-700 hover:text-white font-semibold text-base px-8 py-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                    >
                        Explore More Upcoming Projects
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;