import React from 'react';

const BRANDS = [
  { name: 'Verse Tech', file: '/brand-logo/verse.webp' },
  { name: 'BMEG Group', file: '/brand-logo/bmeg.webp' },
  { name: 'Dartexon Logistics', file: '/brand-logo/dartexon.webp' },
  { name: 'MyRMC Ready-Mix', file: '/brand-logo/myrmc.webp' },
  { name: 'Nannir Diagnostic', file: '/brand-logo/nannir.webp' },
  { name: 'Sakthi Cars', file: '/brand-logo/sakthicars.webp' },
];

export default function TrustedBy() {
  return (
    <section className="py-8 sm:py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 relative before:inline-block before:w-6 sm:before:w-8 before:h-0.5 before:bg-slate-300 before:mr-2.5 sm:before:mr-3 after:inline-block after:w-6 sm:after:w-8 after:h-0.5 after:bg-slate-300 after:ml-2.5 sm:after:ml-3">
            Trusted By Leading Brands
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-6 items-center">
          {BRANDS.map((client) => (
            <div
              key={client.name}
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200 flex items-center justify-center text-center group cursor-pointer h-16 sm:h-20"
            >
              <img
                src={client.file}
                alt={client.name}
                className="max-h-7 sm:max-h-10 max-w-[95px] sm:max-w-[120px] object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
