interface Props {
  src: string | null;
  gradient: string;
  label: string;
}

export function ProductImage({ src, gradient, label }: Props) {
  if (src) {
    return <img src={src} alt={label} className="w-full h-full object-cover block" />;
  }
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: gradient }}>
      <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 0,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 20px)' }} />
      <div className="absolute bottom-3 left-0 right-0 text-center font-mono text-[9px] tracking-[2px] text-white/40 uppercase">{label}</div>
    </div>
  );
}
