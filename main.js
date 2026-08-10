// ===================================================================
// MAIN.JS — GSAP + ScrollTrigger + Lenis Animations
// Aromascent Diffuser eCommerce Landing Page
// ===================================================================

// ===== Initialize Lenis Smooth Scroll =====
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ===== Register GSAP Plugins =====
gsap.registerPlugin(ScrollTrigger);

// ===== Page Loader Animation =====
function initLoader() {
    const loader = document.getElementById('pageLoader');
    const loaderText = loader.querySelector('.loader-text');

    const tl = gsap.timeline();

    tl.from(loaderText, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
    })
    .to(loaderText, {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.in',
        delay: 0.4,
    })
    .to(loader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
    })
    .set(loader, { display: 'none' })
    .add(() => {
        initHeroAnimations();
    });
}



// ===== Hero Section Animations =====
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-element');
    const heroImage = document.getElementById('heroImage');
    const fragranceText = document.getElementById('fragranceText');
    const statBadge = document.getElementById('statBadge');
    const navLogo = document.getElementById('navLogo');

    // Nav logo
    gsap.from(navLogo, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
    });

    // Nav links
    gsap.from('.nav-link', {
        y: -15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
    });

    // Hero image — scale reveal
    gsap.from(heroImage, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.1,
    });

    // Hero elements — staggered reveal
    gsap.from(heroElements, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
    });

    // FRAGRANCE text parallax
    gsap.set(fragranceText, { xPercent: -50, yPercent: -50 });
    gsap.to(fragranceText, {
        xPercent: -60,
        scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        },
    });

    // Hero image parallax
    gsap.to(heroImage, {
        y: 80,
        scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        },
    });

    // Stat badge float
    gsap.to(statBadge, {
        y: -15,
        duration: 2.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
    });
}

// ===== Product Showcase Section Animations =====
function initProductAnimations() {
    const heading = document.getElementById('productHeading');
    const cards = document.querySelectorAll('.product-card');

    // Heading slide up
    gsap.from(heading, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
        },
    });

    // Product cards stagger
    cards.forEach((card, i) => {
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.2,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 55%',
                toggleActions: 'play none none reverse',
            },
        });
    });
}

// ===== Features Section Animations =====
function initFeatureAnimations() {
    const gallery = document.getElementById('featureGallery');
    const details = document.getElementById('featureDetails');
    const bullets = document.querySelectorAll('.feature-bullet');

    // Gallery image reveal
    gsap.from(gallery, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#features',
            start: 'top 70%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
        },
    });

    // Feature details slide in
    gsap.from(details, {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#features',
            start: 'top 70%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
        },
    });

    // Feature bullets stagger
    bullets.forEach((bullet, i) => {
        gsap.from(bullet, {
            x: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: {
                trigger: bullet,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            },
        });
    });

    // Image reveal overlay animation
    const imgReveal = document.querySelector('.img-reveal');
    if (imgReveal) {
        gsap.from(imgReveal.querySelector('::after'), {
            scaleX: 1,
            duration: 1.2,
            ease: 'power4.inOut',
        });

        gsap.to('.img-reveal::after', {
            scaleX: 0,
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: {
                trigger: imgReveal,
                start: 'top 75%',
                toggleActions: 'play none none none',
            },
        });
    }
}

// ===== Testimonials Section Animations =====
function initTestimonialAnimations() {
    const heading = document.getElementById('testimonialHeading');
    const cards = document.querySelectorAll('.testimonial-card');

    // Heading animation
    gsap.from(heading, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
        },
    });

    // Cards stagger from right
    cards.forEach((card, i) => {
        gsap.from(card, {
            y: 60,
            x: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
                trigger: '#testimonials',
                start: 'top 65%',
                toggleActions: 'play none none reverse',
            },
        });
    });

    // Trust counter removed — use static 20,000+ Happy Customers only
}

// ===== Subscribe Section Animations =====
function initSubscribeAnimations() {
    const heading = document.getElementById('subscribeHeading');
    const swirl = document.getElementById('swirlDecoration');

    // Heading fade up
    gsap.from(heading, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#subscribe',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
    });

    // Swirl scale in
    if (swirl) {
        gsap.from(swirl, {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 1.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '#subscribe',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
        });
    }
}

// ===== Footer Animations =====
function initFooterAnimations() {
    const footerCols = document.querySelectorAll('footer > div > div:first-child > div');

    footerCols.forEach((col, i) => {
        gsap.from(col, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
                trigger: 'footer',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
        });
    });
}

// ===== Thumbnail Gallery Interaction =====
function initGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImg = document.getElementById('mainGalleryImg');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Remove active from all
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            // Animate main image swap
            const newSrc = thumb.dataset.img;

            gsap.to(mainImg, {
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    mainImg.src = newSrc;
                    gsap.to(mainImg, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'power3.out',
                    });
                },
            });
        });
    });
}

// ===== Color Dot Interaction =====
function initColorDots() {
    const dots = document.querySelectorAll('.color-dot');

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');

            // Subtle pulse animation
            gsap.fromTo(dot, {
                scale: 1.3,
            }, {
                scale: 1.15,
                duration: 0.4,
                ease: 'back.out(1.7)',
            });
        });
    });
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuLinks = mobileMenu.querySelectorAll('a');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        lenis.stop();

        // Animate links in
        gsap.from(menuLinks, {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out',
            delay: 0.2,
        });
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        lenis.start();
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            lenis.start();
        });
    });
}

// ===== Navbar Scroll Effect =====
function initNavScrollEffect() {
    const nav = document.getElementById('mainNav');

    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
            className: 'shadow-lg',
            targets: nav,
        },
    });
}

// ===== Magnetic Button Effect =====
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .amazon-btn');

    if (window.innerWidth < 768) return;

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out',
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
            });
        });
    });
}

// ===== Smooth Scroll to Anchors =====
function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, {
                    offset: -80,
                    duration: 1.2,
                });
            }
        });
    });
}

// ===== Newsletter Form =====
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    const input = document.getElementById('emailInput');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value) {
            // Animate success
            gsap.to(input, {
                scale: 1.05,
                duration: 0.2,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1,
            });
            input.value = '';
            input.placeholder = 'Thank you! ✓';
            setTimeout(() => {
                input.placeholder = 'Enter your email';
            }, 3000);
        }
    });
}

// ===== Parallax Elements =====
function initParallax() {
    // Subtle parallax on section numbers
    gsap.utils.toArray('.section-num').forEach(el => {
        gsap.to(el, {
            y: -20,
            scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        });
    });
}

// ===== Mobile Auto Slide for Snap Containers =====
function initMobileAutoSlide() {
    if (window.innerWidth >= 768) return; // Only run on mobile
    
    const sliders = [
        document.querySelector('#productCards'),
        document.querySelector('#advantages .overflow-x-auto'),
        document.querySelector('#testimonialCards .overflow-x-auto')
    ];

    sliders.forEach(slider => {
        if (!slider) return;
        
        let scrollAmount = 0;
        let isHovered = false;
        
        slider.addEventListener('touchstart', () => isHovered = true);
        slider.addEventListener('touchend', () => isHovered = false);

        setInterval(() => {
            if (isHovered) return;
            const maxScroll = slider.scrollWidth - slider.clientWidth;
            if (maxScroll <= 0) return;
            
            // Scroll by the actual width of the first card plus gap
            let cardWidth = window.innerWidth * 0.7; // default fallback
            if (slider.firstElementChild) {
                cardWidth = slider.firstElementChild.offsetWidth + 24; // 24px is roughly the gap
            }
            
            if (slider.scrollLeft >= maxScroll - 10) {
                // Reset to beginning smoothly
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }, 3000); // Auto slide every 3 seconds
    });
}

// ===== Initialize Everything on DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
    // Start loader
    initLoader();

    initMobileAutoSlide();

    initGallery();
    initColorDots();
    initMobileMenu();
    initNavScrollEffect();
    initMagneticButtons();
    initSmoothAnchors();
    initNewsletter();

    // Initialize scroll animations
    initProductAnimations();
    initFeatureAnimations();
    initTestimonialAnimations();
    initSubscribeAnimations();
    initFooterAnimations();
    initParallax();
});

// ===== CRO Methods JS ===== //
document.addEventListener('DOMContentLoaded', () => {
    // 1. Countdown Timer
    const timerElement = document.getElementById('cro-timer');
    if (timerElement) {
        // Start from 4 hours, 59 mins, 59 secs
        let totalSeconds = 4 * 3600 + 59 * 60 + 59;
        
        setInterval(() => {
            if (totalSeconds <= 0) {
                totalSeconds = 24 * 3600; // Reset to 24 hours if it hits 0
            }
            totalSeconds--;
            
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            timerElement.textContent = 
                String(hours).padStart(2, '0') + ':' + 
                String(minutes).padStart(2, '0') + ':' + 
                String(seconds).padStart(2, '0');
        }, 1000);
    }

    // 2. Live Viewers Randomizer
    const viewerElements = document.querySelectorAll('.cro-viewers');
    setInterval(() => {
        viewerElements.forEach(el => {
            // Fluctuate viewers between 18 and 42
            const currentViewers = parseInt(el.textContent);
            const change = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
            let newViewers = currentViewers + change;
            if (newViewers < 12) newViewers = 12;
            if (newViewers > 55) newViewers = 55;
            el.textContent = newViewers;
        });
    }, 5000); // update every 5 seconds
});

// ===== Parallax Effect for FRAGRANCE Text =====
document.addEventListener('DOMContentLoaded', () => {
    const fragranceText = document.querySelector('.fragrance-text');
    if (fragranceText) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            // Move text up slightly as user scrolls down for a 3D parallax feel
            fragranceText.style.transform = `translateX(-50%) translateY(${scrollY * 0.25}px)`;
        });
    }

    // ===== Floating Mobile CTA Visibility =====
    const floatingCTA = document.getElementById('floatingCTA');
    const heroSection = document.getElementById('home');
    if (floatingCTA && heroSection) {
        window.addEventListener('scroll', () => {
            // Show CTA when user scrolls past the hero section (e.g. 500px down)
            if (window.scrollY > heroSection.offsetHeight - 100) {
                floatingCTA.classList.remove('translate-y-full');
                floatingCTA.classList.add('translate-y-0');
            } else {
                floatingCTA.classList.add('translate-y-full');
                floatingCTA.classList.remove('translate-y-0');
            }
        });
    }
});
