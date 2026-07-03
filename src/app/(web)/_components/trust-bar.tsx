const FIRMS = [
  "Fintax Co",
  "Verma LLP",
  "Kabra & Co",
  "SAR Associates",
  "Vasavi Tax",
];
const MARQUEE_ITEMS = [...FIRMS, ...FIRMS];

const TrustBar = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[95%] px-8 py-16 text-center">
        <span className="mb-[22px] block font-bold text-[13px] text-primary uppercase tracking-[0.08em]">
          Trusted by modern CA & tax firms
        </span>
        <div
          className="overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
          }}
        >
          <div className="flex w-max animate-[cw-marquee_24s_linear_infinite] gap-14 opacity-55">
            {MARQUEE_ITEMS.map((firm, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: static duplicated marquee list, order never changes
                key={`${firm}-${i}`}
                className="whitespace-nowrap font-extrabold text-[#7A8893] text-[19px] tracking-[-0.02em]"
              >
                {firm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
