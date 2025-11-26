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

        document.addEventListener('DOMContentLoaded', function () {

    // =========================================
    // 1. مدیریت بخش تعداد (Quantity Selector)
    // =========================================
    const qtyValueSpan = document.querySelector('.pupa-qty-value');
    const qtyButtons = document.querySelectorAll('.pupa-qty-btn');
    
    if (qtyValueSpan && qtyButtons.length === 1) {
        const minusBtn = qtyButtons[0]; // اولین دکمه (طبق HTML شما منفی است)
        const plusBtn = qtyButtons[1];  // دومین دکمه (طبق HTML شما مثبت است)

        // کاهش تعداد
        minusBtn.addEventListener('click', function () {
            let currentQty = parseInt(qtyValueSpan.innerText);
            if (currentQty > 1) {
                qtyValueSpan.innerText = currentQty - 1;
            }
        });

        // افزایش تعداد
        plusBtn.addEventListener('click', function () {
            let currentQty = parseInt(qtyValueSpan.innerText);
            qtyValueSpan.innerText = currentQty + 1;
        });
    }

    // =========================================
    // 2. مدیریت انتخاب رنگ (Color Selector)
    // =========================================
    const colorOptions = document.querySelectorAll('.pupa-color-opt');
    const previewDot = document.querySelector('.pupa-selected-preview .pupa-dot');
    const previewText = document.querySelector('.pupa-selected-preview span:last-child');

    // نقشه‌برداری نام رنگ‌ها بر اساس کلاس‌های موجود در CSS
    const colorNames = {
        'c-pink': '001 - صورتی',
        'c-peach': '002 - هلویی',
        'c-light': '003 - روشن'
    };

    if (colorOptions.length > 0) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function () {
                // الف: حذف کلاس active از همه گزینه‌ها
                colorOptions.forEach(opt => opt.classList.remove('active'));

                // ب: افزودن کلاس active به گزینه کلیک شده
                this.classList.add('active');

                // ج: دریافت رنگ پس‌زمینه واقعی از CSS برای نمایش در دایره بالا
                const computedStyle = window.getComputedStyle(this);
                const bgColor = computedStyle.backgroundColor;
                
                if (previewDot) {
                    previewDot.style.backgroundColor = bgColor;
                }

                // د: تغییر متن بر اساس کلاسی که المان دارد
                if (previewText) {
                    let foundName = 'انتخاب شده'; // پیش‌فرض
                    
                    // بررسی می‌کنیم کدام کلاس رنگ (c-pink, ...) را دارد
                    for (const [cls, name] of Object.entries(colorNames)) {
                        if (this.classList.contains(cls)) {
                            foundName = name;
                            break;
                        }
                    }
                    previewText.innerText = foundName;
                }
            });
        });
    }

    // =========================================
    // 3. مدیریت دکمه افزودن به سبد (جهت تست)
    // =========================================
    const addToCartBtn = document.querySelector('.pupa-add-btn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function () {
            const selectedQty = document.querySelector('.pupa-qty-value').innerText;
            const selectedColorText = document.querySelector('.pupa-selected-preview span:last-child').innerText;
            
            // نمایش پیام یا ارسال به بک‌اند
            alert(`محصول به سبد اضافه شد:\nتعداد: ${selectedQty}\nرنگ: ${selectedColorText}`);
        });
    }

});

document.addEventListener('DOMContentLoaded', function () {

    // =========================================
    // 1. مدیریت بخش تعداد (Quantity Selector)
    // =========================================
    const qtyValueSpan = document.querySelector('.pupa-qty-value');
    const qtyButtons = document.querySelectorAll('.pupa-qty-btn');
    
    if (qtyValueSpan && qtyButtons.length === 2) {
        const minusBtn = qtyButtons[0]; 
        const plusBtn = qtyButtons[1];  

        minusBtn.addEventListener('click', function () {
            let currentQty = parseInt(qtyValueSpan.innerText);
            if (currentQty > 1) {
                qtyValueSpan.innerText = currentQty - 1;
            }
        });

        plusBtn.addEventListener('click', function () {
            let currentQty = parseInt(qtyValueSpan.innerText);
            qtyValueSpan.innerText = currentQty + 1;
        });
    }

    // =========================================
    // 2. مدیریت انتخاب رنگ (دکمه‌های مربعی پایین)
    // =========================================
    const colorOptions = document.querySelectorAll('.pupa-color-opt');
    const previewDot = document.querySelector('.pupa-selected-preview .pupa-dot');
    
    // این بخش مسئول تغییر رنگ دایره و اکتیو کردن مربع‌هاست
    if (colorOptions.length > 0) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function () {
                // حذف کلاس active از همه
                colorOptions.forEach(opt => opt.classList.remove('active'));
                // افزودن به کلیک شده
                this.classList.add('active');

                // گرفتن رنگ پس‌زمینه و اعمال به دایره بالا
                const computedStyle = window.getComputedStyle(this);
                const bgColor = computedStyle.backgroundColor;
                
                if (previewDot) {
                    previewDot.style.backgroundColor = bgColor;
                }
            });
        });
    }

    // =========================================
    // 3. مدیریت منوی دراپ‌داون (بخش جدید)
    // =========================================
    const dropdownTrigger = document.getElementById('pupaDropdownTrigger');
    const dropdownMenu = document.getElementById('pupaDropdownMenu');
    const selectedTextSpan = document.getElementById('pupaSelectedText');
    
    // الف: باز و بسته کردن منو
    if (dropdownTrigger && dropdownMenu) {
        dropdownTrigger.addEventListener('click', function(e) {
            e.stopPropagation(); // جلوگیری از انتشار کلیک
            dropdownMenu.classList.toggle('show');
            
            // چرخش فلش
            const icon = this.querySelector('.fa-chevron-down');
            if(icon) icon.style.transform = dropdownMenu.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0)';
        });
    }

    // ب: انتخاب آیتم از لیست متنی
    const menuItems = document.querySelectorAll('.pupa-dropdown-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const colorName = this.getAttribute('data-name');
            const colorClass = this.getAttribute('data-color-class');

            // 1. آپدیت متن داخل کادر بالا
            if(selectedTextSpan) selectedTextSpan.innerText = colorName;

            // 2. پیدا کردن مربع رنگی مربوطه و کلیک خودکار روی آن
            // (این کار باعث می‌شود دایره رنگی و استایل اکتیو توسط بخش شماره 2 همین کد انجام شود)
            const relatedSquareBtn = document.querySelector(`.pupa-color-opt.${colorClass}`);
            if (relatedSquareBtn) {
                relatedSquareBtn.click(); 
            }

            // 3. بستن منو
            if(dropdownMenu) dropdownMenu.classList.remove('show');
            const icon = dropdownTrigger.querySelector('.fa-chevron-down');
            if(icon) icon.style.transform = 'rotate(0)';
        });
    });

    // ج: بستن منو اگر جای دیگری از صفحه کلیک شد
    document.addEventListener('click', function(e) {
        if (dropdownMenu && dropdownMenu.classList.contains('show')) {
            if (!dropdownTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
                const icon = dropdownTrigger.querySelector('.fa-chevron-down');
                if(icon) icon.style.transform = 'rotate(0)';
            }
        }
    });


});

// تمام بخش جاوای اسلاید پایین سایت
document.addEventListener('DOMContentLoaded', function() {
    const recomSwiper = new Swiper('.pupa-recom-swiper', {
        // چرخه بی‌پایان
        loop: true,
        
        // تعداد اسلایدها: 'auto' باعث می‌شود عرض 270px کارت‌ها که در CSS دادیم رعایت شود
        slidesPerView: 'auto',
        
        // فاصله بین کارت‌ها (به پیکسل)
        spaceBetween: 10,
        
        // وسط چین کردن اسلاید فعال (اختیاری)
        centeredSlides: false, 

        // حرکت آزاد (Free Mode) برای روانی بیشتر هنگام تاچ کردن
        freeMode: true,

        // تنظیمات حرکت خودکار
        autoplay: {
            delay: 2500, // هر 2.5 ثانیه حرکت کند
            disableOnInteraction: false, // اگر کاربر دست زد، بعدش دوباره حرکت شروع شود
            pauseOnMouseEnter: true, // وقتی موس رفت روش، بایستد (طبق خواسته قبلی شما)
        },
        
        // برای جلوگیری از باگ در بارگذاری اولیه
        observer: true,
        observeParents: true,
    });
});

 document.addEventListener('DOMContentLoaded', function() {
        new Swiper('.pupa-recom-swiper', {
            // چرخه بی‌پایان
            loop: true,
            
            // این گزینه باعث می‌شود عرض کارت‌ها از CSS خوانده شود
            slidesPerView: 'auto',
            
            // وسط چین بودن را خاموش می‌کنیم تا از چپ/راست مرتب چیده شوند
            centeredSlides: false,
            
            // اتوپلی
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },

            // بخش حیاتی برای ریسپانسیو (اینجا فاصله را تنظیم می‌کنیم)
            breakpoints: {
                // تنظیمات برای موبایل (زیر 768 پیکسل)
                320: {
                    spaceBetween: 15, // فاصله ۱۵ پیکسل (با CSS مچ می‌شود)
                },
                // تنظیمات برای دسکتاپ (بالای 768 پیکسل)
                768: {
                    spaceBetween: 25, // فاصله بیشتر برای دسکتاپ
                }
            }
        });
    });
//بخش اسلاید سایت تمام شد
