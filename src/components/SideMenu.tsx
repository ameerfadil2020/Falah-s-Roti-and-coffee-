import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Home, ShoppingBag, Heart, User, 
  Settings, HelpCircle, LogOut, Languages,
  Map, Info, Bell, ShieldCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    const langs = ['en', 'ms', 'ar'];
    const currentIndex = langs.indexOf(i18n.language);
    const nextIndex = (currentIndex + 1) % langs.length;
    i18n.changeLanguage(langs[nextIndex]);
  };

  const menuItems = [
    { icon: Home, label: t('common.home'), path: '/' },
    { icon: ShoppingBag, label: t('common.orders'), path: '/orders' },
    { icon: Heart, label: t('common.favorites'), path: '/favorites' },
    { icon: User, label: t('common.profile'), path: '/profile' },
    { icon: Bell, label: t('menu.notifications'), path: '/notifications' },
    { icon: Map, label: t('menu.store_locator'), path: '/stores' },
    { icon: Info, label: t('menu.about_us'), path: '/about' },
    { icon: ShieldCheck, label: t('menu.privacy_policy'), path: '/privacy' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-secondary/60 backdrop-blur-md z-[100] max-w-md mx-auto"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-background z-[101] shadow-2xl flex flex-col border-r border-white/10 overflow-hidden"
          >
            {/* Header - Premium Profile Section */}
            <div className="p-10 pt-16 bg-surface relative overflow-hidden border-b border-border/10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full -mr-24 -mt-24 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full -ml-16 -mb-16 blur-2xl" />
              
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-background/50 backdrop-blur-xl flex items-center justify-center text-text-muted hover:text-primary transition-all border border-white/20 shadow-premium"
              >
                <X size={24} strokeWidth={2.5} />
              </motion.button>

              <div className="flex flex-col gap-6 relative z-10">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-24 h-24"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" 
                    alt="Profile" 
                    className="w-full h-full rounded-[2.5rem] object-cover border-4 border-background shadow-premium"
                  />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg border-2 border-background">
                    <ShieldCheck size={16} strokeWidth={3} />
                  </div>
                </motion.div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl font-black text-text-primary tracking-tighter uppercase leading-none">Ameer Fadil</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-full">{t('profile.member_status')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-2 hide-scrollbar">
              <p className="px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-4 opacity-40">{t('menu.app_map')}</p>
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <motion.button
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => handleNavigate(item.path)}
                    className={cn(
                      "flex items-center gap-5 p-5 rounded-[2rem] transition-all group active:scale-[0.98] relative overflow-hidden",
                      isActive 
                        ? "bg-primary text-white shadow-premium shadow-primary/20" 
                        : "text-text-secondary hover:bg-surface hover:text-primary"
                    )}
                  >
                    <Icon size={24} strokeWidth={isActive ? 3 : 2} className={cn(isActive ? "text-white" : "group-hover:text-primary transition-colors")} />
                    <span className={cn(
                      "text-lg font-black tracking-tight uppercase",
                      isActive ? "text-white" : "text-text-primary group-hover:text-primary"
                    )}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill"
                        className="absolute right-6 w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Footer Actions - Premium Glassmorphism */}
            <div className="p-8 bg-surface/50 backdrop-blur-xl border-t border-border/10 flex flex-col gap-4">
              {/* Language Switcher */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleLanguage}
                className="flex items-center justify-between p-5 glass-card rounded-[2rem] border border-white/40 hover:border-primary/30 transition-all group shadow-premium"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Languages size={20} strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-black text-text-primary uppercase tracking-widest">{t('profile.language')}</span>
                </div>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20">
                  {i18n.language === 'en' ? 'EN' : i18n.language === 'ms' ? 'MS' : 'AR'}
                </span>
              </motion.button>

              {/* Logout */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-5 bg-error/5 rounded-[2rem] border border-error/10 hover:border-error/30 transition-all group active:scale-[0.98] shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center text-error group-hover:bg-error group-hover:text-white transition-all">
                  <LogOut size={20} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-black text-error uppercase tracking-widest">{t('profile.logout')}</span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
