// Ext.js Application for Portfolio Website
Ext.application({
    name: 'PortfolioApp',
    
    launch: function() {
        // Initialize the application
        this.initApp();
    },
    
    initApp: function() {
        // Wait for DOM to be ready
        Ext.onReady(() => {
            this.setupDarkMode();
            this.setupNavigation();
            this.setupAnimations();
            this.setupCounters();
            this.setupSkillBars();
            this.setupScrollEffects();
            this.setupMobileMenu();
            this.setupContactFeatures();
            this.setupPerformanceOptimizations();
        });
    },
    
    setupNavigation: function() {
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Active navigation highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('text-primary-600');
                link.classList.add('text-gray-700');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.remove('text-gray-700');
                    link.classList.add('text-primary-600');
                }
            });
        });
    },
    
    setupAnimations: function() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.animate-slide-up, .animate-fade-in');
        animateElements.forEach(el => {
            observer.observe(el);
        });
        
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('#home');
            if (hero && scrolled < hero.offsetHeight) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    },
    
    setupCounters: function() {
        // Counter animation for statistics
        const counters = document.querySelectorAll('.counter');
        
        const animateCounter = (counter) => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = target * easeOutQuart;
                
                if (progress < 1) {
                    if (target === 1.5) {
                        counter.textContent = current.toFixed(1);
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target === 1.5) {
                        counter.textContent = target;
                    } else {
                        counter.textContent = target + '+';
                    }
                }
            };
            
            requestAnimationFrame(updateCounter);
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
        
        // Also trigger on page load if counters are visible
        setTimeout(() => {
            counters.forEach(counter => {
                if (PortfolioUtils.isInViewport(counter)) {
                    animateCounter(counter);
                }
            });
        }, 1000);
    },
    
    setupSkillBars: function() {
        // Skill bars animation
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                    
                    skillObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    },
    
    setupScrollEffects: function() {
        // Navbar background change on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('bg-white/98', 'shadow-lg');
                navbar.classList.remove('bg-white/95');
            } else {
                navbar.classList.remove('bg-white/98', 'shadow-lg');
                navbar.classList.add('bg-white/95');
            }
        });
        
        // Typing effect for hero title
        const heroTitle = document.querySelector('#home h1');
        if (heroTitle) {
            const originalText = heroTitle.innerHTML;
            this.typeWriter(heroTitle, originalText, 50);
        }
    },
    
    setupMobileMenu: function() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    },
    
    setupContactFeatures: function() {
        // Copy to clipboard functionality
        window.copyToClipboard = (text) => {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('Email copied to clipboard!', 'success');
            }).catch(() => {
                this.showToast('Failed to copy email', 'error');
            });
        };
        
        // Contact form validation (if added later)
        const contactForms = document.querySelectorAll('form');
        contactForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        });
    },
    
    setupDarkMode: function() {
        try { attachDarkModeToggle(); } catch (e) {}
    },
    
    setupPerformanceOptimizations: function() {
        // Lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
        
        // Preload critical resources
        this.preloadResources();
    },
    
    typeWriter: function(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    },
    
    showToast: function(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    },
    
    handleFormSubmission: function(form) {
        // Handle form submission (placeholder for future implementation)
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your backend
        console.log('Form data:', data);
        
        this.showToast('Thank you for your message! I\'ll get back to you soon.', 'success');
        form.reset();
    },
    
    preloadResources: function() {
        // Preload critical resources
        const criticalResources = [
            'resume/Amit_Ranjan_-_Software_Designer.pdf'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'document';
            document.head.appendChild(link);
        });
    }
});

// Additional utility functions
const PortfolioUtils = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Smooth scroll to element
    scrollToElement: function(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
};

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Ensure dark-mode toggle binds regardless of framework readiness
(function() {
	try { attachDarkModeToggle(); } catch (e) {}
	window.addEventListener('load', function() {
		try { attachDarkModeToggle(); } catch (e) {}
	});
})();

// Shared, idempotent toggle binder used by both Ext and vanilla init
function attachDarkModeToggle() {
	const toggle = document.getElementById('dark-mode-toggle');
	const savedMode = localStorage.getItem('darkMode');
	const darkMode = savedMode === null ? true : savedMode === 'true';

	if (darkMode) {
		document.documentElement.classList.add('dark');
		localStorage.setItem('darkMode', 'true');
	} else {
		document.documentElement.classList.remove('dark');
		localStorage.setItem('darkMode', 'false');
	}

	// expose programmatic toggle
	const toggleDarkMode = () => {
		const isDark = document.documentElement.classList.contains('dark');
		if (isDark) {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('darkMode', 'false');
		} else {
			document.documentElement.classList.add('dark');
			localStorage.setItem('darkMode', 'true');
		}
	};
	window.toggleDarkMode = toggleDarkMode;

	if (toggle) {
		if (!toggle.__darkBound) {
			toggle.__darkBound = true;
			toggle.addEventListener('click', () => {
				toggleDarkMode();
				try { toggle.style.transform = 'scale(0.95)'; setTimeout(() => { toggle.style.transform = 'scale(1)'; }, 150); } catch (_) {}
			}, { passive: true });
			toggle.addEventListener('touchstart', (e) => {
				e.preventDefault();
				toggleDarkMode();
			}, { passive: false });
		}
	}

	// Delegated listener to catch clicks on descendants or if node is re-rendered
	if (!document.__darkDelegatedBound) {
		document.__darkDelegatedBound = true;
		document.addEventListener('click', (e) => {
			const target = e.target && (e.target.closest ? e.target.closest('#dark-mode-toggle') : null);
			if (target) {
				// if main toggle exists use it for feedback, otherwise just toggle
				try { if (target.style) { target.style.transform = 'scale(0.95)'; setTimeout(() => { target.style.transform = 'scale(1)'; }, 150); } } catch (_) {}
				toggleDarkMode();
			}
		}, { capture: false });
	}

	toggle.addEventListener('click', toggleDarkMode, { passive: true });
	toggle.addEventListener('touchstart', (e) => {
		e.preventDefault();
		toggleDarkMode();
	}, { passive: false });

	const mobileToggle = document.querySelector('[onclick*="dark-mode-toggle"]');
	if (mobileToggle && !mobileToggle.__darkBound) {
		mobileToggle.__darkBound = true;
		mobileToggle.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (typeof window.toggleDarkMode === 'function') { window.toggleDarkMode(); }
		});
	}
}
