import { useState } from 'react';
import { Search, MapPin, User, Star, Plus, Menu } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { CATEGORIES, FEATURED, POPULAR } from '../constants';

export function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { openSideMenu } = useOutletContext<{ openSideMenu: () => void }>();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPopular = activeCategory === 'all' 
    ? POPULAR 
    : POPULAR.filter(item => item.category === activeCategory);

  return (
    <div className="flex flex-col gap-8 pb-32 bg-background/50 min-h-screen">
      {/* Header */}
      <header className="px-6 pt-10 flex justify-between items-center relative z-50">
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent -z-10 rounded-b-[4rem]" />
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openSideMenu}
          className="w-12 h-12 rounded-2xl glass-card shadow-premium flex items-center justify-center text-text-primary hover:bg-primary hover:text-white transition-all active:scale-90 border border-white/40"
        >
          <Menu size={22} />
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 glass-card px-5 py-2.5 rounded-full shadow-premium border border-white/40 cursor-pointer hover:border-primary/30 transition-all"
        >
          <MapPin size={18} className="text-primary" />
          <span className="text-sm font-black text-text-primary tracking-tight">Dubai Marina</span>
          <span className="text-[10px] text-text-muted ml-1 opacity-50">▼</span>
        </motion.div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/profile')}
          className="w-12 h-12 rounded-2xl glass-card shadow-premium flex items-center justify-center text-text-primary hover:bg-primary hover:text-white transition-all border border-white/40 overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </motion.button>
      </header>

      {/* Greeting */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-6 flex flex-col gap-1.5"
      >
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-80">Artisanal Bakery & Coffee</span>
        <h1 className="text-4xl font-black text-text-primary tracking-tighter leading-none">
          {t('home.greeting')}
        </h1>
      </motion.div>

      {/* Search */}
      <div className="px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex items-center w-full h-16 rounded-[2rem] bg-surface shadow-premium border border-border/20 px-6 group focus-within:border-primary/50 transition-all"
        >
          <Search size={22} className="text-text-muted group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder={t('common.search')} 
            className="flex-1 bg-transparent border-none outline-none px-4 text-lg text-text-primary placeholder:text-text-muted font-bold tracking-tight"
          />
        </motion.div>
      </div>

      {/* Featured Section - Immersive Slider */}
      <div className="flex flex-col gap-6">
        <div className="px-6 flex justify-between items-end">
          <h2 className="text-2xl font-black text-text-primary tracking-tight">{t('home.featured')}</h2>
          <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">See All</button>
        </div>
        <div className="flex gap-6 overflow-x-auto px-6 pb-8 hide-scrollbar snap-x">
          {FEATURED.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              className="relative min-w-[320px] h-[240px] rounded-[3rem] overflow-hidden snap-center cursor-pointer shadow-premium border-4 border-white group"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/30 to-transparent" />
              
              <div className="absolute top-6 left-6 glass-dark px-5 py-2 rounded-full shadow-lg border border-white/20">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{item.badge}</span>
              </div>
              
              <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-2xl font-black text-white leading-none tracking-tight">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-warning/20 backdrop-blur-md px-2 py-0.5 rounded-lg">
                      <Star size={12} className="text-warning fill-warning" />
                      <span className="text-[10px] font-black text-warning">4.9</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">15 min • Fresh</span>
                  </div>
                </div>
                <div className="glass-card px-5 py-2.5 rounded-2xl border border-white/40 shadow-lg">
                  <span className="text-xl font-black text-text-primary tracking-tighter">AED {item.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Categories - Interactive Grid */}
      <div className="flex flex-col gap-6">
        <h2 className="px-6 text-2xl font-black text-text-primary tracking-tight">{t('home.categories')}</h2>
        <div className="flex gap-5 overflow-x-auto px-6 pb-4 hide-scrollbar">
          {CATEGORIES.map((category, index) => (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="flex flex-col items-center gap-3 group"
            >
              <div className={cn(
                "w-20 h-20 rounded-[2rem] shadow-premium border-2 flex items-center justify-center text-3xl transition-all duration-500",
                activeCategory === category.id 
                  ? "bg-primary text-white border-primary shadow-2xl shadow-primary/30 scale-110 -translate-y-1" 
                  : "bg-surface border-border/30 text-text-secondary group-hover:bg-primary/5 group-hover:border-primary/20"
              )}>
                {category.icon}
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300",
                activeCategory === category.id ? "text-primary scale-110" : "text-text-muted group-hover:text-primary"
              )}>
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Popular Section - Refined List */}
      <div className="flex flex-col gap-6 px-6">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-black text-text-primary tracking-tight">{t('home.popular')}</h2>
          <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All</button>
        </div>
        <div className="flex flex-col gap-6">
          {filteredPopular.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 8, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              className="flex gap-6 bg-surface p-5 rounded-[2.5rem] shadow-premium border border-border/10 cursor-pointer group hover:border-primary/20 transition-all duration-500"
            >
              <div className="relative shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-32 h-32 rounded-[2rem] object-cover shadow-lg group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute -top-3 -left-3 glass-card px-3 py-1 rounded-xl shadow-premium border border-white/40 flex items-center gap-1.5">
                  <Star size={12} className="text-warning fill-warning" />
                  <span className="text-xs font-black text-text-primary">{item.rating}</span>
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1 py-1">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl font-black text-text-primary leading-tight group-hover:text-primary transition-colors tracking-tight">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded-lg">Freshly baked</span>
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">• {item.orders} Sold</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-50">Price</span>
                    <span className="text-2xl font-black text-primary tracking-tighter">AED {item.price}</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${item.id}`);
                    }}
                    className="w-14 h-14 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-premium shadow-secondary/20 hover:bg-primary transition-all"
                  >
                    <Plus size={28} strokeWidth={3} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

