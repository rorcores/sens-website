"use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Custom Cursor */}
      <div 
        className={`fixed w-4 h-4 rounded-full pointer-events-none z-[100] mix-blend-difference transition-transform duration-300 ease-out ${cursorVariant === 'hover' ? 'scale-[3] bg-foreground/80' : 'bg-foreground'}`}
        style={{ 
          left: mousePos.x - 8, 
          top: mousePos.y - 8,
          opacity: isLoaded ? 1 : 0,
        }}
      />
      <div 
        className="fixed w-10 h-10 rounded-full border border-foreground/30 pointer-events-none z-[100] transition-all duration-500 ease-out"
        style={{ 
          left: mousePos.x - 20, 
          top: mousePos.y - 20,
          opacity: isLoaded ? 1 : 0,
          transform: cursorVariant === 'hover' ? 'scale(2)' : 'scale(1)',
        }}
      />

      {/* Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[90] opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-6 flex justify-between items-center transition-all duration-700 ${scrollY > 100 ? 'bg-background/90 backdrop-blur-md' : 'bg-transparent'} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <Logo />
        <div className="flex items-center gap-8">
          {['About', 'Experience', 'Join'].map((item, i) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-xs tracking-luxury text-foreground-muted hover:text-foreground transition-all duration-300 relative group"
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
          className={`absolute w-[600px] h-[600px] rounded-full transition-all duration-[3000ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(circle, rgba(13,12,11,0.08) 0%, transparent 70%)',
            left: '10%',
            top: '20%',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * -0.05}px)`,
          }}
        />
        <div 
          className={`absolute w-[400px] h-[400px] rounded-full transition-all duration-[3000ms] delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(circle, rgba(13,12,11,0.05) 0%, transparent 70%)',
            right: '15%',
            bottom: '30%',
            transform: `translate(${scrollY * -0.08}px, ${scrollY * 0.03}px)`,
          }}
        />

        {/* Floating decorative elements */}
        <div 
          className={`absolute w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ left: '15%', top: '25%', transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div 
          className={`absolute w-24 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ right: '20%', top: '35%', transform: `translateX(${scrollY * -0.15}px)` }}
        />
        <div 
          className={`absolute w-2 h-2 rounded-full bg-accent/40 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ left: '25%', bottom: '35%', transform: `translate(${scrollY * 0.1}px, ${scrollY * -0.1}px)` }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Overline with animated reveal */}
          <div className={`mb-12 overflow-hidden`}>
            <span 
              className={`inline-block text-[10px] tracking-[0.4em] text-accent uppercase transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
              style={{ transitionDelay: '300ms' }}
            >
              A Luxury Wellness Community
            </span>
          </div>
          
          {/* Main title with character stagger effect */}
          <h1 
            className={`text-6xl md:text-8xl lg:text-[10rem] font-light tracking-[0.15em] mb-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} 
            style={{ transitionDelay: '500ms', fontFamily: 'var(--font-seasons)' }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            SENS
          </h1>
          
          {/* Subtitle with elegant spacing */}
          <p 
            className={`text-lg md:text-xl tracking-[0.3em] text-foreground-muted mb-2 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '700ms' }}
          >
            Social Club
          </p>
          
          {/* Animated line */}
          <div className="overflow-hidden my-16">
            <div 
              className={`h-px bg-accent/50 mx-auto transition-all duration-1000 ease-out ${isLoaded ? 'w-24 opacity-100' : 'w-0 opacity-0'}`}
              style={{ transitionDelay: '900ms' }}
            />
          </div>
          
          {/* Tagline with refined typography */}
          <div className="space-y-2">
            <p 
              className={`text-base md:text-lg tracking-wide text-foreground transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '1100ms' }}
            >
              Shaping social wellness through sensory-led experiences.
            </p>
            <p 
              className={`text-base md:text-lg tracking-wide text-foreground-muted font-light italic transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '1200ms' }}
            >
              For women who seek connection with intention.
            </p>
          </div>
          
          {/* CTA Button with magnetic hover */}
          <div className={`mt-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1400ms' }}>
            <a 
              href="#join" 
              className="group relative inline-flex items-center gap-4 px-12 py-5 border border-accent/30 text-[11px] tracking-[0.3em] text-accent overflow-hidden"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-background">Request Access</span>
              <span className="relative z-10 w-8 h-px bg-accent transition-all duration-500 group-hover:w-12 group-hover:bg-background" />
              <div className="absolute inset-0 bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </a>
          </div>
        </div>
        
        {/* Scroll indicator with pulse animation */}
        <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1800ms' }}>
          <span className="text-[9px] tracking-[0.3em] text-foreground-muted uppercase">Scroll</span>
          <div className="relative h-12 w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/60 to-transparent" />
            <div className="absolute top-0 w-full h-4 bg-accent animate-pulse-down" />
          </div>
        </div>
      </section>

      {/* Manifesto Section - New elegant quote section */}
      <section className="py-40 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-elevated/50 to-background" />
        <AnimatedSection className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[10px] tracking-[0.4em] text-accent uppercase mb-12 block">Our Philosophy</span>
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-extralight leading-relaxed tracking-wide text-foreground/90">
            <span className="text-accent text-5xl font-serif leading-none">"</span>
            <br />
            We believe in the transformative power of presence—
            <br />
            <span className="text-foreground-muted">in moments crafted with care,</span>
            <br />
            <span className="text-foreground-muted">connections forged with intention,</span>
            <br />
            and spaces that honor the art of being.
            <br />
            <span className="text-accent text-5xl font-serif leading-none">"</span>
          </blockquote>
        </AnimatedSection>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 md:px-16 lg:px-32 bg-background-elevated relative">
        {/* Decorative corner elements */}
        <div className="absolute top-16 left-16 w-24 h-24 border-l border-t border-accent/10" />
        <div className="absolute bottom-16 right-16 w-24 h-24 border-r border-b border-accent/10" />
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-32 items-center">
            <AnimatedSection>
              <span className="text-[10px] tracking-[0.4em] text-accent uppercase mb-8 block">The Vision</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wide mb-10 leading-[1.2]">
                Redefining the future
                <br />
                <span className="text-foreground-muted">of social wellness</span>
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-accent to-transparent mb-10" />
              <p className="text-foreground-muted leading-[1.9] mb-8 text-sm md:text-base">
                SENS is a sanctuary for the modern woman—a space where wellness transcends routine and becomes ritual. We curate experiences that engage every sense, fostering connections that resonate long after the moment passes.
              </p>
              <p className="text-foreground-muted font-light leading-[1.9] text-sm md:text-base">
                Each gathering is designed with precision and care, creating an atmosphere where presence is cultivated and genuine connection flourishes.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <div className="relative group">
                {/* Main image container */}
                <div className="aspect-[4/5] bg-gradient-to-br from-background to-accent/5 relative overflow-hidden">
                  {/* Layered circles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full border border-accent/10 animate-spin-slow" />
                    <div className="absolute w-48 h-48 rounded-full border border-accent/15 animate-spin-slow-reverse" />
                    <div className="absolute w-32 h-32 rounded-full border border-accent/20" />
                    <div className="absolute w-16 h-16 rounded-full bg-accent/10 group-hover:scale-150 transition-transform duration-700" />
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-accent/30" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-accent/30" />
                </div>
                
                {/* Floating label */}
                <div className="absolute -bottom-4 -right-4 bg-background px-6 py-4 border border-border">
                  <p className="text-[10px] tracking-[0.3em] text-foreground-muted uppercase">Sensory · Connection · Flow</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-40 px-8 md:px-16 lg:px-32 bg-background relative overflow-hidden">
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
              { title: "Sensory", desc: "Experiences that awaken every sense" },
              { title: "Connection", desc: "Bonds forged through shared moments" },
              { title: "Flow", desc: "Movement through space and time" },
              { title: "Curation", desc: "Every detail, intentionally placed" },
              { title: "Presence", desc: "The art of being fully here" },
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

      {/* Experience Section */}
      <section id="experience" className="py-32 px-8 md:px-16 lg:px-32 bg-background-elevated relative overflow-hidden">
        {/* Asymmetric gradient */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-accent/[0.03] to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent/[0.02] to-transparent" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-32">
            <AnimatedSection>
              <span className="text-[10px] tracking-[0.4em] text-accent uppercase mb-8 block">The Experience</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wide mb-10 leading-[1.2]">
                Curated gatherings
                <br />
                <span className="text-foreground-muted">for the discerning</span>
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-accent to-transparent" />
            </AnimatedSection>
            
            <div className="space-y-0">
              {[
                { 
                  title: "Intimate Gatherings", 
                  desc: "Small, curated events in refined settings. Conversations that matter, connections that last." 
                },
                { 
                  title: "Sensory Rituals", 
                  desc: "Wellness experiences designed for all five senses. Sound, scent, touch, taste, sight—harmonized." 
                },
                { 
                  title: "Elevated Spaces", 
                  desc: "Access to venues that match your discernment. Spaces that inspire presence and reflection." 
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

      {/* Testimonial/Quote Interlude */}
      <section className="py-32 px-8 bg-background relative">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center">
            <div className="relative inline-block">
              <span className="absolute -top-8 -left-8 text-8xl text-accent/10 font-serif">"</span>
              <p className="text-xl md:text-2xl font-extralight leading-relaxed tracking-wide text-foreground/80 italic">
                In a world of constant noise, SENS creates space for what truly matters—
                presence, connection, and the subtle art of simply being.
              </p>
              <span className="absolute -bottom-8 -right-8 text-8xl text-accent/10 font-serif rotate-180">"</span>
            </div>
            <div className="mt-12 pt-8">
              <div className="w-8 h-px bg-accent/40 mx-auto mb-4" />
              <p className="text-xs tracking-[0.3em] text-foreground-muted uppercase">The SENS Ethos</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-32 px-8 md:px-16 lg:px-32 bg-background-elevated relative">
        {/* Decorative lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-accent/20" />
        
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-[10px] tracking-[0.4em] text-accent uppercase mb-8 block">Membership</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wide mb-10">
              Join the Circle
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent mx-auto mb-10" />
            <p className="text-foreground-muted font-light leading-relaxed mb-16 text-sm md:text-base">
              SENS welcomes women who value intentional connection and elevated experiences. 
              <br />
              <span className="text-foreground-muted/60">Membership is by application only.</span>
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="group">
                  <input 
                    type="text" 
                    placeholder="First Name"
                    className="w-full bg-transparent border-b border-border/50 py-4 text-sm font-light tracking-wide placeholder:text-foreground-muted/40 focus:border-accent focus:outline-none transition-all duration-500 group-hover:border-foreground-muted/50"
                    onFocus={() => setCursorVariant('default')}
                  />
                </div>
                <div className="group">
                  <input 
                    type="text" 
                    placeholder="Last Name"
                    className="w-full bg-transparent border-b border-border/50 py-4 text-sm font-light tracking-wide placeholder:text-foreground-muted/40 focus:border-accent focus:outline-none transition-all duration-500 group-hover:border-foreground-muted/50"
                    onFocus={() => setCursorVariant('default')}
                  />
                </div>
              </div>
              <div className="group">
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b border-border/50 py-4 text-sm font-light tracking-wide placeholder:text-foreground-muted/40 focus:border-accent focus:outline-none transition-all duration-500 group-hover:border-foreground-muted/50"
                  onFocus={() => setCursorVariant('default')}
                />
              </div>
              <div className="group">
                <textarea 
                  placeholder="Tell us about yourself and what draws you to SENS..."
                  rows={4}
                  className="w-full bg-transparent border-b border-border/50 py-4 text-sm font-light tracking-wide placeholder:text-foreground-muted/40 focus:border-accent focus:outline-none transition-all duration-500 resize-none group-hover:border-foreground-muted/50"
                  onFocus={() => setCursorVariant('default')}
                />
              </div>
              
              <div className="pt-8">
                <button 
                  type="submit"
                  className="group relative inline-flex items-center justify-center w-full md:w-auto px-16 py-5 bg-accent text-background text-[11px] tracking-[0.3em] uppercase overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-accent/20"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <span className="relative z-10">Submit Application</span>
                  <div className="absolute inset-0 bg-accent-warm transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 md:px-16 bg-background relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <Logo />
            <div className="flex items-center gap-12">
              {['Instagram', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="text-xs tracking-[0.2em] text-foreground-muted hover:text-foreground transition-all duration-300 relative group"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                </a>
              ))}
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

function Logo() {
  return (
    <div className="flex flex-col items-center group cursor-default">
      <span 
        className="text-xl tracking-[0.4em] font-light transition-all duration-500 group-hover:tracking-[0.5em]" 
        style={{ fontFamily: 'var(--font-seasons)' }}
      >
        SENS
      </span>
      <span className="text-[8px] tracking-[0.25em] text-foreground-muted mt-1 uppercase">Social Club</span>
    </div>
  );
}

// Animated section component with intersection observer
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
