import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaShieldAlt, FaChartLine, FaHeart, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const LandingPage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen text-galactic-text relative overflow-hidden font-sans bg-galactic-dark">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/background.png"
                    alt="Background"
                    className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-50 flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
                <div className="flex items-center space-x-3">
                    <img src="/assets/logo.png" alt="AuthBoard Logo" className="h-10 w-auto" />
                    <span className="text-2xl font-bold tracking-tight font-['Orbitron']">AuthBoard</span>
                </div>
                <div className="space-x-6">
                    <Link to="/login" className="text-gray-200 hover:text-white transition font-medium">Login</Link>
                    <Link
                        to="/register"
                        className="bg-gradient-to-r from-galactic-blue to-galactic-secondary text-galactic-dark font-bold px-5 py-2 rounded-full transition shadow-lg hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                    >
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 container mx-auto px-4 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between">

                {/* Text Content */}
                <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 lg:pl-16">
                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 leading-tight animate-fade-in-up">
                        Manage Tasks <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-galactic-blue to-galactic-secondary text-glow">
                            With Confidence
                        </span>
                    </h1>
                    <p className="text-lg text-galactic-silver mb-6 max-w-xl mx-auto lg:mx-0 animate-fade-in-up delay-100">
                        Experience the next generation of task management. Secure, beautiful, and intuitive.
                        Boost your productivity with AuthBoard today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-200">
                        <Link
                            to="/register"
                            className="bg-gradient-to-r from-galactic-blue to-galactic-secondary hover:from-blue-400 hover:to-cyan-400 text-galactic-dark px-8 py-3 rounded-full text-lg font-bold transition transform hover:scale-105 shadow-xl"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            to="/register"
                            className="bg-galactic-card/80 border border-galactic-blue/30 backdrop-blur-md px-8 py-3 rounded-full text-lg font-semibold hover:bg-galactic-blue/10 transition text-white"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>

                {/* Hero Image / Illustration */}
                <div className="lg:w-1/2 relative animate-float-delayed">
                    <img
                        src="/assets/hero.png"
                        alt="Dashboard Preview"
                        className="w-full max-w-2xl mx-auto drop-shadow-2xl rounded-xl border border-white/10"
                    />

                    {/* Floating Elements (Decorative) */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-10 -left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-300"></div>
                </div>
            </main>

            {/* Features Section */}
            <section id="features" className="relative z-10 py-16 bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10">Why Choose AuthBoard?</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-galactic-card border border-galactic-blue/20 p-8 rounded-2xl text-center transform hover:-translate-y-2 transition duration-300 shadow-2xl">
                            <div className="bg-galactic-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-galactic-blue text-2xl">
                                <FaShieldAlt />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Secure Authentication</h3>
                            <p className="text-galactic-silver">
                                Enterprise-grade security for your data. Your privacy is our top priority.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-galactic-card border border-galactic-secondary/20 p-8 rounded-2xl text-center transform hover:-translate-y-2 transition duration-300 delay-100 shadow-2xl">
                            <div className="bg-galactic-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-galactic-secondary text-2xl">
                                <FaRocket />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Lightning Fast</h3>
                            <p className="text-galactic-silver">
                                Built for speed. Manage thousands of tasks without skipping a beat.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-galactic-card border border-galactic-blue/20 p-8 rounded-2xl text-center transform hover:-translate-y-2 transition duration-300 delay-200 shadow-2xl">
                            <div className="bg-galactic-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-galactic-blue text-2xl">
                                <FaChartLine />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Visual Analytics</h3>
                            <p className="text-galactic-silver">
                                Track your progress with beautiful, intuitive charts and insights.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 bg-galactic-card/30 backdrop-blur-md border-t border-galactic-blue/20 text-galactic-silver">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        {/* Brand Column */}
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4 group cursor-pointer inline-flex">
                                <img src="/assets/logo.png" alt="AuthBoard Logo" className="h-8 w-auto group-hover:scale-110 transition-transform duration-300" />
                                <span className="text-xl font-bold tracking-tight font-['Orbitron'] text-transparent bg-clip-text bg-gradient-to-r from-galactic-blue to-galactic-secondary animate-pulse">AuthBoard</span>
                            </div>
                            <p className="max-w-xs text-sm text-galactic-silver/70">
                                Empowering your workflow with secure task management and beautiful analytics.
                                Built for performance and reliability.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-galactic-blue transition">Features</a></li>
                                <li><a href="#" className="hover:text-galactic-blue transition">Pricing</a></li>
                                <li><a href="#" className="hover:text-galactic-blue transition">Security</a></li>
                            </ul>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-galactic-blue transition">About Us</a></li>
                                <li><a href="#" className="hover:text-galactic-blue transition">Contact</a></li>
                                <li><Link to="/login" className="hover:text-galactic-blue transition">Login</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-galactic-blue/10 my-8"></div>

                    {/* Bottom Bar: Copyright & Socials */}
                    <div className="flex flex-col items-center text-center gap-6">
                        <p className="flex items-center justify-center gap-2">
                            Made with <FaHeart className="text-red-500 animate-pulse" /> by <span className="text-white font-semibold">Bharath Kumar K</span>
                        </p>

                        <div className="flex justify-center items-center space-x-8">
                            <a
                                href="https://github.com/Bharath-Kumar-K-0930"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-all transform hover:scale-110 text-xl"
                                aria-label="GitHub"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/bharath-kumar-k-b35ba0304"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition-all transform hover:scale-110 text-xl"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href="mailto:bharathkumarkbk10@gmail.com"
                                className="text-gray-400 hover:text-red-400 transition-all transform hover:scale-110 text-xl"
                                aria-label="Email"
                            >
                                <FaEnvelope />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
