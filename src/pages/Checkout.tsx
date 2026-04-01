import { useState } from 'react';
import { ArrowLeft, MapPin, Clock, CreditCard, ChevronRight, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useCart } from '../lib/CartContext';

export function Checkout() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { total, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

  const handlePlaceOrder = () => {
    // Logic to place order
    clearCart();
    navigate('/orders');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-48">
      {/* Header - Glassmorphism */}
      <header className="px-8 pt-12 pb-6 flex items-center gap-6 glass-card backdrop-blur-2xl sticky top-0 z-50 border-b border-white/20 shadow-premium">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center text-text-primary shadow-premium border border-border/10 transition-all"
        >
          <ArrowLeft size={28} strokeWidth={2.5} />
        </motion.button>
        <h1 className="text-3xl font-black text-text-primary tracking-tighter uppercase">{t('checkout.title')}</h1>
      </header>

      <div className="flex flex-col gap-10 px-8 pt-8">
        {/* Delivery Method - Modern Toggle */}
        <div className="flex bg-surface p-2 rounded-[2.5rem] shadow-inner border border-border/10">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => setDeliveryMethod('delivery')}
            className={cn(
              "flex-1 py-4 text-xs font-black rounded-[2rem] transition-all uppercase tracking-[0.2em] relative overflow-hidden",
              deliveryMethod === 'delivery' ? "text-white" : "text-text-muted hover:text-text-primary"
            )}
          >
            {deliveryMethod === 'delivery' && (
              <motion.div 
                layoutId="method-bg"
                className="absolute inset-0 bg-secondary shadow-lg -z-10"
              />
            )}
            {t('checkout.delivery')}
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => setDeliveryMethod('pickup')}
            className={cn(
              "flex-1 py-4 text-xs font-black rounded-[2rem] transition-all uppercase tracking-[0.2em] relative overflow-hidden",
              deliveryMethod === 'pickup' ? "text-white" : "text-text-muted hover:text-text-primary"
            )}
          >
            {deliveryMethod === 'pickup' && (
              <motion.div 
                layoutId="method-bg"
                className="absolute inset-0 bg-secondary shadow-lg -z-10"
              />
            )}
            {t('checkout.pickup')}
          </motion.button>
        </div>

        {/* Address - Premium Card */}
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-black text-text-primary tracking-tight">{t('checkout.address')}</h3>
          <motion.button 
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card p-6 rounded-[3rem] shadow-premium border border-white/40 flex items-center gap-6 hover:border-primary/30 transition-all text-left group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
              <MapPin size={28} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-black text-text-primary tracking-tight">Home</h4>
              <p className="text-sm font-bold text-text-secondary mt-1 opacity-60">Dubai Marina, Tower 3, Apt 402</p>
            </div>
            <ChevronRight size={24} className="text-text-muted group-hover:text-primary transition-colors" />
          </motion.button>
        </div>

        {/* Time - Premium Card */}
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-black text-text-primary tracking-tight">{t('checkout.time')}</h3>
          <motion.button 
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card p-6 rounded-[3rem] shadow-premium border border-white/40 flex items-center gap-6 hover:border-primary/30 transition-all text-left group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
              <Clock size={28} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-black text-text-primary tracking-tight">{t('checkout.asap')}</h4>
              <p className="text-sm font-bold text-text-secondary mt-1 opacity-60">Estimated arrival: 25-35 min</p>
            </div>
            <ChevronRight size={24} className="text-text-muted group-hover:text-primary transition-colors" />
          </motion.button>
        </div>

        {/* Payment - Premium Card */}
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-black text-text-primary tracking-tight">{t('checkout.payment')}</h3>
          <motion.button 
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card p-6 rounded-[3rem] shadow-premium border border-white/40 flex items-center gap-6 hover:border-primary/30 transition-all text-left group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
              <CreditCard size={28} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-black text-text-primary tracking-tight">Apple Pay</h4>
              <p className="text-sm font-bold text-text-secondary mt-1 opacity-60">Default Payment Method</p>
            </div>
            <ChevronRight size={24} className="text-text-muted group-hover:text-primary transition-colors" />
          </motion.button>
        </div>

        {/* Order Notes - Premium Textarea */}
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-black text-text-primary tracking-tight">{t('checkout.orderNotes')}</h3>
          <textarea 
            placeholder="e.g., Please leave at the door..."
            className="w-full glass-card p-8 rounded-[3rem] shadow-premium border border-white/40 outline-none resize-none h-40 text-lg font-black text-text-primary placeholder:text-text-muted/40 focus:border-primary/50 transition-all tracking-tight"
          />
        </div>
      </div>

      {/* Floating Order Summary - Glassmorphism */}
      <div className="fixed bottom-8 left-6 right-6 max-w-md mx-auto z-50">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card backdrop-blur-2xl border border-white/40 p-6 rounded-[3rem] shadow-premium flex flex-col gap-6"
        >
          <div className="flex justify-between items-center px-2">
            <div className="flex flex-col">
              <span className="text-text-muted font-black uppercase tracking-[0.2em] text-[10px] opacity-60">Total to pay</span>
              <span className="text-3xl font-black text-primary tracking-tighter">AED {total.toFixed(2)}</span>
            </div>
            <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center">
              <ShoppingCart size={24} className="text-primary" />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePlaceOrder}
            className="w-full h-20 bg-secondary text-white rounded-[2.5rem] font-black text-xl hover:bg-primary transition-all shadow-premium shadow-secondary/20 flex justify-center items-center gap-4 group"
          >
            <span className="uppercase tracking-[0.2em] text-sm">{t('checkout.placeOrder')}</span>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <ChevronRight size={24} strokeWidth={2.5} />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

