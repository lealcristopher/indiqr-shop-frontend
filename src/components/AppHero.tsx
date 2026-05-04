import { CAT_GRADIENTS, HERO_TEXT } from '../data/mock';

interface Props {
  activeId: number;
}

export function AppHero({ activeId }: Props) {
  const { title, sub } = HERO_TEXT[activeId] ?? HERO_TEXT[0];
  const gradient = CAT_GRADIENTS[activeId] ?? CAT_GRADIENTS[0];

  return (
    <section className="relative h-[480px] overflow-hidden mt-[93px]">
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(45deg,rgba(0,0,0,0.02) 0,rgba(0,0,0,0.02) 1px,transparent 1px,transparent 24px)' }} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 pb-12 pl-14">
        <div className="inline-block bg-cream/88 backdrop-blur-sm px-9 py-7 max-w-[480px]">
          <h1 className="font-serif text-[32px] font-normal text-ink mb-2.5 tracking-wide leading-tight">{title}</h1>
          <p className="font-sans text-sm text-muted leading-relaxed font-light">{sub}</p>
        </div>
      </div>
    </section>
  );
}
