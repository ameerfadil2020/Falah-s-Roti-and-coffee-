import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, Heart, User, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { SideMenu } from './SideMenu';

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // Handle RTL direction
  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const tabs = [
    { name: t('common.home'), path: '/', icon: Home },
    { name: t('common.orders'), path: '/orders', icon: ShoppingBag },
    { name: t('common.favorites'), path: '/favorites', icon: Heart },
    { name: t('common.cart'), path: '/cart', icon: ShoppingCart },
    { name: t('common.profile'), path: '/profile', icon: User },
  ];

  // Hide bottom nav on product detail or checkout pages
  const hideBottomNav = location.pathname.startsWith('/product') || location.pathname.startsWith('/checkout');

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background relative shadow-2xl overflow-hidden">
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-20 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="min-h-full"
          >
            <Outlet context={{ openSideMenu: () => setIsSideMenuOpen(true) }} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      {!hideBottomNav && (
        <nav className="absolute bottom-0 w-full bg-surface border-t border-border px-6 py-3 flex justify-between items-center z-50 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.name}
                onClick={() => navigate(tab.path)}
                className={cn(
                  "flex flex-col items-center gap-1 transition-colors duration-200",
                  isActive ? "text-primary" : "text-text-muted hover:text-text-secondary"
                )}
              >
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "p-2 rounded-xl transition-all duration-200",
                    isActive ? "bg-primary/10" : "bg-transparent"
                  )}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                <span className="text-[10px] font-medium">{tab.name}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
