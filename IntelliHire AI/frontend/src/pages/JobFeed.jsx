import React, { useEffect, useState } from 'react';
import { Search, Filter, SlidersHorizontal, Sparkles, MapPin, Clock, Star, Target, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import JobCard from '../components/JobCard';

const MultiInput = ({ icon: Icon, placeholder, listId, options = [], value = [], onChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag(inputValue);
        }
    };

    const addTag = (val) => {
        const trimmed = val.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
            setInputValue('');
        } else if (trimmed && value.includes(trimmed)) {
            setInputValue(''); // Clear duplicate
        }
    };

    const removeTag = (tag) => {
        onChange(value.filter(t => t !== tag));
    };

    const handleBlur = () => {
        if (inputValue.trim()) {
            addTag(inputValue);
        }
    };

    const handleSelect = (e) => {
        // When using datalist, onChange triggers. We need to check if the new value matches an option or if the user is just typing.
        // A simple heuristic: if the value is in the options list, treat it as a selection.
        const val = e.target.value;
        setInputValue(val);
        // We defer the 'add' to Enter or Blur to allow partial typing, EXCEPT if it's a direct click (hard to detect perfectly with just datalist).
        // For now, we'll stick to Enter/Blur for adding, or if the user explicitly clicks a suggestion it usually fills the input and they press enter or click away.
    };

    return (
        <div className="relative group w-full h-full">
            <Icon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-all group-hover:scale-110 z-10" />
            <div className={`w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-2 min-h-[60px] flex flex-wrap items-center gap-2 outline-none focus-within:ring-8 focus-within:ring-primary-500/10 focus-within:border-primary-500 transition-all shadow-sm group-hover:border-slate-300 cursor-text`} onClick={() => document.getElementById(`input-${listId}`).focus()}>
                {value.map(tag => (
                    <span key={tag} className="bg-primary-50 border border-primary-100 text-primary-700 px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 animate-in fade-in zoom-in duration-200 whitespace-nowrap">
                        {tag}
                        <button onClick={(e) => { e.stopPropagation(); removeTag(tag); }} className="hover:text-primary-900 p-0.5 hover:bg-primary-200 rounded-full transition-colors"><X size={10} /></button>
                    </span>
                ))}
                <input
                    id={`input-${listId}`}
                    type="text"
                    list={listId}
                    placeholder={value.length === 0 ? placeholder : ''}
                    value={inputValue}
                    onChange={handleSelect}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    className="flex-1 bg-transparent outline-none min-w-[80px] text-slate-900 font-bold placeholder:text-slate-400 text-sm py-1"
                />
            </div>
            <datalist id={listId}>
                {options.map((opt, idx) => (
                    <option key={`${listId}-${idx}`} value={opt} />
                ))}
            </datalist>
        </div>
    );
};

// Extracted Data Lists to avoid cluttering the render
const JOB_TITLES = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", "Software Engineer", "Data Scientist", "Product Manager", "UI/UX Designer", "DevOps Engineer", "Marketing Manager", "Sales Executive", "Accountant", "HR Manager",
    "Content Writer", "Graphics Designer", "Project Manager", "Mobile App Developer", "QA Engineer", "Data Analyst", "Digital Marketing Specialist", "Customer Support Representative", "Business Analyst", "Systems Administrator", "Network Engineer", "Security Analyst", "Database Administrator", "Cloud Architect",
    "Machine Learning Engineer", "AI Research Scientist", "Product Designer", "Social Media Manager", "SEO Specialist", "Copywriter", "Video Editor", "Architect", "Civil Engineer", "Mechanical Engineer", "Electrical Engineer", "Financial Analyst", "Lawyer", "Doctor", "Nurse", "Pharmacist", "Dentist",
    "Teacher", "Professor", "Researcher", "Laboratory Technician", "Chef", "Operations Manager", "Logistics Coordinator", "Supply Chain Analyst", "Sales Manager", "Account Manager", "Public Relations Specialist", "Event Planner", "Human Resources Specialist", "Recruiter", "Data Architect",
    "Embedded Systems Engineer", "Game Developer", "Technical Writer", "Solutions Architect", "IT Consultant", "Business Intelligence Developer", "Data Engineer", "Site Reliability Engineer", "Application Architect", "Mobile Developer", "iOS Developer", "Android Developer", "Web Designer", "Motion Graphics Artist",
    "Content Strategist", "Editor", "Proofreader", "Journalist", "Photographer", "Illustrator", "UI Designer", "UX Researcher", "Interaction Designer", "Visual Designer", "Brand Manager", "Market Researcher", "Financial Controller", "Auditor", "Tax Consultant", "Investment Banker", "Portfolio Manager",
    "Risk Analyst", "Compliance Officer", "Paralegal", "Legal Counsel", "Surgeon", "Veterinarian", "Optometrist", "Physiotherapist", "Psychotherapist", "Consultant", "Sales Strategy", "Customer Success", "Supply Chain", "Logistics", "HR Management", "Public Relations", "Medical Coding", "Legal Writing", "Financial Modeling"
];
const CITIES = [
    "Bangalore, India", "Mumbai, India", "Delhi, India", "Hyderabad, India", "Chennai, India", "Pune, India", "Kolkata, India", "Ahmedabad, India", "Jaipur, India", "Surat, India", "Lucknow, India", "Kanpur, India", "Nagpur, India", "Indore, India", "Thane, India", "Bhopal, India", "Visakhapatnam, India",
    "Pimpri-Chinchwad, India", "Patna, India", "Vadodara, India", "Ghaziabad, India", "Ludhiana, India", "Agra, India", "Nashik, India", "Faridabad, India", "Meerut, India", "Rajkot, India", "Kalyan-Dombivli, India", "Vasai-Virar, India", "Varanasi, India", "Srinagar, India", "Aurangabad, India", "Dhanbad, India",
    "Amritsar, India", "Navi Mumbai, India", "Allahabad, India", "Ranchi, India", "Haora, India", "Coimbatore, India", "Jabalpur, India", "Gwalior, India", "Vijayawada, India", "Jodhpur, India", "Madurai, India", "Raipur, India", "Kota, India", "Guwahati, India", "Chandigarh, India", "Solapur, India",
    "Hubballi-Dharwad, India", "Bareilly, India", "Moradabad, India", "Mysore, India", "Gurgaon, India", "Aligarh, India", "Jalandhar, India", "Tiruchirappalli, India", "Bhubaneswar, India", "Salem, India", "Mira-Bhayandar, India", "Thiruvananthapuram, India", "Bhiwandi, India", "Saharanpur, India",
    "Guntur, India", "Amravati, India", "Bikaner, India", "Noida, India", "Jamshedpur, India", "Bhilai, India", "Cuttack, India", "Firozabad, India", "Kochi, India", "Nellore, India", "Bhavnagar, India", "Dehradun, India", "Durgapur, India", "Asansol, India", "Rourkela, India", "Nanded, India", "Kolhapur, India",
    "Ajmer, India", "Akola, India", "Gulbarga, India", "Jamnagar, India", "Ujjain, India", "Loni, India", "Siliguri, India", "Jhansi, India", "Ulhasnagar, India", "Jammu, India", "Belgaum, India", "Tirunelveli, India", "Malegaon, India", "Gaya, India", "Ambattur, India", "Udaipur, India", "Kakinada, India",
    "New York, USA", "London, UK", "Tokyo, Japan", "Paris, France", "Berlin, Germany", "Toronto, Canada", "Sydney, Australia", "Singapore", "Dubai, UAE", "Remote"
];
const SKILLS = [
    "React", "Node.js", "Python", "Java", "SQL", "Excel", "Project Management", "Digital Marketing", "Salesforce", "JavaScript", "TypeScript", "C++", "C#", "AWS", "Azure", "Docker", "Kubernetes", "Git", "Figma", "Adobe XD", "Photoshop", "Illustrator", "Swift", "Kotlin", "Flutter", "React Native", "PHP",
    "Laravel", "Ruby on Rails", "Django", "Flask", "Express.js", "MongoDB", "PostgreSQL", "MySQL", "Redis", "GraphQL", "REST API", "Tailwind CSS", "Bootstrap", "Sass", "Webpack", "Babel", "Jenkins", "CI/CD", "Unit Testing", "Integration Testing", "TDD", "Agile", "Scrum", "Kanban", "SEO", "SEM",
    "Content Writing", "Copywriting", "Social Media Management", "Email Marketing", "Google Analytics", "Power BI", "Tableau", "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Data Analysis", "Data Visualization", "Statistics", "Probability", "R", "Matlab", "SAS", "AutoCAD", "SolidWorks",
    "Revit", "SketchUp", "3ds Max", "Blender", "Unreal Engine", "Unity", "Cybersecurity", "Networking", "Pen Testing", "Ethical Hacking", "Blockchain", "Solidity", "Smart Contracts", "Game Development", "VR/AR", "UI/UX Design", "Product Management", "Customer Success", "Sales Strategy", "Financial Modeling",
    "Accounting", "Legal Writing", "Medical Coding", "HR Management", "Public Relations", "Supply Chain", "Logistics", "Soft Skills", "Leadership", "Communication", "Problem Solving", "Critical Thinking", "Time Management", "Teamwork"
];

const JobFeed = () => {
    const { jobs, fetchJobs, loading, api } = useApp();
    // Search states (now arrays)
    const [roles, setRoles] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const [bestMatches, setBestMatches] = useState([]);
    const [filters, setFilters] = useState({
        jobType: 'any',
        workMode: 'any',
        datePosted: 'any',
        minScore: 'all'
    });

    useEffect(() => {
        handleSearch();
        fetchBestMatches();
    }, []);

    const fetchBestMatches = async () => {
        try {
            const res = await api.get('/jobs/best');
            setBestMatches(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        // Convert arrays to appropriate strings for the API
        // For Role: "Dev, Engineer" -> "Dev Engineer" (space separated often works for 'any of' in search engines, or comma)
        // Adzuna simple search takes 'what'. 
        const roleQuery = roles.join(' ');
        const locationQuery = locations.join(', '); // Adzuna might only take one, but let's try comma
        const skillsQuery = selectedSkills.join(',');

        fetchJobs({
            role: roleQuery,
            location: locationQuery,
            skills: skillsQuery,
            ...filters
        });
    };

    return (
        <div className="flex-1 lg:ml-64 xl:mr-96 pt-20 lg:pt-0 bg-[#f3f2ef]">
            <div className="max-w-4xl mx-auto p-4 lg:p-12">
                <header className="mb-12 relative">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                        <div className="w-16 h-16 bg-white rounded-[2rem] flex items-center justify-center shadow-xl border border-slate-100 group transition-all hover:scale-110 hover:shadow-2xl hover:border-primary-500/30">
                            <svg viewBox="0 0 24 24" className="w-10 h-10 text-primary-600 fill-current" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="currentColor" fillOpacity="0.2" />
                                <path d="M11.5 2L15 2L11 10L16 10L7 22L10 12L5 12L11.5 2Z" />
                            </svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-black uppercase text-primary-600 tracking-[0.3em]">Intelligent Explorer</span>
                                <div className="h-px w-12 bg-primary-600/30 hidden md:block"></div>
                            </div>
                            <h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-slate-900 via-primary-700 to-slate-900 bg-clip-text text-transparent uppercase tracking-tighter leading-none mt-2">Discovery Hub</h2>
                        </div>
                    </div>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">AI-calibrated job matching tailored to your unique professional profile. Find your next breakthrough across all industries.</p>
                </header>

                <div className="flex flex-col gap-8 mb-16">
                    {/* Suggested Categories */}
                    <div className="flex flex-wrap gap-2">
                        {['All Fields', 'Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Sales', 'Design'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => {
                                    if (cat === 'All Fields') {
                                        setRoles([]);
                                    } else {
                                        if (!roles.includes(cat)) setRoles([...roles, cat]);
                                    }
                                    // We don't auto-search here to allow user to add more if needed, or we could.
                                    // Let's not auto-search to be consistent with new multi-select UI.
                                }}
                                className={`px-5 py-2.5 border rounded-full text-sm font-bold transition-all shadow-sm active:scale-95 ${roles.includes(cat) ? 'bg-primary-600 text-white border-primary-600' : 'bg-white border-slate-200 text-slate-600 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-12 lg:col-span-5 relative group z-30">
                            <MultiInput
                                icon={Search}
                                placeholder="Search Roles..."
                                listId="job-titles"
                                options={JOB_TITLES}
                                value={roles}
                                onChange={setRoles}
                            />
                        </div>
                        <div className="md:col-span-12 lg:col-span-5 relative group z-20">
                            <MultiInput
                                icon={MapPin}
                                placeholder="Cities..."
                                listId="cities"
                                options={CITIES}
                                value={locations}
                                onChange={setLocations}
                            />
                        </div>
                        <div className="md:col-span-12 lg:col-span-2">
                            <button
                                onClick={handleSearch}
                                disabled={loading}
                                className="w-full h-full min-h-[60px] bg-primary-600 hover:bg-primary-700 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 hover:shadow-primary-600/40"
                            >
                                <Search className="w-5 h-5" />
                                <span className="text-base uppercase tracking-wider">Search</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Job Type', name: 'jobType', options: ['Any Type', 'Full-time', 'Part-time', 'Contract', 'Internship'] },
                            { label: 'Work Mode', name: 'workMode', options: ['Any Mode', 'Remote', 'Hybrid', 'On-site'] },
                            { label: 'Date Posted', name: 'datePosted', options: ['Any Time', '24h', 'week', 'month'] },
                            { label: 'Match Score', name: 'minScore', options: ['All Scores', 'High (>70%)', 'Medium (40-70%)'] }
                        ].map(f => (
                            <div key={f.name} className="space-y-2 group">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 transition-colors group-hover:text-primary-600">{f.label}</label>
                                <select
                                    name={f.name}
                                    value={filters[f.name]}
                                    onChange={handleFilterChange}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-bold outline-none focus:border-primary-500 shadow-sm transition-all hover:border-slate-300 cursor-pointer active:scale-[0.98]"
                                >
                                    {f.options.map(o => (
                                        <option key={o} value={o === 'Any Type' || o === 'Any Mode' || o === 'Any Time' || o === 'All Scores' ? 'any' : o.includes('High') ? 'high' : o.includes('Medium') ? 'medium' : o}>{o}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    <div className="relative group/skills z-10">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block">Skills Filter</label>
                        <MultiInput
                            icon={Sparkles}
                            placeholder="Required Skills (e.g. React, Node, Python)..."
                            listId="skills-list"
                            options={SKILLS}
                            value={selectedSkills}
                            onChange={setSelectedSkills}
                        />
                    </div>
                </div>

                {/* Best Matches Section */}
                {bestMatches.length > 0 && (
                    <section className="mb-16">
                        <div className="flex items-center gap-2 mb-6">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Best Matches</h3>
                            <div className="flex-1 h-px bg-slate-200 ml-4"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {bestMatches.map((job) => (
                                <JobCard key={`best-${job.jobId}`} job={job} isBestMatch={true} />
                            ))}
                        </div>
                    </section>
                )}

                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Recent Jobs</h3>
                    <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                <div className="space-y-6">
                    {loading ? (
                        <div className="flex justify-center p-20">
                            <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {jobs.map((job) => (
                                <JobCard key={job.jobId} job={job} />
                            ))}
                            {jobs.length === 0 && (
                                <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                                    <SlidersHorizontal className="w-16 h-16 mx-auto mb-6 text-slate-300" />
                                    <h3 className="text-xl font-bold text-slate-400 mb-2 uppercase tracking-tight">No matching jobs found</h3>
                                    <p className="text-slate-400 max-w-xs mx-auto text-sm font-medium">Try adjusting your filters to find more opportunities.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobFeed;
