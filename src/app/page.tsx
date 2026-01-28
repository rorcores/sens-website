"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import { submitWaitlist } from "./lib/actions";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [scrollY, setScrollY] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await submitWaitlist(formData);
      if (result.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    });
  };

  useEffect(() => {
    setMounted(true);
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  if (!mounted) {
    return (
      <div 
        className="min-h-screen" 
        style={{ backgroundColor: '#63821e' }} 
      />
    );
  }

  return (
    <main className="min-h-screen relative">
      {/* Custom Cursor */}
      <div 
        className={`fixed w-4 h-4 rounded-full pointer-events-none z-[100] transition-transform duration-300 ease-out ${cursorVariant === 'hover' ? 'scale-[3]' : ''}`}
        style={{ 
          left: mousePos.x - 8, 
          top: mousePos.y - 8,
          opacity: isLoaded ? 1 : 0,
          backgroundColor: '#512f25',
        }}
      />
      <div 
        className="fixed w-10 h-10 rounded-full border pointer-events-none z-[100] transition-all duration-500 ease-out"
        style={{ 
          left: mousePos.x - 20, 
          top: mousePos.y - 20,
          opacity: isLoaded ? 1 : 0,
          transform: cursorVariant === 'hover' ? 'scale(2)' : 'scale(1)',
          borderColor: '#512f25',
        }}
      />

      {/* Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[90] opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-6 flex justify-between items-center transition-all duration-700 ${scrollY > 100 ? 'bg-background/90 backdrop-blur-md' : 'bg-transparent'} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <a 
          href="#" 
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <Logo />
        </a>
        <div className="flex items-center gap-8">
          {['About', 'Experience', 'Join'].map((item, i) => (
            <a 
              key={item}
              href={`#${item.toLowerCase() === 'about' ? 'community' : item.toLowerCase()}`} 
              className="text-xs tracking-luxury text-foreground-muted hover:text-foreground transition-all duration-300 relative group uppercase"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-8 relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div 
          className={`absolute w-[600px] h-[600px] rounded-full transition-all duration-[3000ms] ${mounted ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(circle, rgba(13,12,11,0.08) 0%, transparent 70%)',
            left: '10%',
            top: '20%',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * -0.05}px)`,
          }}
        />
        <div 
          className={`absolute w-[400px] h-[400px] rounded-full transition-all duration-[3000ms] delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(circle, rgba(13,12,11,0.05) 0%, transparent 70%)',
            right: '15%',
            bottom: '30%',
            transform: `translate(${scrollY * -0.08}px, ${scrollY * 0.03}px)`,
          }}
        />

        {/* Floating decorative elements */}
        <div 
          className={`absolute w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          style={{ left: '15%', top: '25%', transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div 
          className={`absolute w-24 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent transition-all duration-1000 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          style={{ right: '20%', top: '35%', transform: `translateX(${scrollY * -0.15}px)` }}
        />
        <div 
          className={`absolute w-2 h-2 rounded-full bg-accent/40 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          style={{ left: '25%', bottom: '35%', transform: `translate(${scrollY * 0.1}px, ${scrollY * -0.1}px)` }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '500ms' }}>
            <Logo size="hero" />
          </div>
          
          {/* CTA Button with magnetic hover */}
          <div className={`mt-20 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1400ms' }}>
            <a 
              href="#join" 
              className="group relative inline-flex items-center gap-4 px-12 py-5 border border-accent/30 text-[11px] tracking-[0.3em] text-accent overflow-hidden"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-background">Join</span>
              <span className="relative z-10 w-8 h-px bg-accent transition-all duration-500 group-hover:w-12 group-hover:bg-background" />
              <div className="absolute inset-0 bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </a>
          </div>
        </div>
        
        {/* Scroll indicator with pulse animation */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1800ms' }}>
          <span className="text-[9px] tracking-[0.3em] text-foreground-muted uppercase">Scroll</span>
          <div className="relative h-12 w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/60 to-transparent" />
            <div className="absolute top-0 w-full h-4 bg-accent animate-pulse-down" />
          </div>
        </div>
      </section>

      {/* New Hero Section Page 2 */}
      <section id="community" className="min-h-[70vh] flex flex-col justify-center items-center px-8 relative overflow-hidden bg-background uppercase">
        <AnimatedSection className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] leading-relaxed" style={{ fontFamily: 'var(--font-poppins)' }}>
            A LUXURY WELLNESS COMMUNITY FOR WOMEN
          </h2>
        </AnimatedSection>
      </section>

      {/* Experience Section - Now the Vision section */}
      <section id="experience" className="py-32 px-8 md:px-16 lg:px-32 bg-background-elevated relative overflow-hidden uppercase">
        {/* Asymmetric gradient */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-accent/[0.03] to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent/[0.02] to-transparent" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-32">
            <AnimatedSection>
              <span className="text-[10px] tracking-[0.4em] text-accent uppercase mb-8 block">The Vision</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wide mb-10 leading-[1.2]">
                Redefining the future
                <br />
                <span className="text-foreground-muted">of social wellness</span>
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-accent to-transparent" />
            </AnimatedSection>
            
            <div className="space-y-0">
              {[
                { 
                  title: "Curated Gatherings", 
                  desc: "Partnering with luxury wellness innovators to create experiences defined by presence and connection" 
                },
                { 
                  title: "Sensory Rituals", 
                  desc: "Embodying wellness through sound, scent, sight, taste, and touch" 
                },
                { 
                  title: "Cultivated Community", 
                  desc: "Building effortless, meaningful relationships and social circles" 
                },
              ].map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 150}>
                  <div 
                    className="group py-10 border-b border-border/50 hover:border-accent/30 transition-all duration-500 cursor-default"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    <div className="flex items-start gap-8">
                      <span className="text-xs text-accent/50 tracking-wide mt-1 font-medium">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <h3 className="text-lg md:text-xl font-normal mb-4 group-hover:text-accent transition-colors duration-300 tracking-wide">{item.title}</h3>
                        <p className="text-sm text-foreground-muted leading-relaxed max-w-md">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - RESTORED CORE */}
      <section className="py-40 px-8 md:px-16 lg:px-32 bg-background relative overflow-hidden uppercase">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-24">
            <span className="text-[10px] tracking-[0.4em] text-accent uppercase mb-8 block">Our Principles</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wide">The Core</h2>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-5 gap-4 md:gap-8">
            {[
              { title: "Sensation", desc: "Heightened perception" },
              { title: "Connection", desc: "Natural alignment" },
              { title: "Curation", desc: "Intentional selection" },
              { title: "Flow", desc: "Unbroken momentum" },
              { title: "Presence", desc: "Absolute awareness" },
            ].map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 100}>
                <div 
                  className="text-center group py-8 px-4 hover:bg-accent/5 transition-all duration-500 cursor-default"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <div className="w-px h-8 bg-accent/30 mx-auto mb-6 group-hover:h-12 group-hover:bg-accent transition-all duration-500" />
                  <span className="text-4xl font-light text-accent/30 mb-4 block">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-sm tracking-[0.2em] uppercase mb-4 font-medium group-hover:text-accent transition-colors duration-300">{value.title}</h3>
                  <p className="text-xs text-foreground-muted leading-relaxed">{value.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-32 px-8 md:px-16 lg:px-32 bg-background-elevated relative uppercase">
        {/* Decorative lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-accent/20" />
        
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-[10px] tracking-[0.4em] text-accent uppercase mb-8 block">Membership</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wide mb-10">
              JOIN THE WAITLIST
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent mx-auto mb-10" />
            <p className="text-foreground-muted leading-relaxed mb-16 text-sm md:text-base">
              SHAPING SOCIAL WELLNESS THROUGH SENSORY-LED EXPERIENCES
              <br />
              <span className="mt-1 block text-accent font-bold">COMING SOON</span>
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
              <div className="group">
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="FIRST NAME"
                  required
                  className="w-full bg-transparent border-b border-border py-4 text-sm tracking-wide placeholder:text-foreground-muted/60 focus:border-accent focus:outline-none transition-all duration-500 group-hover:border-foreground-muted uppercase"
                  onFocus={() => setCursorVariant('default')}
                />
              </div>
              <div className="group">
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="LAST NAME"
                  required
                  className="w-full bg-transparent border-b border-border py-4 text-sm tracking-wide placeholder:text-foreground-muted/60 focus:border-accent focus:outline-none transition-all duration-500 group-hover:border-foreground-muted uppercase"
                  onFocus={() => setCursorVariant('default')}
                />
              </div>
            </div>
            <div className="group">
              <input 
                type="email" 
                name="email"
                placeholder="EMAIL ADDRESS"
                required
                className="w-full bg-transparent border-b border-border py-4 text-sm tracking-wide placeholder:text-foreground-muted/60 focus:border-accent focus:outline-none transition-all duration-500 group-hover:border-foreground-muted uppercase"
                onFocus={() => setCursorVariant('default')}
              />
            </div>

            <div className="group text-left">
              <label className="text-[10px] tracking-[0.2em] text-accent uppercase mb-4 block opacity-60 uppercase">AGE RANGE</label>
              <select 
                name="ageRange"
                required
                className="w-full bg-transparent border-b border-border py-4 text-sm tracking-wide focus:border-accent focus:outline-none transition-all duration-500 group-hover:border-foreground-muted appearance-none cursor-pointer uppercase"
                onFocus={() => setCursorVariant('default')}
              >
                <option value="" className="bg-background">SELECT RANGE</option>
                <option value="18-24" className="bg-background">18 — 24</option>
                <option value="25-34" className="bg-background">25 — 34</option>
                <option value="35-44" className="bg-background">35 — 44</option>
                <option value="45+" className="bg-background">45+</option>
              </select>
            </div>

            <div className="group">
              <textarea 
                name="whySens"
                placeholder="WHY SENS? (OPTIONAL)"
                rows={1}
                className="w-full bg-transparent border-b border-border py-4 text-sm tracking-wide placeholder:text-foreground-muted/60 focus:border-accent focus:outline-none transition-all duration-500 group-hover:border-foreground-muted resize-none overflow-hidden uppercase"
                onFocus={() => setCursorVariant('default')}
                onChange={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>
              
              <div className="pt-8">
                <button 
                  type="submit"
                  disabled={isPending}
                  className="group relative inline-flex items-center justify-center w-full md:w-auto px-16 py-5 bg-accent text-background text-[11px] tracking-[0.3em] uppercase overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <span className="relative z-10">{isPending ? 'Joining...' : 'Submit'}</span>
                  <div className="absolute inset-0 bg-accent-warm transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </div>

              {status === 'success' && (
                <p className="mt-4 text-accent text-xs tracking-widest">THANK YOU FOR JOINING THE WAITLIST</p>
              )}
              {status === 'error' && (
                <p className="mt-4 text-red-500 text-xs tracking-widest">SOMETHING WENT WRONG. PLEASE TRY AGAIN.</p>
              )}
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 md:px-16 bg-background relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-1">
              <a 
                href="#" 
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <Logo size="footer" />
              </a>
            </div>
            <div className="flex items-center gap-12">
              <a 
                href="https://www.instagram.com/senssocialclub/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.2em] text-foreground-muted hover:text-foreground transition-all duration-300 relative group uppercase"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                Instagram
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </a>
              <a 
                href="mailto:senssocialclub@gmail.com" 
                className="text-xs tracking-[0.2em] text-foreground-muted hover:text-foreground transition-all duration-300 relative group uppercase"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-foreground-muted/40 tracking-wide">
              © 2026 SENS Social Club
            </p>
            <p className="text-[10px] text-foreground-muted/30 tracking-wide">
              Crafted with intention
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Logo({ size = 'nav' }: { size?: 'nav' | 'hero' | 'footer' }) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sizes = {
    nav: {
      container: "flex flex-col items-center group cursor-default",
      sens: "text-2xl tracking-[0.15em] transition-all duration-300 group-hover:opacity-70",
      subtitle: "text-[0.4rem] tracking-[0.1em] -mt-1"
    },
    hero: {
      container: "flex flex-col items-center group cursor-default",
      sens: "text-8xl md:text-[10rem] lg:text-[14rem] font-light tracking-[0.15em] mb-4",
      subtitle: "text-base md:text-xl lg:text-2xl tracking-[0.1em] -mt-3 md:-mt-5 lg:-mt-7"
    },
    footer: {
      container: "flex flex-col items-center group cursor-default",
      sens: "text-2xl tracking-[0.15em]",
      subtitle: "text-[0.4rem] tracking-[0.1em] -mt-1"
    }
  };

  const current = sizes[size];

  if (!isMounted) {
    return (
      <div className="flex flex-col items-center">
        <span className="opacity-0">SENS</span>
        <span className="opacity-0">Social Club</span>
      </div>
    );
  }

  return (
    <div className={current.container}>
      <span 
        className={current.sens} 
        style={{ fontFamily: 'var(--font-seasons)' }}
      >
        SENS
      </span>
      <span 
        className={current.subtitle} 
        style={{ fontFamily: 'var(--font-alta)' }}
      >
        Social Club
      </span>
    </div>
  );
}

// Animated section component with intersection observer
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        opacity: (isMounted && isVisible) ? 1 : 0,
        transform: (isMounted && isVisible) ? 'translateY(0)' : 'translateY(3rem)'
      }}
    >
      {children}
    </div>
  );
}
