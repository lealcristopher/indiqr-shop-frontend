import { useRef } from 'react';
import { CAT_GRADIENTS } from '../data/mock';
import { ProductImage } from './ProductImage';
import type { Category } from '../types/store';

interface Props {
  categories: Category[];
  activeId: number;
  onSelect: (id: number) => void;
}

export function CategoryCarousel({ categories, activeId, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 220, behavior: 'smooth' });
  const displayCats = categories.filter(c => c.id !== 0);

  return (
    <section className="py-12 pb-9 bg-surface relative">
      <div className="px-14 mb-5 flex justify-between items-baseline">
        <span className="font-sans text-[11px] tracking-[3px] text-muted uppercase">Categorias</span>
        <div className="flex gap-3">
          {['‹', '›'].map((arrow, i) => (
            <button
              key={arrow}
              onClick={() => scroll(i === 0 ? -1 : 1)}
              className="bg-transparent border border-faint w-8 h-8 cursor-pointer font-sans text-base text-muted flex items-center justify-center hover:border-muted transition-colors"
            >
              {arrow}
            </button>
          ))}
        </div>
      </div>

      <div ref={ref} className="flex gap-5 px-14 overflow-x-auto">
        {displayCats.map((cat, i) => (
          <div key={cat.id} onClick={() => onSelect(cat.id)} className="flex-shrink-0 cursor-pointer w-[200px]">
            <div
              className="w-[200px] h-[170px] overflow-hidden transition-all duration-200"
              style={{ outline: activeId === cat.id ? '2px solid #1c1a17' : '2px solid transparent', outlineOffset: 2 }}
            >
              <ProductImage src={cat.image_url} gradient={CAT_GRADIENTS[i % CAT_GRADIENTS.length]} label={cat.name} />
            </div>
            <p className={`font-sans text-sm mt-3 tracking-wide transition-colors duration-200 ${activeId === cat.id ? 'text-ink font-semibold' : 'text-muted font-normal'}`}>
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
