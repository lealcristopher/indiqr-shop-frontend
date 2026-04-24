import { useState } from 'react';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from './data/mock';
import { AppHeader } from './components/AppHeader';
import { AppHero } from './components/AppHero';
import { CategoryCarousel } from './components/CategoryCarousel';
import { ProductGrid } from './components/ProductGrid';
import { AppFooter } from './components/AppFooter';

export default function App() {
  const [activeId, setActiveId] = useState(0);

  return (
    <>
      <AppHeader categories={MOCK_CATEGORIES} activeId={activeId} onSelect={setActiveId} />
      <AppHero activeId={activeId} />
      <CategoryCarousel categories={MOCK_CATEGORIES} activeId={activeId} onSelect={setActiveId} />
      <ProductGrid products={MOCK_PRODUCTS} activeId={activeId} storeSlug="personnalite" />
      <AppFooter />
    </>
  );
}
