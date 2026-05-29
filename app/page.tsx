"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import heroPortrait from "./images/image.png";
import heroAccentA from "./images/image copy.png";
import heroAccentB from "./images/image copy 2.png";
import aboutFrameA from "./images/image copy 3.png";
import projectPanel from "./images/image copy 4.png";
import contactSpotlight from "./images/image copy 5.png";


const skills = [
  { name: "SQL", category: "Data Management" },
  { name: "Power BI", category: "Visualization" },
  { name: "Tableau", category: "Visualization" },
  { name: "Excel", category: "Analysis" },
  { name: "Python", category: "Programming" },
  { name: "Data Visualization", category: "Communication" },
];

const projects = [
  {
    title: "Sales Performance Dashboard",
    description: "Executive system unifying revenue, margin, and customer velocity.",
    tools: ["Power BI", "SQL", "Excel"],
    image: projectPanel,
    live: "https://app.powerbi.com",
    github: "https://github.com/akhuacutie",
  },
  {
    title: "Customer Insights Analytics",
    description: "Intelligent reporting revealing segment behavior and retention opportunities.",
    tools: ["Tableau", "Python", "BI"],
    image: heroAccentA,
    live: "https://public.tableau.com",
    github: "https://github.com/akhuacutie",
  },
  {
    title: "Financial KPI Reporting",
    description: "Automated ETL and polished summaries for monthly financial insights.",
    tools: ["Power BI", "Python"],
    image: heroAccentB,
    live: "https://app.powerbi.com",
    github: "https://github.com/akhuacutie",
  },
  {
    title: "Retail Analytics System",
    description: "Real-time performance gaps across omni-channel retail operations.",
    tools: ["SQL", "Power BI"],
    image: contactSpotlight,
    live: "https://app.powerbi.com",
    github: "https://github.com/akhuacutie",
  },
];

const experiences = [
  {
    title: "Senior Data Analyst",
    timeframe: "2023 - Present",
    company: "Enterprise Intelligence Group",
    summary: "Lead analytics strategy for cross-functional leadership, translating data into business decisions.",
  },
  {
    title: "BI Consultant",
    timeframe: "2021 - 2023",
    company: "Streamline Analytics",
    summary: "Designed custom dashboards and data workflows for high-growth clients.",
  },
  {
    title: "Data Analyst Intern",
    timeframe: "2020 - 2021",
    company: "Atlas Insights",
    summary: "Built standardized reporting systems and delivered stakeholder-ready insights.",
  },
];

const socialLinks = [
  { icon: "LN", label: "LinkedIn", url: "https://www.linkedin.com/in/janet-owusu-3ab219325?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
  { icon: "GH", label: "GitHub", url: "https://github.com/akhuacutie" },
  { icon: "IG", label: "Instagram", url: "https://www.instagram.com/akhua_popkhorn?igsh=MXNkcmoyaXI4OXNuZA%3D%3D&utm_source=qr" },
  { icon: "@", label: "Email", url: "mailto:owusu0960@gmail.com" }
];

const sections = ["home", "about", "skills", "projects", "experience", "contact"];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formStatus, setFormStatus] = useState("idle");
  const [downloading, setDownloading] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    inquiry: '',
  });

  // Scroll restoration and position memory
  useEffect(() => {
    // Restore scroll position on mount
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    const savedActiveSection = sessionStorage.getItem('activeSection');
    
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
    }
    if (savedActiveSection) {
      setActiveSection(savedActiveSection);
    }

    // Save scroll position and active section on scroll (throttled for performance)
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          sessionStorage.setItem('scrollPosition', window.scrollY.toString());

          const current = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              return rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.4;
            }
            return false;
          });
          if (current) {
            setActiveSection(current);
            sessionStorage.setItem('activeSection', current);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section on hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 80; // Navbar height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Handle initial hash
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  function handleDownload(type: string) {
    setDownloading(type as any);
    setTimeout(() => {
      setDownloading(null);
    }, 1200);
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("sending");
    
    // Open email client with pre-filled message
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.fullName}`);
    const body = encodeURIComponent(`Name: ${formData.fullName}\nEmail: ${formData.email}\n\nMessage:\n${formData.inquiry}`);
    window.location.href = `mailto:owusu0960@gmail.com?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setFormStatus("sent");
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1000);
  }

  function handleWhatsAppSubmit() {
    const phoneNumber = '+233270392117';
    const message = encodeURIComponent(`Hello Janet,\n\nMy name is ${formData.fullName}.\nEmail: ${formData.email}\n\n${formData.inquiry}`);
    window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-white text-slate-900 selection:bg-yellow-500/20 font-sans antialiased overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-mesh opacity-80" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-300/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-100/40 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-5"
      >
        <div className="flex flex-col gap-4 p-2 glass-morphism rounded-full border border-black/5 shadow-luxury">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.04)" }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black group transition-all text-slate-600"
            >
              <span className="group-hover:text-yellow-600 transition-colors">{social.icon}</span>
              <span className="absolute left-14 glass px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none text-[9px] uppercase tracking-[0.2em] whitespace-nowrap border border-black/5 shadow-xl -translate-x-2 group-hover:translate-x-0 text-slate-800">
                {social.label}
              </span>
            </motion.a>
          ))}
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-black/10 to-transparent mx-auto mt-2" />
      </motion.div>

      <nav className={"fixed top-0 z-50 w-full transition-all duration-500 " + (isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-black/5 py-4 shadow-sm" : "bg-transparent py-6")}>
        <div className="content-container flex items-center justify-between">
          <motion.a
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-black tracking-tighter cursor-pointer text-slate-900"
          >
            JO<span className="text-yellow-500">.</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            {["About", "Skills", "Projects", "Experience"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={"relative transition-colors hover:text-slate-900 py-2 " + (activeSection === item.toLowerCase() ? "nav-link-active text-slate-900" : "")}
              >
                {item}
              </button>
            ))}
          </div>

          <motion.div className="flex items-center gap-4">
            <button
              disabled={downloading !== null}
              onClick={() => handleDownload('Resume')}
              className="hidden sm:flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-700 transition-all hover:bg-black hover:text-white active:scale-95 disabled:opacity-50"
            >
              {downloading === 'Resume' ? "Preparing..." : "Resume"}
              <svg className={"w-3 h-3 " + (downloading === 'Resume' ? 'animate-bounce' : '')} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </button>
            <button onClick={() => scrollToSection('contact')} className="rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-7 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg shadow-yellow-500/20 hover:scale-105 transition-transform active:scale-95">
              Hire Janet
            </button>
            <button
              className="md:hidden text-slate-900 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </motion.div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl pt-32 px-10 md:hidden"
          >
            <div className="flex flex-col gap-10 text-4xl font-bold tracking-tighter">
              {["About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={"transition-colors text-left " + (activeSection === item.toLowerCase() ? "text-yellow-600" : "text-slate-400 hover:text-slate-900")}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="content-container grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-slate-900">
                Janet Owusu
              </h1>
              <p className="mt-3 sm:mt-4 text-xl sm:text-2xl lg:text-3xl text-yellow-600 font-light">
                Data Analyst
              </p>
              <p className="mt-6 sm:mt-8 text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
                Transforming complex data into clear, actionable insights for strategic business decisions.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <button onClick={() => scrollToSection('projects')} className="px-6 sm:px-8 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 shadow-luxury transition-all active:scale-95">
                View Work
              </button>
              <button
                disabled={downloading !== null}
                onClick={() => handleDownload('CV')}
                className="px-6 sm:px-8 py-3 border border-black/10 text-slate-700 font-semibold rounded-xl hover:bg-black/5 hover:border-black/20 transition-all active:scale-95"
              >
                {downloading === 'CV' ? "Downloading..." : "Download CV"}
              </button>
            </motion.div>

          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 relative order-first lg:order-last mb-8 lg:mb-0"
          >
            <div className="relative z-10 aspect-[4/5] w-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-black/5 shadow-luxury">
              <Image
                src={heroPortrait}
                alt="Janet Owusu"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

          </motion.div>
        </div>
      </section>

      <section id="about" className="py-20 sm:py-32 lg:py-48 relative bg-cream-50/30">
        <div className="content-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
             <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="relative order-2 lg:order-1"
             >
                <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border border-black/5 shadow-luxury bg-white">
                  <Image
                    src={aboutFrameA}
                    alt="Process"
                    fill
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-2/3 aspect-video glass-morphism rounded-2xl sm:rounded-3xl z-20 p-4 sm:p-8 hidden sm:block border border-black/5 shadow-luxury">
                  <p className="text-yellow-600 font-bold mb-2 text-sm sm:text-base">My Philosophy</p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Data is not just numbers; it's the DNA of modern leadership. I decode it with precision.</p>
                </div>
                <div className="absolute -inset-4 sm:-inset-6 border border-amber-500/20 rounded-[2rem] sm:rounded-[3rem] -z-10 -translate-x-2 -translate-y-2 sm:-translate-x-4 sm:-translate-y-4" />
             </motion.div>

             <div className="space-y-8 sm:space-y-10 order-1 lg:order-2">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4"
                >
                  <p className="text-yellow-600 text-xs sm:text-sm font-black uppercase tracking-[0.3em]">The Approach</p>
                  <h2 className="text-gradient-silver text-3xl sm:text-4xl lg:text-5xl">Where Art Meets <br />Analytical Science.</h2>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-base sm:text-lg text-slate-500 leading-relaxed"
                >
                  Janet Owusu bridges the gap between raw datasets and executive boardrooms. By combining high-fidelity UI design with robust data engineering, she creates analytics ecosystems that are both beautiful and business-critical.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="grid gap-4 sm:gap-6 sm:grid-cols-2"
                >
                  <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-black/5 hover:border-black/10 hover:shadow-lg transition-all duration-300 cursor-default">
                    <h3 className="text-slate-900 text-base sm:text-lg mb-2 sm:mb-3">Executive BI</h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">Bespoke dashboards designed for C-suite decision velocity.</p>
                  </div>
                  <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-black/5 hover:border-black/10 hover:shadow-lg transition-all duration-300 cursor-default">
                    <h3 className="text-slate-900 text-base sm:text-lg mb-2 sm:mb-3">Data Storytelling</h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">Turning complex metrics into clear, persuasive narratives.</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="pt-4 sm:pt-6"
                >
                  <button onClick={() => scrollToSection('contact')} className="text-yellow-600 font-bold uppercase tracking-widest text-[10px] sm:text-[11px] hover:text-amber-600 transition-all flex items-center gap-3 group">
                    Start a collaboration <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
                  </button>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 sm:py-32 bg-cream-50/50">
        <div className="content-container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-12 sm:mb-20"
          >
            <p className="text-yellow-600 text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-4">Core Competencies</p>
            <h2 className="text-gradient-silver text-3xl sm:text-4xl lg:text-5xl">A Modern Stack Engineered <br />For Enterprise Impact.</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {skills.map((skill, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={skill.name}
                className="group relative p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white border border-black/5 hover:border-black/10 hover:shadow-luxury transition-all duration-500 cursor-default"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-lg sm:text-xl font-bold">{skill.name[0]}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2 text-slate-900">{skill.name}</h3>
                <p className="text-xs sm:text-sm text-slate-500">{skill.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 sm:py-32 lg:py-48 bg-white">
        <div className="content-container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-24"
          >
            <div className="max-w-2xl">
              <p className="text-yellow-600 text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-4">Portfolio</p>
              <h2 className="text-gradient-silver text-3xl sm:text-4xl lg:text-5xl">Signature Case Studies.</h2>
            </div>
            <a href="https://github.com/akhuacutie" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 group">
              Browse Github Archive <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
            </a>
          </motion.div>

          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                key={project.title}
                className="group relative rounded-2xl sm:rounded-[3rem] overflow-hidden bg-white border border-black/5 hover:border-black/10 transition-all duration-500 shadow-luxury"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-cream-50">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex gap-2 flex-wrap z-10">
                    {project.tools.map(tool => (
                      <span key={tool} className="px-2 sm:px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/5 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-800 shadow-sm">
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm bg-white/10 z-20">
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="px-4 sm:px-6 py-2 sm:py-3 bg-slate-900 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm hover:scale-105 transition-all active:scale-95 shadow-xl">Live Demo</a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-slate-900 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-xl border border-black/5">Github</a>
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-14 bg-white relative z-10">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 group-hover:text-yellow-600 transition-colors text-slate-900">{project.title}</h3>
                  <p className="text-slate-500 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">{project.description}</p>

                  <div className="flex items-center justify-between pt-6 sm:pt-8 border-t border-black/5">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-black/10 flex items-center justify-center transition-all group/btn hover:bg-yellow-500 hover:border-transparent hover:text-white hover:shadow-lg text-slate-400"
                    >
                      <span className="transition-transform group-hover/btn:translate-x-1">&rarr;</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 sm:py-32 bg-cream-50/50">
        <div className="content-container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-12 sm:mb-16 lg:mb-24"
          >
            <p className="text-yellow-600 text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-4">Curriculum Vitae</p>
            <h2 className="text-gradient-silver text-3xl sm:text-4xl lg:text-5xl">Career Trajectory.</h2>
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={exp.title}
                className="group relative p-6 sm:p-8 lg:p-16 rounded-2xl sm:rounded-[2.5rem] bg-white border border-black/5 hover:border-black/10 hover:shadow-luxury transition-all duration-500 grid md:grid-cols-12 gap-6 sm:gap-8 items-center"
              >
                <div className="md:col-span-3">
                  <p className="text-yellow-600 font-black text-base sm:text-lg lg:text-xl">{exp.timeframe}</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-[0.2em] mt-2">{exp.company}</p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 group-hover:text-yellow-600 transition-colors text-slate-900">{exp.title}</h3>
                  <p className="text-slate-500 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed">{exp.summary}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 sm:mt-16 lg:mt-20 text-center"
          >
            <button
              disabled={downloading === 'FullExperience'}
              onClick={() => handleDownload('FullExperience')}
              className="px-8 sm:px-12 py-4 sm:py-5 bg-white shadow-sm rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.2em] text-xs sm:text-sm border border-black/10 hover:bg-slate-900 hover:text-white hover:border-transparent transition-all active:scale-95 group flex items-center gap-3 sm:gap-4 mx-auto text-slate-800"
            >
              {downloading === 'FullExperience' ? "Generating Document..." : "Download Full Experience PDF"}
              <svg className={"w-4 h-4 sm:w-5 sm:h-5 " + (downloading === 'FullExperience' ? 'animate-spin' : 'group-hover:translate-y-1 transition-transform')} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </button>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-16 sm:py-20 lg:py-48 bg-white relative">
        <div className="content-container">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl sm:rounded-[4rem] overflow-hidden bg-white border border-black/5 shadow-luxury"
          >
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-20 bg-cream-50/50">
                <p className="text-yellow-600 text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-3 sm:mb-6">Inquiries</p>
                <h2 className="text-gradient-silver mb-4 sm:mb-10 leading-tight text-xl sm:text-2xl lg:text-4xl">Start A <br />Conversation.</h2>

                <div className="space-y-6 sm:space-y-10">
                  <a href="mailto:owusu0960@gmail.com" className="flex items-center gap-3 sm:gap-6 group cursor-pointer">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-white flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-white group-hover:border-transparent transition-all border border-black/10 shadow-sm text-slate-600">
                      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Email Me Directly</p>
                      <p className="text-sm sm:text-lg font-bold group-hover:text-yellow-600 transition-colors text-slate-900">owusu0960@gmail.com</p>
                    </div>
                  </a>
                  <a href="tel:+233270392117" className="flex items-center gap-3 sm:gap-6 group cursor-pointer">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-white flex items-center justify-center group-hover:bg-green-500 group-hover:text-white group-hover:border-transparent transition-all border border-black/10 shadow-sm text-slate-600">
                      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.08 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">WhatsApp</p>
                      <p className="text-sm sm:text-lg font-bold group-hover:text-green-500 transition-colors text-slate-900">+233 27 039 2117</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-20 border-t lg:border-t-0 lg:border-l border-black/5 bg-white">
                <form onSubmit={handleFormSubmit} className="grid sm:grid-cols-2 gap-3 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Jane Doe" 
                      className="w-full bg-cream-50 border border-black/10 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2.5 sm:py-4 outline-none focus:border-yellow-500 focus:bg-white focus:shadow-sm transition-all text-sm text-slate-900 placeholder:text-slate-400" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@company.com" 
                      className="w-full bg-cream-50 border border-black/10 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2.5 sm:py-4 outline-none focus:border-yellow-500 focus:bg-white focus:shadow-sm transition-all text-sm text-slate-900 placeholder:text-slate-400" 
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Inquiry</label>
                    <textarea 
                      required 
                      rows={4} 
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleInputChange}
                      placeholder="How can I help you today?" 
                      className="w-full bg-cream-50 border border-black/10 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2.5 sm:py-4 outline-none focus:border-yellow-500 focus:bg-white focus:shadow-sm transition-all text-sm resize-none text-slate-900 placeholder:text-slate-400"
                    ></textarea>
                  </div>
                  <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 mt-2">
                    <button
                      disabled={formStatus !== "idle"}
                      type="submit"
                      className={"flex-1 py-3 sm:py-5 font-black uppercase tracking-widest rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-lg text-xs sm:text-sm " + (formStatus === "sent" ? "bg-green-500 text-white" : "bg-slate-900 text-white hover:bg-yellow-500 hover:shadow-xl")}
                    >
                      {formStatus === "idle" && "Send via Email"}
                      {formStatus === "sending" && "Processing..."}
                      {formStatus === "sent" && "Email Sent ✓"}
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="flex-1 py-3 sm:py-5 font-black uppercase tracking-widest rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-lg bg-green-500 text-white hover:bg-green-600 text-xs sm:text-sm hover:shadow-xl"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.08 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Send via WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative pt-16 sm:pt-20 lg:pt-32 pb-8 sm:pb-16 bg-cream-50 border-t border-black/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

        <div className="content-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 mb-12 sm:mb-16 lg:mb-24">
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              <div className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900">
                JO<span className="text-yellow-500">.</span>
              </div>
              <p className="text-slate-500 text-sm sm:text-lg leading-relaxed max-w-sm">
                Engineering high-fidelity data narratives for the next generation of business intelligence.
              </p>
              <div className="flex gap-4">
                <div className="h-1 w-12 bg-yellow-500 rounded-full" />
                <div className="h-1 w-4 bg-black/10 rounded-full" />
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Ecosystem</h4>
              <nav className="flex flex-col gap-3 sm:gap-4">
                {["About", "Skills", "Projects", "Experience", "Contact"].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="text-slate-500 hover:text-yellow-600 transition-colors font-medium text-sm sm:text-base text-left w-fit"
                  >
                    {link}
                  </button>
                ))}
              </nav>
            </div>

            <div className="lg:col-span-4 space-y-6 sm:space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Connect</h4>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-[10px] sm:text-[11px] font-black transition-all hover:bg-slate-900 hover:text-white shadow-sm text-slate-600"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <a href="mailto:owusu0960@gmail.com" className="block text-slate-500 hover:text-slate-900 transition-colors text-xs sm:text-sm font-medium">owusu0960@gmail.com</a>
                  <button
                    onClick={() => handleDownload('Resume')}
                    className="flex items-center gap-2 text-yellow-600 hover:text-yellow-500 transition-colors text-xs sm:text-sm font-bold uppercase tracking-widest"
                  >
                    Download CV <span className="text-xs">&darr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/5 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 content-container">
          <p className="text-slate-400 text-xs sm:text-sm">© 2024 Janet Owusu. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
