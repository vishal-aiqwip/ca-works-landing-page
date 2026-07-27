const ITEMS: { label: string; outline?: boolean }[] = [
  { label: "Reply with AI" },
  { label: "✦" },
  { label: "Collect Documents", outline: true },
  { label: "✦" },
  { label: "Never Chase Again" },
  { label: "✦" },
];
const LOOPED_ITEMS = [...ITEMS, ...ITEMS];

const Marquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-16 sm:py-11">
      <div
        data-marquee
        className="inline-flex items-center gap-11 font-extrabold text-[36px] tracking-[-0.02em] sm:text-[52px]"
      >
        {LOOPED_ITEMS.map((item, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: static duplicated marquee list, order never changes
            key={`${item.label}-${i}`}
            className={
              item.label === "✦"
                ? "text-primary"
                : item.outline
                  ? "text-transparent [-webkit-text-stroke:1.5px_#0F172A]"
                  : "text-[#0F172A]"
            }
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
