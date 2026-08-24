import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, 
    ArrowRight,
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
    ChevronRight,
    Laptop,
    Globe,
    Database,
    Server,
    Cloud,
    Zap,
    Code,
    Code2,
    Terminal,
    Workflow,
    Activity,
    BarChart3,
    CreditCard,
    ShoppingBag,
    Users,
    Bell,
    Key,
    Eye,
    EyeOff,
    FileText,
    RefreshCw,
    Sliders,
    MessageSquare,
    Palette,
    Compass,
    Github,
    Quote
} from 'lucide-react';
import { getProjectById, projects } from '../data/projects';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { useToast } from './ui/use-toast';
import { openInNewTab } from '../lib/utils';

// Comprehensive Icon Map for any future project type
const iconRegistry = {
    ShieldCheck,
    Lock,
    Fingerprint,
    HardDriveDownload,
    KeyRound,
    FolderKanban,
    Star,
    Smartphone,
    Laptop,
    Globe,
    Database,
    Server,
    Cloud,
    Zap,
    Code,
    Code2,
    Terminal,
    Workflow,
    Activity,
    BarChart3,
    CreditCard,
    ShoppingBag,
    Users,
    Bell,
    Key,
    Eye,
    EyeOff,
    FileText,
    RefreshCw,
    Sliders,
    MessageSquare,
    Palette,
    Compass,
    Github,
    Cpu,
    Layers,
    Sparkles,
    CheckCircle2
};

const getDynamicIcon = (iconName, Fallback = Sparkles) => {
    if (!iconName) return Fallback;
    return iconRegistry[iconName] || Fallback;
};

const PortfolioDetail = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    const project = getProjectById(projectId);

    // Compute previous and next project for seamless browsing
    const currentIndex = projects.findIndex((p) => p.id === projectId);
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

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

    // Helper to resolve link label and icon dynamically
    const resolveLinkConfig = (linkObjOrUrl, index = 0) => {
        if (typeof linkObjOrUrl === 'string') {
            const url = linkObjOrUrl;
            let label = "Explore Project";
            let icon = ArrowUpRight;
            if (url.includes('play.google.com')) {
                label = "Get on Google Play";
                icon = ArrowUpRight;
            } else if (url.includes('apple.com') || url.includes('apps.apple.com')) {
                label = "Download on App Store";
                icon = ArrowUpRight;
            } else if (url.includes('github.com')) {
                label = "View on GitHub";
                icon = Github;
            } else if (project?.platform?.toLowerCase().includes('web')) {
                label = "Visit Live Website";
                icon = Globe;
            }
            return { label: project?.urlLabel || label, url, icon, type: index === 0 ? 'primary' : 'secondary' };
        }

        const iconComponent = getDynamicIcon(linkObjOrUrl.iconName, ArrowUpRight);
        return {
            label: linkObjOrUrl.label || "Explore Project",
            url: linkObjOrUrl.url,
            icon: iconComponent,
            type: linkObjOrUrl.type || (index === 0 ? 'primary' : 'secondary')
        };
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

    // Build action links list
    const actionLinks = project.links 
        ? project.links.map((link, i) => resolveLinkConfig(link, i))
        : project.url 
            ? [resolveLinkConfig(project.url, 0)]
            : [];

    // Extract dynamic meta items
    const metaItems = [
        project.platform && { label: "Platform", value: project.platform, icon: Smartphone, color: "text-blue-400" },
        project.status && { label: "Status", value: project.status, icon: CheckCircle2, color: "text-emerald-400" },
        project.rating && { label: "Rating", value: project.rating, icon: Star, color: "text-amber-400", fill: true },
        project.timeline && { label: "Timeline", value: project.timeline, icon: Layers, color: "text-orange-400" },
        project.client && { label: "Client / Role", value: project.client, icon: Users, color: "text-purple-400" },
    ].filter(Boolean);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 pt-28 pb-24 overflow-hidden">
            <Helmet>
                <title>{`${project.title} | Case Study | Magic Of Wires`}</title>
                <meta name="description" content={project.summary || project.tagline} />
                <meta property="og:title" content={`${project.title} | Magic Of Wires`} />
                <meta property="og:description" content={project.summary || project.tagline} />
                {project.image && <meta property="og:image" content={project.image} />}
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
                    {project.category && (
                        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wide uppercase">
                            <Sparkles size={14} />
                            <span>{project.category}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-orange-400">
                            {project.title}
                        </h1>
                        {project.tagline && (
                            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
                                {project.tagline}
                            </p>
                        )}
                    </div>

                    {/* Metadata Badges */}
                    {metaItems.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                            {metaItems.slice(0, 4).map((item, idx) => {
                                const MetaIcon = item.icon;
                                return (
                                    <div key={idx} className="bg-slate-800/60 backdrop-blur border border-slate-700/70 p-4 rounded-xl">
                                        <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{item.label}</div>
                                        <div className={`text-sm sm:text-base font-semibold text-white flex items-center`}>
                                            <MetaIcon className={`w-4 h-4 mr-1.5 ${item.color} ${item.fill ? 'fill-amber-400' : ''}`} />
                                            <span className="truncate">{item.value}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Primary Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        {actionLinks.map((link, idx) => {
                            const LinkIcon = link.icon;
                            return (
                                <Button 
                                    key={idx}
                                    onClick={() => openInNewTab(link.url)}
                                    size="lg" 
                                    className={
                                        link.type === 'primary'
                                            ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-orange-500 text-white font-bold px-8 py-6 rounded-full shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                                            : "bg-slate-800/90 border border-slate-700 hover:bg-slate-700 text-white font-semibold px-6 py-6 rounded-full shadow transition-all"
                                    }
                                >
                                    <span>{link.label}</span>
                                    <LinkIcon className="ml-2 w-5 h-5" />
                                </Button>
                            );
                        })}
                        <Link to="/#contact">
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-white font-semibold px-8 py-6 rounded-full transition-all"
                            >
                                Discuss a Similar Project
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
                                {project.headline || project.title}
                            </h2>
                            <p className="text-slate-300 text-base leading-relaxed">
                                {project.summary || project.tagline}
                            </p>
                            {project.highlightBadge && (
                                <div className="pt-2 flex items-center space-x-2 text-sm text-blue-400 font-medium">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>{project.highlightBadge}</span>
                                </div>
                            )}
                        </div>
                        {project.image && (
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
                        )}
                    </div>
                </motion.div>

                {/* Metrics Grid */}
                {project.metrics && project.metrics.length > 0 && (
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
                                {metric.description && (
                                    <div className="text-xs text-slate-400">
                                        {metric.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* Deep Dive Case Study Content */}
                <div className="space-y-16">
                    {/* Problem & Solution Narrative */}
                    {project.overview && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={
                                project.challenge || project.solution 
                                    ? "grid grid-cols-1 lg:grid-cols-3 gap-8" 
                                    : "max-w-4xl space-y-6"
                            }
                        >
                            <div className={project.challenge || project.solution ? "lg:col-span-2 space-y-6" : "space-y-6"}>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                                    <span className="w-2 h-7 bg-blue-500 rounded-full mr-3 inline-block"></span>
                                    Executive Summary & Project Goals
                                </h2>
                                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4 text-base sm:text-lg">
                                    {project.overview.split('\n\n').map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>

                            {(project.challenge || project.solution) && (
                                <div className="space-y-6">
                                    {project.challenge && (
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
                                    )}

                                    {project.solution && (
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
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Key Features Showcase */}
                    {project.keyFeatures && project.keyFeatures.length > 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div className="text-center max-w-2xl mx-auto space-y-3">
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                                    {project.featuresSectionTitle || "Key Features & Innovations"}
                                </h2>
                                <p className="text-slate-400">
                                    {project.featuresSectionSubtitle || "Engineered with precision for peak performance, seamless usability, and complete peace of mind."}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {project.keyFeatures.map((feature, idx) => {
                                    const IconComponent = getDynamicIcon(feature.iconName, Sparkles);
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

                    {/* Architecture & Engineering Highlights */}
                    {project.architectureHighlights && project.architectureHighlights.length > 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                                    <span className="w-2 h-7 bg-orange-500 rounded-full mr-3 inline-block"></span>
                                    {project.architectureSectionTitle || "Technical Architecture & System Design"}
                                </h2>
                                {project.architectureSectionSubtitle && (
                                    <p className="mt-2 text-sm text-slate-400 pl-5">
                                        {project.architectureSectionSubtitle}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {project.architectureHighlights.map((arch, idx) => {
                                    const ArchIcon = getDynamicIcon(arch.iconName, Cpu);
                                    return (
                                        <div 
                                            key={idx} 
                                            className="bg-slate-800/40 border border-slate-700/70 p-6 rounded-2xl flex items-start space-x-4 hover:border-slate-600 transition-colors"
                                        >
                                            <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400 mt-1 flex-shrink-0">
                                                <ArchIcon size={20} />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-lg font-bold text-white">{arch.title}</h4>
                                                <p className="text-sm text-slate-300 leading-relaxed">{arch.detail}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Tech Stack Breakdown */}
                    {project.techStack && project.techStack.length > 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                                <span className="w-2 h-7 bg-blue-500 rounded-full mr-3 inline-block"></span>
                                {project.techStackSectionTitle || "Technology Stack & Tooling"}
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

                    {/* Testimonial / Impact Quote (Optional) */}
                    {project.testimonial && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-8 rounded-2xl bg-gradient-to-r from-slate-800/90 to-slate-800/50 border border-slate-700/70 flex items-start space-x-5"
                        >
                            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                                <Quote size={28} />
                            </div>
                            <div className="space-y-3">
                                <p className="text-base sm:text-lg italic text-slate-200 leading-relaxed">
                                    "{project.testimonial.quote}"
                                </p>
                                <div className="text-xs text-orange-400 font-semibold tracking-wide uppercase">
                                    — {project.testimonial.author} {project.testimonial.role && `(${project.testimonial.role})`}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Previous / Next Project Navigator */}
                    {(prevProject || nextProject) && (
                        <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                            {prevProject ? (
                                <Link 
                                    to={`/portfolio/${prevProject.id}`}
                                    className="flex items-center space-x-3 text-slate-300 hover:text-blue-400 transition-colors group"
                                >
                                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase">Previous Project</div>
                                        <div className="font-semibold text-sm text-white">{prevProject.title}</div>
                                    </div>
                                </Link>
                            ) : <div></div>}

                            {nextProject && (
                                <Link 
                                    to={`/portfolio/${nextProject.id}`}
                                    className="flex items-center space-x-3 text-slate-300 hover:text-orange-400 transition-colors group text-right ml-auto"
                                >
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase">Next Project</div>
                                        <div className="font-semibold text-sm text-white">{nextProject.title}</div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            )}
                        </div>
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
                                From concept and design to scalable architecture and app store launch, Magic Of Wires has you covered.
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
