 document.addEventListener('DOMContentLoaded', function () {
    // --- متغیرهای سراسری بخش ناوبری ---
    const navItems = document.querySelectorAll('.sidebar-nav li');
    const contentPanels = document.querySelectorAll('.content-panel');
    const ordersListView = document.getElementById('orders-list-view');
    const orderDetailsView = document.getElementById('order-details-view');
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    const backToOrdersBtn = document.getElementById('back-to-orders-btn');
    const sidebarOrderInfo = document.getElementById('sidebar-order-info');

    // --- متغیرهای بخش آدرس ---
    const addressList = document.getElementById('address-list');
    const btnAddNew = document.getElementById('btn-add-new-address');
    const formContainer = document.getElementById('address-form-container');
    const addressForm = document.getElementById('address-form');
    const btnCancel = document.getElementById('btn-cancel-address');
    const btnSave = document.getElementById('btn-save-address');
    const formTitle = document.getElementById('form-title');

    // فیلدهای فرم
    const inputName = document.getElementById('addr-name');
    const inputText = document.getElementById('addr-text');
    const inputZip = document.getElementById('addr-zip');
    const inputTitle = document.getElementById('addr-title');

    // متغیر کمکی برای تشخیص حالت ویرایش
    let isEditing = false;
    let currentEditCard = null;

    // =========================================================
    // 1. منطق تب‌ها (سایدبار)
    // =========================================================
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(nav => nav.classList.remove('active'));
            contentPanels.forEach(panel => panel.classList.remove('active'));

            this.classList.add('active');
            const targetId = this.getAttribute('data-target');
            const targetPanel = document.querySelector(targetId);
            if (targetPanel) targetPanel.classList.add('active');

            // ریست کردن وضعیت پنل سفارشات
            if (sidebarOrderInfo) sidebarOrderInfo.style.display = 'none';
            if (ordersListView) ordersListView.style.display = 'block';
            if (orderDetailsView) orderDetailsView.style.display = 'none';
        });
    });

    // مدیریت دکمه‌های سفارشات
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (ordersListView) ordersListView.style.display = 'none';
            if (orderDetailsView) orderDetailsView.style.display = 'block';
            if (sidebarOrderInfo) sidebarOrderInfo.style.display = 'block';
        });
    });

    if (backToOrdersBtn) {
        backToOrdersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (orderDetailsView) orderDetailsView.style.display = 'none';
            if (ordersListView) ordersListView.style.display = 'block';
            if (sidebarOrderInfo) sidebarOrderInfo.style.display = 'none';
        });
    }

    // =========================================================
    // 2. منطق مدیریت آدرس‌ها (افزودن / ویرایش / حذف)
    // =========================================================

    // نمایش فرم برای افزودن آدرس جدید
    if (btnAddNew) {
        btnAddNew.addEventListener('click', () => {
            isEditing = false;
            currentEditCard = null;
            
            // ریست کردن فرم
            addressForm.reset();
            
            // تغییر متن‌ها
            formTitle.textContent = "افزودن آدرس جدید";
            btnSave.textContent = "ثبت آدرس";
            
            // نمایش فرم
            formContainer.style.display = 'block';
            // اسکرول نرم به سمت فرم
            formContainer.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // دکمه انصراف
    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            formContainer.style.display = 'none';
        });
    }

    // مدیریت کلیک روی دکمه‌های داخل کارت آدرس (ویرایش و حذف)
    if (addressList) {
        addressList.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;

            // --- حذف آدرس ---
            if (target.classList.contains('action-delete')) {
                const card = target.closest('.address-card');
                if (confirm('آیا از حذف این آدرس اطمینان دارید؟')) {
                    card.remove();
                }
            }

            // --- ویرایش آدرس ---
            if (target.classList.contains('action-edit')) {
                const card = target.closest('.address-card');
                currentEditCard = card;
                isEditing = true;

                // خواندن اطلاعات از کارت
                const title = card.querySelector('.addr-title-display').textContent;
                const fullText = card.querySelector('.addr-text-display').textContent;
                const zipRaw = card.querySelector('.addr-zip-display').textContent; // "کدپستی: 123"
                const zip = zipRaw.replace('کدپستی:', '').trim();

                // پر کردن فرم
                // فرض می‌کنیم نام گیرنده اول متن آدرس است تا اولین ویرگول (روشی ساده)
                // یا کاربر می‌تواند دستی اصلاح کند.
                const splitText = fullText.split('،');
                const namePart = splitText[0]; 
                
                inputName.value = namePart; 
                inputText.value = fullText; 
                inputZip.value = zip;
                inputTitle.value = title;

                // تغییر حالت فرم
                formTitle.textContent = "ویرایش آدرس";
                btnSave.textContent = "تأیید ویرایش";
                formContainer.style.display = 'block';
                formContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ثبت فرم (Create یا Update)
    if (addressForm) {
        addressForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // گرفتن مقادیر
            const nameVal = inputName.value;
            const textVal = inputText.value; // آدرس کامل
            const zipVal = inputZip.value;
            const titleVal = inputTitle.value || 'آدرس';

            if (!nameVal || !textVal || !zipVal) {
                alert('لطفاً همه فیلدها را پر کنید.');
                return;
            }

            if (isEditing && currentEditCard) {
                // --- حالت ویرایش: آپدیت کارت موجود ---
                currentEditCard.querySelector('.addr-title-display').textContent = titleVal;
                currentEditCard.querySelector('.addr-text-display').textContent = textVal; // فرض می‌کنیم کاربر کل متن را درست کرده
                currentEditCard.querySelector('.addr-zip-display').textContent = `کدپستی: ${zipVal}`;
                
                // بستن فرم
                formContainer.style.display = 'none';
                alert('آدرس با موفقیت ویرایش شد.');

            } else {
                // --- حالت افزودن: ساخت کارت جدید ---
                const newCard = document.createElement('div');
                newCard.className = 'address-card';
                newCard.innerHTML = `
                    <div class="address-card-header">
                        <h4 class="addr-title-display">${titleVal}</h4>
                        <!-- بج پیش فرض را فقط برای اولی می‌گذاریم یا اینجا حذف می‌کنیم -->
                        <span></span> 
                    </div>
                    <p class="addr-text-display">${textVal}</p>
                    <small class="addr-zip-display">کدپستی: ${zipVal}</small>
                    <div class="address-card-actions">
                        <a href="#" class="action-edit">ویرایش</a>
                        <a href="#" class="action-delete">حذف</a>
                    </div>
                `;
                
                addressList.appendChild(newCard);
                
                // بستن و ریست فرم
                addressForm.reset();
                formContainer.style.display = 'none';
            }
        });
    }
});
