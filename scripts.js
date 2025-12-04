lucide.createIcons();

function initializeEffects() {
    if (window.AOS) {
        AOS.init({ once: true, duration: 700, easing: 'ease-out-quart', offset: 120 });
    }

    if (window.Typed && document.getElementById('typed-subtitle')) {
                        try {
                            new Typed('#typed-subtitle', {
                                strings: ['International Communication Student | DAV', 'Storyteller • Videographer • Writer', 'Field Reporter • Content Producer'],
                                typeSpeed: 50,
                                backSpeed: 20,
                                backDelay: 1800,
                                loop: true,
                                smartBackspace: true,
                                showCursor: true
                            });
                        } catch (e) {
                            console.warn('Typed.js init failed', e);
                        }
                    }

                    if (window.VanillaTilt) {
                        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
                            max: 4,
                            speed: 300,
                            glare: false,
                            'max-glare': 0.05,
                            scale: 1.005
                        });
                    }

                    document.querySelectorAll('.video-overlay').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.preventDefault();
                            const src = btn.getAttribute('data-video-src');
                            if (!src) return;
                            try {
                                const instance = GLightbox({
                                    elements: [{ href: src, type: 'video' }]
                                });
                                instance.open();
                            } catch (err) {
                                window.open(src, '_blank');
                            }
                        });
                    });
                }

        const carouselData = {
            thp: [
                { src: "VTL_img/bg-template.png", caption: "Dẫn bản tin truyền hình" },
                { src: "VTL_img/2.png", caption: "Hosting TV talk show với khách mời" },
                { src: "VTL_img/3.png", caption: "Dẫn chương trình chuyên đề" },
                { src: "VTL_img/4.png", caption: "Thực hiện phóng sự thực địa" },
                { src: "VTL_img/5.png", caption: "Phỏng vấn các cá nhân tiêu biểu" },
                { src: "VTL_img/6.png", caption: "Dựng video & Lồng tiếng hậu kỳ" }
            ],
            elcom: [
                { src: "VTL_img/4.png", caption: "Phối hợp với các phòng ban cho bài viết" },
                { src: "VTL_img/5.png", caption: "Sản xuất nội dung viết & kịch bản" },
                { src: "VTL_img/6.png", caption: "Quay phim & Thiết kế ảnh truyền thông" },
                { src: "VTL_img/7.png", caption: "Hỗ trợ vận hành truyền thông, social media" },
                { src: "VTL_img/8.png", caption: "Hỗ trợ hành chính và hậu cần truyền thông" },
                { src: "VTL_img/9.png", caption: "Làm MC/TempMaster các chương trình" }
            ]
        };

        let currentSlides = {
            thp: 0,
            elcom: 0
        };

        function renderCarousel(id) {
            const data = carouselData[id];
            const slidesContainer = document.getElementById(`${id}-carousel-slides`);
            
            if (!slidesContainer) return;

            let slidesHTML = data.map((item, index) => `
                <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                    <div class="carousel-image-wrapper">
                        <img src="${item.src}" alt="${item.caption}" onerror="this.onerror=null; this.src='https://placehold.co/600x300/e0e7ff/4338ca?text=Image+Error+${index + 1}'">
                    </div>
                    <p class="carousel-caption">${item.caption}</p>
                </div>
            `).join('');
            
            slidesContainer.innerHTML = slidesHTML;
        }

        function navigateCarousel(id, direction) {
            const data = carouselData[id];
            let currentIndex = currentSlides[id];
            
            let newIndex = currentIndex + direction;

            if (newIndex < 0) {
                newIndex = data.length - 1;
            } else if (newIndex >= data.length) {
                newIndex = 0;
            }

            const slides = document.querySelectorAll(`#${id}-carousel-slides .carousel-slide`);

            slides[currentIndex].classList.remove('active');

            slides[newIndex].classList.add('active');

            currentSlides[id] = newIndex;
        }

        let carouselIntervals = {};
        function startCarouselAutoplay(id, ms = 5000) {
            if (carouselIntervals[id]) clearInterval(carouselIntervals[id]);
            carouselIntervals[id] = setInterval(() => navigateCarousel(id, 1), ms);
        }
        function stopCarouselAutoplay(id) {
            if (carouselIntervals[id]) clearInterval(carouselIntervals[id]);
        }

        function initializeCarousels() {
            renderCarousel('thp');
            renderCarousel('elcom');

            startCarouselAutoplay('thp', 3000);
            startCarouselAutoplay('elcom', 3000);

            lucide.createIcons();
        }

        const heroSection = document.getElementById('hero-section');
        const heroContent = document.getElementById('hero-content');
        const backToTopButton = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;

            if (heroSection) heroSection.style.backgroundPositionY = `${-scrollPosition * 0.5}px`;

            if (heroContent) {
                const opacity = 1 - (scrollPosition / 500);
                heroContent.style.opacity = opacity < 0 ? 0 : opacity;

                const scale = 1 - (scrollPosition * 0.0005);
                heroContent.style.transform = `scale(${scale < 0.8 ? 0.8 : scale})`;
            }

            if (backToTopButton) {
                if (window.pageYOffset > 300) {
                    backToTopButton.style.display = 'block';
                } else {
                    backToTopButton.style.display = 'none';
                }
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        window.addEventListener('load', () => {
            initializeCarousels();
            initializeEffects();
            if (window.AOS && typeof AOS.refresh === 'function') {
                setTimeout(() => AOS.refresh(), 120);
            }
            setTimeout(() => {
                document.querySelectorAll('.hero-img').forEach(el => el.classList.add('hero-init'));
            }, 250);
        });

        function setupCarousel(id) {
            const track = document.getElementById(`track-${id}`);
            const nextBtn = document.getElementById(`next-${id}`);
            const prevBtn = document.getElementById(`prev-${id}`);
            const container = track ? track.parentElement : null;
            if (!track || !container) return;

            track.style.display = 'flex';
            track.style.flexWrap = 'nowrap';
            track.style.willChange = 'transform';

            if (!track.dataset.duplicated) {
                const html = track.innerHTML;
                track.innerHTML = html + html;
                track.dataset.duplicated = 'true';
            }

            function getSingleWidth() {
                return track.scrollWidth / 2;
            }

            let singleWidth = getSingleWidth();
            let pos = 0;
            let lastTime = performance.now();
            let running = true;

            function getSpeed() {
                return window.innerWidth < 768 ? 48 : 110;
            }

            function step(now) {
                const dt = (now - lastTime) / 1000;
                lastTime = now;
                if (running) {
                    pos -= getSpeed() * dt;
                    if (-pos >= singleWidth) pos += singleWidth;
                    track.style.transform = `translateX(${pos}px)`;
                }
                requestAnimationFrame(step);
            }

            function openImageZoom(src, alt) {
                const overlay = document.createElement('div');
                overlay.className = 'image-zoom-overlay';
                overlay.tabIndex = -1;

                const img = document.createElement('img');
                img.alt = alt || '';

                const caption = document.createElement('div');
                caption.className = 'image-zoom-caption';
                caption.textContent = alt || '';

                // Pause scrolling while zoomed
                const prevRunning = running;
                running = false;

                function close() {
                    if (!overlay) return;
                    overlay.classList.add('hidden');
                    setTimeout(() => {
                        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                        running = prevRunning;
                    }, 220);
                    window.removeEventListener('keydown', onKey);
                }

                function onKey(e) {
                    if (e.key === 'Escape') close();
                }

                overlay.addEventListener('click', close);
                window.addEventListener('keydown', onKey);

                img.style.opacity = '0';
                img.style.transform = 'scale(0.98)';
                img.style.transition = 'transform 320ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease';
                overlay.appendChild(img);
                overlay.appendChild(caption);
                document.body.appendChild(overlay);

                const pre = new Image();
                pre.onload = function () {
                    const naturalW = pre.naturalWidth || pre.width;
                    const naturalH = pre.naturalHeight || pre.height;

                    const multiplier = 3.5;

                    const maxVW = Math.max(window.innerWidth * 0.98, 200);
                    const maxVH = Math.max(window.innerHeight * 0.98, 200);

                    let desiredW = naturalW * multiplier;
                    let desiredH = naturalH * multiplier;

                    const widthRatio = maxVW / desiredW;
                    const heightRatio = maxVH / desiredH;
                    const clampRatio = Math.min(1, widthRatio, heightRatio);
                    desiredW = Math.round(desiredW * clampRatio);
                    desiredH = Math.round(desiredH * clampRatio);

                    img.src = src;
                    img.style.width = desiredW + 'px';
                    img.style.height = desiredH + 'px';
                    img.style.maxWidth = '98vw';
                    img.style.maxHeight = '98vh';

                    requestAnimationFrame(() => {
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    });
                };

                pre.onerror = function () {
                    img.src = src;
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                };

                pre.src = src;
            }

            Array.from(track.querySelectorAll('img')).forEach(imgEl => {
                imgEl.style.cursor = 'zoom-in';
                imgEl.addEventListener('click', (e) => {
                    const src = imgEl.dataset.large || imgEl.src;
                    openImageZoom(src, imgEl.alt || '');
                });
            });

            const firstItem = track.querySelector('.flex-shrink-0');
            const itemWidth = firstItem ? Math.round(firstItem.getBoundingClientRect().width) : Math.round(container.clientWidth / 4);


            let resumeTimer = null;
            const RESUME_DELAY = 2500; // ms

            const totalChildren = track.children.length;
            const originalCount = track.dataset.duplicated ? Math.floor(totalChildren / 2) : totalChildren;

            let manualIndex = null;

            function scheduleResume() {
                if (resumeTimer) clearTimeout(resumeTimer);
                resumeTimer = setTimeout(() => {
                    running = true;
                    resumeTimer = null;
                    lastTime = performance.now();
                    if (nextBtn) {
                        nextBtn.disabled = false;
                        nextBtn.classList.remove('opacity-50','cursor-not-allowed');
                    }
                    if (prevBtn) {
                        prevBtn.disabled = false;
                        prevBtn.classList.remove('opacity-50','cursor-not-allowed');
                    }
                }, RESUME_DELAY);
            }

            function computeManualIndexFromPos() {
                const visibleOffset = ((-pos % singleWidth) + singleWidth) % singleWidth;
                const idx = Math.round(visibleOffset / itemWidth);
                return Math.min(Math.max(idx, 0), Math.max(0, originalCount - 1));
            }

            function updateNavDisabledState() {
                if (!nextBtn || !prevBtn) return;
                nextBtn.disabled = manualIndex >= (originalCount - 1);
                prevBtn.disabled = manualIndex <= 0;
                nextBtn.classList.toggle('opacity-50', nextBtn.disabled);
                nextBtn.classList.toggle('cursor-not-allowed', nextBtn.disabled);
                prevBtn.classList.toggle('opacity-50', prevBtn.disabled);
                prevBtn.classList.toggle('cursor-not-allowed', prevBtn.disabled);
            }

            function onManualStep(delta) {
                running = false;
                if (resumeTimer) clearTimeout(resumeTimer);

                if (manualIndex === null) manualIndex = computeManualIndexFromPos();

                const step = Math.round(Math.abs(delta) / itemWidth);
                if (delta < 0) {
                    manualIndex = Math.min(originalCount - 1, manualIndex + step);
                } else {
                    manualIndex = Math.max(0, manualIndex - step);
                }

                pos = -manualIndex * itemWidth;
                if (-pos >= singleWidth) pos += singleWidth;
                if (pos > 0) pos -= singleWidth;

                track.style.transform = `translateX(${pos}px)`;

                updateNavDisabledState();

                scheduleResume();
            }

            if (nextBtn) nextBtn.addEventListener('click', () => {
                onManualStep(-itemWidth);
            });

            if (prevBtn) prevBtn.addEventListener('click', () => {
                onManualStep(itemWidth);
            });

            window.addEventListener('resize', () => {
                singleWidth = getSingleWidth();
            });

            lastTime = performance.now();
            requestAnimationFrame(step);
        }

        document.addEventListener('DOMContentLoaded', () => {
            setupCarousel('3a');
            setupCarousel('3b'); 
        });

(function () {
    function animateCount(el, target, duration) {
        const start = 1;
        const change = target - start;
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + change * eased);
            el.textContent = String(current);

            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = String(target);
        }

        requestAnimationFrame(step);
    }

    function initCountUps() {
        const nodes = document.querySelectorAll('.count-up');
        if (!nodes.length) return;

        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = Math.max(0, parseInt(el.dataset.target, 10) || 0);
                const duration = Math.min(1200, Math.max(800, Math.round(400 + target * 15)));
                el.textContent = '1';
                animateCount(el, target, duration);
                observer.unobserve(el);
            });
        }, { threshold: 1 });

        nodes.forEach(n => {
            n.textContent = '1';
            obs.observe(n);
        });
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initCountUps, 1000);
    } else {
        window.addEventListener('load', initCountUps);
    }
})();