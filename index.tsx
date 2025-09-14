/**
 * Fetches HTML content from a given URL and injects it into a specified element.
 * @param elementId The ID of the container element.
 * @param url The URL of the partial HTML file.
 */
async function loadComponent(elementId: string, url: string): Promise<void> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        const text = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = text;
        } else {
            console.error(`Element with id '${elementId}' not found.`);
        }
    } catch (error) {
        console.error(`Error loading component from ${url}:`, error);
    }
}

/**
 * Initializes all interactive scripts after the DOM is populated.
 */
function initializeScripts(): void {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId) {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add scroll effect to navigation and back to top button
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav?.classList.add('bg-white/95');
            backToTopButton?.classList.add('show');
        } else {
            nav?.classList.remove('bg-white/95');
            backToTopButton?.classList.remove('show');
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries, self) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target as HTMLElement;
                target.style.animationDelay = '0.2s';
                target.classList.add('slide-in');
                self.unobserve(target); // Stop observing after animation
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card-3d, section > div > div, .bounce-in').forEach(el => {
        observer.observe(el);
    });

    // FAQ Toggle functionality
    document.querySelectorAll('.faq-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling as HTMLElement | null;
            const icon = this.querySelector('.faq-icon');
            
            if (content && icon) {
                const isHidden = content.style.display === 'none' || content.style.display === '';
                document.querySelectorAll('.faq-content').forEach(c => (c as HTMLElement).style.display = 'none');
                document.querySelectorAll('.faq-icon').forEach(i => (i as HTMLElement).style.transform = 'rotate(0deg)');
                document.querySelectorAll('.faq-toggle').forEach(b => b.classList.remove('bg-blue-50'));

                if (isHidden) {
                    content.style.display = 'block';
                    (icon as HTMLElement).style.transform = 'rotate(180deg)';
                    this.classList.add('bg-blue-50');
                }
            }
        });
    });
}

/**
 * Main function to run on DOMContentLoaded.
 */
async function main() {
    const components = [
        { id: 'navigation-container', url: '_navigation.html' },
        { id: 'hero-container', url: '_hero.html' },
        { id: 'features-container', url: '_features.html' },
        { id: 'services-container', url: '_services.html' },
        { id: 'testimonials-container', url: '_testimonials.html' },
        { id: 'faq-container', url: '_faq.html' },
        { id: 'cta-container', url: '_cta.html' },
        { id: 'footer-container', url: '_footer.html' }
    ];

    // Load all components in parallel
    await Promise.all(
        components.map(comp => loadComponent(comp.id, comp.url))
    );

    // After all HTML is loaded and injected, initialize the scripts
    initializeScripts();
}

document.addEventListener('DOMContentLoaded', main);
