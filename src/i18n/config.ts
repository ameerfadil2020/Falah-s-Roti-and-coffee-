import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      common: {
        home: 'Home',
        orders: 'Orders',
        favorites: 'Favorites',
        cart: 'Cart',
        profile: 'Profile',
        back: 'Back',
        search: 'Search menu...',
        add: 'Add',
        apply: 'Apply',
        save: 'Save',
        cancel: 'Cancel',
      },
      home: {
        greeting: 'Good Morning, Ameer! ☀️',
        featured: 'Featured',
        categories: 'Categories',
        popular: 'Popular Near You',
        orders_count: 'orders',
      },
      product: {
        size: 'Size',
        addons: 'Add-ons',
        special_instructions: 'Special Instructions',
        placeholder_instructions: 'e.g., less sweet, extra hot...',
        add_to_cart: 'Add',
      },
      cart: {
        title: 'Your Cart',
        delivering_to: 'Delivering to:',
        promo_code: 'Apply Promo Code',
        subtotal: 'Subtotal',
        delivery_fee: 'Delivery Fee',
        total: 'Total',
        checkout: 'Proceed to Checkout',
      },
      orders: {
        title: 'My Orders',
        active: 'Active',
        past: 'Past',
        order_no: 'Order #',
        est_arrival: 'Est.',
        reorder: 'Reorder',
        details: 'Details',
      },
      checkout: {
        title: 'Checkout',
        delivery: 'Delivery',
        pickup: 'Pickup',
        address: 'Delivery Address',
        time: 'Delivery Time',
        asap: 'ASAP',
        payment: 'Payment Method',
        orderNotes: 'Order Notes',
        placeOrder: 'Place Order',
      },
      profile: {
        points: 'Points',
        orders: 'Orders',
        member_status: 'Gold Member',
        logout: 'Log Out',
        language: 'Language',
      },
      menu: {
        app_map: 'App Map',
        notifications: 'Notifications',
        store_locator: 'Store Locator',
        about_us: 'About Us',
        privacy_policy: 'Privacy Policy',
      }
    }
  },
  ms: {
    translation: {
      common: {
        home: 'Laman Utama',
        orders: 'Pesanan',
        favorites: 'Kegemaran',
        cart: 'Bakul',
        profile: 'Profil',
        back: 'Kembali',
        search: 'Cari menu...',
        add: 'Tambah',
        apply: 'Guna',
        save: 'Simpan',
        cancel: 'Batal',
      },
      home: {
        greeting: 'Selamat Pagi, Ameer! ☀️',
        featured: 'Pilihan',
        categories: 'Kategori',
        popular: 'Popular Berdekatan Anda',
        orders_count: 'pesanan',
      },
      product: {
        size: 'Saiz',
        addons: 'Tambahan',
        special_instructions: 'Arahan Khas',
        placeholder_instructions: 'cth: kurang manis, lebih panas...',
        add_to_cart: 'Tambah',
      },
      cart: {
        title: 'Bakul Anda',
        delivering_to: 'Menghantar ke:',
        promo_code: 'Guna Kod Promo',
        subtotal: 'Jumlah Kecil',
        delivery_fee: 'Kos Penghantaran',
        total: 'Jumlah',
        checkout: 'Teruskan ke Pembayaran',
      },
      orders: {
        title: 'Pesanan Saya',
        active: 'Aktif',
        past: 'Lepas',
        order_no: 'Pesanan #',
        est_arrival: 'Anggaran',
        reorder: 'Pesan Semula',
        details: 'Butiran',
      },
      checkout: {
        title: 'Pembayaran',
        delivery: 'Penghantaran',
        pickup: 'Ambil Sendiri',
        address: 'Alamat Penghantaran',
        time: 'Masa Penghantaran',
        asap: 'Segera',
        payment: 'Kaedah Pembayaran',
        orderNotes: 'Nota Pesanan',
        placeOrder: 'Buat Pesanan',
      },
      profile: {
        points: 'Mata',
        orders: 'Pesanan',
        member_status: 'Ahli Emas',
        logout: 'Log Keluar',
        language: 'Bahasa',
      },
      menu: {
        app_map: 'Peta Aplikasi',
        notifications: 'Notifikasi',
        store_locator: 'Lokasi Kedai',
        about_us: 'Tentang Kami',
        privacy_policy: 'Dasar Privasi',
      }
    }
  },
  ar: {
    translation: {
      common: {
        home: 'الرئيسية',
        orders: 'الطلبات',
        favorites: 'المفضلة',
        cart: 'السلة',
        profile: 'الملف الشخصي',
        back: 'رجوع',
        search: 'بحث في القائمة...',
        add: 'إضافة',
        apply: 'تطبيق',
        save: 'حفظ',
        cancel: 'إلغاء',
      },
      home: {
        greeting: 'صباح الخير، أمير! ☀️',
        featured: 'المميز',
        categories: 'الفئات',
        popular: 'الأكثر شعبية بالقرب منك',
        orders_count: 'طلب',
      },
      product: {
        size: 'الحجم',
        addons: 'الإضافات',
        special_instructions: 'تعليمات خاصة',
        placeholder_instructions: 'مثلاً: سكر أقل، حار جداً...',
        add_to_cart: 'إضافة',
      },
      cart: {
        title: 'سلتك',
        delivering_to: 'التوصيل إلى:',
        promo_code: 'تطبيق رمز ترويجي',
        subtotal: 'المجموع الفرعي',
        delivery_fee: 'رسوم التوصيل',
        total: 'المجموع الكلي',
        checkout: 'المتابعة للدفع',
      },
      orders: {
        title: 'طلباتي',
        active: 'نشطة',
        past: 'سابقة',
        order_no: 'رقم الطلب #',
        est_arrival: 'الوصول المتوقع',
        reorder: 'إعادة طلب',
        details: 'التفاصيل',
      },
      checkout: {
        title: 'الدفع',
        delivery: 'توصيل',
        pickup: 'استلام',
        address: 'عنوان التوصيل',
        time: 'وقت التوصيل',
        asap: 'في أقرب وقت',
        payment: 'طريقة الدفع',
        orderNotes: 'ملاحظات الطلب',
        placeOrder: 'إتمام الطلب',
      },
      profile: {
        points: 'النقاط',
        orders: 'الطلبات',
        member_status: 'عضو ذهبي',
        logout: 'تسجيل الخروج',
        language: 'اللغة',
      },
      menu: {
        app_map: 'خريطة التطبيق',
        notifications: 'التنبيهات',
        store_locator: 'مواقع الفروع',
        about_us: 'من نحن',
        privacy_policy: 'سياسة الخصوصية',
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
