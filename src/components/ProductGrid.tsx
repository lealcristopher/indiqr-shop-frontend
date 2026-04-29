import { MOCK_CATEGORIES } from '../data/mock';
import { ProductCard } from './ProductCard';
import type { Product } from '../types/store';

interface Props {
  products: Product[];
  activeId: number;
  storeSlug?: string;
}

export function ProductGrid({ products, activeId, storeSlug }: Props) {
  const filtered = activeId === 0 ? products : products.filter(p => p.category_id === activeId);
  const categoryName = MOCK_CATEGORIES.find(c => c.id === activeId)?.name;

  return (
    <section className="px-14 py-14 pb-20 bg-cream">
      <div className="flex justify-between items-baseline mb-8">
        <h2 className="font-serif text-[26px] font-normal text-ink tracking-wide">
          {activeId === 0 ? 'Todos os Serviços' : categoryName}
        </h2>
        <span className="font-sans text-xs text-muted tracking-wide">
          {filtered.length} {filtered.length === 1 ? 'serviço' : 'serviços'}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="font-sans text-sm text-muted">Nenhum serviço nesta categoria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              ctaHref={storeSlug ? `https://app.indiqr.com.br/resgate/loja/${p.id}` : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}
