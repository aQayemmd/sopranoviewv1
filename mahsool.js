  document.addEventListener('DOMContentLoaded', function () {
        // اسکریپت‌های قبلی برای زوم و گالری را غیرفعال کردیم چون HTML آن‌ها حذف شده است.
        // کدهای مربوط به تب‌ها و بقیه بخش‌ها همچنان کار می‌کنند.

        const wishlistBtn = document.querySelector('.wishlist-btn');
        if(wishlistBtn) wishlistBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const heartIcon = this.querySelector('i');
            heartIcon.classList.toggle('far');
            heartIcon.classList.toggle('fas');
        });

        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                this.classList.add('active');
                const tabId = this.dataset.tab;
                document.getElementById(tabId).classList.add('active');
            });
        });

        document.querySelectorAll('.pros-cons-toggle button').forEach(button => {
            button.addEventListener('click', function() {
                const reviewItem = this.closest('.review-item');
                const contentWrapper = reviewItem.querySelector('.review-pros-cons');
                const targetContentType = this.dataset.target;
                const prosContent = contentWrapper.querySelector('.pros');
                const consContent = contentWrapper.querySelector('.cons');

                if (contentWrapper.classList.contains('active') && contentWrapper.dataset.activeContent === targetContentType) {
                    contentWrapper.classList.remove('active');
                    contentWrapper.removeAttribute('data-active-content');
                } else {
                    if (targetContentType === 'pros') {
                        if (prosContent) prosContent.style.display = 'block';
                        if (consContent) consContent.style.display = 'none';
                    } else {
                        if (prosContent) prosContent.style.display = 'none';
                        if (consContent) consContent.style.display = 'block';
                    }
                    contentWrapper.classList.add('active');
                    contentWrapper.dataset.activeContent = targetContentType;
                }
            });
        });

        const track = document.querySelector('.recommendations-track');
        if (track && track.children.length > 0) {
            const products = Array.from(track.children);
            products.forEach(product => {
                const clone = product.cloneNode(true);
                track.appendChild(clone);
            });
            const card = products[0];
            const cardWidth = card.offsetWidth;
            const cardMargin = parseInt(window.getComputedStyle(card).marginRight) * 2;
            const totalWidth = (cardWidth + cardMargin) * products.length * 2;
            track.style.width = `${totalWidth}px`;
            const duration = products.length * 8;
            track.style.animation = `marquee-recom ${duration}s linear infinite`;
        }
        
        document.querySelectorAll('.submit-action-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const formId = this.dataset.form;
                const formElement = document.getElementById(formId);
                if (formElement) {
                    formElement.classList.toggle('active');
                }
            });
        });

        const starRatingContainer = document.querySelector('.interactive-star-rating');
        if (starRatingContainer) {
            const stars = starRatingContainer.querySelectorAll('i');
            stars.forEach(star => {
                star.addEventListener('mouseover', function() {
                    const rating = this.dataset.value;
                    stars.forEach(s => {
                        s.classList.toggle('fas', s.dataset.value <= rating);
                        s.classList.toggle('far', s.dataset.value > rating);
                    });
                });
                star.addEventListener('mouseleave', function() {
                    const currentRating = starRatingContainer.dataset.rating;
                    stars.forEach(s => {
                        s.classList.toggle('fas', s.dataset.value <= currentRating);
                        s.classList.toggle('far', s.dataset.value > currentRating);
                    });
                });
                star.addEventListener('click', function() {
                    starRatingContainer.dataset.rating = this.dataset.value;
                });
            });
        }
                    // --- اسکریپت منوی همبرگری ---
            const hamburger = document.getElementById('hamburger-menu');
            const navMenu = document.getElementById('nav-menu');

            hamburger.addEventListener('click', function() {                navMenu.classList.toggle('active');
            });
        });