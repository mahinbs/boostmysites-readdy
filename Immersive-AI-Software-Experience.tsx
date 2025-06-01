// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
const useScrollAnimation = () => {
useEffect(() => {
const observerCallback = (entries: IntersectionObserverEntry[]) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('animate-in');
entry.target.classList.remove('animate-start');
entry.target.classList.remove('translate-x-[-100px]', 'translate-x-[100px]');
entry.target.classList.add('translate-x-0', 'opacity-100');
// Add scale-in animation to child elements
const children = entry.target.children;
Array.from(children).forEach((child, index) => {
(child as HTMLElement).style.animationDelay = `${index * 0.1}s`;
child.classList.add('scale-in');
});
}
});
};
const observer = new IntersectionObserver(observerCallback, {
threshold: 0.1,
rootMargin: '0px 0px -100px 0px'
});
document.querySelectorAll('.animate-on-scroll').forEach(element => {
element.classList.add('animate-start');
observer.observe(element);
});
return () => observer.disconnect();
}, []);
};
const App: React.FC = () => {
useScrollAnimation();
const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
const [isLoaded, setIsLoaded] = useState(false);
const [activeService, setActiveService] = useState(0);
const [scrollY, setScrollY] = useState(0);
const cursorRef = useRef<HTMLDivElement>(null);
const statsChartRef = useRef<HTMLDivElement>(null);
useEffect(() => {
const handleSmoothScroll = (e: Event) => {
e.preventDefault();
const href = (e.target as HTMLAnchorElement).getAttribute('href');
if (href && href.startsWith('#')) {
const targetElement = document.querySelector(href);
if (targetElement) {
targetElement.scrollIntoView({
behavior: 'smooth',
block: 'start'
});
}
}
};
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
link.addEventListener('click', handleSmoothScroll);
});
return () => {
navLinks.forEach(link => {
link.removeEventListener('click', handleSmoothScroll);
});
};
}, []);
useEffect(() => {
const handleScroll = () => {
setScrollY(window.scrollY);
};
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);
const servicesData = [
{
title: "SAAS Development",
description: "Enterprise-grade software solutions with scalable architecture and seamless integration capabilities.",
icon: "fa-solid fa-cloud",
image: "https://readdy.ai/api/search-image?query=Futuristic%20software%20as%20a%20service%20visualization%20with%20glowing%20blue%20digital%20interface%2C%20cloud%20computing%20concept%20with%20flowing%20data%20streams%2C%20minimalist%20dark%20background%20with%20neon%20blue%20accents%2C%20high%20tech%20digital%20environment&width=600&height=400&seq=1&orientation=landscape"
},
{
title: "Web Application Development",
description: "Responsive, high-performance web applications built with cutting-edge technologies.",
icon: "fa-solid fa-globe",
image: "https://readdy.ai/api/search-image?query=Modern%20web%20application%20interface%20with%20multiple%20screens%20floating%20in%20dark%20space%2C%20responsive%20design%20visualization%2C%20digital%20workspace%20with%20glowing%20elements%2C%20futuristic%20UI%20components%20with%20neon%20purple%20highlights%20on%20dark%20background&width=600&height=400&seq=2&orientation=landscape"
},
{
title: "Mobile App Development",
description: "Native and cross-platform mobile solutions with intuitive UX and robust performance.",
icon: "fa-solid fa-mobile-screen",
image: "https://readdy.ai/api/search-image?query=Futuristic%20mobile%20application%20interface%20floating%20in%20dark%20space%2C%20smartphone%20with%20glowing%20UI%20elements%2C%20multiple%20app%20screens%20visualization%2C%20digital%20mobile%20experience%20with%20neon%20green%20accents%2C%20high-tech%20mobile%20development%20concept&width=600&height=400&seq=3&orientation=landscape"
},
{
title: "AI Integration Services",
description: "Seamless AI integration into existing systems to enhance capabilities and drive innovation.",
icon: "fa-solid fa-robot",
image: "https://readdy.ai/api/search-image?query=AI%20integration%20visualization%20with%20neural%20network%20connections%2C%20digital%20brain%20with%20glowing%20synapses%2C%20data%20flow%20streams%20connecting%20different%20systems%2C%20futuristic%20artificial%20intelligence%20concept%20with%20blue%20and%20purple%20neon%20elements%20on%20dark%20background&width=600&height=400&seq=4&orientation=landscape"
},
{
title: "Custom AI Product Development",
description: "Bespoke AI solutions tailored to specific business needs and challenges.",
icon: "fa-solid fa-microchip",
image: "https://readdy.ai/api/search-image?query=Custom%20AI%20product%20visualization%20with%20futuristic%20interface%2C%20digital%20brain%20with%20circuit%20patterns%2C%20machine%20learning%20algorithm%20representation%2C%20high-tech%20artificial%20intelligence%20development%20concept%20with%20glowing%20elements%20on%20dark%20background%20with%20purple%20accents&width=600&height=400&seq=5&orientation=landscape"
}
];
const testimonials = [
{
name: "Sarah Johnson",
company: "TechForward Inc.",
quote: "BOOSTMYSITES transformed our business with their AI-first approach. The custom SAAS solution they built has increased our operational efficiency by 200%.",
image: "https://readdy.ai/api/search-image?query=Professional%20female%20executive%20in%20modern%20office%20setting%20with%20city%20skyline%20view%2C%20confident%20business%20woman%20with%20subtle%20smile%2C%20professional%20attire%2C%20soft%20lighting%20with%20blue%20tones%2C%20corporate%20portrait%20with%20blurred%20tech%20environment%20background&width=100&height=100&seq=6&orientation=squarish"
},
{
name: "Michael Chen",
company: "GlobalTech Solutions",
quote: "Their mobile app development team delivered beyond our expectations. The user engagement metrics have skyrocketed since launch.",
image: "https://readdy.ai/api/search-image?query=Professional%20Asian%20male%20executive%20in%20modern%20tech%20office%2C%20confident%20business%20man%20with%20glasses%2C%20professional%20dark%20suit%2C%20soft%20lighting%20with%20blue%20accent%20tones%2C%20corporate%20portrait%20with%20blurred%20digital%20environment%20background&width=100&height=100&seq=7&orientation=squarish"
},
{
name: "Emily Rodriguez",
company: "InnovateNow",
quote: "The AI integration services provided by BOOSTMYSITES have revolutionized our data analysis capabilities. We're now making decisions 10x faster.",
image: "https://readdy.ai/api/search-image?query=Professional%20latina%20female%20executive%20in%20modern%20creative%20office%2C%20confident%20business%20woman%20with%20warm%20smile%2C%20smart%20casual%20attire%2C%20soft%20lighting%20with%20purple%20accent%20tones%2C%20corporate%20portrait%20with%20blurred%20tech%20environment%20background&width=100&height=100&seq=8&orientation=squarish"
}
];
const clients = [
{ name: "Forbes", icon: "fa-brands fa-forumbee" },
{ name: "Entrepreneur", icon: "fa-solid fa-briefcase" },
{ name: "TechCrunch", icon: "fa-solid fa-microchip" },
{ name: "Microsoft", icon: "fa-brands fa-microsoft" },
{ name: "Amazon", icon: "fa-brands fa-amazon" },
{ name: "Google", icon: "fa-brands fa-google" }
];
useEffect(() => {
const timer = setTimeout(() => {
setIsLoaded(true);
}, 2000);
const handleMouseMove = (e: MouseEvent) => {
setCursorPosition({ x: e.clientX, y: e.clientY });
};
document.addEventListener('mousemove', handleMouseMove);
return () => {
clearTimeout(timer);
document.removeEventListener('mousemove', handleMouseMove);
};
}, []);
useEffect(() => {
if (cursorRef.current) {
cursorRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
}
}, [cursorPosition]);
useEffect(() => {
if (statsChartRef.current && isLoaded) {
const chart = echarts.init(statsChartRef.current);
const option = {
animation: false,
tooltip: {
trigger: 'item'
},
legend: {
top: '5%',
left: 'center',
textStyle: {
color: '#fff'
}
},
series: [
{
name: 'Project Distribution',
type: 'pie',
radius: ['40%', '70%'],
avoidLabelOverlap: false,
itemStyle: {
borderRadius: 10,
borderColor: '#0f172a',
borderWidth: 2
},
label: {
show: false,
position: 'center'
},
emphasis: {
label: {
show: true,
fontSize: 20,
fontWeight: 'bold',
color: '#fff'
}
},
labelLine: {
show: false
},
data: [
{ value: 500, name: 'SAAS', itemStyle: { color: '#00f7ff' } },
{ value: 400, name: 'Web Apps', itemStyle: { color: '#b026ff' } },
{ value: 300, name: 'Mobile Apps', itemStyle: { color: '#39ff14' } },
{ value: 200, name: 'AI Integration', itemStyle: { color: '#ff3860' } },
{ value: 100, name: 'Custom AI', itemStyle: { color: '#ffdd57' } }
]
}
]
};
chart.setOption(option);
const handleResize = () => {
chart.resize();
};
window.addEventListener('resize', handleResize);
return () => {
chart.dispose();
window.removeEventListener('resize', handleResize);
};
}
}, [isLoaded]);
return (
<div className="relative bg-gray-900 text-white min-h-screen overflow-x-hidden">
<style>
{`
html {
scroll-behavior: smooth;
}
@keyframes slideUp {
from {
opacity: 0;
transform: translateY(30px);
filter: blur(10px);
}
to {
opacity: 1;
transform: translateY(0);
filter: blur(0);
}
}
@keyframes fadeIn {
from {
opacity: 0;
transform: scale(0.95);
filter: blur(5px);
}
to {
opacity: 1;
transform: scale(1);
filter: blur(0);
}
}
@keyframes scaleIn {
from {
opacity: 0;
transform: scale(0.9) rotate(-2deg);
filter: blur(10px);
}
to {
opacity: 1;
transform: scale(1) rotate(0);
filter: blur(0);
}
}
@keyframes glowPulse {
0% {
box-shadow: 0 0 5px rgba(0, 247, 255, 0.5),
0 0 10px rgba(176, 38, 255, 0.5);
}
50% {
box-shadow: 0 0 20px rgba(0, 247, 255, 0.8),
0 0 40px rgba(176, 38, 255, 0.8);
}
100% {
box-shadow: 0 0 5px rgba(0, 247, 255, 0.5),
0 0 10px rgba(176, 38, 255, 0.5);
}
}
@keyframes floatAnimation {
0% {
transform: translateY(0) translateX(0);
}
25% {
transform: translateY(-10px) translateX(5px);
}
50% {
transform: translateY(0) translateX(0);
}
75% {
transform: translateY(10px) translateX(-5px);
}
100% {
transform: translateY(0) translateX(0);
}
}
@keyframes gradientFlow {
0% {
background-position: 0% 50%;
}
50% {
background-position: 100% 50%;
}
100% {
background-position: 0% 50%;
}
}
.animate-start {
opacity: 0;
transform: translateY(30px);
transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
filter: blur(10px);
}
.animate-in {
opacity: 1;
transform: translateY(0);
animation: slideUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.fade-in {
animation: fadeIn 1s ease forwards;
}
.scale-in {
animation: scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.glow-pulse {
animation: glowPulse 3s infinite;
}
.float-element {
animation: floatAnimation 6s ease-in-out infinite;
}
.gradient-text {
background: linear-gradient(-45deg, #00f7ff, #b026ff, #39ff14, #ff3860);
background-size: 400% 400%;
animation: gradientFlow 15s ease infinite;
-webkit-background-clip: text;
background-clip: text;
color: transparent;
}
.hover-glow {
transition: all 0.3s ease;
}
.hover-glow:hover {
box-shadow: 0 0 20px rgba(0, 247, 255, 0.5),
0 0 40px rgba(176, 38, 255, 0.3);
transform: translateY(-2px);
}
.cyber-grid {
position: relative;
overflow: hidden;
}
.cyber-grid::before {
content: '';
position: absolute;
width: 200%;
height: 200%;
top: -50%;
left: -50%;
background: radial-gradient(circle at center, rgba(0,247,255,0.1) 0%, transparent 70%);
animation: floatAnimation 10s ease-in-out infinite;
pointer-events: none;
}
.stagger-animation > * {
opacity: 0;
animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.stagger-animation > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-animation > *:nth-child(2) { animation-delay: 0.2s; }
.stagger-animation > *:nth-child(3) { animation-delay: 0.3s; }
.stagger-animation > *:nth-child(4) { animation-delay: 0.4s; }
.stagger-animation > *:nth-child(5) { animation-delay: 0.5s; }
.stagger-animation > *:nth-child(6) { animation-delay: 0.6s; }
.parallax-bg {
transform: translateY(calc(var(--scroll-y) * -0.5px));
transition: transform 0.1s linear;
}
.glow-effect {
position: relative;
overflow: hidden;
}
.glow-effect::before {
content: '';
position: absolute;
top: -50%;
left: -50%;
width: 200%;
height: 200%;
background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
transform: rotate(45deg);
pointer-events: none;
transition: all 0.6s ease;
opacity: 0;
}
.glow-effect:hover::before {
opacity: 1;
transform: rotate(45deg) translateY(-50%);
}
.cyber-grid {
background-image: linear-gradient(rgba(66, 138, 255, 0.1) 1px, transparent 1px),
linear-gradient(90deg, rgba(66, 138, 255, 0.1) 1px, transparent 1px);
background-size: 20px 20px;
background-position: center center;
}
@keyframes float {
0% { transform: translateY(0px); }
50% { transform: translateY(-10px); }
100% { transform: translateY(0px); }
}
.float-animation {
animation: float 3s ease-in-out infinite;
}
`}
</style>
{/* Custom Cursor */}
<div
ref={cursorRef}
className="fixed w-8 h-8 rounded-full bg-transparent border-2 border-blue-400 pointer-events-none z-50 mix-blend-difference"
style={{
transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
transition: 'transform 0.1s ease-out, width 0.2s, height 0.2s',
marginLeft: '-16px',
marginTop: '-16px'
}}
></div>
{/* Loading Animation */}
<div className={`fixed inset-0 bg-gray-900 z-50 flex items-center justify-center transition-opacity duration-1000 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
<div className="text-center">
<div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 mb-4">BOOSTMYSITES</div>
<div className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
<div className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 animate-pulse"></div>
</div>
</div>
</div>
{/* Navigation */}
<nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-md bg-gray-900/70">
<div className="container mx-auto px-6 py-4">
<div className="flex items-center justify-between">
<div className="flex items-center">
<div className="text-2xl font-bold gradient-text hover-glow">BOOSTMYSITES</div>
</div>
<div className="hidden md:flex items-center space-x-8">
<a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">Home</a>
<a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">Services</a>
<a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">About Us</a>
<a href="#projects" className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">Projects</a>
<a href="#testimonials" className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">Testimonials</a>
<a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">Contact</a>
</div>
<div>
<button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium hover-glow transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer glow-effect glow-pulse">Get Started</button>
</div>
</div>
</div>
</nav>
{/* Hero Section */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid">
<div className="absolute inset-0 z-0 parallax-bg" style={{ '--scroll-y': scrollY } as React.CSSProperties}>
<div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900"></div>
<video
autoPlay
muted
loop
playsInline
className="absolute inset-0 w-full h-full object-cover object-center"
>
<source src="https://res.cloudinary.com/dknafpppp/video/upload/v1748771996/0_Ai_Brain_1920x1080_quggeb.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>
</div>
<div className="container mx-auto px-6 z-10 text-center">
<div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'} animate-on-scroll`}>
<h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
Launch Future-Ready Software with
<span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-green-400">
AI-First Thinking
</span>
</h1>
<p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
Transforming businesses through innovative software solutions powered by cutting-edge AI technology.
</p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
<button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer">
Explore Services
</button>
<button className="px-8 py-3 bg-transparent border border-white/20 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer">
View Our Work
</button>
</div>
</div>
<div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
<div className="animate-bounce">
<i className="fa-solid fa-chevron-down text-white/70 text-2xl"></i>
</div>
</div>
</div>
</section>
{/* Services Section */}
<section id="services" className="py-20 bg-gray-900 relative">
<div className="container mx-auto px-6">
<div className="text-center mb-16 animate-on-scroll">
<h2 className="text-4xl font-bold mb-4 scale-in">Our Services</h2>
<p className="text-xl text-gray-400 max-w-3xl mx-auto fade-in">
Comprehensive software solutions designed to propel your business into the future.
</p>
</div>
<div className="grid grid-cols-1 gap-12">
{servicesData.map((service, index) => (
<div
key={index}
className={`group relative bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 hover:border-blue-500/30 transition-all duration-700 animate-on-scroll ${index % 2 === 0 ? 'translate-x-[-100px] opacity-0' : 'translate-x-[100px] opacity-0'}`}
onMouseEnter={() => setActiveService(index)}
>
<div className="flex flex-col md:flex-row">
<div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
<img
src={service.image}
alt={service.title}
className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
/>
<div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent"></div>
</div>
<div className="relative w-full md:w-1/2 p-8 flex flex-col justify-center">
<div className="mb-6">
<div className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg mb-4 transform transition-transform duration-500 group-hover:rotate-12`}>
<i className={`${service.icon} text-2xl text-white`}></i>
</div>
<h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-white">
{service.title}
</h3>
<p className="text-gray-400 mb-6 line-clamp-3">
{service.description}
</p>
</div>
<div className="space-y-3">
<div className="flex items-center text-gray-300">
<i className="fa-solid fa-check-circle text-blue-400 mr-3"></i>
<span>Enterprise-grade Solutions</span>
</div>
<div className="flex items-center text-gray-300">
<i className="fa-solid fa-check-circle text-blue-400 mr-3"></i>
<span>24/7 Expert Support</span>
</div>
<div className="flex items-center text-gray-300">
<i className="fa-solid fa-check-circle text-blue-400 mr-3"></i>
<span>Seamless Integration</span>
</div>
</div>
<div className="mt-8">
<button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 !rounded-button whitespace-nowrap cursor-pointer">
Learn More
<i className="fa-solid fa-arrow-right ml-2"></i>
</button>
</div>
</div>
</div>
</div>
))}
</div>
<div className="hidden">
<div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden h-full border border-gray-700/50">
<div className="relative h-64 overflow-hidden">
<img
src={servicesData[activeService].image}
alt={servicesData[activeService].title}
className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
/>
<div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
<div className="absolute bottom-0 left-0 p-6">
<h3 className="text-2xl font-bold">{servicesData[activeService].title}</h3>
</div>
</div>
<div className="p-6">
<p className="text-gray-300 mb-6">{servicesData[activeService].description}</p>
<ul className="space-y-3 mb-6">
<li className="flex items-center">
<i className="fa-solid fa-check text-green-400 mr-2"></i>
<span>Scalable architecture for enterprise needs</span>
</li>
<li className="flex items-center">
<i className="fa-solid fa-check text-green-400 mr-2"></i>
<span>Advanced security protocols and compliance</span>
</li>
<li className="flex items-center">
<i className="fa-solid fa-check text-green-400 mr-2"></i>
<span>Seamless integration with existing systems</span>
</li>
<li className="flex items-center">
<i className="fa-solid fa-check text-green-400 mr-2"></i>
<span>Continuous support and maintenance</span>
</li>
</ul>
<button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer glow-effect">
Learn More
</button>
</div>
</div>
</div>
</div>
</section>
{/* About Us Section */}
<section id="about" className="py-20 bg-gray-900 relative">
<div className="absolute inset-0 opacity-10">
<div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-green-400/10"></div>
</div>
<div className="container mx-auto px-6 relative z-10">
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-on-scroll stagger-animation">
<div>
<h2 className="text-4xl font-bold mb-6">Who We Are</h2>
<p className="text-xl text-gray-300 mb-6">
BOOSTMYSITES is a global software company specializing in creating future-ready digital solutions powered by AI-first thinking.
</p>
<p className="text-gray-400 mb-8">
Founded in 2018, we've grown from a small team of passionate developers to a global force in software innovation. Our mission is to empower businesses through technology that not only solves today's challenges but anticipates tomorrow's opportunities.
</p>
<div className="grid grid-cols-2 gap-6 mb-8 animate-on-scroll stagger-animation">
<div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
<div className="text-3xl font-bold text-blue-400 mb-2">1500+</div>
<div className="text-gray-400">Projects Completed</div>
</div>
<div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
<div className="text-3xl font-bold text-purple-400 mb-2">56+</div>
<div className="text-gray-400">Global Cities</div>
</div>
<div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
<div className="text-3xl font-bold text-green-400 mb-2">200+</div>
<div className="text-gray-400">Team Members</div>
</div>
<div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
<div className="text-3xl font-bold text-pink-400 mb-2">98%</div>
<div className="text-gray-400">Client Satisfaction</div>
</div>
</div>
</div>
<div className="relative">
<div className="relative h-96 rounded-xl overflow-hidden">
<div ref={statsChartRef} className="w-full h-full"></div>
</div>
<div className="absolute -bottom-6 -right-6 bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 max-w-xs">
<h3 className="text-xl font-bold mb-2">Our Tech Stack</h3>
<p className="text-gray-400 mb-4">
We leverage cutting-edge technologies to deliver exceptional solutions.
</p>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">React</span>
<span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Node.js</span>
<span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Python</span>
<span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">TensorFlow</span>
<span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">AWS</span>
<span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Flutter</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Clients Section */}
<section className="py-16 bg-gray-900">
<div className="container mx-auto px-6">
<div className="text-center mb-12">
<h2 className="text-4xl font-bold mb-4">Trusted By Industry Leaders</h2>
<p className="text-xl text-gray-400 max-w-3xl mx-auto">
We've partnered with forward-thinking companies across the globe.
</p>
</div>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 stagger-animation">
{clients.map((client, index) => (
<div key={index} className="flex flex-col items-center justify-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 group float-element hover-glow">
<i className={`${client.icon} text-4xl text-gray-400 group-hover:text-blue-400 transition-colors duration-300`}></i>
<div className="mt-4 font-medium text-gray-300 group-hover:text-white transition-colors duration-300">{client.name}</div>
</div>
))}
</div>
</div>
</section>
{/* Testimonials Section */}
<section id="testimonials" className="py-20 bg-gray-900 relative">
<div className="absolute inset-0 opacity-10">
<div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-blue-500/10 to-green-400/10"></div>
</div>
<div className="container mx-auto px-6 relative z-10">
<div className="text-center mb-16">
<h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
<p className="text-xl text-gray-400 max-w-3xl mx-auto">
Success stories from businesses we've helped transform.
</p>
</div>
<div className="max-w-5xl mx-auto">
<Swiper
modules={[Pagination, Autoplay]}
spaceBetween={30}
slidesPerView={1}
pagination={{ clickable: true }}
autoplay={{ delay: 5000 }}
loop={true}
className="testimonial-swiper"
>
{testimonials.map((testimonial, index) => (
<SwiperSlide key={index}>
<div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
<div className="flex-shrink-0">
<img
src={testimonial.image}
alt={testimonial.name}
className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
/>
</div>
<div>
<div className="text-yellow-400 mb-4">
<i className="fa-solid fa-star"></i>
<i className="fa-solid fa-star"></i>
<i className="fa-solid fa-star"></i>
<i className="fa-solid fa-star"></i>
<i className="fa-solid fa-star"></i>
</div>
<p className="text-xl text-gray-300 italic mb-6">"{testimonial.quote}"</p>
<div className="font-medium">{testimonial.name}</div>
<div className="text-gray-400">{testimonial.company}</div>
</div>
</div>
</div>
</SwiperSlide>
))}
</Swiper>
</div>
</div>
</section>
{/* CTA Section */}
<section className="py-20 bg-gray-900 relative">
<div className="absolute inset-0">
<div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
<img
src="https://readdy.ai/api/search-image?query=Abstract%20digital%20landscape%20with%20flowing%20data%20streams%20and%20glowing%20grid%20lines%2C%20futuristic%20technology%20visualization%20with%20depth%20and%20dimension%2C%20dark%20tech%20environment%20with%20blue%20and%20purple%20neon%20accents%2C%20immersive%20digital%20world%20concept&width=1920&height=600&seq=10&orientation=landscape"
alt="CTA Background"
className="w-full h-full object-cover object-center"
/>
</div>
<div className="container mx-auto px-6 relative z-10">
<div className="max-w-4xl mx-auto text-center">
<h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
<p className="text-xl text-gray-300 mb-10">
Let's collaborate to build innovative solutions that drive your business forward.
</p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
<button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer">
Start Your Project
</button>
<button className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer">
Schedule a Consultation
</button>
</div>
</div>
</div>
</section>
{/* Footer */}
<footer className="bg-gray-900 border-t border-gray-800">
<div className="container mx-auto px-6 py-12">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
<div className="col-span-1 md:col-span-1">
<div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 mb-4">BOOSTMYSITES</div>
<p className="text-gray-400 mb-6">
Transforming businesses through innovative software solutions powered by AI.
</p>
<div className="flex space-x-4">
<a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer">
<i className="fa-brands fa-twitter"></i>
</a>
<a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer">
<i className="fa-brands fa-facebook-f"></i>
</a>
<a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300 cursor-pointer">
<i className="fa-brands fa-instagram"></i>
</a>
<a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all duration-300 cursor-pointer">
<i className="fa-brands fa-linkedin-in"></i>
</a>
</div>
</div>
<div>
<h3 className="text-lg font-medium mb-4">Services</h3>
<ul className="space-y-3">
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">SAAS Development</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Web Applications</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Mobile Apps</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">AI Integration</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Custom AI Development</a></li>
</ul>
</div>
<div>
<h3 className="text-lg font-medium mb-4">Company</h3>
<ul className="space-y-3">
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">About Us</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Case Studies</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Careers</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Blog</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Contact</a></li>
</ul>
</div>
<div>
<h3 className="text-lg font-medium mb-4">Contact Us</h3>
<ul className="space-y-3">
<li className="flex items-start">
<i className="fa-solid fa-location-dot text-blue-400 mt-1 mr-3"></i>
<span className="text-gray-400">123 Innovation Drive, Tech City, TC 10101</span>
</li>
<li className="flex items-center">
<i className="fa-solid fa-envelope text-blue-400 mr-3"></i>
<span className="text-gray-400">info@boostmysites.com</span>
</li>
<li className="flex items-center">
<i className="fa-solid fa-phone text-blue-400 mr-3"></i>
<span className="text-gray-400">+1 (555) 123-4567</span>
</li>
</ul>
<div className="mt-6">
<h3 className="text-lg font-medium mb-4">Newsletter</h3>
<div className="flex">
<input
type="email"
placeholder="Your email"
className="bg-gray-800 border-none text-white px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
/>
<button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-r-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer">
<i className="fa-solid fa-paper-plane"></i>
</button>
</div>
</div>
</div>
</div>
<div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
<div className="text-gray-500 mb-4 md:mb-0">
© 2025 BOOSTMYSITES. All rights reserved.
</div>
<div className="flex space-x-6">
<a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer">Privacy Policy</a>
<a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer">Terms of Service</a>
<a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer">Cookie Policy</a>
</div>
</div>
</div>
</footer>
{/* Floating Chat Button */}
<div className="fixed bottom-6 right-6 z-30">
<button className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-300 !rounded-button cursor-pointer">
<i className="fa-solid fa-comment-dots text-xl"></i>
</button>
</div>
</div>
);
};
export default App