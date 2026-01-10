import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import API from '../services/api';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes, FaSignOutAlt, FaUserCircle, FaCamera, FaLock, FaSpinner, FaExclamationTriangle, FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaBars, FaChartLine, FaHourglassHalf } from 'react-icons/fa';
import { useToast } from '../context/ToastContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
    const navigate = useNavigate();

    // Auth context
    const { user, updateProfile, logout, uploadPhoto, changePassword } = useContext(AuthContext);

    // Task State
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState(null);

    // Filter Search state
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Profile Edit State
    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const [profileName, setProfileName] = useState('');
    const [profileEmail, setProfileEmail] = useState('');

    // Change Password State
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { showToast } = useToast();

    // Analytics State
    const [viewMode, setViewMode] = useState('tasks'); // 'tasks' or 'analytics'
    const [analyticsData, setAnalyticsData] = useState(null);

    const toggleView = async (mode) => {
        if (mode === 'analytics') {
            setIsLoading(true);
            try {
                const response = await API.get('/analytics');
                setAnalyticsData(response.data);
                setViewMode('analytics');
            } catch (error) {
                console.error(error);
                showToast('Failed to load analytics', 'error');
            }
            setIsLoading(false);
        } else {
            setViewMode('tasks');
        }
    };

    useEffect(() => {
        if (user) {
            setProfileName(user.name);
            setProfileEmail(user.email);
            fetchTasks();
        }
    }, [user]);

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const response = await API.get('/tasks');
            setTasks(response.data);
            setIsError(false);
        } catch (error) {
            setIsError(true);
            setMessage(error.message);
        }
        setIsLoading(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!title) return;

        try {
            if (editingId) {
                const response = await API.put(`/tasks/${editingId}`, { title, description });
                setTasks(tasks.map(t => t._id === editingId ? response.data : t));
                setEditingId(null);
            } else {
                const response = await API.post('/tasks', { title, description });
                setTasks([...tasks, response.data]);
                showToast('Task created successfully', 'success');
            }
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error(error);
            showToast(error.message, 'error');
        }
    };

    const onDelete = async (id) => {
        // We can use a custom modal here too, but for now let's use toast for result
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await API.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t._id !== id));
            showToast('Task deleted', 'info');
        } catch (error) {
            console.error(error);
            showToast('Failed to delete task', 'error');
        }
    };

    const onEdit = (task) => {
        setEditingId(task._id);
        setTitle(task.title);
        setDescription(task.description);
    };

    const onCancelEdit = () => {
        setEditingId(null);
        setTitle('');
        setDescription('');
    };

    const toggleStatus = async (task) => {
        // Cycle: Pending -> In Progress -> Completed -> Pending
        let newStatus = 'pending';
        if (task.status === 'pending') newStatus = 'in-progress';
        else if (task.status === 'in-progress') newStatus = 'completed';
        else newStatus = 'pending';

        try {
            const response = await API.put(`/tasks/${task._id}`, { status: newStatus });
            setTasks(tasks.map(t => t._id === task._id ? response.data : t));
            showToast(`Task marked as ${newStatus}`, 'success');
        } catch (error) {
            console.error(error);
            showToast('Failed to update status', 'error');
        }
    };

    const setStatus = async (task, status) => {
        try {
            const response = await API.put(`/tasks/${task._id}`, { status });
            setTasks(tasks.map(t => t._id === task._id ? response.data : t));
            showToast(`Task marked as ${status}`, 'success');
        } catch (error) {
            console.error(error);
            showToast('Failed to update status', 'error');
        }
    };


    const onProfileUpdate = async (e) => {
        e.preventDefault();
        const result = await updateProfile({ name: profileName, email: profileEmail });
        if (result.success) {
            setShowProfileEdit(false);
            showToast('Profile updated!', 'success');
        } else {
            showToast(result.message, 'error');
        }
    };

    const onPhotoUpload = async (e) => {
        const file = e.target.files[0];
        console.log('Selected file:', file);
        if (!file) return;

        const formData = new FormData();
        formData.append('photo', file);

        const result = await uploadPhoto(formData);
        if (!result.success) {
            showToast(result.message, 'error');
        } else {
            showToast('Photo uploaded!', 'success');
        }
    };

    const onChangePassword = async (e) => {
        e.preventDefault();
        const result = await changePassword(passwordData);
        if (result.success) {
            showToast('Password changed successfully', 'success');
            setShowChangePassword(false);
            setPasswordData({ oldPassword: '', newPassword: '' });
        } else {
            showToast(result.message, 'error');
        }
    };

    const onLogout = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        navigate('/');
        setTimeout(() => {
            logout();
            showToast('Logged out successfully', 'info');
        }, 100);
    };

    // Filter Logic
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-galactic-dark text-galactic-blue">
                <FaSpinner className="animate-spin text-4xl drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-galactic-dark text-galactic-text font-sans overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed md:static inset-y-0 left-0 z-30 w-80 bg-galactic-card/90 md:bg-galactic-card/40 backdrop-blur-xl border-r border-galactic-blue/20 flex flex-col shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                {/* Brand */}
                <div className="p-8 flex items-center space-x-3 border-b border-galactic-blue/10 cursor-pointer" onClick={() => navigate('/')}>
                    <img src="/assets/logo.png" alt="AuthBoard Logo" className="h-10 w-auto drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                    <span className="text-2xl font-bold tracking-tight font-['Orbitron'] text-transparent bg-clip-text bg-gradient-to-r from-galactic-blue to-galactic-silver">
                        AuthBoard
                    </span>
                </div>

                {/* Profile Section (In Sidebar) */}
                <div className="p-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-galactic-blue/20">
                    <div className="bg-galactic-dark/40 rounded-xl p-6 border border-galactic-blue/10 shadow-inner mb-6 relative group">
                        <div className="flex flex-col items-center text-center">
                            {/* Profile Photo */}
                            <div className="relative w-24 h-24 mb-4">
                                <div className="w-full h-full rounded-full bg-gradient-to-tr from-galactic-blue to-galactic-secondary p-[2px] shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                                    <div className="w-full h-full rounded-full bg-galactic-dark overflow-hidden flex items-center justify-center">
                                        {user?.profilePhoto ? (
                                            <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <FaUserCircle className="text-5xl text-galactic-silver" />
                                        )}
                                    </div>
                                </div>
                                {/* Upload Icon */}
                                <label className="absolute bottom-0 right-0 bg-galactic-blue text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition shadow-lg transform hover:scale-110">
                                    <FaCamera size={14} />
                                    <input type="file" className="hidden" onChange={onPhotoUpload} accept="image/*" />
                                </label>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">{user?.name}</h3>
                            <p className="text-xs text-galactic-silver break-all mb-4 px-2">{user?.email}</p>

                            <div className="flex flex-wrap gap-2 justify-center w-full">
                                <button
                                    onClick={() => setShowProfileEdit(!showProfileEdit)}
                                    className="text-xs bg-galactic-blue/10 hover:bg-galactic-blue/30 text-galactic-blue border border-galactic-blue/30 px-3 py-1.5 rounded-md transition-all flex-1"
                                >
                                    {showProfileEdit ? 'Cancel Edit' : 'Edit Profile'}
                                </button>
                                <button
                                    onClick={() => setShowChangePassword(true)}
                                    className="text-xs bg-galactic-secondary/10 hover:bg-galactic-secondary/30 text-galactic-secondary border border-galactic-secondary/30 px-3 py-1.5 rounded-md transition-all flex-1 flex items-center justify-center gap-1"
                                >
                                    <FaLock size={10} /> Password
                                </button>
                            </div>
                        </div>

                        {/* Inline Profile Edit */}
                        {showProfileEdit && (
                            <form onSubmit={onProfileUpdate} className="mt-4 pt-4 border-t border-galactic-blue/10 flex flex-col gap-3 animate-fade-in-up">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="bg-galactic-dark border border-galactic-blue/20 text-white text-sm p-2 rounded focus:ring-1 focus:ring-galactic-blue outline-none"
                                    value={profileName}
                                    onChange={(e) => setProfileName(e.target.value)}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="bg-galactic-dark border border-galactic-blue/20 text-white text-sm p-2 rounded focus:ring-1 focus:ring-galactic-blue outline-none"
                                    value={profileEmail}
                                    onChange={(e) => setProfileEmail(e.target.value)}
                                />
                                <button type="submit" className="bg-galactic-blue hover:bg-blue-600 text-white text-sm py-2 rounded shadow-md transition-colors">
                                    Save Changes
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="space-y-2">
                        <div
                            onClick={() => toggleView('tasks')}
                            className={`px-4 py-3 rounded-lg font-medium border-l-2 cursor-pointer flex items-center gap-3 transition-colors ${viewMode === 'tasks' ? 'bg-galactic-blue/10 text-white border-galactic-blue' : 'text-galactic-silver border-transparent hover:bg-white/5 hover:text-white'}`}
                        >
                            <FaCheck /> <span>My Tasks</span>
                        </div>
                        <div
                            onClick={() => toggleView('analytics')}
                            className={`px-4 py-3 rounded-lg font-medium border-l-2 cursor-pointer flex items-center gap-3 transition-colors ${viewMode === 'analytics' ? 'bg-galactic-blue/10 text-white border-galactic-blue' : 'text-galactic-silver border-transparent hover:bg-white/5 hover:text-white'}`}
                        >
                            <FaChartLine /> <span>Analytics</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar Footer */}
                <div className="p-6 border-t border-galactic-blue/10 bg-galactic-dark/20 text-center">
                    <button
                        onClick={onLogout}
                        className="flex items-center justify-center gap-2 w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 py-3 rounded-lg border border-red-500/20 transition-all duration-200 group mb-4"
                    >
                        <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
                        <span>Log Out</span>
                    </button>
                    <div className="text-xs text-galactic-silver/50 pt-2">
                        <p className="font-semibold">AuthBoard v1.0.0</p>
                        <p className="mt-1 hover:text-galactic-blue cursor-pointer transition-colors">Contact Support</p>
                    </div>
                </div>
            </aside>

            {/* Logout Confirm Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-galactic-card border border-red-500/30 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center">
                        <FaExclamationTriangle className="text-5xl text-red-500 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                        <h2 className="text-2xl font-bold text-white mb-2">Log Out?</h2>
                        <p className="text-gray-400 mb-6">Are you sure you want to end your session?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="px-6 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-600 text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-lg transition-transform hover:scale-105"
                            >
                                Yes, Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Change Password Modal */}
            {showChangePassword && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-galactic-card border border-galactic-blue/30 p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
                        <button onClick={() => setShowChangePassword(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            <FaTimes size={20} />
                        </button>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <FaLock className="text-galactic-secondary" /> Change Password
                        </h2>
                        <form onSubmit={onChangePassword} className="space-y-4">
                            <div>
                                <label className="block text-sm text-galactic-silver mb-1">Current Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-galactic-dark/60 border border-galactic-blue/30 text-white p-3 rounded-lg focus:ring-2 focus:ring-galactic-secondary/50 outline-none"
                                    value={passwordData.oldPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-galactic-silver mb-1">New Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-galactic-dark/60 border border-galactic-blue/30 text-white p-3 rounded-lg focus:ring-2 focus:ring-galactic-secondary/50 outline-none"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-galactic-blue to-galactic-secondary text-galactic-dark font-bold py-3 rounded-lg hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition transform hover:scale-[1.02]">
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                {/* Header for Mobile / Title */}
                <header className="px-8 py-6 mb-2 flex justify-between items-center z-10">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-white hover:text-galactic-blue transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <FaBars size={24} />
                        </button>
                        <h1 className="text-3xl font-bold text-white drop-shadow-md">Dashboard</h1>
                    </div>
                    <div className="text-galactic-secondary text-base font-['Orbitron'] border-l border-galactic-blue/20 pl-4 hidden md:block drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto px-8 pb-12 z-10 scrollbar-thin scrollbar-thumb-galactic-blue/30 scrollbar-track-transparent">

                    {viewMode === 'tasks' ? (
                        <>
                            {/* Search & Filter */}
                            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-galactic-card/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                                <div className="relative w-full md:w-1/3">
                                    <input
                                        type="text"
                                        placeholder="Search tasks..."
                                        className="w-full bg-galactic-dark/60 border border-galactic-blue/30 text-white pl-4 pr-10 py-2.5 rounded-lg focus:ring-2 focus:ring-galactic-blue/50 outline-none placeholder-galactic-text/30"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="flex gap-4 w-full md:w-auto">
                                    <select
                                        className="bg-galactic-dark/60 border border-galactic-blue/30 text-white px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-galactic-blue/50 outline-none cursor-pointer"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="all" className="bg-galactic-dark text-white">All Tasks</option>
                                        <option value="pending" className="bg-galactic-dark text-white">Pending</option>
                                        <option value="completed" className="bg-galactic-dark text-white">Completed</option>
                                    </select>
                                </div>
                            </div>

                            {/* Task Form */}
                            <div className="bg-gradient-to-br from-galactic-card/60 to-galactic-dark/80 border border-galactic-blue/20 p-6 rounded-2xl shadow-xl mb-10 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-galactic-blue to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                                    {editingId ? <span className="text-galactic-secondary">Edit Task</span> : <span className="text-galactic-blue">Create New Task</span>}
                                </h2>
                                <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4">
                                    <input
                                        type="text"
                                        placeholder="What needs to be done?"
                                        className="bg-galactic-dark/80 border border-galactic-blue/30 text-white p-3.5 rounded-xl flex-1 focus:ring-2 focus:ring-galactic-blue/50 outline-none placeholder-galactic-text/30 shadow-inner"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Description (Optional)"
                                        className="bg-galactic-dark/80 border border-galactic-blue/30 text-white p-3.5 rounded-xl flex-1 focus:ring-2 focus:ring-galactic-blue/50 outline-none placeholder-galactic-text/30 shadow-inner"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                        <button type="submit" className="bg-gradient-to-r from-galactic-blue to-galactic-secondary text-galactic-dark font-bold px-8 py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition flex items-center transform hover:scale-105 active:scale-95">
                                            {editingId ? <FaCheck className="mr-2" /> : <FaPlus className="mr-2" />}
                                            {editingId ? 'Update' : 'Add Task'}
                                        </button>
                                        {editingId && (
                                            <button type="button" onClick={onCancelEdit} className="bg-gray-700/50 text-white px-5 py-3.5 rounded-xl hover:bg-gray-600 transition border border-white/10">
                                                <FaTimes />
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* Task List Grid */}
                            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                                {filteredTasks.length > 0 ? filteredTasks.map(task => (
                                    <div key={task._id} className={`relative bg-galactic-card/30 backdrop-blur-sm p-6 rounded-2xl border ${task.status === 'completed' ? 'border-green-500/30 bg-green-900/5' : 'border-galactic-blue/30 hover:border-galactic-blue/60'} hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 group`}>
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col gap-1">
                                                    <button onClick={() => setStatus(task, 'completed')} className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200 ${task.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-700/50 text-gray-400 hover:bg-green-500/20 hover:text-green-400'}`} title="Mark Completed">
                                                        <FaCheck className={task.status === 'completed' ? 'opacity-100' : 'opacity-30 hover:opacity-100'} size={12} />
                                                    </button>
                                                    <button onClick={() => setStatus(task, 'in-progress')} className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200 ${task.status === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-gray-700/50 text-gray-400 hover:bg-blue-500/20 hover:text-blue-400'}`} title="Mark In Progress">
                                                        <FaHourglassHalf className={task.status === 'in-progress' ? 'opacity-100 animate-pulse' : 'opacity-30 hover:opacity-100'} size={10} />
                                                    </button>
                                                </div>
                                                <div>
                                                    <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-white'}`}>{task.title}</h3>
                                                    <p className="text-gray-400 text-sm">{task.description}</p>
                                                    <div className="mt-2 space-y-1">
                                                        <div className="text-xs text-galactic-silver/60">
                                                            Created: {new Date(task.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                        {task.completedAt && (
                                                            <div className="text-xs text-green-400/80">
                                                                Completed: {new Date(task.completedAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                        )}
                                                        <span className={`text-xs px-2 py-1 rounded border inline-block mt-1 ${task.status === 'completed'
                                                            ? 'bg-green-900/30 border-green-500/30 text-green-400'
                                                            : task.status === 'in-progress'
                                                                ? 'bg-blue-900/30 border-blue-500/30 text-blue-400'
                                                                : 'bg-galactic-secondary/10 border-galactic-secondary/30 text-galactic-secondary'}`}>
                                                            {task.status === 'completed' ? 'Completed' : task.status === 'in-progress' ? 'In Progress' : 'Pending'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-galactic-dark/80 rounded-lg p-1 border border-white/10 backdrop-blur-md">
                                                <button onClick={() => onEdit(task)} className="p-2 text-galactic-secondary hover:text-white hover:bg-white/10 rounded-md transition-colors" title="Edit">
                                                    <FaEdit />
                                                </button>
                                                <button onClick={() => onDelete(task._id)} className="p-2 text-red-400 hover:text-red-200 hover:bg-white/10 rounded-md transition-colors" title="Delete">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-full flex flex-col items-center justify-center py-24 border-2 border-dashed border-galactic-blue/10 rounded-3xl bg-galactic-card/10">
                                        <div className="w-16 h-16 bg-galactic-blue/20 rounded-full flex items-center justify-center mb-4 text-galactic-blue text-2xl animate-pulse">
                                            <FaPlus />
                                        </div>
                                        <p className="text-galactic-silver text-lg font-medium">No tasks found</p>
                                        <p className="text-galactic-silver/50 text-sm">Create a new task to get started!</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="space-y-8 animate-fade-in-up md:px-4">
                            {analyticsData ? (
                                <>
                                    {/* Summary Cards */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-galactic-card/40 border border-galactic-blue/20 p-6 rounded-2xl backdrop-blur-sm shadow-lg hover:border-galactic-blue/40 transition-colors">
                                            <h3 className="text-galactic-silver text-sm font-medium">Total Tasks</h3>
                                            <p className="text-3xl font-bold text-white mt-2 font-['Orbitron']">{analyticsData.summary.total}</p>
                                        </div>
                                        <div className="bg-galactic-card/40 border border-galactic-blue/20 p-6 rounded-2xl backdrop-blur-sm shadow-lg hover:border-galactic-blue/40 transition-colors">
                                            <h3 className="text-galactic-silver text-sm font-medium">Pending</h3>
                                            <p className="text-3xl font-bold text-yellow-400 mt-2 font-['Orbitron']">{analyticsData.summary.pending}</p>
                                        </div>
                                        <div className="bg-galactic-card/40 border border-galactic-blue/20 p-6 rounded-2xl backdrop-blur-sm shadow-lg hover:border-galactic-blue/40 transition-colors">
                                            <h3 className="text-galactic-silver text-sm font-medium">In Progress</h3>
                                            <p className="text-3xl font-bold text-blue-400 mt-2 font-['Orbitron']">{analyticsData.summary.inProgress}</p>
                                        </div>
                                        <div className="bg-galactic-card/40 border border-galactic-blue/20 p-6 rounded-2xl backdrop-blur-sm shadow-lg hover:border-galactic-blue/40 transition-colors">
                                            <h3 className="text-galactic-silver text-sm font-medium">Completed</h3>
                                            <p className="text-3xl font-bold text-green-400 mt-2 font-['Orbitron']">{analyticsData.summary.completed}</p>
                                        </div>
                                    </div>

                                    {/* Charts Area */}
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {/* Line Chart */}
                                        <div className="bg-galactic-card/30 border border-galactic-blue/20 p-6 rounded-2xl backdrop-blur-sm min-h-[400px] shadow-lg">
                                            <h3 className="text-white font-semibold mb-6 flex items-center gap-2 border-b border-galactic-blue/10 pb-4">
                                                <span className="w-1.5 h-6 bg-galactic-blue rounded-full"></span>
                                                Completion Trend (Last 7 Days)
                                            </h3>
                                            <div className="h-[300px] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={analyticsData.completionTrend}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                                        <XAxis
                                                            dataKey="date"
                                                            stroke="#94a3b8"
                                                            fontSize={11}
                                                            tickLine={false}
                                                            axisLine={false}
                                                        />
                                                        <YAxis
                                                            stroke="#94a3b8"
                                                            fontSize={11}
                                                            tickLine={false}
                                                            axisLine={false}
                                                        />
                                                        <Tooltip
                                                            contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(56,189,248,0.3)', borderRadius: '8px', color: '#fff' }}
                                                            itemStyle={{ color: '#e5e7eb' }}
                                                            cursor={{ stroke: 'rgba(56,189,248,0.2)', strokeWidth: 2 }}
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="count"
                                                            stroke="#38bdf8"
                                                            strokeWidth={3}
                                                            dot={{ r: 4, fill: '#111827', stroke: '#38bdf8', strokeWidth: 2 }}
                                                            activeDot={{ r: 6, fill: '#38bdf8' }}
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        {/* Pie Chart */}
                                        <div className="bg-galactic-card/30 border border-galactic-blue/20 p-6 rounded-2xl backdrop-blur-sm min-h-[400px] shadow-lg">
                                            <h3 className="text-white font-semibold mb-6 flex items-center gap-2 border-b border-galactic-blue/10 pb-4">
                                                <span className="w-1.5 h-6 bg-galactic-secondary rounded-full"></span>
                                                Status Distribution
                                            </h3>
                                            <div className="h-[300px] w-full flex items-center justify-center">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={analyticsData.statusDistribution}
                                                            cx="50%"
                                                            cy="50%"
                                                            innerRadius={60}
                                                            outerRadius={100}
                                                            paddingAngle={5}
                                                            dataKey="value"
                                                            stroke="none"
                                                        >
                                                            <Cell fill="#FBBF24" /> {/* Pending - Yellow */}
                                                            <Cell fill="#60A5FA" /> {/* In Progress - Blue */}
                                                            <Cell fill="#4ADE80" /> {/* Completed - Green */}
                                                        </Pie>
                                                        <Tooltip
                                                            contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(56,189,248,0.3)', borderRadius: '8px' }}
                                                            itemStyle={{ color: '#fff' }}
                                                        />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                            <div className="flex justify-center gap-6 mt-4">
                                                <div className="flex items-center gap-2 text-xs text-galactic-silver"><div className="w-3 h-3 rounded-full bg-yellow-400"></div> Pending</div>
                                                <div className="flex items-center gap-2 text-xs text-galactic-silver"><div className="w-3 h-3 rounded-full bg-blue-400"></div> In Progress</div>
                                                <div className="flex items-center gap-2 text-xs text-galactic-silver"><div className="w-3 h-3 rounded-full bg-green-400"></div> Completed</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recent Tasks Table */}
                                    <div className="bg-galactic-card/30 border border-galactic-blue/20 rounded-2xl backdrop-blur-sm overflow-hidden shadow-lg">
                                        <div className="p-6 border-b border-galactic-blue/10 bg-galactic-card/40">
                                            <h3 className="text-white font-semibold flex items-center gap-2">
                                                <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                                                Recent Activity (Top 10)
                                            </h3>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-galactic-blue/10 text-xs uppercase tracking-wider text-galactic-silver/60">
                                                        <th className="px-6 py-4 font-semibold">Task</th>
                                                        <th className="px-6 py-4 font-semibold">Status</th>
                                                        <th className="px-6 py-4 font-semibold text-right">Last Updated</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-galactic-blue/5">
                                                    {analyticsData.recentTasks.map(task => (
                                                        <tr key={task._id} className="hover:bg-white/5 transition-colors group">
                                                            <td className="px-6 py-4 text-white font-medium group-hover:text-galactic-blue transition-colors">{task.title}</td>
                                                            <td className="px-6 py-4">
                                                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border inline-block ${task.status === 'completed' ? 'bg-green-900/30 border-green-500/30 text-green-400' : task.status === 'in-progress' ? 'bg-blue-900/30 border-blue-500/30 text-blue-400' : 'bg-yellow-900/30 border-yellow-500/30 text-yellow-400'}`}>
                                                                    {task.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-galactic-silver text-sm text-right font-mono">
                                                                {new Date(task.updatedAt).toLocaleDateString()} <span className="text-xs opacity-50">{new Date(task.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col justify-center items-center h-64 text-galactic-silver animate-pulse">
                                    <FaSpinner className="animate-spin text-3xl mb-4 text-galactic-blue" />
                                    <p>Loading System Analytics...</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Dashboard Footer */}
                    <footer className="mt-16 py-8 border-t border-galactic-blue/10 bg-galactic-card/30 backdrop-blur-md text-center animate-fade-in-up delay-300">
                        <div className="flex flex-col items-center gap-4">
                            <p className="flex items-center gap-2 text-galactic-silver/60 text-sm">
                                Made with <FaHeart className="text-red-500 animate-pulse" /> by <span className="text-white font-semibold">Bharath Kumar K</span>
                            </p>
                            <div className="flex gap-6">
                                <a href="https://github.com/Bharath-Kumar-K-0930" target="_blank" rel="noopener noreferrer" className="text-galactic-silver/60 hover:text-white transition-transform hover:scale-110"><FaGithub size={20} /></a>
                                <a href="https://www.linkedin.com/in/bharath-kumar-k-b35ba0304" target="_blank" rel="noopener noreferrer" className="text-galactic-silver/60 hover:text-blue-400 transition-transform hover:scale-110"><FaLinkedin size={20} /></a>
                                <a href="mailto:bharathkumarkbk10@gmail.com" className="text-galactic-silver/60 hover:text-red-400 transition-transform hover:scale-110"><FaEnvelope size={20} /></a>
                            </div>
                            <p className="text-xs text-galactic-silver/30">© 2026 AuthBoard. Secure Task Management.</p>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
