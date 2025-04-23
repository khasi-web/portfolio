
        // DOM Elements
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        const header = document.querySelector('header');
        const testimonials = document.querySelectorAll('.testimonial');
        const prevTestimonial = document.getElementById('prev-testimonial');
        const nextTestimonial = document.getElementById('next-testimonial');
        
        // Mobile Navigation Toggle
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Dark/Light Theme Toggle
        themeToggle.addEventListener('click', () => {
            document.body.dataset.theme = document.body.dataset.theme === 'light' ? '' : 'light';
            themeIcon.className = document.body.dataset.theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        });
        
        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'var(--bg-secondary)';
                header.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
            } else {
                header.style.backgroundColor = 'var(--bg-primary)';
                header.style.boxShadow = 'none';
            }
        });
        
        // Testimonials Slider
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.remove('active');
                if (i === index) {
                    testimonial.classList.add('active');
                }
            });
        }
        
        prevTestimonial.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
        
        nextTestimonial.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        
        // Form Submission
        const contactForm = document.getElementById('contact-form');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Here you would typically handle the form submission with AJAX
            // For this demo, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
        
        // Fade-in animations on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('section > .container').forEach(section => {
            observer.observe(section);
        });
        
        // Lazy Loading for Images
        document.querySelectorAll('img').forEach(img => {
            img.classList.add('img-loading');
            
            img.addEventListener('load', () => {
                img.classList.remove('img-loading');
            });
        });
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            // Check saved theme preference
            const savedTheme = localStorage.getItem('theme');
            
            if (savedTheme === 'light') {
                document.body.dataset.theme = 'light';
                themeIcon.className = 'fas fa-sun';
            }
            
            // Save theme preference
            themeToggle.addEventListener('click', () => {
                localStorage.setItem('theme', document.body.dataset.theme || 'dark');
            });
        });
   