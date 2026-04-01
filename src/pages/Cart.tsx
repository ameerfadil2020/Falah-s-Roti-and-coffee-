import { motion, AnimatePresence } from 'motion/react';
import { 
  Minus, Plus, Trash2, ArrowLeft, 
  MapPin, ChevronRight, Ticket, ShoppingCart, Edit2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../lib/CartContext';

export function Cart() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { cart, removeFromCart, updateQuantity, subtotal, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-[80vh] items-center justify-center px-10 text-center gap-8 bg-background">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 12 }}
        className="w-48 h-48 glass-card rounded-[4rem] flex items-center justify-center text-primary shadow-premium border border-white/40 relative"
      >
        <div className="absolute inset-0 bg-primary/5 rounded-[4rem] animate-pulse" />
        <ShoppingCart size={80} strokeWidth={1.5} />
      </motion.div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-3"
      >
        <h2 className="text-4xl font-black text-text-primary tracking-tighter leading-none uppercase">Empty Basket</h2>
        <p className="text-text-secondary font-medium text-lg leading-relaxed px-4">
          Your artisanal selection is waiting to be filled. Start your journey today.
        </p>
      </motion.div>

      <motion.button 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
        className="w-full h-20 bg-secondary text-white rounded-[2.5rem] font-black text-xl shadow-premium shadow-secondary/20 hover:bg-primary transition-all flex items-center justify-center gap-4 group"
      >
        <span className="uppercase tracking-[0.2em] text-sm">Explore Menu</span>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <ChevronRight size={24} strokeWidth={2.5} />
        </div>
      </motion.button>
    </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-40">
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
        <h1 className="text-3xl font-black text-text-primary tracking-tighter uppercase">{t('cart.title')}</h1>
      </header>

      {/* Content */}
      <div className="flex flex-col gap-8 px-8 pt-8">
        {/* Delivery Address - Premium Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-[2.5rem] shadow-premium border border-white/40 flex items-start gap-5 group hover:border-primary/30 transition-all cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
            <MapPin size={28} strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1.5 opacity-60">{t('cart.delivering_to')}</h3>
            <p className="text-lg font-black text-text-primary leading-tight tracking-tight">
              Dubai Marina, Tower 3, Apt 402
            </p>
          </div>
          <motion.button 
            whileHover={{ rotate: 90 }}
            className="w-12 h-12 rounded-2xl bg-background/50 flex items-center justify-center text-text-muted hover:text-primary transition-all border border-border/10"
          >
            <Edit2 size={20} />
          </motion.button>
        </motion.div>

        {/* Cart Items - Refined List */}
        <div className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {cart.map((item, index) => (
              <motion.div 
                key={item.cartId}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-[3rem] shadow-premium border border-white/40 flex gap-6 group relative overflow-hidden"
              >
                <div className="relative shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-28 h-28 rounded-[2rem] object-cover shadow-lg group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-xl font-black text-text-primary leading-tight tracking-tight group-hover:text-primary transition-colors">{item.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded-lg">
                          {item.variant}
                        </span>
                        {item.addons?.map(addon => (
                          <span key={addon} className="text-[10px] font-bold text-text-muted uppercase tracking-widest bg-surface px-2 py-0.5 rounded-lg border border-border/5">
                            + {addon}
                          </span>
                        ))}
                      </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.2, color: '#ef4444' }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-text-muted transition-all p-2"
                    >
                      <Trash2 size={22} strokeWidth={2.5} />
                    </motion.button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-5 bg-background/50 rounded-[1.5rem] border border-border/10 px-4 py-2 shadow-inner">
                      <motion.button 
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="text-text-primary hover:text-primary font-black text-2xl disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </motion.button>
                      <span className="font-black text-xl w-6 text-center tracking-tighter">{item.quantity}</span>
                      <motion.button 
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="text-text-primary hover:text-primary font-black text-2xl"
                      >
                        +
                      </motion.button>
                    </div>
                    <span className="font-black text-primary text-2xl tracking-tighter">AED {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Promo Code - Premium Input */}
        <div className="glass-card p-6 rounded-[2.5rem] shadow-premium border border-white/40 flex items-center gap-5 focus-within:border-primary/30 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
            <Ticket size={28} strokeWidth={2.5} />
          </div>
          <input 
            type="text" 
            placeholder={t('cart.promo_code')} 
            className="flex-1 bg-transparent border-none outline-none text-lg font-black text-text-primary placeholder:text-text-muted tracking-tight"
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs font-black text-primary uppercase tracking-[0.2em] hover:text-primary-dark transition-colors"
          >
            {t('common.apply')}
          </motion.button>
        </div>
      </div>

      {/* Floating Checkout Summary - Glassmorphism */}
      <div className="fixed bottom-8 left-6 right-6 max-w-md mx-auto z-50">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card backdrop-blur-2xl border border-white/40 p-6 rounded-[3rem] shadow-premium flex flex-col gap-6"
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center opacity-60">
              <span className="text-text-muted font-black uppercase tracking-[0.2em] text-[10px]">{t('cart.subtotal')}</span>
              <span className="font-black text-text-primary text-lg tracking-tight">AED {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center opacity-60">
              <span className="text-text-muted font-black uppercase tracking-[0.2em] text-[10px]">{t('cart.delivery_fee')}</span>
              <span className="font-black text-text-primary text-lg tracking-tight">AED 8.00</span>
            </div>
            <div className="h-px bg-border/5 my-1" />
            <div className="flex justify-between items-center">
              <span className="text-2xl font-black text-text-primary tracking-tighter uppercase">{t('cart.total')}</span>
              <span className="text-3xl font-black text-primary tracking-tighter">AED {total.toFixed(2)}</span>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/checkout')}
            className="w-full h-20 bg-secondary text-white rounded-[2.5rem] font-black text-xl hover:bg-primary transition-all shadow-premium shadow-secondary/20 flex justify-center items-center gap-4 group"
          >
            <span className="uppercase tracking-[0.2em] text-sm">{t('cart.checkout')}</span>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <ChevronRight size={24} strokeWidth={2.5} />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

