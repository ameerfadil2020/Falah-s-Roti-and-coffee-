import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      <header className="px-6 pt-12 pb-6 bg-surface/80 backdrop-blur-xl sticky top-0 z-50 border-b border-border/30 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-text-primary hover:bg-primary/10 transition-all active:scale-90 border border-border/20"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-black text-text-primary tracking-tight">{title}</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
        <div className="w-24 h-24 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mb-4">
          <span className="text-4xl">☕</span>
        </div>
        <h2 className="text-xl font-black text-text-primary tracking-tight">Coming Soon!</h2>
        <p className="text-sm font-medium text-text-muted max-w-xs">
          We're working hard to bring you the best {title.toLowerCase()} experience. Stay tuned!
        </p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-8 py-3 bg-secondary text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-secondary/20 active:scale-95 transition-all"
        >
          {t('common.home')}
        </button>
      </div>
    </div>
  );
}
