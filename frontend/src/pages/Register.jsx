import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { name, email, password, confirmPassword } = formData;

    const navigate = useNavigate();
    const { register, user, isLoading, isError, message } = useContext(AuthContext);

    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setPasswordError('');

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        const userData = {
            name,
            email,
            password,
        };

        register(userData);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-galactic-dark text-galactic-blue">
                <FaSpinner className="animate-spin text-4xl drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-galactic-dark text-galactic-text font-sans py-10">
            {/* Branding Header */}
            <div className="mb-8 flex items-center space-x-3 animate-fade-in-up">
                <img src="/assets/logo.png" alt="AuthBoard Logo" className="h-12 w-auto drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                <span className="text-3xl font-bold tracking-tight font-['Orbitron'] text-transparent bg-clip-text bg-gradient-to-r from-galactic-blue to-galactic-silver">
                    AuthBoard
                </span>
            </div>

            <div className="w-full max-w-md bg-galactic-card/50 backdrop-blur-md border border-galactic-blue/20 p-8 rounded-xl shadow-2xl animate-fade-in-up delay-100">
                <h1 className="text-2xl font-bold text-center mb-2 text-white">Create Account</h1>
                <p className="text-center text-galactic-silver mb-8 text-sm">Join AuthBoard today</p>

                {(isError || passwordError) && (
                    <div className="bg-galactic-error/10 border border-galactic-error/50 text-galactic-error px-4 py-3 rounded relative mb-6 text-sm">
                        {message || passwordError}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-galactic-silver mb-2">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg bg-galactic-dark/50 border border-galactic-blue/30 text-white placeholder-galactic-text/30 focus:outline-none focus:ring-2 focus:ring-galactic-blue/50 focus:border-transparent transition-all"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-galactic-silver mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-lg bg-galactic-dark/50 border border-galactic-blue/30 text-white placeholder-galactic-text/30 focus:outline-none focus:ring-2 focus:ring-galactic-blue/50 focus:border-transparent transition-all"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-galactic-silver mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-lg bg-galactic-dark/50 border border-galactic-blue/30 text-white placeholder-galactic-text/30 focus:outline-none focus:ring-2 focus:ring-galactic-blue/50 focus:border-transparent transition-all"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Create a password"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-galactic-silver mb-2">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-lg bg-galactic-dark/50 border border-galactic-blue/30 text-white placeholder-galactic-text/30 focus:outline-none focus:ring-2 focus:ring-galactic-blue/50 focus:border-transparent transition-all"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm your password"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-galactic-blue to-galactic-secondary text-galactic-dark font-bold py-3 px-4 rounded-lg hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transform hover:scale-[1.02] transition-all duration-200"
                        >
                            Get Started
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-galactic-silver">
                    Already have an account?{' '}
                    <button onClick={() => navigate('/login')} className="text-galactic-blue hover:text-galactic-secondary font-semibold transition-colors">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
