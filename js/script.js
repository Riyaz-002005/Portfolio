/* ==========================================================================
   NOVAForge - Gamer Command Center Login JavaScript
   Particle Canvas, Interactive Form Validation, Micro-Animations & Redirect
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCursorGlow();
    initPasswordToggle();
    initFormValidation();
    initForgotPasswordModal();
    initGuestAccess();
});

/* ==========================================================================
   1. Interactive Background Particle System
   ========================================================================== */
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = Math.min(Math.floor(width * 0.08), 80);

    let mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.color = Math.random() > 0.5 ? '#00f0ff' : '#9d4edd';
            this.alpha = Math.random() * 0.6 + 0.2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse Interaction
            if (mouse.x && mouse.y) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x -= Math.cos(angle) * force * 3;
                    this.y -= Math.sin(angle) * force * 3;
                }
            }
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connecting lines
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.strokeStyle = particles[a].color;
                    ctx.globalAlpha = (1 - dist / 110) * 0.25;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   2. Custom Mouse Glow Follower
   ========================================================================== */
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow) return;

    window.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });
}

/* ==========================================================================
   3. Password Visibility Toggle
   ========================================================================== */
function initPasswordToggle() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePasswordBtn');
    const toggleIcon = document.getElementById('togglePasswordIcon');

    if (!passwordInput || !toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        
        toggleIcon.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
        toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
}

/* ==========================================================================
   4. Form Validation & Login Submission
   ========================================================================== */
function initFormValidation() {
    const form = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const loginSpinner = document.getElementById('loginSpinner');
    const btnText = loginBtn ? loginBtn.querySelector('.btn-text') : null;
    const btnIcon = loginBtn ? loginBtn.querySelector('.btn-icon') : null;

    if (!form) return;

    // Real-time input error reset
    [usernameInput, emailInput, passwordInput].forEach(input => {
        if (!input) return;
        input.addEventListener('input', () => {
            const group = input.closest('.input-group');
            if (group) group.classList.remove('invalid');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Validate GamerTag
        if (!usernameInput.value.trim()) {
            showInputError(usernameInput, 'GamerTag is required');
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            showInputError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate Password
        if (!passwordInput.value || passwordInput.value.length < 6) {
            showInputError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        }

        if (isValid) {
            // Trigger Loading State
            loginBtn.disabled = true;
            if (btnText) btnText.textContent = 'CONNECTING TO COMMAND CENTER...';
            if (btnIcon) btnIcon.style.display = 'none';
            if (loginSpinner) loginSpinner.style.display = 'inline-block';

            showToast('Gamer Session Verified. Launching Command Center...', 'success');

            // Store user gamer session state
            localStorage.setItem('novaforge_gamer', JSON.stringify({
                gamertag: usernameInput.value.trim(),
                email: emailInput.value.trim(),
                level: 45,
                xp: '14,250 / 15,000 XP',
                isGuest: false,
                connectedPlatforms: ['Steam', 'PlayStation', 'Xbox', 'Epic Games'],
                loginTime: new Date().toISOString()
            }));

            // Smooth exit animation & redirect after 1.2 seconds
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.6s ease';
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = 'landing.html';
                }, 600);
            }, 1200);
        }
    });
}

function showInputError(input, message) {
    const group = input.closest('.input-group');
    if (group) {
        group.classList.add('invalid');
        const errorEl = group.querySelector('.error-msg');
        if (errorEl) errorEl.textContent = message;
    }
}

/* ==========================================================================
   5. Guest Access Handler
   ========================================================================== */
function initGuestAccess() {
    const guestBtn = document.getElementById('guestBtn');
    if (!guestBtn) return;

    guestBtn.addEventListener('click', () => {
        showToast('Entering Command Center as Guest Gamer...', 'success');
        
        localStorage.setItem('novaforge_gamer', JSON.stringify({
            gamertag: 'GuestGamer_77',
            email: 'guest@novaforge.com',
            level: 12,
            xp: '3,400 / 5,000 XP',
            isGuest: true,
            connectedPlatforms: ['Steam'],
            loginTime: new Date().toISOString()
        }));

        setTimeout(() => {
            document.body.style.transition = 'opacity 0.6s ease';
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = 'landing.html';
            }, 600);
        }, 800);
    });
}

/* ==========================================================================
   6. Social & Gaming Platform Login Handler
   ========================================================================== */
function handleSocialLogin(platform) {
    showToast(`Syncing ${platform} Network Account...`, 'success');

    localStorage.setItem('novaforge_gamer', JSON.stringify({
        gamertag: `${platform}_ProGamer`,
        email: `gamer@${platform.toLowerCase().replace(/\s+/g, '')}.com`,
        level: 50,
        xp: '18,900 / 20,000 XP',
        isGuest: false,
        platform: platform,
        connectedPlatforms: [platform, 'Steam', 'Xbox']
    }));

    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = 'landing.html';
        }, 600);
    }, 1000);
}

/* ==========================================================================
   7. Forgot Password Modal
   ========================================================================== */
function initForgotPasswordModal() {
    const forgotBtn = document.getElementById('forgotPasswordBtn');
    const modal = document.getElementById('forgotModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const sendResetBtn = document.getElementById('sendResetBtn');
    const resetEmail = document.getElementById('resetEmail');
    const modalStatus = document.getElementById('modalStatus');

    if (!forgotBtn || !modal) return;

    forgotBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    if (sendResetBtn) {
        sendResetBtn.addEventListener('click', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!resetEmail.value || !emailRegex.test(resetEmail.value)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }

            modalStatus.style.display = 'block';
            modalStatus.textContent = 'Generating recovery passkey...';

            setTimeout(() => {
                modalStatus.textContent = 'Recovery passkey sent! Check your inbox.';
                showToast('Passkey recovery email sent!', 'success');
                setTimeout(() => {
                    modal.classList.remove('active');
                    modalStatus.style.display = 'none';
                    resetEmail.value = '';
                }, 2000);
            }, 1000);
        });
    }
}

/* ==========================================================================
   8. Utility Toast System
   ========================================================================== */
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="${type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation'}"></i>
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
