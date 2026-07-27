const FIRMS = [
  "Fintax Co",
  "Verma LLP",
  "Kabra & Co",
  "SAR Associates",
  "Vasavi Tax",
];

const TrustBar = () => {
  return (
    <section className="border-[#F1F5F9] border-y bg-white">
      <div className="mx-auto max-w-[1120px] px-8 py-8.5 text-center">
        <div
          data-reveal
          className="mb-5 font-bold text-[#94A3B8] text-[12.5px] uppercase tracking-[0.08em]"
        >
          Trusted by modern CA &amp; tax firms
        </div>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
          {FIRMS.map((firm) => (
            <span
              key={firm}
              className="font-extrabold text-[#64748B] text-[20px] tracking-[-0.02em]"
            >
              {firm}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
