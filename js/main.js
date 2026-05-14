document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    const words = ['Développeur Full Stack', 'Expert MIAGE', 'Concepteur SI', 'Freelance'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 200;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 100;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typingElement) {
        type();
    }

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('#stats');
    let animated = false;

    const animateStats = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const increment = target / 50;
            let current = 0;

            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    stat.innerText = Math.ceil(current);
                    setTimeout(updateCount, 30);
                } else {
                    stat.innerText = target + (target > 1 ? '+' : '');
                }
            };
            updateCount();
        });
    };

    // Optimized scroll logic for header and stats
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            window.requestAnimationFrame(() => {
                // Header transparency
                const header = document.querySelector('header');
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Stats animation
                if (statsSection && !animated) {
                    const sectionPos = statsSection.getBoundingClientRect().top;
                    const screenPos = window.innerHeight / 1.3;
                    if (sectionPos < screenPos) {
                        animateStats();
                        animated = true;
                    }
                }

                scrollTimeout = false;
            });
            scrollTimeout = true;
        }
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Home Contact Form Handling
    const homeContactForm = document.getElementById('home-contact-form');
    if (homeContactForm) {
        homeContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Merci ! Votre message a été envoyé avec succès. (Démo)');
            homeContactForm.reset();
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Portfolio Modal Lightbox
    const modal = document.getElementById('portfolio-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalLink = document.getElementById('modal-link');
    const closeBtn = document.querySelector('.modal-close');

    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');
            const tags = item.getAttribute('data-tags').split(',');
            const link = item.getAttribute('data-link');
            const imgSrc = item.querySelector('img').src;

            modalImg.src = imgSrc;
            modalTitle.innerText = title;
            modalDesc.innerText = desc;
            modalLink.href = link;
            
            // Clear and add tags
            modalTags.innerHTML = '';
            tags.forEach(tag => {
                const span = document.createElement('span');
                span.innerText = tag.trim();
                modalTags.appendChild(span);
            });

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Pricing Order Modal Logic
    const pricingModal = document.getElementById('pricing-modal');
    const selectedPlanName = document.getElementById('selected-plan-name');
    const planInput = document.getElementById('plan-input');
    const pricingCloseBtn = document.querySelector('.pricing-modal-close');

    document.querySelectorAll('.open-order-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const plan = btn.getAttribute('data-plan');
            selectedPlanName.innerText = plan;
            planInput.value = plan;
            pricingModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    if (pricingCloseBtn) {
        pricingCloseBtn.addEventListener('click', () => {
            pricingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    const orderForm = document.getElementById('pricing-order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert(`Commande confirmée pour le pack : ${planInput.value}. Nous vous contacterons sous peu !`);
            pricingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            orderForm.reset();
        });
    }

    // Close pricing modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === pricingModal) {
            pricingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Scroll Reveal Animation Logic
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // Skill Bars Animation on Scroll
    const skillsSection = document.querySelector('#resume');
    const skillBars = document.querySelectorAll('.skill-bar');
    let skillsAnimated = false;

    const animateSkills = () => {
        skillBars.forEach(bar => {
            const width = bar.parentElement.previousElementSibling.querySelector('span:last-child').innerText;
            bar.style.width = width;
        });
    };

    // Card Glow Effect Tracking
    const glowCards = document.querySelectorAll('.service, .pricing-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // Magnetic Buttons Effect
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-cv, .social-link');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // Hero Parallax Effect
    const heroSection = document.querySelector('.heros');
    window.addEventListener('scroll', () => {
        if (heroSection) {
            const scrollVal = window.scrollY;
            heroSection.style.backgroundPositionY = `${scrollVal * 0.5}px`;
        }
    });

    // Modified scroll logic to include skills
    window.addEventListener('scroll', () => {
        if (skillsSection && !skillsAnimated) {
            const sectionPos = skillsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            if (sectionPos < screenPos) {
                animateSkills();
                skillsAnimated = true;
            }
        }
    });

    // Mobile Menu Logic
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            const isActive = mobileMenu.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navList.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navList.classList.contains('active') && !navList.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navList.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});
