import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { useToast } from '../context/ToastContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const { login, user, isLoading, isError, message } = useContext(AuthContext);
    const { showToast } = useToast();

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

    const onSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        const result = await login(userData);
        if (result.success) {
            // Toast will be shown, navigation happens via useEffect or we can do it here if useEffect is removed/refactored.
            // But existing useEffect handles navigation.
            // We just show toast.
            showToast(`Welcome back!`, 'success');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-galactic-dark text-galactic-blue">
                <FaSpinner className="animate-spin text-4xl drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-galactic-dark text-galactic-text font-sans">
            {/* Branding Header */}
            <div className="mb-8 flex items-center space-x-3 animate-fade-in-up">
                <img src="/assets/logo.png" alt="AuthBoard Logo" className="h-12 w-auto drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                <span className="text-3xl font-bold tracking-tight font-['Orbitron'] text-transparent bg-clip-text bg-gradient-to-r from-galactic-blue to-galactic-silver">
                    AuthBoard
                </span>
            </div>

            <div className="w-full max-w-md bg-galactic-card/50 backdrop-blur-md border border-galactic-blue/20 p-8 rounded-xl shadow-2xl animate-fade-in-up delay-100">
                <h1 className="text-2xl font-bold text-center mb-2 text-white">Welcome Back</h1>
                <p className="text-center text-galactic-silver mb-8 text-sm">Login to access your dashboard</p>

                {isError && (
                    <div className="bg-galactic-error/10 border border-galactic-error/50 text-galactic-error px-4 py-3 rounded relative mb-6 text-sm">
                        {message}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
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
                            placeholder="Enter password"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-galactic-blue to-galactic-secondary text-galactic-dark font-bold py-3 px-4 rounded-lg hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transform hover:scale-[1.02] transition-all duration-200"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-galactic-silver">
                    Don't have an account?{' '}
                    <button onClick={() => navigate('/register')} className="text-galactic-blue hover:text-galactic-secondary font-semibold transition-colors">
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
