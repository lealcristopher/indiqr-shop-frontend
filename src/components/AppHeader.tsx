import { useScrolled } from '../hooks/useScrolled';
import type { Category } from '../types/store';

interface Props {
  categories: Category[];
  activeId: number;
  onSelect: (id: number) => void;
}

export function AppHeader({ categories, activeId, onSelect }: Props) {
  const scrolled = useScrolled();
  const navCats = categories.filter(c => c.id !== 0);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-cream border-b border-edge transition-shadow duration-300"
      style={{ boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.07)' : 'none' }}
    >
      {/* Utility bar */}
      <div className="border-b border-edge px-12 py-2 flex items-center justify-between text-xs font-sans text-muted tracking-wide">
        <span className="cursor-pointer">Atendimento</span>
        <span className="font-serif text-[22px] font-normal tracking-[2px] text-ink">personnalité</span>
        <span className="cursor-pointer">Entrar</span>
      </div>

      {/* Category nav */}
      <nav className="px-12 py-2.5 flex gap-7 items-center overflow-x-auto">
        {[{ id: 0, name: 'Tudo' }, ...navCats].map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={[
              'bg-transparent border-none cursor-pointer font-sans text-[13px] tracking-[0.8px] pb-1 transition-all duration-200 whitespace-nowrap',
              'border-b-[1.5px]',
              activeId === cat.id
                ? 'text-ink font-semibold border-ink'
                : 'text-muted font-normal border-transparent',
            ].join(' ')}
          >
            {cat.name}
          </button>
        ))}
        <span className="ml-auto cursor-pointer text-muted text-base">⌕</span>
      </nav>
    </header>
  );
}
