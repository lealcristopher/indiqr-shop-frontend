export function AppFooter() {
  return (
    <footer className="bg-ink px-14 py-10 flex justify-between items-center flex-wrap gap-4">
      <span className="font-serif text-xl font-normal text-surface tracking-[2px]">personnalité</span>
      <span className="font-sans text-[11px] text-faint tracking-[2px] uppercase">Cuidado com intenção</span>
      <div className="flex gap-6 font-sans text-xs text-faint">
        <span className="cursor-pointer hover:text-surface transition-colors">Instagram</span>
        <span className="cursor-pointer hover:text-surface transition-colors">WhatsApp</span>
        <span className="cursor-pointer hover:text-surface transition-colors">Contato</span>
      </div>
    </footer>
  );
}
