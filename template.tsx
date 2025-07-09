// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
const App: React.FC = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoveredElement, setHoveredElement] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("home");
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showVRModal, setShowVRModal] = useState(false);
    const [panoramaPosition, setPanoramaPosition] = useState({ x: 0, y: 0 });
    const [isVRMode, setIsVRMode] = useState(false);
    const [zoom, setZoom] = useState(1);

    // Add shine effect animation
    const ShineEffect: React.FC = () => (
        <div className="absolute -inset-[500px] animate-[spin_15s_linear_infinite] opacity-20">
            <div className="absolute top-1/2 left-1/2 w-[1000px] h-[200px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent rotate-45"></div>
            <div className="absolute top-1/2 left-1/2 w-[1000px] h-[200px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -rotate-45"></div>
        </div>
    );
    const handlePanoramaMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.buttons === 1) {
            setPanoramaPosition((prev) => ({
                x: prev.x + e.movementX,
                y: prev.y + e.movementY,
            }));
        }
    };
    const handleZoom = (delta: number) => {
        setZoom((prev) => Math.min(Math.max(0.5, prev + delta * 0.1), 2));
    };
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    const handleMouseEnter = (element: string) => {
        setHoveredElement(element);
    };
    const handleMouseLeave = () => {
        setHoveredElement(null);
    };
    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]"></div>
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
            </div>
            {/* Custom cursor */}
            <div
                className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
                style={{
                    left: `${cursorPosition.x}px`,
                    top: `${cursorPosition.y}px`,
                    transform: "translate(-50%, -50%)",
                    transition: "width 0.3s, height 0.3s, background-color 0.3s",
                    backgroundColor:
                        hoveredElement === "button" ? "white" : "transparent",
                    border:
                        hoveredElement === "button"
                            ? "none"
                            : "2px solid rgba(255, 255, 255, 0.7)",
                }}
            >
                {hoveredElement === "text" && (
                    <div className="absolute h-16 w-0.5 bg-white left-1/2 transform -translate-x-1/2"></div>
                )}
            </div>
            {/* Background gradient effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-900/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
                <div className="absolute -top-[30%] -right-[20%] w-[80%] h-[80%] rounded-full bg-blue-900/10 blur-3xl"></div>
                <div className="absolute -bottom-[30%] -left-[20%] w-[80%] h-[80%] rounded-full bg-blue-900/10 blur-3xl"></div>
            </div>
            {/* Main content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-6">
                {/* Header */}
                <header className="relative mb-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 animate-pulse"></div>
                    <div className="backdrop-blur-xl bg-black/40 rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10"></div>
                        <ShineEffect />
                        <div className="relative flex flex-wrap items-center justify-between gap-8">
                            <div className="flex items-center gap-8">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent blur-xl"></div>
                                    <h1
                                        className="relative text-4xl md:text-5xl text-white font-light tracking-wider"
                                        onMouseEnter={() => handleMouseEnter("text")}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        Flik
                                    </h1>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div
                                        className="text-white/90 text-sm backdrop-blur-xl bg-white/5 rounded-2xl px-6 py-3 border border-white/10"
                                        onMouseEnter={() => handleMouseEnter("text")}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <p className="opacity-70">Based in</p>
                                        <p className="font-medium">New Zealand</p>
                                    </div>
                                    <div
                                        className="text-white/90 text-sm backdrop-blur-xl bg-white/5 rounded-2xl px-6 py-3 border border-white/10"
                                        onMouseEnter={() => handleMouseEnter("text")}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <p className="opacity-70">Local time</p>
                                        <p className="font-medium">
                                            {new Date().toLocaleTimeString("en-US", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div
                                    className="text-white/90 backdrop-blur-xl bg-white/5 rounded-2xl px-6 py-3 border border-white/10"
                                    onMouseEnter={() => handleMouseEnter("text")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <p className="text-2xl font-medium">250K</p>
                                    <p className="text-sm opacity-70">@flikvisuals</p>
                                </div>

                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-transparent to-emerald-500/20 blur-md group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                                        <img
                                            src="https://readdy.ai/api/search-image?query=modern%203D%20designer%20working%20with%20Unreal%20Engine%2C%20professional%20portrait%2C%20dark%20studio%20lighting%2C%20minimalist%20style%2C%20high-end%20photography%2C%20neutral%20background%2C%20professional%20attire%2C%20focused%20expression&width=200&height=200&seq=1&orientation=squarish"
                                            alt="Designer"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* Navigation */}
                <nav className="flex justify-center mb-16">
                    <div className="backdrop-blur-md bg-black/20 rounded-full p-1">
                        <ul className="flex space-x-2">
                            {["Product", "UI", "UX", "AI"].map((item) => (
                                <li key={item}>
                                    <button
                                        className={`px-6 py-3 rounded-full text-white/80 hover:text-white transition-colors !rounded-button whitespace-nowrap cursor-pointer ${activeTab === item.toLowerCase() ? "bg-white/5" : ""
                                            }`}
                                        onClick={() => setActiveTab(item.toLowerCase())}
                                        onMouseEnter={() => handleMouseEnter("button")}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
                {/* Hero Section */}
                <section className="mb-24">
                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                        <div className="lg:w-1/2">
                            <div className="backdrop-blur-md bg-black/30 rounded-3xl p-8 border border-white/10">
                                <h2
                                    className="text-4xl md:text-5xl lg:text-6xl text-white font-light mb-6 leading-tight"
                                    onMouseEnter={() => handleMouseEnter("text")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Redefining Real Estate Visualization with Unreal Engine 5
                                </h2>
                                <p
                                    className="text-white/70 text-lg mb-8"
                                    onMouseEnter={() => handleMouseEnter("text")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    We create photorealistic 3D visualizations and immersive
                                    experiences that transform how people interact with
                                    architectural spaces. Our cutting-edge technology brings
                                    unbuilt environments to life with unprecedented detail and
                                    realism.
                                </p>
                                <button
                                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20 !rounded-button whitespace-nowrap cursor-pointer"
                                    onMouseEnter={() => handleMouseEnter("button")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Explore Our Portfolio
                                </button>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="backdrop-blur-md bg-black/20 rounded-3xl overflow-hidden border border-white/10 aspect-[4/3]">
                                <img
                                    src="https://readdy.ai/api/search-image?query=photorealistic%20architectural%20visualization%20of%20a%20luxury%20modern%20home%20interior%20with%20large%20windows%2C%20created%20in%20Unreal%20Engine%205%2C%20cinematic%20lighting%2C%20ultra-detailed%20materials%2C%20ray%20tracing%20effects%2C%20professional%203D%20rendering%2C%20architectural%20showcase%20quality&width=800&height=600&seq=2&orientation=landscape"
                                    alt="Unreal Engine Visualization"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* Featured Projects */}
                <section className="mb-24">
                    <div className="backdrop-blur-md bg-black/30 rounded-3xl p-8 border border-white/10 mb-8">
                        <h3
                            className="text-3xl text-white font-light mb-2"
                            onMouseEnter={() => handleMouseEnter("text")}
                            onMouseLeave={handleMouseLeave}
                        >
                            Featured Projects
                        </h3>
                        <p
                            className="text-white/70"
                            onMouseEnter={() => handleMouseEnter("text")}
                            onMouseLeave={handleMouseLeave}
                        >
                            Explore our latest architectural visualizations created with
                            Unreal Engine 5
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Oceanfront Villa",
                                location: "Auckland",
                                image:
                                    "https://readdy.ai/api/search-image?query=photorealistic%20architectural%20visualization%20of%20a%20modern%20oceanfront%20villa%20with%20infinity%20pool%2C%20sunset%20lighting%2C%20created%20in%20Unreal%20Engine%205%2C%20cinematic%20quality%2C%20architectural%20visualization%2C%20professional%203D%20rendering%20with%20realistic%20materials%20and%20lighting&width=600&height=400&seq=3&orientation=landscape",
                            },
                            {
                                title: "Urban Loft",
                                location: "Wellington",
                                image:
                                    "https://readdy.ai/api/search-image?query=photorealistic%20architectural%20visualization%20of%20a%20modern%20urban%20loft%20interior%20with%20industrial%20elements%2C%20large%20windows%2C%20created%20in%20Unreal%20Engine%205%2C%20cinematic%20lighting%2C%20ultra-detailed%20materials%2C%20professional%203D%20rendering%2C%20architectural%20showcase%20quality&width=600&height=400&seq=4&orientation=landscape",
                            },
                            {
                                title: "Hillside Retreat",
                                location: "Queenstown",
                                image:
                                    "https://readdy.ai/api/search-image?query=photorealistic%20architectural%20visualization%20of%20a%20modern%20mountain%20retreat%20with%20glass%20walls%2C%20snowy%20landscape%2C%20created%20in%20Unreal%20Engine%205%2C%20cinematic%20lighting%2C%20ultra-detailed%20materials%2C%20professional%203D%20rendering%2C%20architectural%20showcase%20quality&width=600&height=400&seq=5&orientation=landscape",
                            },
                        ].map((project, index) => (
                            <div
                                key={index}
                                className="backdrop-blur-md bg-black/30 rounded-3xl overflow-hidden border border-white/10 group cursor-pointer"
                                onMouseEnter={() => handleMouseEnter("button")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="relative aspect-[3/2] overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <h4 className="text-xl text-white font-medium">
                                            {project.title}
                                        </h4>
                                        <p className="text-white/70">{project.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* Interactive Panorama Viewer */}
                <section className="mb-24">
                    <div className="backdrop-blur-md bg-black/30 rounded-3xl p-8 border border-white/10 mb-8">
                        <h3
                            className="text-3xl text-white font-light mb-2"
                            onMouseEnter={() => handleMouseEnter("text")}
                            onMouseLeave={handleMouseLeave}
                        >
                            Interactive Experience
                        </h3>
                        <p
                            className="text-white/70"
                            onMouseEnter={() => handleMouseEnter("text")}
                            onMouseLeave={handleMouseLeave}
                        >
                            Explore our virtual spaces with our interactive 360° panorama
                            viewer
                        </p>
                    </div>
                    <div className="backdrop-blur-md bg-black/20 rounded-3xl overflow-hidden border border-white/10 aspect-[16/9] relative">
                        <img
                            src="https://readdy.ai/api/search-image?query=photorealistic%20360%20degree%20panorama%20of%20a%20luxury%20penthouse%20interior%20with%20city%20views%2C%20created%20in%20Unreal%20Engine%205%2C%20ultra-detailed%20materials%2C%20ray%20tracing%20effects%2C%20professional%203D%20rendering%2C%20architectural%20visualization%2C%20wide%20angle%20view%20showing%20entire%20space&width=1200&height=675&seq=6&orientation=landscape"
                            alt="360 Panorama"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button
                                id="vrExperienceBtn"
                                className="px-8 py-4 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all border border-white/20 backdrop-blur-md !rounded-button whitespace-nowrap cursor-pointer"
                                onMouseEnter={() => handleMouseEnter("button")}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => setShowVRModal(true)}
                            >
                                <i className="fas fa-vr-cardboard mr-2"></i> Enter VR Experience
                            </button>
                        </div>
                    </div>
                </section>
                {/* Services */}
                <section className="mb-24">
                    <div className="backdrop-blur-md bg-black/30 rounded-3xl p-8 border border-white/10 mb-8">
                        <h3
                            className="text-3xl text-white font-light mb-2"
                            onMouseEnter={() => handleMouseEnter("text")}
                            onMouseLeave={handleMouseLeave}
                        >
                            Our Services
                        </h3>
                        <p
                            className="text-white/70"
                            onMouseEnter={() => handleMouseEnter("text")}
                            onMouseLeave={handleMouseLeave}
                        >
                            Comprehensive 3D visualization solutions for real estate and
                            interior design
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: "fas fa-building",
                                title: "Architectural Visualization",
                                description:
                                    "Photorealistic renders of exteriors and interiors for unbuilt properties",
                            },
                            {
                                icon: "fas fa-vr-cardboard",
                                title: "Virtual Reality Tours",
                                description:
                                    "Immersive VR experiences allowing clients to walk through spaces",
                            },
                            {
                                icon: "fas fa-film",
                                title: "Cinematic Walkthroughs",
                                description:
                                    "Stunning video tours showcasing properties in their best light",
                            },
                            {
                                icon: "fas fa-object-group",
                                title: "Interactive Configurators",
                                description:
                                    "Real-time material and furniture customization tools",
                            },
                        ].map((service, index) => (
                            <div
                                key={index}
                                className="backdrop-blur-md bg-black/30 rounded-3xl p-8 border border-white/10 hover:bg-black/40 transition-colors cursor-pointer"
                                onMouseEnter={() => handleMouseEnter("button")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                                    <i className={`${service.icon} text-2xl text-white`}></i>
                                </div>
                                <h4
                                    className="text-xl text-white font-medium mb-3"
                                    onMouseEnter={() => handleMouseEnter("text")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {service.title}
                                </h4>
                                <p
                                    className="text-white/70"
                                    onMouseEnter={() => handleMouseEnter("text")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            {/* VR Experience Modal */}
            {showVRModal && (
                <div className="fixed inset-0 z-[60] bg-black">
                    <div
                        className="relative w-full h-full overflow-hidden"
                        onMouseMove={handlePanoramaMove}
                        onWheel={(e) => handleZoom(Math.sign(-e.deltaY))}
                    >
                        <img
                            src="https://readdy.ai/api/search-image?query=photorealistic%20360%20degree%20panorama%20of%20a%20luxury%20penthouse%20interior%20with%20city%20views%2C%20created%20in%20Unreal%20Engine%205%2C%20ultra-detailed%20materials%2C%20ray%20tracing%20effects%2C%20professional%203D%20rendering%2C%20architectural%20visualization%2C%20wide%20angle%20view%20showing%20entire%20space&width=1200&height=675&seq=6&orientation=landscape"
                            alt="360 Panorama"
                            className="w-full h-full object-cover transition-transform duration-300"
                            style={{
                                transform: `translate(${panoramaPosition.x}px, ${panoramaPosition.y}px) scale(${zoom})`,
                            }}
                        />
                        {/* Controls */}
                        <div className="absolute top-4 right-4 flex items-center gap-4">
                            <button
                                className="px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all border border-white/20 backdrop-blur-md !rounded-button whitespace-nowrap"
                                onClick={() => setIsVRMode(!isVRMode)}
                            >
                                <i
                                    className={`fas fa-vr-cardboard mr-2 ${isVRMode ? "text-blue-400" : ""}`}
                                ></i>
                                VR Mode
                            </button>
                            <button
                                className="px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all border border-white/20 backdrop-blur-md !rounded-button whitespace-nowrap"
                                onClick={() => {
                                    setShowVRModal(false);
                                    setPanoramaPosition({ x: 0, y: 0 });
                                    setZoom(1);
                                    setIsVRMode(false);
                                }}
                            >
                                <i className="fas fa-times mr-2"></i>
                                Exit Experience
                            </button>
                        </div>
                        {/* Navigation Controls */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                            <button
                                className="w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all border border-white/20 backdrop-blur-md flex items-center justify-center !rounded-button"
                                onClick={() => handleZoom(1)}
                            >
                                <i className="fas fa-plus"></i>
                            </button>
                            <button
                                className="w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all border border-white/20 backdrop-blur-md flex items-center justify-center !rounded-button"
                                onClick={() => handleZoom(-1)}
                            >
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                        {/* Touch Instructions */}
                        <div className="absolute bottom-4 left-4 text-white/70 text-sm backdrop-blur-md bg-black/30 rounded-full px-4 py-2">
                            <i className="fas fa-hand-pointer mr-2"></i>
                            Drag to explore | Scroll to zoom
                        </div>
                    </div>
                </div>
            )}
            {/* Floating bottom navigation */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
                <div className="backdrop-blur-md bg-black/20 rounded-full px-6 py-4">
                    <div className="flex items-center space-x-12">
                        {[
                            { icon: "fas fa-house", label: "" },
                            { icon: "fas fa-folder", label: "" },
                            { icon: "fas fa-user", label: "" },
                            { icon: "fas fa-envelope", label: "" },
                            { icon: "fas fa-sun", label: "" },
                        ].map((item, index) => (
                            <button
                                key={index}
                                className="flex items-center justify-center w-10 h-10 text-white/70 hover:text-white transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                                onMouseEnter={() => handleMouseEnter("button")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <i className={`${item.icon} text-lg`}></i>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default App;
