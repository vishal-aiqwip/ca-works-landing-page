const STATS = [
  { value: "10+ hrs", label: "saved per week, per staff" },
  { value: "Multiple channels", label: "WhatsApp · Email" },
  { value: "Faster", label: "document gathering & query resolutions" },
  { value: "Zero", label: "conversations lost or missed" },
];

const ValueProps = () => {
  return (
    <section className="mx-auto max-w-[95%] px-8 py-16">
      <div className="mb-[54px] text-center">
        <div className="font-extrabold text-[13px] text-primary uppercase tracking-[0.1em]">
          Why CA Works
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4.5 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.value} className="p-2 text-center">
            <div className="whitespace-nowrap font-extrabold text-[30px] text-primary tracking-[-0.02em]">
              {stat.value}
            </div>
            <div className="mt-1.5 font-semibold text-[#596B75] text-[14px]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueProps;
