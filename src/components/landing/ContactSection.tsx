'use client';

import { motion } from 'framer-motion';
import { ExternalLink, User, Layout } from 'lucide-react';

export function ContactSection() {
    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-[#fafafa] dark:bg-[#020010] transition-colors duration-500">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.08),transparent_50%)]" />
            
            <div className="container relative z-10 px-6 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Digital Workspace Highlight */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative group p-1 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-blue-500/20 dark:from-emerald-500/30 dark:via-cyan-500/30 dark:to-blue-500/30 overflow-hidden shadow-2xl shadow-emerald-500/10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        
                        <div className="relative bg-white dark:bg-[#0a0814]/90 backdrop-blur-xl rounded-[23px] p-10 h-full flex flex-col items-start border border-white/20 dark:border-white/5">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-500/20">
                                <Layout className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            
                            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                                Create a digital <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400">Workspace</span>
                            </h3>
                            
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-10 font-light">
                                Elevate your team&apos;s productivity with our premium AI-powered workspace solution. Seamlessly integrate your git workflow into a unified digital environment.
                            </p>
                            
                            <a 
                                href="https://workstack-ai.vercel.app/" 
                                target="_blank" 
                                rel="noreferrer"
                                className="mt-auto inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30 text-white dark:text-emerald-400 border border-emerald-500/30 transition-all duration-300 font-display font-bold text-xs tracking-widest uppercase"
                            >
                                Launch Workstack
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Know Author Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative group p-[1px] rounded-3xl bg-black/5 dark:bg-white/10 overflow-hidden"
                    >
                        <div className="relative bg-[#f8f9fa] dark:bg-[#05030f]/80 backdrop-blur-xl rounded-[23px] p-10 h-full flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-1 mb-8 shadow-xl">
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                    <User className="w-7 h-7 text-white" />
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                                Meet the Developer
                            </h3>
                            
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-10 font-light px-4">
                                Curating cinematic digital experiences at the intersection of design and engineering.
                            </p>
                            
                            <a 
                                href="https://ayushhh-folio.netlify.app/" 
                                target="_blank" 
                                rel="noreferrer"
                                className="mt-auto inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-gray-900 dark:text-white transition-all duration-300 font-display font-bold text-xs tracking-widest uppercase"
                            >
                                Know Author
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
