document.addEventListener('DOMContentLoaded', () => {
    // ===== PAGE LOADER =====
    const loader = document.getElementById('loaderScreen');
    if (loader) {
        // Smooth transition out
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
        }, 800);
    }

    // ===== NAV ACTIVE STATE BASED ON CURRENT URL =====
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === '/' && (currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '')) {
            link.classList.add('active');
        } else if (linkPath !== '/' && currentPath.includes(linkPath)) {
            link.classList.add('active');
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
        const hoverables = document.querySelectorAll('a, button, .filter-btn, .portfolio-item, .contact-widget, details');
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
    const hamburger = document.getElementById('navToggle');
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
            'Websites & Web Apps',
            'Custom POS & Invoicing Systems',
            'iOS & Android Mobile Apps',
            'Scalable SaaS Platforms',
            'Generative AI Integrations',
            'Technical SEO & Speed Tuning'
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

    // ===== CONTACT FORM & LEAD REDIRECTION =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Auto-select type based on URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const interest = urlParams.get('interest');
        if (interest) {
            const select = document.getElementById('formProjectType');
            if (select) {
                select.value = interest;
            }
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Extract values
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const phone = document.getElementById('formPhone').value;
            const company = document.getElementById('formCompany').value || 'Not Specified';
            const projectType = document.getElementById('formProjectType').value;
            const budget = document.getElementById('formBudget').value;
            const details = document.getElementById('formDescription').value;
            
            // 1. Alert confirmation
            alert(`🎉 Assalam-o-Alaikum ${name}!\n\nThank you for your scoping inquiry regarding: "${projectType}". Our developers will analyze your requirements and get back to you shortly.\n\nWe will now redirect you to WhatsApp to discuss details directly.`);
            
            // 2. Format WhatsApp Redirect Message
            const whatsappText = `Assalam-o-Alaikum SkyEagle Studio!\n\nMy name is *${name}*.\nI am writing to discuss a *${projectType}* project.\n\n*Scoping Details:*\n- *Email:* ${email}\n- *Phone:* ${phone}\n- *Company:* ${company}\n- *Budget:* ${budget}\n- *Description:* ${details}`;
            const whatsappUrl = `https://wa.me/923188791637?text=${encodeURIComponent(whatsappText)}`;
            
            // Open in new tab and reset form
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        });
    }

    // ===== DYNAMIC PORTFOLIO RENDERER =====
    // Card creation function exposed globally
    window.createProjectCard = function(project, isInSubfolder = false) {
        const relativePrefix = isInSubfolder ? '../' : '';
        
        const item = document.createElement('div');
        item.className = 'portfolio-item';
        item.setAttribute('data-category', project.category.toLowerCase());
        item.setAttribute('data-tags', project.technologies.join(', ').toLowerCase());
        
        // Badge
        const badge = document.createElement('span');
        badge.className = 'portfolio-badge';
        badge.textContent = project.industry;
        item.appendChild(badge);
        
        // Asset Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'portfolio-asset-wrapper';
        
        if (project.imageUrl) {
            const img = document.createElement('img');
            img.src = relativePrefix + project.imageUrl;
            img.alt = project.name;
            img.className = 'portfolio-image';
            img.loading = 'lazy';
            wrapper.appendChild(img);
        } else {
            // Fallback to CSS mockup graphic
            const frame = document.createElement('div');
            frame.className = 'custom-mockup-frame';
            frame.style.borderColor = project.mockupBorderColor || '#ff00f7';
            frame.style.padding = '25px';
            frame.style.height = '100%';
            frame.style.display = 'flex';
            frame.style.flexDirection = 'column';
            frame.style.justifyContent = 'center';
            
            const iconClass = project.mockupIcon || 'fa-globe';
            const subtitle = project.mockupSubtitle || 'Web Application';
            
            frame.innerHTML = `
                <div class="mockup-header" style="margin-bottom:10px;">
                    <span class="mock-dot red"></span>
                    <span class="mock-dot yellow"></span>
                    <span class="mock-dot green"></span>
                </div>
                <div class="mockup-body" style="padding:15px 0;">
                    <i class="fas ${iconClass}" style="font-size:2.5rem; color:${project.mockupBorderColor || '#ff00f7'}; margin-bottom:12px; display:block;"></i>
                    <h4 style="font-family:var(--font-heading); color:#fff; font-size:1rem; margin-bottom:5px;">${project.name}</h4>
                    <p style="color:#666; font-size:0.75rem; margin:0;">${subtitle}</p>
                </div>
            `;
            wrapper.appendChild(frame);
        }
        item.appendChild(wrapper);
        
        // Content
        const content = document.createElement('div');
        content.className = 'portfolio-content';
        
        const type = document.createElement('span');
        type.className = 'portfolio-type';
        type.textContent = project.type;
        content.appendChild(type);
        
        const title = document.createElement('h3');
        title.className = 'portfolio-title';
        title.textContent = project.name;
        content.appendChild(title);
        
        const desc = document.createElement('p');
        desc.className = 'portfolio-desc';
        desc.textContent = project.description;
        content.appendChild(desc);
        
        // Tech tags
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'tech-tags';
        project.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = tech;
            tagsDiv.appendChild(span);
        });
        content.appendChild(tagsDiv);
        
        // Buttons
        const btnsDiv = document.createElement('div');
        btnsDiv.className = 'portfolio-buttons';
        
        const liveLink = document.createElement('a');
        liveLink.href = project.liveUrl.startsWith('contact.html') ? (relativePrefix + project.liveUrl) : project.liveUrl;
        liveLink.className = 'btn btn-primary';
        if (!project.liveUrl.startsWith('contact.html')) {
            liveLink.target = '_blank';
            liveLink.rel = 'noopener noreferrer';
        }
        liveLink.innerHTML = project.liveUrl.startsWith('contact.html') ? 'Inquire <i class="fas fa-arrow-right" style="margin-left:4px;"></i>' : 'Live Site <i class="fas fa-external-link-alt" style="margin-left:4px;"></i>';
        btnsDiv.appendChild(liveLink);
        
        const caseLink = document.createElement('a');
        caseLink.href = `${relativePrefix}projects/case-study.html?slug=${project.slug}`;
        caseLink.className = 'btn btn-secondary';
        caseLink.textContent = 'Case Study';
        btnsDiv.appendChild(caseLink);
        
        content.appendChild(btnsDiv);
        item.appendChild(content);
        
        return item;
    };

    // ----- Render Homepage Selected Work -----
    const homeGrid = document.getElementById('featuredProjectsGrid');
    if (homeGrid && window.projectsData) {
        // Load first 7 projects
        const featured = window.projectsData.slice(0, 7);
        homeGrid.innerHTML = '';
        featured.forEach(project => {
            const card = createProjectCard(project, false);
            homeGrid.appendChild(card);
        });
    }

    // ----- Render Work Page Index with Search & Filters -----
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid && window.projectsData) {
        const searchInput = document.getElementById('projectSearch');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const noResults = document.getElementById('noResultsAlert');
        
        let activeFilter = 'all';
        let searchQuery = '';

        function renderFilteredProjects() {
            projectsGrid.innerHTML = '';
            let visibleCount = 0;

            window.projectsData.forEach(project => {
                const name = project.name.toLowerCase();
                const desc = project.description.toLowerCase();
                const category = project.category.toLowerCase();
                const tech = project.technologies.join(', ').toLowerCase();
                const industry = project.industry.toLowerCase();
                
                // Matches Category Filter
                const matchesFilter = activeFilter === 'all' || 
                                      category === activeFilter ||
                                      (activeFilter === 'mobile apps' && project.type.toLowerCase().includes('mobile')) ||
                                      (activeFilter === 'saas' && project.type.toLowerCase().includes('saas')) ||
                                      (activeFilter === 'ai' && project.type.toLowerCase().includes('ai')) ||
                                      (activeFilter === 'healthcare' && project.industry.toLowerCase().includes('healthcare')) ||
                                      (activeFilter === 'real estate' && project.industry.toLowerCase().includes('real estate'));
                
                // Matches Search Query
                const matchesSearch = name.includes(searchQuery) ||
                                      desc.includes(searchQuery) ||
                                      tech.includes(searchQuery) ||
                                      industry.includes(searchQuery) ||
                                      category.includes(searchQuery);

                if (matchesFilter && matchesSearch) {
                    const card = createProjectCard(project, false);
                    projectsGrid.appendChild(card);
                    visibleCount++;
                }
            });

            // Handle Empty Search/Filter State
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        }

        // Render Initially
        renderFilteredProjects();

        // Listen for Search Inputs
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.toLowerCase().trim();
                renderFilteredProjects();
            });
        }

        // Listen for Filter Button Clicks
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = btn.getAttribute('data-filter').toLowerCase();
                renderFilteredProjects();
            });
        });
    }
});
