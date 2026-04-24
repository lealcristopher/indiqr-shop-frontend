import { useState } from 'react';
import { PROD_GRADIENTS } from '../data/mock';
import { ProductImage } from './ProductImage';
import type { Product } from '../types/store';

interface Props {
  product: Product;
  index: number;
  ctaHref?: string;
}

export function ProductCard({ product, index, ctaHref }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer transition-transform duration-300"
      style={{ transform: hovered ? 'translateY(-4px)' : 'none' }}
    >
      <div className="w-full aspect-[3/4] overflow-hidden bg-surface">
        <div
          className="w-full h-full transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.03)' : 'scale(1)' }}
        >
          <ProductImage
            src={product.image_url}
            gradient={PROD_GRADIENTS[index % PROD_GRADIENTS.length]}
            label="foto produto"
          />
        </div>
      </div>

      <div className="py-4 pb-6 border-b border-edge">
        <h3 className="font-sans text-[15px] font-medium text-ink mb-1.5 tracking-[0.3px]">{product.name}</h3>
        <p className="font-sans text-[13px] text-muted mb-2 leading-relaxed font-light line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-sans text-[13px] text-ink tracking-wide">
            {product.price_points.toLocaleString('pt-BR')} pts
          </span>
          {ctaHref && (
            <a
              href={ctaHref}
              className="font-sans text-[11px] tracking-[1.5px] uppercase text-ink border border-ink px-3 py-1.5 hover:bg-ink hover:text-cream transition-colors duration-200"
              onClick={e => e.stopPropagation()}
            >
              Resgatar
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
