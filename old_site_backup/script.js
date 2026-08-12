document.addEventListener('DOMContentLoaded', () => {
    // ===== PAGE LOADER =====
    const loader = document.querySelector('.loading-screen');
    if (loader) {
        // Just a fallback in case CSS animation doesn't fire
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
        }, 1500);
    }

    // ===== NAV ACTIVE STATE BASED ON CURRENT URL =====
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath) && linkPath !== '#') {
            link.classList.add('active');
        } else if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
            if (linkPath === 'index.html' || linkPath === '#home') {
                link.classList.add('active');
            }
        }
    });

    // ===== CUSTOM CURSOR (DESKTOP ONLY) =====
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (cursor && cursorFollower && !isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 80);
        });

        // Hover effects for links and buttons
        const hoverables = document.querySelectorAll('a, button, .filter-btn, .portfolio-item, .contact-widget');
        hoverables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = '#ff00f7';
                cursorFollower.style.transform = 'scale(1.8)';
                cursorFollower.style.borderColor = '#00f0ff';
            });
            item.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#00f0ff';
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.borderColor = '#ff00f7';
            });
        });
    } else {
        // Hide custom cursor elements on mobile/touch screens
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
    }

    // ===== HAMBURGER MOBILE MENU TOGGLE =====
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinksList = document.querySelector('.nav-links');

    if (hamburger && navLinksList) {
        hamburger.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navLinksList.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });

        // Close links when single link is clicked
        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    // ===== HERO TYPEWRITER ANIMATION =====
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const texts = [
            'Professional Web Design',
            'Fast Mobile Apps',
            'E-Commerce Solutions',
            'Custom Software Development',
            'Beautiful UI/UX Design',
            'Hair Transplant Clinics & Care Web Systems',
            'Global Client Support'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (!isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(typeWriter, 2000);
                    return;
                }
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                }
            }
            
            setTimeout(typeWriter, isDeleting ? 50 : 100);
        }

        typeWriter();
    }

    // ===== SMOOTH SCROLL (ONLY ON LOCAL HASH LINKS) =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== FLOATING ORBS PARALLAX ON SCROLL =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.orb');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.08;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===== CONTACT FORM MANAGEMENT =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Auto-select based on URL query param
        const urlParams = new URLSearchParams(window.location.search);
        const interest = urlParams.get('interest');
        if (interest) {
            const select = contactForm.querySelector('select');
            if (select) {
                if (interest === 'hair-transplant') {
                    select.value = 'Hair Transplant & Aesthetics System';
                } else if (interest === 'pos') {
                    select.value = 'Custom POS & SaaS Software';
                } else if (interest === 'graphics') {
                    select.value = 'Graphic Designs';
                }
            }
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Extract values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const phone = contactForm.querySelector('input[type="tel"]').value;
            const projectType = contactForm.querySelector('select') ? contactForm.querySelector('select').value : 'Not Specified';
            const details = contactForm.querySelector('textarea').value;
            
            alert(`🎉 Assalam-o-Alaikum ${name}! Thank you for your inquiry regarding: "${projectType}".\n\nOur team has received your details and will get back to you shortly at ${email} or via call/WhatsApp at ${phone || 'provided number'}.`);
            contactForm.reset();
        });
    }

    // ===== LIVE SEARCH & FILTER (PROJECTS PAGE) =====
    const searchBar = document.getElementById('projectSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.portfolio-item');
    const noResults = document.querySelector('.no-results');

    if (projectItems.length > 0) {
        let currentFilter = 'all';
        let searchQuery = '';

        function filterProjects() {
            let visibleCount = 0;

            projectItems.forEach(item => {
                const title = item.querySelector('.portfolio-title').textContent.toLowerCase();
                const desc = item.querySelector('.portfolio-desc').textContent.toLowerCase();
                const category = item.getAttribute('data-category').toLowerCase();
                const tags = item.getAttribute('data-tags') ? item.getAttribute('data-tags').toLowerCase() : '';
                
                const matchesFilter = currentFilter === 'all' || category === currentFilter;
                const matchesSearch = title.includes(searchQuery) || 
                                      desc.includes(searchQuery) || 
                                      category.includes(searchQuery) ||
                                      tags.includes(searchQuery);

                if (matchesFilter && matchesSearch) {
                    item.style.display = 'block';
                    // Trigger fade-in animation trigger
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            if (noResults) {
                if (visibleCount === 0) {
                    noResults.style.display = 'block';
                } else {
                    noResults.style.display = 'none';
                }
            }
        }

        // Search inputs
        if (searchBar) {
            searchBar.addEventListener('input', (e) => {
                searchQuery = e.target.value.toLowerCase().trim();
                filterProjects();
            });
        }

        // Filter button click handler
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentFilter = button.getAttribute('data-filter');
                filterProjects();
            });
        });
    }
});
