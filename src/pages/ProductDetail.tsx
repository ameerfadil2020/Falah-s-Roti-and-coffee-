import { useState, useMemo } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, Heart, Star, Minus, Plus, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { ALL_PRODUCTS } from '../constants';
import { useCart } from '../lib/CartContext';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const product = useMemo(() => ALL_PRODUCTS.find(p => p.id === id), [id]);

  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]?.id || '');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const calculateTotal = () => {
    let total = product.price;
    const variant = product.variants?.find(v => v.id === selectedVariant);
    if (variant) total += variant.priceModifier;
    
    selectedAddons.forEach(addonId => {
      const addon = product.addons?.find(a => a.id === addonId);
      if (addon) total += addon.price;
    });
    
    return total * quantity;
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const variant = product.variants?.find(v => v.id === selectedVariant);
    const price = product.price + (variant?.priceModifier || 0) + 
      selectedAddons.reduce((sum, addonId) => {
        const addon = product.addons?.find(a => a.id === addonId);
        return sum + (addon?.price || 0);
      }, 0);

    addToCart({
      id: product.id,
      name: product.name,
      price,
      quantity,
      image: product.image,
      variant: variant?.name,
      addons: selectedAddons.map(id => product.addons?.find(a => a.id === id)?.name || '')
    });
    navigate('/cart');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative pb-32">
      {/* Header Image - Immersive Parallax */}
      <div className="relative h-[450px] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-transparent to-background" />
        
        {/* Floating Actions - Glassmorphism */}
        <div className="absolute top-10 left-6 right-6 flex justify-between items-center z-50">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-text-primary shadow-premium border border-white/40 hover:bg-primary hover:text-white transition-all"
          >
            <ArrowLeft size={28} strokeWidth={2.5} />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-text-primary shadow-premium border border-white/40 hover:bg-white transition-all"
          >
            <Heart 
              size={28} 
              strokeWidth={2.5}
              className={cn("transition-all duration-500", isFavorite ? "fill-error text-error scale-110" : "text-text-primary")} 
            />
          </motion.button>
        </div>

        {/* Product Badge Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-20 left-6 glass-dark px-5 py-2 rounded-full border border-white/20 shadow-xl"
        >
          <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Artisanal Selection</span>
        </motion.div>
      </div>

      {/* Content Container */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="flex-1 bg-background -mt-16 rounded-t-[4rem] relative z-20 px-8 pt-12 flex flex-col gap-10 shadow-premium"
      >
        {/* Title & Rating Section */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2 flex-1 pr-4">
              <h1 className="text-4xl font-black text-text-primary tracking-tighter leading-[0.9]">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full">
                  <Star size={14} className="text-primary fill-primary" />
                  <span className="text-xs font-black text-primary">{product.rating}</span>
                </div>
                <span className="text-xs font-bold text-text-muted uppercase tracking-widest">
                  {product.reviews?.toLocaleString()} Reviews
                </span>
              </div>
            </div>
            <div className="glass-card p-4 rounded-3xl shadow-premium border border-white/40 flex flex-col items-center gap-1 min-w-[80px]">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-50">Price</span>
              <span className="text-2xl font-black text-primary tracking-tighter">AED {product.price}</span>
            </div>
          </div>
        </div>

        {/* Description with Premium Styling */}
        <div className="relative group">
          <div className="absolute -left-4 top-0 w-1.5 h-full bg-gradient-to-b from-primary to-primary/20 rounded-full" />
          <p className="text-lg text-text-secondary leading-relaxed font-medium italic pl-4 group-hover:text-text-primary transition-colors duration-500">
            "{product.description}"
          </p>
        </div>

        {/* Variants - Modern Selection */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black text-text-primary tracking-tight">Select Size</h3>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full">Required</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {product.variants.map((variant) => (
                <motion.label 
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  key={variant.id}
                  className={cn(
                    "flex items-center justify-between p-6 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-500 relative overflow-hidden group",
                    selectedVariant === variant.id 
                      ? "border-primary bg-primary/5 shadow-premium" 
                      : "border-border/10 bg-surface hover:border-primary/30"
                  )}
                >
                  {selectedVariant === variant.id && (
                    <motion.div 
                      layoutId="variant-bg"
                      className="absolute inset-0 bg-primary/5 -z-10"
                    />
                  )}
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                      selectedVariant === variant.id 
                        ? "border-primary bg-primary shadow-lg shadow-primary/30" 
                        : "border-text-muted group-hover:border-primary/50"
                    )}>
                      {selectedVariant === variant.id && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" 
                        />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-text-primary text-xl tracking-tight">{variant.name}</span>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Standard Portion</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-widest opacity-50">Total</span>
                    <span className="font-black text-primary text-xl tracking-tighter">
                      AED {product.price + variant.priceModifier}
                    </span>
                  </div>
                </motion.label>
              ))}
            </div>
          </div>
        )}

        {/* Addons - Modern Multi-select */}
        {product.addons && product.addons.length > 0 && (
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-black text-text-primary tracking-tight">Extra Toppings</h3>
            <div className="grid grid-cols-1 gap-4">
              {product.addons.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <motion.label 
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    key={addon.id}
                    className={cn(
                      "flex items-center justify-between p-6 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-500 group",
                      isSelected 
                        ? "border-primary bg-primary/5 shadow-premium" 
                        : "border-border/10 bg-surface hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-center gap-5">
                      <div className={cn(
                        "w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-500",
                        isSelected 
                          ? "bg-primary border-primary shadow-lg shadow-primary/30 rotate-0" 
                          : "border-text-muted rotate-45 group-hover:border-primary/50"
                      )}>
                        {isSelected && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-white text-sm font-black"
                          >
                            ✓
                          </motion.span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-text-primary text-xl tracking-tight">{addon.name}</span>
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Fresh Add-on</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-text-muted uppercase tracking-widest opacity-50">Add</span>
                      <span className="font-black text-primary text-xl tracking-tighter">
                        +AED {addon.price}
                      </span>
                    </div>
                  </motion.label>
                );
              })}
            </div>
          </div>
        )}

        {/* Nutritional Info - Juice Master Style */}
        <div className="bg-surface p-8 rounded-[3rem] border border-border/10 shadow-premium flex flex-col gap-6">
          <h3 className="text-xl font-black text-text-primary tracking-tight flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-full" />
            Nutritional Balance
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Calories', value: '320', unit: 'kcal' },
              { label: 'Protein', value: '12', unit: 'g' },
              { label: 'Carbs', value: '45', unit: 'g' }
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-background/50 border border-border/5">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{stat.label}</span>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xl font-black text-text-primary tracking-tighter">{stat.value}</span>
                  <span className="text-[10px] font-bold text-text-muted">{stat.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom Action Bar - Floating Glassmorphism */}
      <div className="fixed bottom-8 left-6 right-6 max-w-md mx-auto z-50">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card backdrop-blur-2xl border border-white/40 p-4 rounded-[3rem] shadow-premium flex items-center gap-4"
        >
          {/* Quantity Controls */}
          <div className="flex items-center bg-background/50 rounded-[2rem] border border-white/20 p-1.5 shadow-inner">
            <motion.button 
              whileTap={{ scale: 0.8 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 flex items-center justify-center rounded-2xl text-text-primary hover:bg-white disabled:opacity-30 transition-all"
              disabled={quantity <= 1}
            >
              <Minus size={22} strokeWidth={3} />
            </motion.button>
            <span className="w-10 text-center font-black text-2xl text-text-primary tracking-tighter">{quantity}</span>
            <motion.button 
              whileTap={{ scale: 0.8 }}
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 flex items-center justify-center rounded-2xl text-text-primary hover:bg-white transition-all"
            >
              <Plus size={22} strokeWidth={3} />
            </motion.button>
          </div>

          {/* Add to Cart Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 h-16 bg-secondary text-white rounded-[2rem] font-black text-lg hover:bg-primary transition-all shadow-premium shadow-secondary/20 flex justify-center items-center gap-4 group"
          >
            <div className="flex flex-col items-start">
              <span className="uppercase tracking-[0.2em] text-[10px] font-black opacity-80">{t('product.add_to_cart')}</span>
              <span className="text-xl tracking-tighter">AED {calculateTotal()}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <ShoppingCart size={20} strokeWidth={2.5} />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

