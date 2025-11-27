document.addEventListener('DOMContentLoaded', function () {
            
    // منوی کاربر
    const userMenuContainer = document.querySelector('.user-menu-container');
    const userMenuToggle = userMenuContainer ? userMenuContainer.querySelector('.header-icon') : null;
    const userMenu = userMenuContainer ? userMenuContainer.querySelector('.user-dropdown-menu') : null;

    if (userMenuToggle && userMenu) {
        userMenuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            userMenu.classList.toggle('show');
        });
    }

    document.addEventListener('click', function (e) {
        if (userMenuContainer && !userMenuContainer.contains(e.target)) {
            userMenu.classList.remove('show');
        }
    });

    // === تغییر ۳: منوی موبایل (همبرگری) ===
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            mobileNav.classList.toggle('active');
            // تغییر آیکون همبرگر به X و بالعکس
            const icon = this.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // اسلایدر اصلی
    new Swiper('#main-swiper', {
        loop: true,
        effect: 'fade',
        autoplay: { delay: 5000 },
        pagination: { el: '.swiper-pagination', clickable: true },
        speed: 1200,
    });

    const productsData = {
        page1: [ 
            { img: 'f50e0960-4d2c-4d9a-8125-23faf5392a82.jpg', name: 'کرم پودر مایع', category: 'کرم پودر', price: '۴۵۰,۰۰۰ تومان', priceNum: 450000, badge: 'NEW', colors: ['#FFB6C1', '#FF69B4', '#FFC0CB'] }, 
            { img: 'e1298757-e3c4-467a-afc6-bb01be06421e.jpg', name: 'رژ لب مخملی', category: 'رژ لب', price: '۲۸۰,۰۰۰ تومان', priceNum: 280000, colors: ['#DC143C', '#8B0000', '#FF1493', '#C71585'] }, 
            { img: 'In a smooth powder formula, the Revolution….jpg', name: 'پالت سایه چشم', category: 'سایه', price: '۷۲۰,۰۰۰ تومان', priceNum: 720000, colors: ['#D2691E', '#8B4513', '#A0522D'] }, 
            { img: '7a1c36f1-b4b6-4fa3-8885-2b73b6a462d0.jpg', name: 'ریمل حجم‌دهنده', category: 'ریمل', price: '۳۴۰,۰۰۰ تومان', priceNum: 340000, badge: 'NEW' }, 
            { img: 'Ying Yu Rollers.jpg', name: 'عطر زنانه فلورال', category: 'عطر', price: '۱,۵۰۰,۰۰۰ تومان', priceNum: 1500000, colors: ['#FFD700', '#FFA500'] }, 
            { img: '57786db5-45e9-4bdd-a801-d13bca1ad161.jpg', name: 'کرم مرطوب‌کننده', category: 'مراقبت پوست', price: '۴۱۰,۰۰۰ تومان', priceNum: 410000 }, 
            { img: 'komaci3.jpg', name: 'لاک ناخن ژلی', category: 'لاک', price: '۱۲۰,۰۰۰ تومان', priceNum: 120000, colors: ['#FF0000', '#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493'] }, 
            { img: 'komaci2.jpg', name: 'سرم پوست ویتامین C', category: 'مراقبت پوست', price: '۶۵۰,۰۰۰ تومان', priceNum: 650000, colors: ['#FFD700', '#FFA500', '#FF8C00'] }, 
            { img: 'KIKO -- Artist Powder Face Brush.jpg', name: 'رژ گونه استیکی', category: 'رژ گونه', price: '۳۱۰,۰۰۰ تومان', priceNum: 310000, colors: ['#FF6B9D', '#FFB6C1'] }, 
            { img: 'komaci.jpg', name: 'مداد چشم ضدآب', category: 'مداد چشم', price: '۱۹۰,۰۰۰ تومان', priceNum: 190000 }, 
            { img: 'eaa10ba1-5e10-40cc-992a-368ca4f2b1e1.jpg', name: 'پرایمر مات‌کننده', category: 'پرایمر', price: '۳۹۰,۰۰۰ تومان', priceNum: 390000, badge: 'NEW', colors: ['#F5DEB3', '#FFE4B5', '#FFDEAD'] }, 
            { img: 'ecdf96e6-fdb7-44e7-8d03-cb64c5895391.jpg', name: 'ست براش آرایشی', category: 'اکسسوری', price: '۸۵۰,۰۰۰ تومان', priceNum: 850000, colors: ['#000000', '#FF1493'] }, 
        ],
        page2: [ 
            { img: '', name: 'اسپری فیکس', category: 'فیکساتور', price: '۲۹۰,۰۰۰ تومان', priceNum: 290000, colors: ['#87CEEB', '#00BFFF'] }, 
            { img: '', name: 'کانسیلر مایع', category: 'کانسیلر', price: '۲۵۰,۰۰۰ تومان', priceNum: 250000, badge: 'NEW', colors: ['#F5DEB3', '#FFE4B5', '#FFDEAD', '#D2B48C'] }, 
            { img: '', name: 'شاین لب', category: 'رژ لب', price: '۱۸۰,۰۰۰ تومان', priceNum: 180000, colors: ['#FF69B4', '#FFB6C1', '#FFC0CB'] }, 
            { img: '', name: 'کرم ضد آفتاب', category: 'مراقبت پوست', price: '۵۵۰,۰۰۰ تومان', priceNum: 550000 }, 
        ]
    };

    const productGrid = document.querySelector('.product-grid');
    const paginationContainer = document.querySelector('.pagination');
    let currentPage = 1;

    // === تغییر ۱: فیلتر مرتب‌سازی محصولات ===
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            sortProducts(sortValue);
        });
    }

    function sortProducts(sortType) {
        const currentProducts = productsData[`page${currentPage}`];
        if (!currentProducts) return;

        let sortedProducts = [...currentProducts];

        switch(sortType) {
            case 'price-asc':
                sortedProducts.sort((a, b) => a.priceNum - b.priceNum);
                break;
            case 'price-desc':
                sortedProducts.sort((a, b) => b.priceNum - a.priceNum);
                break;
            case 'name-asc':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name, 'fa'));
                break;
            case 'name-desc':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name, 'fa'));
                break;
            default:
                // پیش‌فرض - ترتیب اصلی
                break;
        }

        productsData[`page${currentPage}`] = sortedProducts;
        renderProducts(currentPage);
    }

    function renderProducts(page) {
        productGrid.innerHTML = '';
        if (!productsData[`page${page}`]) return;
        productsData[`page${page}`].forEach((product, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.animationDelay = `${(index * 0.05) + 0.1}s`;

            const badgeHTML = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
            
            const colorsHTML = product.colors ? 
                `<div class="product-colors">${product.colors.map(color => 
                    `<span class="color-swatch" style="background-color: ${color};"></span>`
                ).join('')}</div>` : '';

            card.innerHTML = `
                ${badgeHTML}
                <div class="img-container">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-category">${product.category}</p>
                    ${colorsHTML}
                    <p class="product-price">${product.price}</p>
                    <a href="mahsool.html" class="btn">مشاهده جزئیات</a>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    function setupPagination() {
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= Object.keys(productsData).length; i++) {
            const li = document.createElement('li');
            if (i === currentPage) li.classList.add('active');
            const a = document.createElement('a');
            a.textContent = i; 
            a.dataset.page = i; 
            li.appendChild(a);
            paginationContainer.appendChild(li);
        }
    }

    paginationContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.dataset.page) {
            const page = parseInt(e.target.dataset.page, 10);
            if (page !== currentPage) {
                currentPage = page;
                renderProducts(currentPage);
                setupPagination();
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    renderProducts(currentPage);
    setupPagination();
    
        const testimonialsData = [ 
    { text: "طراحی فوق‌العاده زیبا. پیدا کردن محصولات خیلی راحته و از خریدم واقعا راضی هستم.", author: "سارا محمدی" }, 
    { text: "کیفیت محصولات بی‌نظیره. بسته‌بندی شیک و سریع، همه چیز عالی بود!", author: "مریم رضایی" }, 
    { text: "این بهترین  خرید آنلاین من بود. سایت خیلی روان کار می‌کنه و افکت‌هاش خلاقانه است.", author: "نگار کریمی" }, 
    { text: "عاشق کالکشن جدیدتون شدم! رنگ‌ها و کیفیت محصولات واقعا در سطح جهانیه.", author: "شیما وحدتی" }, 
    { text: "پشتیبانی مشتریان بسیار حرفه‌ای و پاسخگو بود. حس خیلی خوبی از این خرید داشتم.", author: "آزاده تهرانی" }, 
    { text: "محصولات کاملا گیاهی و بدون تست حیوانی هستند که برای من ارزش بسیار زیادی داره.", author: "پریسا نوری" } 
];

const wrapper = document.getElementById('testimonial-wrapper');

if (wrapper) {
    // 1. تولید کارت‌ها در HTML
    testimonialsData.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide'; // کلاس ضروری swiper
        slide.innerHTML = `
            <div class="testimonial-card">
                <p>"${item.text}"</p>
                <h4>- ${item.author}</h4>
            </div>
        `;
        wrapper.appendChild(slide);
    });

    // 2. راه‌اندازی اسلایدر با تنظیمات بهینه
    const swiper = new Swiper('.testimonial-swiper', {
        loop: true, // چرخش بی‌نهایت
        speed: 800, // سرعت نرم حرکت
        spaceBetween: 20, // فاصله بین کارت‌ها
        grabCursor: true, // نشانگر موس به صورت دست
        
        autoplay: {
            delay: 3000,
            disableOnInteraction: false, // بعد از تاچ متوقف نشود
            pauseOnMouseEnter: true, // وقتی موس روی آن است بایستد
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // --- ریسپانسیو حرفه‌ای ---
        breakpoints: {
            // موبایل (زیر 576px)
            0: {
                slidesPerView: 1.2, // یک کارت کامل + 20 درصد کارت بعدی (برای ترغیب به اسکرول)
                centeredSlides: true, // کارت اصلی وسط باشد
                spaceBetween: 15,
            },
            // تبلت کوچک (576px تا 768px)
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false,
            },
            // تبلت و لپ‌تاپ (768px تا 1024px)
            768: {
                slidesPerView: 2.5, // دو و نیم کارت
                spaceBetween: 25,
            },
            // دسکتاپ (بالای 1024px)
            1024: {
                slidesPerView: 3, // سه کارت کامل
                spaceBetween: 30,
            }
        }
    });
}

const accItems = document.querySelectorAll('.acc-item');
    accItems.forEach(item => {
        const header = item.querySelector('.acc-header');
        header.addEventListener('click', () => {
            // بستن بقیه آیتم‌ها
            accItems.forEach(i => {
                if (i !== item) {
                    i.classList.remove('open');
                    i.querySelector('.acc-header').setAttribute('aria-expanded', 'false');
                }
            });
            // باز/بسته کردن آیتم فعلی
            const isOpen = item.classList.toggle('open');
            header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
  const sortItems = document.querySelectorAll('.sort-options li');
  sortItems.forEach(li => {
    li.addEventListener('click', () => {
      sortItems.forEach(i => i.classList.remove('active'));
      li.classList.add('active');
    });
  });
});

});


document.addEventListener('DOMContentLoaded', function () {
  const sortToggle = document.getElementById('sort-toggle');
  const sortMenu = document.getElementById('sort-menu');
  const overlay = document.getElementById('overlay');

  if (!sortToggle || !sortMenu || !overlay) {
    console.error("❌ عناصر لازم پیدا نشد.");
    return;
  }

  // باز و بسته کردن منو + نمایش تار
  sortToggle.addEventListener('click', () => {
    const isActive = sortMenu.classList.toggle('active');
    overlay.classList.toggle('active', isActive);
    console.log("مرتب‌سازی:", isActive ? "باز" : "بسته");
  });

  // انتخاب گزینه + بستن منو و تار
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      sortMenu.classList.remove('active');
      overlay.classList.remove('active');
      console.log("📌 گزینه انتخاب شد:", item.textContent.trim());
    });
  });

  // کلیک روی تار = بستن
  overlay.addEventListener('click', () => {
    sortMenu.classList.remove('active');
    overlay.classList.remove('active');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('overlay');
  const sortMenu = document.getElementById('sort-menu');
  const closeBtn = document.getElementById('close1');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sortMenu.classList.remove('active');
      overlay.classList.remove('active');
      console.log("❌ منو بسته شد با آیکون بست");
    });
  }
});

