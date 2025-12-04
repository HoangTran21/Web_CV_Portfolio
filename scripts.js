        // Khởi tạo icons của Lucide
                lucide.createIcons();

        // Initialize AOS, Typed.js, VanillaTilt and GLightbox when available
                function initializeEffects() {
                    // AOS (Animate On Scroll) - gentle settings
                    if (window.AOS) {
                        AOS.init({ once: true, duration: 700, easing: 'ease-out-quart', offset: 120 });
                    }

                    // Typed.js for hero subtitle — multiple strings, slower typing
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

                    // VanillaTilt for elements with data-tilt (gentle)
                    if (window.VanillaTilt) {
                        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
                            max: 4,
                            speed: 300,
                            glare: false,
                            'max-glare': 0.05,
                            scale: 1.005
                        });
                    }

                    // Attach GLightbox to video-overlay buttons (dynamic lightbox)
                    document.querySelectorAll('.video-overlay').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.preventDefault();
                            const src = btn.getAttribute('data-video-src');
                            if (!src) return;

                            // Create a temporary GLightbox instance for this video
                            try {
                                const instance = GLightbox({
                                    elements: [{ href: src, type: 'video' }]
                                });
                                instance.open();
                            } catch (err) {
                                // Fallback: open in new tab/window
                                window.open(src, '_blank');
                            }
                        });
                    });
                }

        // ----------------------------------------------------------------------
        // 1. Logic cho Image Carousel (Slider) - Đã thêm hiệu ứng Transition
        // ----------------------------------------------------------------------

        // Dữ liệu cho các carousel. Nhớ thay thế URL ảnh bằng ảnh thật của bạn!
        // Lưu ý: Các ảnh trong data này chỉ là placeholder từ Unsplash, bạn cần thay bằng ảnh của mình
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

        // State để theo dõi slide hiện tại cho từng carousel
        let currentSlides = {
            thp: 0,
            elcom: 0
        };

        // Hàm để tạo HTML cho các slide dựa trên dữ liệu
        function renderCarousel(id) {
            const data = carouselData[id];
            const slidesContainer = document.getElementById(`${id}-carousel-slides`);
            
            if (!slidesContainer) return;

            // Tạo HTML cho tất cả các slide
            let slidesHTML = data.map((item, index) => `
                <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                    <div class="carousel-image-wrapper">
                        <!-- Thêm onerror để xử lý trường hợp không load được ảnh -->
                        <img src="${item.src}" alt="${item.caption}" onerror="this.onerror=null; this.src='https://placehold.co/600x300/e0e7ff/4338ca?text=Image+Error+${index + 1}'">
                    </div>
                    <p class="carousel-caption">${item.caption}</p>
                </div>
            `).join('');
            
            slidesContainer.innerHTML = slidesHTML;
        }

        // Hàm để chuyển slide khi nhấn nút điều hướng
        function navigateCarousel(id, direction) {
            const data = carouselData[id];
            let currentIndex = currentSlides[id];
            
            // Tìm slide mới
            let newIndex = currentIndex + direction;

            // Xử lý lặp (looping)
            if (newIndex < 0) {
                newIndex = data.length - 1; // Quay lại slide cuối
            } else if (newIndex >= data.length) {
                newIndex = 0; // Quay lại slide đầu tiên
            }

            // Lấy tất cả các slide
            const slides = document.querySelectorAll(`#${id}-carousel-slides .carousel-slide`);

            // Loại bỏ class 'active' khỏi slide cũ
            slides[currentIndex].classList.remove('active');

            // Thêm class 'active' cho slide mới
            slides[newIndex].classList.add('active');

            // Cập nhật state
            currentSlides[id] = newIndex;
        }

        // Hàm khởi tạo tất cả carousels
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

            // Start autoplay for both carousels
            startCarouselAutoplay('thp', 3000);
            startCarouselAutoplay('elcom', 3000);

            // Khởi tạo lại icons sau khi nội dung động được thêm vào
            lucide.createIcons();
        }

        // ----------------------------------------------------------------------
        // 2. Các logic chung khác
        // ----------------------------------------------------------------------
        
        // Parallax Effect (Hiệu ứng Thị sai)
        const heroSection = document.getElementById('hero-section');
        const heroContent = document.getElementById('hero-content');
        // Back-to-Top Button
        const backToTopButton = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;

            // Hiệu ứng dịch chuyển cho background (Parallax)
            if (heroSection) heroSection.style.backgroundPositionY = `${-scrollPosition * 0.5}px`;

            // Hiệu ứng mờ dần cho nội dung
            if (heroContent) {
                const opacity = 1 - (scrollPosition / 500);
                heroContent.style.opacity = opacity < 0 ? 0 : opacity;

                // Hiệu ứng scale (phóng to/thu nhỏ)
                const scale = 1 - (scrollPosition * 0.0005);
                heroContent.style.transform = `scale(${scale < 0.8 ? 0.8 : scale})`;
            }

            // Hiển thị/Ẩn nút Back-to-Top
            if (backToTopButton) {
                if (window.pageYOffset > 300) {
                    backToTopButton.style.display = 'block';
                } else {
                    backToTopButton.style.display = 'none';
                }
            }
        });

        // Sự kiện click để cuộn lên đầu trang
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Smooth Scrolling (Cuộn mượt mà khi click menu)
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        // Chạy khởi tạo carousel và effects khi trang tải xong
        window.addEventListener('load', () => {
            initializeCarousels();
            initializeEffects();
            // Ensure AOS recalculates positions after dynamic content added
            if (window.AOS && typeof AOS.refresh === 'function') {
                setTimeout(() => AOS.refresh(), 120);
            }
            // Fallback: if AOS doesn't trigger immediately, add a small class to animate hero images
            setTimeout(() => {
                document.querySelectorAll('.hero-img').forEach(el => el.classList.add('hero-init'));
            }, 250);
        });

        // Hàm thiết lập logic Carousel cho từng mục của Other experiences
        // Implements a smooth continuous left-scrolling carousel (no jumpy slide changes)
        function setupCarousel(id) {
            const track = document.getElementById(`track-${id}`);
            const nextBtn = document.getElementById(`next-${id}`);
            const prevBtn = document.getElementById(`prev-${id}`);
            const container = track ? track.parentElement : null;
            if (!track || !container) return;

            // Ensure track uses flex layout for horizontal flow
            track.style.display = 'flex';
            track.style.flexWrap = 'nowrap';
            track.style.willChange = 'transform';

            // Duplicate content once to create a seamless loop
            if (!track.dataset.duplicated) {
                const html = track.innerHTML;
                track.innerHTML = html + html;
                track.dataset.duplicated = 'true';
            }

            // Calculate widths used for looping
            function getSingleWidth() {
                return track.scrollWidth / 2;
            }

            let singleWidth = getSingleWidth();
            let pos = 0; // transform X in px (negative moves left)
            let lastTime = performance.now();
            let running = true;

            // Speed in pixels per second (desktop faster, mobile slower).
            // Increased slightly per user request for a livelier auto-scroll.
            function getSpeed() {
                return window.innerWidth < 768 ? 48 : 110; // mobile / desktop
            }

            function step(now) {
                const dt = (now - lastTime) / 1000;
                lastTime = now;
                if (running) {
                    pos -= getSpeed() * dt;
                    // loop when we've scrolled past one copy
                    if (-pos >= singleWidth) pos += singleWidth;
                    track.style.transform = `translateX(${pos}px)`;
                }
                requestAnimationFrame(step);
            }

            // Hover should not pause or change the carousel speed — keep motion constant
            // (Removed previous pause/resume handlers to ensure hover does not affect running state)

            // Keep left/right buttons (if present) and wire them to jump by one item.
            // This lets users step to the previous/next image in the continuous track.

            // Click-to-zoom for images inside the track: enlarge to center moderately
            function openImageZoom(src, alt) {
                // Create overlay container
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

                // Append overlay early (shows backdrop) but set image hidden until loaded
                img.style.opacity = '0';
                img.style.transform = 'scale(0.98)';
                img.style.transition = 'transform 320ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease';
                overlay.appendChild(img);
                overlay.appendChild(caption);
                document.body.appendChild(overlay);

                // Preload to measure natural size
                const pre = new Image();
                pre.onload = function () {
                    const naturalW = pre.naturalWidth || pre.width;
                    const naturalH = pre.naturalHeight || pre.height;

                    // Desired multiplier: between 3 and 4x. Use midpoint 3.5x for a strong, readable zoom.
                    const multiplier = 3.5;

                    // Compute desired dimensions but clamp to viewport with small margin
                    const maxVW = Math.max(window.innerWidth * 0.98, 200);
                    const maxVH = Math.max(window.innerHeight * 0.98, 200);

                    let desiredW = naturalW * multiplier;
                    let desiredH = naturalH * multiplier;

                    // If desired exceeds viewport, scale down while preserving aspect ratio
                    const widthRatio = maxVW / desiredW;
                    const heightRatio = maxVH / desiredH;
                    const clampRatio = Math.min(1, widthRatio, heightRatio);
                    desiredW = Math.round(desiredW * clampRatio);
                    desiredH = Math.round(desiredH * clampRatio);

                    // Apply src and explicit dimensions to the image for crisp rendering
                    img.src = src;
                    img.style.width = desiredW + 'px';
                    img.style.height = desiredH + 'px';
                    img.style.maxWidth = '98vw';
                    img.style.maxHeight = '98vh';

                    // Reveal with a smooth scale and fade
                    requestAnimationFrame(() => {
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    });
                };

                pre.onerror = function () {
                    // Fallback: show the image anyway
                    img.src = src;
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                };

                // Start loading
                pre.src = src;
            }

            // Attach click handlers to images inside track
            Array.from(track.querySelectorAll('img')).forEach(imgEl => {
                imgEl.style.cursor = 'zoom-in';
                imgEl.addEventListener('click', (e) => {
                    const src = imgEl.dataset.large || imgEl.src;
                    openImageZoom(src, imgEl.alt || '');
                });
            });

            // Manual control: jump by one item width (previous / next)
            const firstItem = track.querySelector('.flex-shrink-0');
            const itemWidth = firstItem ? Math.round(firstItem.getBoundingClientRect().width) : Math.round(container.clientWidth / 4);


            // Pause-on-manual and resume after timeout logic
            let resumeTimer = null;
            const RESUME_DELAY = 5000; // ms

            // Number of original items before duplication
            const totalChildren = track.children.length;
            const originalCount = track.dataset.duplicated ? Math.floor(totalChildren / 2) : totalChildren;

            // Track a manual index when user steps via buttons (0 .. originalCount-1)
            let manualIndex = null;

            function scheduleResume() {
                if (resumeTimer) clearTimeout(resumeTimer);
                resumeTimer = setTimeout(() => {
                    running = true;
                    resumeTimer = null;
                    // reset timing reference so movement continues smoothly
                    lastTime = performance.now();
                    // re-enable nav buttons when autoplay resumes
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
                // visible offset into the first copy (0 .. singleWidth)
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
                // Stop automatic motion while user is interacting
                running = false;
                if (resumeTimer) clearTimeout(resumeTimer);

                // Initialize manualIndex based on current scroll position if needed
                if (manualIndex === null) manualIndex = computeManualIndexFromPos();

                // delta is in pixels; convert to index step
                const step = Math.round(Math.abs(delta) / itemWidth);
                if (delta < 0) {
                    manualIndex = Math.min(originalCount - 1, manualIndex + step);
                } else {
                    manualIndex = Math.max(0, manualIndex - step);
                }

                // Compute target pos for the chosen index (use first copy)
                pos = -manualIndex * itemWidth;
                // normalize pos into the duplicated track range
                if (-pos >= singleWidth) pos += singleWidth;
                if (pos > 0) pos -= singleWidth;

                track.style.transform = `translateX(${pos}px)`;

                // update button disabled state according to edges
                updateNavDisabledState();

                // Schedule auto-resume after inactivity
                scheduleResume();
            }

            if (nextBtn) nextBtn.addEventListener('click', () => {
                // move left by one item (negative)
                onManualStep(-itemWidth);
            });

            if (prevBtn) prevBtn.addEventListener('click', () => {
                // move right by one item (positive)
                onManualStep(itemWidth);
            });

            // Recalculate widths on resize
            window.addEventListener('resize', () => {
                singleWidth = getSingleWidth();
            });

            // Kick off animation loop
            lastTime = performance.now();
            requestAnimationFrame(step);
        }

        // Chạy logic Carousel khi DOM đã load
        document.addEventListener('DOMContentLoaded', () => {
            // Khởi tạo cho mục 3a (Communication Ambassador)
            setupCarousel('3a');

            // Khởi tạo cho mục 3b (Head of Communication & HR Lead)
            setupCarousel('3b'); 
        });

        // Count-up animations (fast, start from 1, keep '+' outside the span)
(function () {
    function animateCount(el, target, duration) {
        const start = 1;
        const change = target - start;
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
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
                const duration = Math.min(1500, Math.max(1000, Math.round(500 + target * 20)));
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