import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, 
    ExternalLink, 
    ShieldCheck, 
    Lock, 
    Fingerprint, 
    HardDriveDownload, 
    KeyRound, 
    FolderKanban, 
    Star, 
    Smartphone, 
    CheckCircle2, 
    Share2, 
    Layers, 
    Cpu, 
    Sparkles, 
    ArrowUpRight,
    ChevronRight
} from 'lucide-react';
import { getProjectById, projects } from '../data/projects';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { useToast } from './ui/use-toast';
import { openInNewTab } from '../lib/utils';

// Icon map for dynamic lookup
const iconMap = {
    ShieldCheck,
    Lock,
    Fingerprint,
    HardDriveDownload,
    KeyRound,
    FolderKanban
};

const PortfolioDetail = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('overview');

    const project = getProjectById(projectId);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: project?.title || 'Magic Of Wires Portfolio',
                text: project?.tagline || 'Check out this project by Magic Of Wires',
                url: window.location.href,
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast({
                title: "Link Copied!",
                description: "Project URL copied to clipboard.",
            });
        }
    };

    // If project not found, render friendly 404 state
    if (!project) {
        return (
            <div className="min-h-screen bg-slate-900 pt-32 pb-20 px-4 flex items-center justify-center">
                <Helmet>
                    <title>Project Not Found | Magic Of Wires</title>
                </Helmet>
                <div className="max-w-md w-full text-center space-y-6 bg-slate-800/80 p-8 rounded-2xl border border-slate-700">
                    <div className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mx-auto">
                        <Smartphone size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Project Not Found</h1>
                    <p className="text-slate-400">
                        The requested project could not be found or may have been updated.
                    </p>
                    <Link to="/#portfolio">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full rounded-full">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 pt-28 pb-24 overflow-hidden">
            <Helmet>
                <title>{`${project.title} | Case Study | Magic Of Wires`}</title>
                <meta name="description" content={project.summary} />
                <meta property="og:title" content={`${project.title} | Magic Of Wires`} />
                <meta property="og:description" content={project.summary} />
                <meta property="og:image" content={project.image} />
            </Helmet>

            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -right-48 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                {/* Breadcrumbs & Navigation Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center justify-between gap-4 mb-8 text-sm"
                >
                    <div className="flex items-center space-x-2 text-slate-400">
                        <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link to="/#portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
                        <ChevronRight size={14} />
                        <span className="text-orange-400 font-medium truncate max-w-[200px] sm:max-w-none">{project.title}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleShare}
                            className="bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 rounded-full px-4"
                        >
                            <Share2 className="w-3.5 h-3.5 mr-2" /> Share
                        </Button>
                        <Link to="/#portfolio">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 rounded-full px-4"
                            >
                                <ArrowLeft className="w-3.5 h-3.5 mr-2" /> Back
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Hero Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6 mb-12"
                >
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wide uppercase">
                        <Sparkles size={14} />
                        <span>{project.category}</span>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-orange-400">
                            {project.title}
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
                            {project.tagline}
                        </p>
                    </div>

                    {/* Metadata Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                        <div className="bg-slate-800/60 backdrop-blur border border-slate-700/70 p-4 rounded-xl">
                            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Platform</div>
                            <div className="text-sm sm:text-base font-semibold text-white flex items-center">
                                <Smartphone className="w-4 h-4 mr-1.5 text-blue-400" />
                                {project.platform}
                            </div>
                        </div>

                        <div className="bg-slate-800/60 backdrop-blur border border-slate-700/70 p-4 rounded-xl">
                            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Status</div>
                            <div className="text-sm sm:text-base font-semibold text-emerald-400 flex items-center">
                                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                                {project.status}
                            </div>
                        </div>

                        <div className="bg-slate-800/60 backdrop-blur border border-slate-700/70 p-4 rounded-xl">
                            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Rating</div>
                            <div className="text-sm sm:text-base font-semibold text-amber-400 flex items-center">
                                <Star className="w-4 h-4 mr-1.5 fill-amber-400" />
                                {project.rating}
                            </div>
                        </div>

                        <div className="bg-slate-800/60 backdrop-blur border border-slate-700/70 p-4 rounded-xl">
                            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Timeline</div>
                            <div className="text-sm sm:text-base font-semibold text-white flex items-center">
                                <Layers className="w-4 h-4 mr-1.5 text-orange-400" />
                                {project.timeline}
                            </div>
                        </div>
                    </div>

                    {/* Primary CTA Buttons */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        {project.url && (
                            <Button 
                                onClick={() => openInNewTab(project.url)}
                                size="lg" 
                                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-orange-500 text-white font-bold px-8 py-6 rounded-full shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                            >
                                <span>Get on Google Play</span>
                                <ArrowUpRight className="ml-2 w-5 h-5" />
                            </Button>
                        )}
                        <Link to="/#contact">
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-white font-semibold px-8 py-6 rounded-full transition-all"
                            >
                                Discuss a Similar App
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Featured Mockup & Showcase Banner */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative mb-16 rounded-2xl overflow-hidden border border-slate-700/80 bg-gradient-to-b from-slate-800/90 to-slate-900 shadow-2xl"
                >
                    <div className="p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="w-full md:w-1/2 space-y-4">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                Private. Powerful. Uncompromised.
                            </h2>
                            <p className="text-slate-300 text-base leading-relaxed">
                                {project.summary}
                            </p>
                            <div className="pt-2 flex items-center space-x-2 text-sm text-blue-400 font-medium">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Zero-Knowledge Architecture Guaranteed</span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                                <img 
                                    src={project.image} 
                                    alt={`${project.title} Preview`}
                                    className="relative max-h-80 w-auto rounded-xl object-contain shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Metrics Grid */}
                {project.metrics && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16"
                    >
                        {project.metrics.map((metric, idx) => (
                            <div 
                                key={idx} 
                                className="bg-slate-800/40 backdrop-blur border border-slate-700/60 p-6 rounded-2xl text-center hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5"
                            >
                                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400 mb-1">
                                    {metric.value}
                                </div>
                                <div className="text-sm font-semibold text-white mb-1">
                                    {metric.label}
                                </div>
                                <div className="text-xs text-slate-400">
                                    {metric.description}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* Deep Dive Case Study Content */}
                <div className="space-y-16">
                    {/* Problem & Solution Narrative */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        <div className="lg:col-span-2 space-y-6">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                                <span className="w-2 h-7 bg-blue-500 rounded-full mr-3 inline-block"></span>
                                Executive Summary & Mission
                            </h2>
                            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4 text-base sm:text-lg">
                                {project.overview.split('\n\n').map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card className="bg-slate-800/60 border-slate-700">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-bold text-orange-400 flex items-center">
                                        <Cpu className="w-5 h-5 mr-2" />
                                        The Challenge
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        {project.challenge}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-800/60 border-slate-700">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-bold text-blue-400 flex items-center">
                                        <CheckCircle2 className="w-5 h-5 mr-2" />
                                        The Engineering Solution
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        {project.solution}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>

                    {/* Key Features Showcase */}
                    {project.keyFeatures && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div className="text-center max-w-2xl mx-auto space-y-3">
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                                    Key Features & Innovations
                                </h2>
                                <p className="text-slate-400">
                                    Engineered with precision for peak security, seamless usability, and complete peace of mind.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {project.keyFeatures.map((feature, idx) => {
                                    const IconComponent = iconMap[feature.iconName] || ShieldCheck;
                                    return (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -5 }}
                                            className="bg-slate-800/60 border border-slate-700/80 hover:border-blue-500/50 p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between"
                                        >
                                            <div className="space-y-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-orange-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                                                    <IconComponent size={24} />
                                                </div>
                                                <h3 className="text-xl font-bold text-white">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-sm text-slate-300 leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Architecture & Security Highlights */}
                    {project.architectureHighlights && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                                <span className="w-2 h-7 bg-orange-500 rounded-full mr-3 inline-block"></span>
                                Security Architecture & Cryptography
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {project.architectureHighlights.map((arch, idx) => (
                                    <div 
                                        key={idx} 
                                        className="bg-slate-800/40 border border-slate-700/70 p-6 rounded-2xl flex items-start space-x-4"
                                    >
                                        <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400 mt-1 flex-shrink-0">
                                            <Lock size={20} />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-lg font-bold text-white">{arch.title}</h4>
                                            <p className="text-sm text-slate-300 leading-relaxed">{arch.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Tech Stack Breakdown */}
                    {project.techStack && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                                <span className="w-2 h-7 bg-blue-500 rounded-full mr-3 inline-block"></span>
                                Technology Stack & Tooling
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {project.techStack.map((group, idx) => (
                                    <div key={idx} className="bg-slate-800/50 border border-slate-700/60 p-5 rounded-2xl space-y-3">
                                        <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                                            {group.category}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {group.items.map((item, itemIdx) => (
                                                <span 
                                                    key={itemIdx} 
                                                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-700/70 text-slate-200 border border-slate-600/50"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Bottom CTA Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-900/60 via-slate-800 to-orange-950/40 border border-slate-700/80 text-center space-y-6 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                                Ready to build your next mobile breakthrough?
                            </h3>
                            <p className="text-slate-300 text-base">
                                From concept and cryptography to scalable architecture and app store launch, Magic Of Wires has you covered.
                            </p>
                            <div className="pt-4 flex flex-wrap justify-center gap-4">
                                <Link to="/#contact">
                                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-6 rounded-full shadow-lg shadow-orange-500/25">
                                        Start a Conversation
                                    </Button>
                                </Link>
                                <Link to="/#portfolio">
                                    <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-700 px-8 py-6 rounded-full">
                                        View All Projects
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetail;
