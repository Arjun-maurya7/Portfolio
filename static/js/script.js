/* ================================================================
   PORTFOLIO SHARED JAVASCRIPT
   ================================================================ */

// ── Mobile Nav ────────────────────────────────────────────────────
function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            toggle.classList.remove('open');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('open');
            toggle.classList.remove('open');
        }
    });
}

// ── Sticky header shadow ─────────────────────────────────────────
function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
}

// ── Scroll-triggered fade-up animations ──────────────────────────
function initScrollAnimations() {
    const els = document.querySelectorAll('.fade-up');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => io.observe(el));
}

// ── Smooth scroll for hash links ─────────────────────────────────
function initSmoothScroll() {
    const headerH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 64;

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const id = link.getAttribute('href');
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - headerH - 8,
                behavior: 'smooth'
            });
        });
    });
}

// ── Typewriter effect ─────────────────────────────────────────────
function initTypewriter() {
    const el = document.querySelector('.typewriter-text');
    if (!el) return;

    const text = el.dataset.text || el.textContent.trim();
    el.textContent = '';
    let i = 0;

    function typeChar() {
        if (i < text.length) {
            el.textContent += text.charAt(i++);
            setTimeout(typeChar, 48);
        }
    }
    setTimeout(typeChar, 800);
}

// ── Active nav link (scroll spy) ──────────────────────────────────
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                document.querySelectorAll(`.nav-link[href="#${entry.target.id}"]`)
                    .forEach(l => l.classList.add('active'));
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(s => io.observe(s));
}

// ── Contact form ─────────────────────────────────────────────────
function initContactForm() {
    const forms = document.querySelectorAll('.contact-form');
    if (!forms.length) return;

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
            btn.disabled = true;

            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;

            try {
                const res = await fetch('/send_message', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message })
                });

                const data = await res.json();

                if (res.ok && data.status === 'success') {
                    btn.innerHTML = '<i class="fas fa-check"></i> Sent! I\'ll reply soon.';
                    btn.style.background = '#059669'; // Green success color
                    form.reset();
                } else {
                    btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error sending message';
                    btn.style.background = '#e53e3e'; // Red error color
                    console.error('Server error:', data.message);
                }
            } catch (err) {
                btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error sending message';
                btn.style.background = '#e53e3e';
                console.error('Network error:', err);
            }

            // Reset button to default state after 4 seconds
            setTimeout(() => {
                btn.innerHTML = orig;
                btn.style.background = '';
                btn.disabled = false;
            }, 4000);
        });
    });
}

// ── Horizontal timeline (index.html about section) ────────────────
function initHorizontalTimeline() {
    const items = document.querySelectorAll('.h-timeline-item');
    if (!items.length) return;

    const marker   = document.getElementById('h-marker');
    const yearLabel= document.getElementById('h-year-label');
    const sideYear = document.getElementById('side-year');
    const sideTitle= document.getElementById('side-title');
    const sideDesc = document.getElementById('side-desc');
    const sideCtx  = document.getElementById('side-ctx');
    const sideImpact=document.getElementById('side-impact');
    const mainDesc = document.getElementById('h-main-desc');

    let current = 0;
    const total = items.length;

    function activate(idx) {
        if (idx === current && idx !== 0) return;
        current = idx;
        const d = items[idx].dataset;
        const pct = (idx / (total - 1)) * 100;

        if (marker)    { marker.style.left = pct + '%'; }
        if (yearLabel) { yearLabel.textContent = d.year; yearLabel.style.left = pct + '%'; }
        if (sideYear)  sideYear.textContent = d.year;
        if (sideTitle) sideTitle.textContent = d.title;
        if (sideDesc)  sideDesc.textContent  = d.description;
        if (mainDesc)  {
            mainDesc.style.opacity = '0';
            setTimeout(() => {
                mainDesc.textContent = d.description;
                mainDesc.style.opacity = '1';
            }, 200);
        }
        if (sideCtx) {
            sideCtx.innerHTML = '';
            (d.context || '').split('||').forEach(t => {
                if (t.trim()) {
                    const li = document.createElement('li');
                    li.textContent = t.trim();
                    sideCtx.appendChild(li);
                }
            });
        }
        if (sideImpact) sideImpact.textContent = d.impact || '';

        items.forEach((it, i) => it.classList.toggle('active-dot-parent', i === idx));
    }

    items.forEach((item, i) => {
        item.addEventListener('click',      () => activate(i));
        item.addEventListener('mouseenter', () => activate(i));
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { e.preventDefault(); activate(Math.min(current+1, total-1)); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); activate(Math.max(current-1, 0)); }
    });

    activate(0);
}

// ── Keyboard: Escape closes mobile menu ──────────────────────────
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.getElementById('mobile-nav')?.classList.remove('open');
        document.getElementById('nav-toggle')?.classList.remove('open');
    }
});

// ── Let it Snow (with button collision) ──────────────────────────
function initSnow() {
    // Create canvas overlay
    const canvas = document.createElement('canvas');
    canvas.id = 'snow-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Create floating toggle button
    const btn = document.createElement('button');
    btn.id = 'snow-toggle';
    btn.textContent = '❄️';
    btn.title = 'Let it Snow!';
    btn.setAttribute('aria-label', 'Toggle snow effect');
    document.body.appendChild(btn);

    let isActive = localStorage.getItem('portfolio-snow') === 'true';
    let flakes   = [];
    let animId   = null;
    let btnRects = [];   // cached bounding boxes of buttons
    let frame    = 0;

    // ── Collision selector (must be defined BEFORE resize() runs) ──
    const COLLISION_SELECTOR = [
        'button:not(#snow-toggle)',
        'a.btn', '.btn',
        '.section-label',
        '.tag',
        '.avatar-wrap',
        'h1', 'h2',
        '.nav-brand',
        '.htime-card',
        '.glass-card',
        '.dp-tag',
    ].join(', ');

    // ── Cache all solid UI element rects ─────────────────────────
    function refreshRects() {
        const vH = window.innerHeight;
        btnRects = [...document.querySelectorAll(COLLISION_SELECTOR)].map(el => {
            const r = el.getBoundingClientRect();
            if (r.width < 4 || r.height < 4) return null;
            const isCircle = el.classList.contains('avatar-wrap');
            const cx = (r.left + r.right) / 2;
            const cy = (r.top  + r.bottom) / 2;
            return {
                left:     r.left   - 6,
                right:    r.right  + 6,
                top:      r.top    - 6,
                bottom:   r.bottom + 6,
                isCircle, cx, cy,
                cr: r.width / 2 + 6,
            };
        }).filter(r => r && r.bottom > 0 && r.top < vH);
    }

    // ── Resize canvas ────────────────────────────────────────────
    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        refreshRects();
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', refreshRects, { passive: true });

    // ── Spawn a flake ────────────────────────────────────────────
    function spawnFlake() {
        return {
            x:       Math.random() * canvas.width,
            y:       -12,
            r:       Math.random() * 3.5 + 1,
            vx:      Math.random() * 1.0 - 0.5,  // horizontal velocity
            vy:      Math.random() * 1.4 + 0.5,  // vertical velocity
            phase:   Math.random() * Math.PI * 2, // sinusoidal drift phase
            opacity: Math.random() * 0.55 + 0.35,
            bounces: 0,                           // bounce counter
        };
    }

    // ── Collision detection + response ───────────────────────────
    function applyCollisions(f) {
        const nextX = f.x + f.vx;
        const nextY = f.y + f.vy;

        for (const rect of btnRects) {

            // ════ CIRCULAR collision (avatar image) ═══════════════
            if (rect.isCircle) {
                const dx   = nextX - rect.cx;
                const dy   = nextY - rect.cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minD = rect.cr + f.r;

                if (dist < minD && dist > 0.01) {
                    // Surface normal pointing away from circle centre
                    const nx = dx / dist;
                    const ny = dy / dist;
                    // Reflect velocity along normal, lose ~50% energy
                    const dot = f.vx * nx + f.vy * ny;
                    f.vx = (f.vx - 2 * dot * nx) * 0.5;
                    f.vy = (f.vy - 2 * dot * ny) * 0.5;
                    // Push flake outside circle to avoid tunnelling
                    f.x  = rect.cx + nx * (minD + 0.5);
                    f.y  = rect.cy + ny * (minD + 0.5);
                    f.bounces++;
                }
                continue; // handled — skip rect logic
            }

            // ════ RECTANGULAR collision (everything else) ═════════
            const inH = nextX + f.r > rect.left && nextX - f.r < rect.right;
            if (!inH) continue;

            // ── Top-surface hit ───────────────────────────────────
            if (f.y + f.r <= rect.top && nextY + f.r > rect.top) {
                if (f.bounces < 3) {
                    f.vy  = -f.vy * (0.38 + Math.random() * 0.22);
                    f.vx += (Math.random() - 0.5) * 2.0;
                    f.bounces++;
                } else {
                    // Slide off after 3 bounces
                    f.vy = 0.35;
                    f.vx = (Math.random() < 0.5 ? -1 : 1) * (1.5 + Math.random() * 1.0);
                }
                return; // one rect-collision per frame
            }

            // ── Side hits ─────────────────────────────────────────
            const inV = f.y + f.r > rect.top && f.y - f.r < rect.bottom;
            if (inV) {
                if (nextX + f.r > rect.left && f.x + f.r <= rect.left) {
                    f.vx = -Math.abs(f.vx) * 0.65; // left face
                }
                if (nextX - f.r < rect.right && f.x - f.r >= rect.right) {
                    f.vx =  Math.abs(f.vx) * 0.65; // right face
                }
            }
        }
    }

    // ── Animation loop ───────────────────────────────────────────
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;

        // Refresh rects every 30 frames (~0.5 s at 60 fps)
        if (frame % 30 === 0) refreshRects();

        // Spawn new flakes gradually
        if (flakes.length < 180 && Math.random() < 0.35) {
            flakes.push(spawnFlake());
        }

        const now = Date.now() / 1000;
        flakes = flakes.filter(f => {
            // Apply collision before moving
            applyCollisions(f);

            // Move — sinusoidal drift + physics velocities
            f.x += f.vx + Math.sin(now + f.phase) * 0.28;
            f.y += f.vy;

            // Weak gravity recovery (keeps flake falling after bounce slows it)
            if (f.vy > 0 && f.vy < 0.5) f.vy += 0.025;
            if (f.vy < 0) f.vy += 0.12; // downward pull when going up

            // Dampen horizontal velocity (air resistance)
            f.vx *= 0.97;

            // Draw
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            
            // Check current theme for color
            const isLight = document.documentElement.dataset.theme === 'light';
            // Soft indigo for light mode (79, 70, 229), white for dark mode (255, 255, 255)
            const rgb = isLight ? '79, 70, 229' : '255, 255, 255';
            
            ctx.fillStyle = `rgba(${rgb}, ${f.opacity})`;
            ctx.fill();

            // Keep alive while on screen (allow slight off-sides)
            return f.y < canvas.height + 20 &&
                   f.x > -80 && f.x < canvas.width + 80;
        });

        animId = requestAnimationFrame(animate);
    }

    // ── Controls ─────────────────────────────────────────────────
    function startSnow() {
        canvas.style.display = 'block';
        btn.classList.add('snow-active');
        if (!animId) { refreshRects(); animate(); }
    }

    function stopSnow() {
        if (animId) { cancelAnimationFrame(animId); animId = null; }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
        btn.classList.remove('snow-active');
        flakes = [];
    }

    if (isActive) startSnow();

    btn.addEventListener('click', () => {
        isActive = !isActive;
        localStorage.setItem('portfolio-snow', isActive);
        isActive ? startSnow() : stopSnow();
    });
}



// ── Custom Cursor ─────────────────────────────────────────────────
function initCursor() {
    // Skip on touch / pointer-coarse devices (phones, tablets)
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    // Create elements
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);
    document.body.appendChild(dot);   // dot on top

    // Hide native cursor globally
    document.documentElement.classList.add('custom-cursor');

    let mouseX = -200, mouseY = -200; // start off-screen
    let ringX  = -200, ringY  = -200;

    // Selector for elements that trigger the "hover" state
    const HOVER_SEL = [
        'a', 'button', 'input', 'textarea', 'select', 'label',
        '.btn', '.tag', '.section-label', '.glass-card',
        '.nav-link', '.nav-brand', '.nav-cta',
        '.h-timeline-item', '.t-card', '.avatar-wrap',
        '.project-link', '.cert-link', '.social-btn', '#snow-toggle',
    ].join(', ');

    // ── Mouse position (dot snaps instantly) ─────────────────────
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top  = mouseY + 'px';
    }, { passive: true });

    // ── Hover detection (event delegation) ───────────────────────
    document.addEventListener('mouseover', e => {
        if (e.target.closest(HOVER_SEL)) {
            dot.classList.add('hovering');
            ring.classList.add('hovering');
        }
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest(HOVER_SEL)) {
            dot.classList.remove('hovering');
            ring.classList.remove('hovering');
        }
    });

    // ── Click squeeze feedback ────────────────────────────────────
    document.addEventListener('mousedown', () => ring.classList.add('clicking'));
    document.addEventListener('mouseup',   () => ring.classList.remove('clicking'));

    // ── Hide / show when cursor leaves / enters window ────────────
    document.addEventListener('mouseleave', () => {
        dot.style.opacity  = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
    });

    // ── Ring lerp loop (runs once, forever) ──────────────────────
    function lerp(a, b, t) { return a + (b - a) * t; }

    (function tick() {
        ringX = lerp(ringX, mouseX, 0.12);
        ringY = lerp(ringY, mouseY, 0.12);
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
        requestAnimationFrame(tick);
    })();
}

// ── Cursor Spotlight ──────────────────────────────────────────────
function initSpotlight() {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const el = document.createElement('div');
    el.id = 'cursor-spotlight';
    document.body.appendChild(el);

    const HALF = 250; // half of 500px spotlight width

    document.addEventListener('mousemove', e => {
        // GPU transform — no layout recalc
        el.style.transform = `translate(${e.clientX - HALF}px, ${e.clientY - HALF}px)`;
    }, { passive: true });

    document.addEventListener('mouseleave', () => { el.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { el.style.opacity = '1'; });
}

// ── 3D Tilt Effect ───────────────────────────────────────────────
function init3DTilt() {
    if (window.matchMedia('(hover: none)').matches) return;
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        let rafId = null;
        card.addEventListener('mousemove', e => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const tiltX = (y - cy) / cy * -6; 
                const tiltY = (x - cx) / cx * 6;
                card.style.transform = `perspective(1000px) translateY(-8px) scale(1.02) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });
        });
        card.addEventListener('mouseleave', () => {
            if (rafId) cancelAnimationFrame(rafId);
            card.style.transform = '';
        });
    });
}

// ── Magnetic Elements ─────────────────────────────────────────────
function initMagneticButtons() {
    if (window.matchMedia('(hover: none)').matches) return;
    const magneticEls = document.querySelectorAll('.btn, .nav-link, .nav-brand, .social-btn');
    magneticEls.forEach(el => {
        let rafId = null;
        el.addEventListener('mousemove', e => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
        });
        el.addEventListener('mouseleave', () => {
            if (rafId) cancelAnimationFrame(rafId);
            el.style.transform = '';
        });
    });
}

// ── Theme Toggle ─────────────────────────────────────────────────
function initThemeToggle() {
    const desktopBtn = document.getElementById('theme-toggle');
    const mobileBtn = document.getElementById('mobile-theme-toggle');
    
    function updateIcons() {
        const isLight = document.documentElement.dataset.theme === 'light';
        const iconClass = isLight ? 'fa-moon' : 'fa-sun';
        if (desktopBtn) desktopBtn.innerHTML = `<i class="fas ${iconClass}"></i>`;
        if (mobileBtn) mobileBtn.innerHTML = `<i class="fas ${iconClass}"></i> Switch Theme`;
    }
    
    function toggleTheme() {
        const isLight = document.documentElement.dataset.theme === 'light';
        document.documentElement.dataset.theme = isLight ? 'dark' : 'light';
        localStorage.setItem('portfolio-theme', isLight ? 'dark' : 'light');
        updateIcons();
    }
    
    if (desktopBtn) desktopBtn.addEventListener('click', toggleTheme);
    if (mobileBtn) mobileBtn.addEventListener('click', toggleTheme);
    
    updateIcons();
}

// ── Boot ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initHeaderScroll();
    initScrollAnimations();
    initSmoothScroll();
    initScrollSpy();
    initTypewriter();
    initContactForm();
    initHorizontalTimeline();
    initSnow();
    initCursor();
    initSpotlight();
    init3DTilt();
    initMagneticButtons();
    initThemeToggle();
});
