import { useState } from 'react';
import { ChevronRight, Clock, CheckCircle2, MapPin, Star, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { cn } from '../lib/utils';

const ORDERS = [
  {
    id: 'FL2847',
    date: 'Today, 10:32 AM',
    status: 'On the Way',
    items: 3,
    total: 60.00,
    estimatedArrival: '12 min',
    driver: {
      name: 'Mohammed',
      rating: 4.9,
      car: 'Toyota Corolla',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
    }
  },
  {
    id: 'FL2846',
    date: 'Yesterday, 02:15 PM',
    status: 'Delivered',
    items: 2,
    total: 45.50,
  }
];

export function Orders() {
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const { t } = useTranslation();
  const { openSideMenu } = useOutletContext<{ openSideMenu: () => void }>();

  return (
    <div className="flex flex-col min-h-screen bg-background pb-32">
      {/* Header - Glassmorphism */}
      <header className="px-8 pt-12 pb-6 glass-card backdrop-blur-2xl sticky top-0 z-50 border-b border-white/20 shadow-premium">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black text-text-primary tracking-tighter uppercase">{t('orders.title')}</h1>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={openSideMenu}
            className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center text-text-primary shadow-premium border border-border/10 transition-all"
          >
            <Menu size={28} strokeWidth={2.5} />
          </motion.button>
        </div>
        
        {/* Tabs - Modern Toggle */}
        <div className="flex bg-surface p-2 rounded-[2.5rem] shadow-inner border border-border/10">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('active')}
            className={cn(
              "flex-1 py-4 text-xs font-black rounded-[2rem] transition-all uppercase tracking-[0.2em] relative overflow-hidden",
              activeTab === 'active' ? "text-white" : "text-text-muted hover:text-text-primary"
            )}
          >
            {activeTab === 'active' && (
              <motion.div 
                layoutId="tab-bg"
                className="absolute inset-0 bg-secondary shadow-lg -z-10"
              />
            )}
            {t('orders.active')}
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('past')}
            className={cn(
              "flex-1 py-4 text-xs font-black rounded-[2rem] transition-all uppercase tracking-[0.2em] relative overflow-hidden",
              activeTab === 'past' ? "text-white" : "text-text-muted hover:text-text-primary"
            )}
          >
            {activeTab === 'past' && (
              <motion.div 
                layoutId="tab-bg"
                className="absolute inset-0 bg-secondary shadow-lg -z-10"
              />
            )}
            {t('orders.past')}
          </motion.button>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-col gap-8 px-8 pt-10">
        {activeTab === 'active' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 rounded-[3.5rem] shadow-premium border border-white/40 flex flex-col gap-8 group hover:border-primary/30 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <motion.span 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-[10px] font-black text-primary bg-primary/10 px-4 py-1.5 rounded-full uppercase tracking-[0.2em] w-fit border border-primary/20"
                >
                  {ORDERS[0].status}
                </motion.span>
                <h3 className="text-2xl font-black text-text-primary mt-3 tracking-tight">{t('orders.order_no')}{ORDERS[0].id}</h3>
                <p className="text-xs font-bold text-text-muted uppercase tracking-[0.1em] opacity-60">{ORDERS[0].date}</p>
              </div>
              <div className="text-right flex flex-col gap-1">
                <span className="text-3xl font-black text-text-primary tracking-tighter">AED {ORDERS[0].total.toFixed(2)}</span>
                <p className="text-xs font-bold text-text-muted uppercase tracking-[0.1em] opacity-60">{ORDERS[0].items} items</p>
              </div>
            </div>

            <div className="h-px bg-border/10" />

            {/* Tracking Map Placeholder - Premium */}
            <div className="h-48 bg-background/50 rounded-[2.5rem] border border-white/20 overflow-hidden relative flex items-center justify-center shadow-inner group-hover:border-primary/20 transition-all">
              <MapPin size={48} className="text-primary/20" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              
              {/* Floating Tracking Card */}
              <div className="absolute bottom-6 left-6 right-6 glass-card backdrop-blur-2xl p-5 rounded-3xl shadow-premium border border-white/40 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <Clock size={24} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] opacity-60">Estimated Arrival</span>
                    <span className="text-base font-black text-text-primary tracking-tight">{ORDERS[0].estimatedArrival}</span>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-primary animate-ping shadow-[0_0_15px_rgba(196,129,61,0.6)]" />
              </div>
            </div>

            {/* Driver Info - Premium Card */}
            <div className="flex items-center gap-5 bg-background/40 p-5 rounded-[2.5rem] border border-white/10 shadow-inner">
              <img 
                src={ORDERS[0].driver.image} 
                alt={ORDERS[0].driver.name} 
                className="w-16 h-16 rounded-3xl object-cover shadow-premium border-2 border-white"
              />
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-lg font-black text-text-primary leading-tight tracking-tight">{ORDERS[0].driver.name}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-tight opacity-60">{ORDERS[0].driver.car}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-text-muted/20" />
                  <div className="flex items-center gap-1.5">
                    <Star size={14} className="text-warning fill-warning" />
                    <span className="text-xs font-black text-text-secondary">{ORDERS[0].driver.rating}</span>
                  </div>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-2xl bg-white shadow-premium flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all border border-border/10"
              >
                <ChevronRight size={28} strokeWidth={2.5} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {activeTab === 'past' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-[3.5rem] shadow-premium border border-white/40 flex flex-col gap-6 opacity-90 hover:opacity-100 transition-all cursor-pointer hover:border-primary/30"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success border border-success/20">
                    <CheckCircle2 size={16} strokeWidth={3} />
                  </div>
                  <span className="text-[10px] font-black text-success uppercase tracking-[0.2em]">
                    {ORDERS[1].status}
                  </span>
                </div>
                <h3 className="text-xl font-black text-text-primary mt-3 tracking-tight">{t('orders.order_no')}{ORDERS[1].id}</h3>
                <p className="text-xs font-bold text-text-muted uppercase tracking-[0.1em] opacity-60">{ORDERS[1].date}</p>
              </div>
              <div className="text-right flex flex-col gap-1">
                <span className="text-2xl font-black text-text-primary tracking-tighter">AED {ORDERS[1].total.toFixed(2)}</span>
                <p className="text-xs font-bold text-text-muted uppercase tracking-[0.1em] opacity-60">{ORDERS[1].items} items</p>
              </div>
            </div>

            <div className="h-px bg-border/10" />

            <div className="flex justify-between items-center px-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-black text-primary uppercase tracking-[0.2em] hover:text-primary-dark transition-colors"
              >
                {t('orders.reorder')}
              </motion.button>
              <motion.button 
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-black text-text-secondary hover:text-text-primary transition-all flex items-center gap-3 uppercase tracking-[0.2em]"
              >
                {t('orders.details')} <ChevronRight size={20} strokeWidth={2.5} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

