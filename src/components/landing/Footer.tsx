import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-slate-950/50 pt-16 pb-8">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <h3 className="font-bold text-xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">getmygit</h3>
                    <p className="text-sm text-gray-400 mb-6">
                        Visualizing the world's open source code, one repository at a time.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-400 hover:text-white"><Github size={18} /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><Twitter size={18} /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><Mail size={18} /></a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Product</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link href="#features" className="hover:text-purple-400">Features</Link></li>
                        <li><Link href="#use-cases" className="hover:text-purple-400">Use Cases</Link></li>
                        <li><Link href="#roadmap" className="hover:text-purple-400">Roadmap</Link></li>
                        <li><Link href="#limitations" className="hover:text-purple-400">Limitations</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Resources</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-purple-400">Documentation</a></li>
                        <li><a href="#" className="hover:text-purple-400">API Reference (Soon)</a></li>
                        <li><a href="#" className="hover:text-purple-400">Community</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Legal</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-purple-400">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-purple-400">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-purple-400">Disclaimer</a></li>
                    </ul>
                </div>
            </div>

            <div className="container pt-8 border-t border-white/5 text-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} getmygit. All rights reserved.</p>
            </div>
        </footer>
    );
}
