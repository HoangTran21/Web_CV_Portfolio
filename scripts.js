        // Khởi tạo icons của Lucide
        lucide.createIcons();

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
        function initializeCarousels() {
            renderCarousel('thp');
            renderCarousel('elcom');
            
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
            heroSection.style.backgroundPositionY = `${-scrollPosition * 0.5}px`;

            // Hiệu ứng mờ dần cho nội dung
            const opacity = 1 - (scrollPosition / 500); 
            heroContent.style.opacity = opacity < 0 ? 0 : opacity;
            
            // Hiệu ứng scale (phóng to/thu nhỏ)
            const scale = 1 - (scrollPosition * 0.0005);
            heroContent.style.transform = `scale(${scale < 0.8 ? 0.8 : scale})`;
            
            // Hiển thị/Ẩn nút Back-to-Top
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
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
        // Chạy khởi tạo carousel khi trang tải xong
        window.addEventListener('load', initializeCarousels);

        // Hàm thiết lập logic Carousel cho từng mục của Other experiences
        function setupCarousel(id) {
            const track = document.getElementById(`track-${id}`);
            const nextBtn = document.getElementById(`next-${id}`);
            const prevBtn = document.getElementById(`prev-${id}`);

            // THAY ĐỔI: Màu nút Next/Prev mặc định (ví dụ: indigo cho 3a, green cho 3b)
            const activeColorClass = id === '3a' ? 'bg-indigo-500' : 'bg-green-500';
            const activeHoverColorClass = id === '3a' ? 'hover:bg-indigo-700' : 'hover:bg-green-700';

            const imagesPerView = 4;
            const totalImages = track.children.length;
            // Tính số bước trượt cần thiết để xem hết ảnh
            const maxSlideIndex = Math.ceil(totalImages / imagesPerView) - 1; 

            let currentSlide = 0;

            function updateCarousel() {
                // Mỗi lần trượt dịch chuyển 100% của khu vực hiển thị
                const offset = currentSlide * 100;
                track.style.transform = `translateX(-${offset}%)`;

                // Cập nhật trạng thái nút Prev
                if (currentSlide === 0) {
                    prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    prevBtn.classList.remove(activeColorClass, 'bg-opacity-90', activeHoverColorClass);
                } else {
                    prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    prevBtn.classList.add(activeColorClass, 'bg-opacity-90', activeHoverColorClass);
                }

                // Cập nhật trạng thái nút Next
                if (currentSlide >= maxSlideIndex) {
                    nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    nextBtn.classList.remove(activeColorClass, 'bg-opacity-90', activeHoverColorClass);
                } else {
                    nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    nextBtn.classList.add(activeColorClass, 'bg-opacity-90', activeHoverColorClass);
                }
            }

            // Xử lý nút NEXT
            nextBtn.addEventListener('click', () => {
                if (currentSlide < maxSlideIndex) {
                    currentSlide++;
                    updateCarousel();
                }
            });

            // Xử lý nút PREV
            prevBtn.addEventListener('click', () => {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateCarousel();
                }
            });

            // Khởi tạo trạng thái
            updateCarousel();
        }

        // Chạy logic Carousel khi DOM đã load
        document.addEventListener('DOMContentLoaded', () => {
            // Khởi tạo cho mục 3a (Communication Ambassador)
            setupCarousel('3a');

            // Khởi tạo cho mục 3b (Head of Communication & HR Lead)
            setupCarousel('3b'); 
        });
