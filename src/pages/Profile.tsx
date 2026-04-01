import { User, Settings, MapPin, CreditCard, Heart, HelpCircle, LogOut, ChevronRight, Gift, Languages, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { cn } from '../lib/utils';

const MENU_ITEMS = [
  { icon: Gift, label: 'Rewards & Offers', path: '/rewards', badge: 'New' },
  { icon: MapPin, label: 'Saved Addresses', path: '/addresses' },
  { icon: CreditCard, label: 'Payment Methods', path: '/payments' },
  { icon: Heart, label: 'Favorites', path: '/favorites' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', path: '/help' },
];

export function Profile() {
  const { t, i18n } = useTranslation();
  const { openSideMenu } = useOutletContext<{ openSideMenu: () => void }>();

  const toggleLanguage = () => {
    const langs = ['en', 'ms', 'ar'];
    const currentIndex = langs.indexOf(i18n.language);
    const nextIndex = (currentIndex + 1) % langs.length;
    i18n.changeLanguage(langs[nextIndex]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-8 bg-surface rounded-b-[3rem] shadow-xl border-b border-border/30 relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
        
        <button 
          onClick={openSideMenu}
          className="absolute top-8 right-6 w-10 h-10 rounded-xl bg-background/50 backdrop-blur-sm flex items-center justify-center text-text-primary hover:bg-primary/10 transition-all active:scale-90 border border-border/20 z-20"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-5 relative z-10">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150" 
              alt="Profile" 
              className="w-24 h-24 rounded-[2rem] object-cover border-4 border-background shadow-xl"
            />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-secondary text-white rounded-xl flex items-center justify-center border-2 border-surface shadow-lg hover:bg-primary transition-all active:scale-90">
              <User size={16} strokeWidth={3} />
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <h1 className="text-3xl font-black text-text-primary tracking-tight">Ameer Fadil</h1>
            <p className="text-sm font-bold text-text-muted uppercase tracking-widest">+971 50 123 4567</p>
            <div className="flex items-center gap-2 mt-1 bg-primary/10 w-fit px-4 py-1.5 rounded-full border border-primary/20">
              <Gift size={14} className="text-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">{t('profile.member_status')}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-10">
          <div className="flex-1 bg-background p-5 rounded-3xl border-2 border-border/50 flex flex-col items-center justify-center shadow-inner group hover:border-primary/30 transition-all">
            <span className="text-3xl font-black text-primary">1,250</span>
            <span className="text-[10px] font-black text-text-muted mt-1 uppercase tracking-[0.2em]">{t('profile.points')}</span>
          </div>
          <div className="flex-1 bg-background p-5 rounded-3xl border-2 border-border/50 flex flex-col items-center justify-center shadow-inner group hover:border-primary/30 transition-all">
            <span className="text-3xl font-black text-text-primary">12</span>
            <span className="text-[10px] font-black text-text-muted mt-1 uppercase tracking-[0.2em]">{t('profile.orders')}</span>
          </div>
        </div>
      </header>

      {/* Menu */}
      <div className="flex flex-col gap-3 px-6 pt-8">
        {/* Language Switcher */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={toggleLanguage}
          className="flex items-center justify-between p-5 bg-surface rounded-3xl shadow-lg border border-border/20 hover:border-primary/30 transition-all group active:scale-[0.98]"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center text-text-secondary group-hover:text-primary group-hover:bg-primary/10 transition-all border border-border/20">
              <Languages size={24} />
            </div>
            <span className="text-lg font-black text-text-primary group-hover:text-primary transition-colors">{t('profile.language')}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-lg">
              {i18n.language === 'en' ? 'English' : i18n.language === 'ms' ? 'Bahasa Melayu' : 'العربية'}
            </span>
            <ChevronRight size={20} className="text-text-muted group-hover:text-primary transition-colors" />
          </div>
        </motion.button>

        {MENU_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.05 }}
              className="flex items-center justify-between p-5 bg-surface rounded-3xl shadow-lg border border-border/20 hover:border-primary/30 transition-all group active:scale-[0.98]"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center text-text-secondary group-hover:text-primary group-hover:bg-primary/10 transition-all border border-border/20">
                  <Icon size={24} />
                </div>
                <span className="text-lg font-black text-text-primary group-hover:text-primary transition-colors">{item.label}</span>
              </div>
              <div className="flex items-center gap-4">
                {item.badge && (
                  <span className="bg-error/10 text-error text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">
                    {item.badge}
                  </span>
                )}
                <ChevronRight size={20} className="text-text-muted group-hover:text-primary transition-colors" />
              </div>
            </motion.button>
          );
        })}

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (MENU_ITEMS.length + 1) * 0.05 }}
          className="flex items-center gap-5 p-5 mt-6 bg-surface rounded-3xl shadow-lg border-2 border-error/10 hover:border-error/30 hover:bg-error/5 transition-all group active:scale-[0.98]"
        >
          <div className="w-12 h-12 rounded-2xl bg-error/10 flex items-center justify-center text-error border border-error/20">
            <LogOut size={24} />
          </div>
          <span className="text-lg font-black text-error uppercase tracking-widest">{t('profile.logout')}</span>
        </motion.button>
      </div>
    </div>
  );
}

