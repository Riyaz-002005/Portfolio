/* ==========================================================================
   NOVAForge - Gamer Command Center Landing JavaScript
   Preloader, Profile Session, Typing Loop, Game Logs, Recommendation Engine,
   Platform Sync Simulation, Stat Observers, News Reader, Testimonial Slider,
   and Robust Modal Handlers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initGamerSession();
    initNavbarScroll();
    initMobileNav();
    initTypingEffect();
    initCursorGlow();
    initParallax();
    initModalListeners();
    initIntersectionObservers();
    initTestimonialsSlider();
    initContactForm();
    initBackToTop();
    checkSuitClaimState();
});

/* ==========================================================================
   1. Preloader Animation
   ========================================================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');

    if (!preloader) return;

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 18) + 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                document.body.classList.remove('loading');
            }, 400);
        }
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (progressPercent) progressPercent.textContent = `${progress}%`;
    }, 50);
}

/* ==========================================================================
   2. Gamer Profile Session Integration
   ========================================================================== */
function initGamerSession() {
    const headerUsername = document.getElementById('headerUsername');
    if (!headerUsername) return;

    const savedGamer = localStorage.getItem('novaforge_gamer');
    if (savedGamer) {
        try {
            const gamerData = JSON.parse(savedGamer);
            if (gamerData && gamerData.gamertag) {
                headerUsername.textContent = gamerData.gamertag;
            }
        } catch (e) {
            console.warn('Session parse error:', e);
        }
    }
}

/* ==========================================================================
   3. Sticky Navbar & Active Link Observer
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   4. Mobile Navigation Menu
   ========================================================================== */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const toggleIcon = document.getElementById('toggleIcon');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        toggleIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (toggleIcon) toggleIcon.className = 'fa-solid fa-bars';
        });
    });
}

/* ==========================================================================
   5. Hero Typing Text Effect
   ========================================================================== */
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const phrases = [
        "Track Your Playtime.",
        "Celebrate 100% Platinums.",
        "Discover What To Play Next.",
        "Sync Xbox, PlayStation, Steam & Epic."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ==========================================================================
   6. Mouse Glow Follower
   ========================================================================== */
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (!cursorGlow && !cursorDot && !cursorRing) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function renderCursors() {
        // High-performance GPU translate3d hardware composition
        if (cursorDot) {
            const dotScale = isHovered ? 1.5 : 1;
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        }

        if (cursorGlow) {
            cursorGlow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        }

        if (cursorRing) {
            // Smooth lerp calculation
            ringX += (mouseX - ringX) * 0.25;
            ringY += (mouseY - ringY) * 0.25;

            const ringScale = isHovered ? 1.15 : 1;
            const ringRotate = isHovered ? 'rotate(45deg)' : 'rotate(0deg)';
            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale}) ${ringRotate}`;
        }

        requestAnimationFrame(renderCursors);
    }
    requestAnimationFrame(renderCursors);

    // Optimized event delegation for hover states
    const interactiveSelector = 'a, button, input, select, textarea, .game-card, .btn-claim-suit, .badge-suit-claim, .nav-link, .social-btn, [role="button"]';
    
    document.addEventListener('mouseover', (e) => {
        if (e.target && e.target.closest && e.target.closest(interactiveSelector)) {
            if (!isHovered) {
                isHovered = true;
                if (cursorRing) cursorRing.classList.add('hovered');
                if (cursorDot) cursorDot.classList.add('hovered');
            }
        }
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
        if (e.target && e.target.closest && e.target.closest(interactiveSelector)) {
            if (isHovered) {
                isHovered = false;
                if (cursorRing) cursorRing.classList.remove('hovered');
                if (cursorDot) cursorDot.classList.remove('hovered');
            }
        }
    }, { passive: true });
}

/* ==========================================================================
   7. Parallax Background Effect
   ========================================================================== */
function initParallax() {
    const heroBg = document.querySelector('.hero-bg-img');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        if (scroll < window.innerHeight) {
            heroBg.style.transform = `scale(1.08) translateY(${scroll * 0.35}px)`;
        }
    });
}

/* ==========================================================================
   8. Global Modal Event Handlers
   ========================================================================== */
function closeModal() {
    const modal = document.getElementById('interactiveModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            const modalBody = document.getElementById('modalBody');
            if (modalBody && !modal.classList.contains('active')) {
                modalBody.innerHTML = '';
            }
        }, 300);
    }
}

function initModalListeners() {
    const modal = document.getElementById('interactiveModal');
    const closeBtn = document.getElementById('closeInteractiveModal');

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

/* ==========================================================================
   9. Finished Game Log Modal
   ========================================================================== */
function openFinishedGameModal(title, image, hours, status, genre, platform) {
    const modal = document.getElementById('interactiveModal');
    const modalBody = document.getElementById('modalBody');
    if (!modal || !modalBody) return;

    const isSpiderMan = title.toLowerCase().includes('spider-man');
    const isSuitClaimed = localStorage.getItem('novaforge_spiderman_suit_claimed') === 'true';

    let suitRewardHTML = '';
    if (isSpiderMan) {
        suitRewardHTML = `
            <div style="background: linear-gradient(135deg, rgba(255,43,61,0.12), rgba(255,140,0,0.08)); border: 1px solid rgba(255,43,61,0.35); padding: 1rem 1.2rem; border-radius: 12px; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
                <div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
                        <span style="background: rgba(255,43,61,0.2); color: #ff2b3d; font-family: var(--font-subheading); font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.7rem; text-transform: uppercase;">
                            <i class="fa-solid fa-gift"></i> BONUS IN-GAME SUIT
                        </span>
                        <strong style="color: #fff; font-family: var(--font-heading); font-size: 0.95rem;">Brand New Day Suit</strong>
                    </div>
                    <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0;">Peter Parker Comic Suit with Electro-Web Burst & Nano wings</p>
                </div>
                <button class="${isSuitClaimed ? 'btn-claim-suit claimed' : 'btn-claim-suit'}" onclick="openSuitClaimModal(event)" style="flex-shrink: 0;">
                    <i class="${isSuitClaimed ? 'fa-solid fa-circle-check' : 'fa-solid fa-gift'}"></i> ${isSuitClaimed ? 'Suit Unlocked' : 'Claim Suit'}
                </button>
            </div>
        `;
    }

    modalBody.innerHTML = `
        <div class="game-modal-content">
            <div style="position: relative; height: 280px; border-radius: 16px; overflow: hidden; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.15);">
                <img src="${image}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(180deg, transparent 40%, rgba(7,8,14,0.95) 100%);"></div>
                <div style="position: absolute; bottom: 1.5rem; left: 1.5rem; right: 1.5rem;">
                    <span style="background: var(--neon-blue); color: #000; font-weight: 800; padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.8rem; text-transform: uppercase;">${genre}</span>
                    <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-top: 0.5rem; color: #fff;">${title}</h2>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; text-align: center; background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
                <div>
                    <span style="color: var(--text-muted); font-size: 0.8rem; display: block;">TOTAL PLAYTIME</span>
                    <strong style="color: var(--neon-blue); font-family: var(--font-subheading); font-size: 1.2rem;">${hours}</strong>
                </div>
                <div>
                    <span style="color: var(--text-muted); font-size: 0.8rem; display: block;">TROPHY STATUS</span>
                    <strong style="color: var(--gold); font-family: var(--font-subheading); font-size: 1.2rem;">${status}</strong>
                </div>
                <div>
                    <span style="color: var(--text-muted); font-size: 0.8rem; display: block;">SYNCED PLATFORM</span>
                    <strong style="color: var(--neon-purple); font-family: var(--font-subheading); font-size: 1.2rem;">${platform}</strong>
                </div>
            </div>

            ${suitRewardHTML}

            <h4 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.6rem; color: var(--neon-orange);">GAMER COMPLETION LOG & NOTES</h4>
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.8rem; font-size: 0.95rem;">
                Campaign completed with 100% achievement collection. All main storyline arcs, secret bosses, and expansion packs fully mastered. Synced live with your cloud gaming account.
            </p>

            <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
                <button class="btn btn-primary btn-glow" style="flex: 1;" onclick="showToast('Replay Session Started on ${platform}', 'success')">
                    <i class="fa-solid fa-play"></i> RE-LAUNCH GAME
                </button>
                <a href="feedback.html?game=${encodeURIComponent(title)}" class="btn btn-primary" style="flex: 1; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.4rem; background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); border: none;">
                    <i class="fa-solid fa-comment-dots"></i> GIVE FEEDBACK
                </a>
                <button class="btn btn-secondary" style="flex: 1;" onclick="closeModal()">
                    <i class="fa-solid fa-xmark"></i> CLOSE LOG
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

/* ==========================================================================
   10. Recommendation Match Modal
   ========================================================================== */
function openRecommendModal(title, matchRate, basedOn, description) {
    const modal = document.getElementById('interactiveModal');
    const modalBody = document.getElementById('modalBody');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <div style="padding: 1rem 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span class="section-tag" style="margin:0;">RECOMMENDATION ENGINE MATCH</span>
                <span style="background: var(--neon-green); color: #000; font-family: var(--font-subheading); font-weight: 800; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.9rem;">${matchRate} MATCH</span>
            </div>

            <h2 style="font-family: var(--font-heading); font-size: 1.9rem; margin-bottom: 0.8rem; color: #fff;">${title}</h2>
            <p style="color: var(--neon-blue); font-family: var(--font-subheading); font-size: 1rem; font-weight: 700; margin-bottom: 1.2rem;">
                Matched based on your finished title: <span style="color: var(--gold);">${basedOn}</span>
            </p>

            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.98rem; margin-bottom: 1.8rem;">
                ${description} Our AI gamer algorithm calculated this match based on combat pacing, narrative depth, world exploration mechanics, and community ratings from players with similar game logs.
            </p>

            <div style="display: flex; gap: 1rem;">
                <button class="btn btn-primary" style="flex: 1;" onclick="showToast('${title} added to your Next-To-Play list!', 'success'); closeModal();">
                    <i class="fa-solid fa-bookmark"></i> ADD TO NEXT-TO-PLAY LIST
                </button>
                <button class="btn btn-secondary" style="flex: 1;" onclick="closeModal()">
                    <i class="fa-solid fa-xmark"></i> CLOSE DETAILS
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

/* ==========================================================================
   11. Platform Account Sync Simulation Modal
   ========================================================================== */
function syncPlatformModal(platformName) {
    const modal = document.getElementById('interactiveModal');
    const modalBody = document.getElementById('modalBody');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <div class="text-center" style="padding: 1.5rem 0;">
            <i class="fa-solid fa-arrows-rotate fa-spin" style="font-size: 3rem; color: var(--neon-blue); margin-bottom: 1.2rem;"></i>
            <h2 style="font-family: var(--font-heading); font-size: 1.6rem; margin-bottom: 0.6rem; color: #fff;">Syncing ${platformName} Account</h2>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem;" id="syncStatusText">Connecting to ${platformName} Cloud API...</p>

            <div class="progress-bar-container" style="max-width: 400px; margin: 0 auto 1.5rem;">
                <div class="progress-bar" id="syncModalBar" style="width: 20%; transition: width 0.3s ease;"></div>
            </div>
        </div>
    `;

    modal.classList.add('active');

    const syncBar = document.getElementById('syncModalBar');
    const syncStatusText = document.getElementById('syncStatusText');

    setTimeout(() => {
        if (syncBar) syncBar.style.width = '60%';
        if (syncStatusText) syncStatusText.textContent = `Fetching latest ${platformName} playtime & trophy achievements...`;
    }, 700);

    setTimeout(() => {
        if (syncBar) syncBar.style.width = '100%';
        if (syncStatusText) syncStatusText.textContent = `Sync Complete! Updated 42 game logs and cloud save states.`;
        showToast(`${platformName} Account Successfully Synced!`, 'success');

        setTimeout(() => {
            closeModal();
        }, 1200);
    }, 1600);
}

/* ==========================================================================
   12. Gaming & NVIDIA News Modal Reader
   ========================================================================== */
function openNewsModal(title) {
    const modal = document.getElementById('interactiveModal');
    const modalBody = document.getElementById('modalBody');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <div style="padding: 1rem 0;">
            <span class="section-tag" style="color: var(--nvidia-green);"><i class="fa-solid fa-microchip"></i> TECH DISPATCH</span>
            <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin: 0.5rem 0 1.2rem; color: #fff;">${title}</h2>
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1rem; margin-bottom: 1.5rem;">
                NVIDIA has officially showcased next-generation hardware architecture alongside DLSS 4.0 neural frame reconstruction technology. Designed to deliver smooth 240FPS gaming at native 4K with full path-traced lighting effects.
            </p>
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1rem; margin-bottom: 1.8rem;">
                "Neural graphics processing transforms how games render complex shadows, volumetric fog, and ray reflections," stated NVIDIA GPU engineers. All major AAA game engines (Unreal Engine 5.4, RE Engine, Frostbite) are fully integrating native DLSS 4.0 support.
            </p>
            <button class="btn btn-primary" onclick="closeModal()">CLOSE TECH DISPATCH</button>
        </div>
    `;

    modal.classList.add('active');
}

/* ==========================================================================
   13. Intersection Observers (Scroll Reveal & Stat Counter)
   ========================================================================== */
function initIntersectionObservers() {
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    const statCards = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                statCards.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCount(stat, target, 2000);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('achievements');
    if (statsSection) statsObserver.observe(statsSection);
}

function animateCount(element, target, duration) {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    const timer = setInterval(() => {
        start += Math.ceil(target / 40);
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = start;
        }
    }, stepTime);
}

/* ==========================================================================
   14. Testimonials Auto-Carousel
   ========================================================================== */
function initTestimonialsSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;

    let currentSlide = 0;
    let autoSlideInterval;

    function goToSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 4500);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            goToSlide(index);
            startAutoSlide();
        });
    });

    startAutoSlide();
}

/* ==========================================================================
   15. Contact Form Handler
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const sendBtn = document.getElementById('sendBtn');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !subject || !message) {
            showToast('Please complete all required fields.', 'error');
            return;
        }

        sendBtn.disabled = true;
        sendBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> TRANSMITTING SIGNAL...';

        setTimeout(() => {
            showToast('Gamer Signal Transmitted! Squad support will connect with you shortly.', 'success');
            form.reset();
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<span class="btn-text">TRANSMIT GAMER SIGNAL</span> <i class="fa-solid fa-paper-plane btn-icon"></i>';
        }, 1500);
    });
}

function handleNewsletter(e) {
    e.preventDefault();
    showToast('Subscribed to VIP Gamer Hardware & Sale Alerts!', 'success');
    e.target.reset();
}

/* ==========================================================================
   16. Back To Top Floating Button
   ========================================================================== */
function initBackToTop() {
    const backBtn = document.getElementById('backToTopBtn');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    });

    backBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   17. Toast Notification Helper
   ========================================================================== */
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.style.cssText = `
        background: rgba(15, 18, 30, 0.95);
        border: 1px solid ${type === 'success' ? 'var(--neon-green)' : 'var(--neon-pink)'};
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
        color: #ffffff;
        padding: 1rem 1.4rem;
        border-radius: 12px;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        animation: toastIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `;

    toast.innerHTML = `
        <i class="${type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation'}" style="color: ${type === 'success' ? 'var(--neon-green)' : 'var(--neon-pink)'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(50px)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

/* ==========================================================================
   18. Spider-Man Brand New Day Suit Claim Feature
   ========================================================================== */
function checkSuitClaimState() {
    const isClaimed = localStorage.getItem('novaforge_spiderman_suit_claimed') === 'true';
    updateSuitClaimUI(isClaimed);
}

function updateSuitClaimUI(isClaimed) {
    const badge = document.getElementById('spiderSuitBadge');
    const badgeText = document.getElementById('spiderBadgeText');
    const box = document.getElementById('spiderSuitCardBox');
    const btn = document.getElementById('spiderSuitBtn');
    const btnText = document.getElementById('spiderSuitBtnText');

    if (!badge || !box || !btn) return;

    if (isClaimed) {
        badge.classList.add('claimed');
        if (badgeText) badgeText.textContent = 'Suit Unlocked';
        box.classList.add('claimed-box');
        btn.classList.add('claimed');
        if (btnText) btnText.textContent = 'Suit Claimed';
    } else {
        badge.classList.remove('claimed');
        if (badgeText) badgeText.textContent = 'Exclusive Suit';
        box.classList.remove('claimed-box');
        btn.classList.remove('claimed');
        if (btnText) btnText.textContent = 'Claim Suit';
    }
}

function openSuitClaimModal(e) {
    if (e && e.stopPropagation) e.stopPropagation();

    const modal = document.getElementById('interactiveModal');
    const modalBody = document.getElementById('modalBody');
    if (!modal || !modalBody) return;

    const isClaimed = localStorage.getItem('novaforge_spiderman_suit_claimed') === 'true';

    modalBody.innerHTML = `
        <div class="suit-modal-content">
            <div class="suit-modal-banner">
                <div class="suit-hero-visual">
                    <i class="fa-solid fa-spider suit-spider-logo"></i>
                    <img src="images/game3.jpg" alt="Spider-Man Brand New Day Suit" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.55; filter: contrast(1.1) saturate(1.2);">
                    <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,43,61,0.2) 0%, rgba(7,8,14,0.92) 100%);"></div>
                    <div style="position: absolute; top: 1rem; right: 1rem;">
                        <span style="background: rgba(255, 43, 61, 0.9); color: #fff; font-family: var(--font-subheading); font-weight: 800; padding: 0.35rem 0.85rem; border-radius: 20px; font-size: 0.78rem; letter-spacing: 1px;">
                            <i class="fa-solid fa-crown"></i> MYTHIC SUIT REWARD
                        </span>
                    </div>
                    <div style="position: absolute; bottom: 1.2rem; left: 1.5rem; right: 1.5rem;">
                        <span style="color: var(--neon-orange); font-family: var(--font-subheading); font-weight: 800; font-size: 0.82rem; letter-spacing: 1.5px;">MARVEL'S SPIDER-MAN 2 • PETER PARKER</span>
                        <h2 style="font-family: var(--font-heading); font-size: 2.1rem; color: #fff; margin-top: 0.2rem; text-shadow: 0 0 15px rgba(255,43,61,0.6);">
                            Brand New Day Suit
                        </h2>
                    </div>
                </div>
            </div>

            <!-- Suit Specifications Grid -->
            <div class="suit-stats-grid">
                <div class="suit-stat-card">
                    <span style="color: var(--text-muted); font-size: 0.75rem; display: block; font-family: var(--font-subheading);">WEB SURGE BOOST</span>
                    <strong style="color: var(--neon-orange); font-family: var(--font-subheading); font-size: 1.2rem;">+25% DMG</strong>
                </div>
                <div class="suit-stat-card">
                    <span style="color: var(--text-muted); font-size: 0.75rem; display: block; font-family: var(--font-subheading);">AERIAL AGILITY</span>
                    <strong style="color: var(--neon-blue); font-family: var(--font-subheading); font-size: 1.2rem;">MAX SPEED</strong>
                </div>
                <div class="suit-stat-card">
                    <span style="color: var(--text-muted); font-size: 0.75rem; display: block; font-family: var(--font-subheading);">SPECIAL FINISHER</span>
                    <strong style="color: var(--neon-purple); font-family: var(--font-subheading); font-size: 1.2rem;">NEON BURST</strong>
                </div>
            </div>

            <!-- Suit Overview -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); padding: 1.2rem; border-radius: 12px; margin-bottom: 1.5rem;">
                <h4 style="font-family: var(--font-heading); font-size: 1.05rem; color: var(--neon-orange); margin-bottom: 0.6rem;">
                    <i class="fa-solid fa-shield-halved"></i> SUIT LORE & CAPABILITIES
                </h4>
                <p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.92rem; margin-bottom: 1rem;">
                    Inspired by the iconic Brand New Day comic storyline, this exclusive suit brings Peter Parker's classic red-and-blue aesthetic into high-tech action. Equipped with gold-accented web-wing gliders, reinforced nano-weave armor, and custom finisher animations in Marvel's Spider-Man 2.
                </p>
                <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                    <span class="suit-perk-tag"><i class="fa-solid fa-bolt"></i> Electro-Web Conduits</span>
                    <span class="suit-perk-tag"><i class="fa-solid fa-feather-pointed"></i> Nano-Glide Wings</span>
                    <span class="suit-perk-tag"><i class="fa-solid fa-sparkles"></i> Golden Emblem FX</span>
                </div>
            </div>

            <!-- Sync & Claim Action Box -->
            <div id="suitModalActionArea">
                ${isClaimed ? `
                    <div style="background: rgba(0, 230, 118, 0.1); border: 1px solid rgba(0, 230, 118, 0.4); padding: 1rem; border-radius: 12px; text-align: center; margin-bottom: 1.2rem;">
                        <i class="fa-solid fa-circle-check" style="font-size: 2.2rem; color: #00e676; margin-bottom: 0.5rem;"></i>
                        <h4 style="color: #fff; font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.3rem;">SUIT UNLOCKED & SYNCED</h4>
                        <p style="color: var(--text-secondary); font-size: 0.88rem; margin: 0;">The Brand New Day Suit is active in your PlayStation Network inventory for Marvel's Spider-Man 2.</p>
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        <button class="btn btn-secondary" style="flex: 1;" onclick="claimBrandNewDaySuit(false)">
                            <i class="fa-solid fa-rotate-left"></i> RE-SYNC LICENSE
                        </button>
                        <button class="btn btn-secondary" style="flex: 1;" onclick="closeModal()">
                            <i class="fa-solid fa-xmark"></i> CLOSE PREVIEW
                        </button>
                    </div>
                ` : `
                    <div style="background: rgba(255, 43, 61, 0.08); border: 1px solid rgba(255, 43, 61, 0.3); padding: 1rem; border-radius: 12px; margin-bottom: 1.2rem; display: flex; align-items: center; justify-content: space-between;">
                        <div>
                            <span style="color: var(--text-muted); font-size: 0.78rem; display: block;">TARGET ACCOUNT</span>
                            <strong style="color: var(--neon-blue); font-family: var(--font-subheading); font-size: 1rem;"><i class="fa-brands fa-playstation"></i> CyberKnight_99 (PSN)</strong>
                        </div>
                        <span style="background: rgba(0,240,255,0.1); color: var(--neon-blue); font-family: var(--font-subheading); font-weight: 800; padding: 0.3rem 0.7rem; border-radius: 6px; font-size: 0.78rem;">FREE CLAIM</span>
                    </div>
                    <button class="btn btn-primary btn-glow" style="width: 100%; padding: 0.9rem;" onclick="claimBrandNewDaySuit(true)">
                        <i class="fa-solid fa-gift"></i> CLAIM SUIT TO PSN ACCOUNT NOW
                    </button>
                `}
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function claimBrandNewDaySuit(shouldClaim = true) {
    const actionArea = document.getElementById('suitModalActionArea');
    if (actionArea) {
        actionArea.innerHTML = `
            <div style="text-center; padding: 1.5rem 0;">
                <i class="fa-solid fa-arrows-rotate fa-spin" style="font-size: 2.5rem; color: var(--neon-orange); margin-bottom: 1rem;"></i>
                <h4 style="color: #fff; font-family: var(--font-heading); margin-bottom: 0.4rem;">Authorizing Suit License...</h4>
                <p style="color: var(--text-secondary); font-size: 0.88rem;">Transmitting Brand New Day Suit to Marvel's Spider-Man 2 Cloud Save...</p>
            </div>
        `;
    }

    setTimeout(() => {
        localStorage.setItem('novaforge_spiderman_suit_claimed', 'true');
        updateSuitClaimUI(true);

        if (actionArea) {
            actionArea.innerHTML = `
                <div style="background: rgba(0, 230, 118, 0.12); border: 1px solid rgba(0, 230, 118, 0.5); padding: 1.2rem; border-radius: 12px; text-align: center; margin-bottom: 1.2rem; animation: pulse 0.5s ease;">
                    <i class="fa-solid fa-circle-check" style="font-size: 2.8rem; color: #00e676; margin-bottom: 0.6rem;"></i>
                    <h3 style="color: #fff; font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 0.3rem;">SUIT SUCCESSFULLY CLAIMED!</h3>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.8rem;">
                        Brand New Day Suit is now unlocked in Marvel's Spider-Man 2 on PlayStation 5.
                    </p>
                    <span style="background: rgba(0,230,118,0.2); color: #00e676; font-family: var(--font-subheading); font-weight: 800; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.78rem;">
                        <i class="fa-solid fa-check"></i> PSN License Transferred
                    </span>
                </div>
                <button class="btn btn-primary" style="width: 100%;" onclick="closeModal()">
                    <i class="fa-solid fa-check"></i> RETURN TO COMMAND CENTER
                </button>
            `;
        }

        if (typeof showToast === 'function') {
            showToast('Spider-Man Brand New Day Suit claimed to your PlayStation Network account!', 'success');
        }
    }, 1200);
}
