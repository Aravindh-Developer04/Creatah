import React from 'react';
import { WHY_CLIENTS_STAY } from '../data/creatahContent';
import {
  Users,
  Repeat,
  FileCheck2,
  Headphones,
  UserCheck,
  Handshake,
} from 'lucide-react';

const icons = [Users, Repeat, FileCheck2, Headphones, UserCheck, Handshake];

export default function WhyClientsStay() {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="inline-block px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-100 text-blue-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            Retention & Partnership
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Why Clients Stay With Creatah
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
            Over 70% of our annual revenue comes from repeat business and long-term client engagements. Here is why founders keep coming back.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {WHY_CLIENTS_STAY.map((item, idx) => {
            const Icon = icons[idx] || Users;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 ${item.color} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center ${item.iconColor} shadow-md mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
