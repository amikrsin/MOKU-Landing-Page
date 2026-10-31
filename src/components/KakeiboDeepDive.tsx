import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { BookOpen, Sparkles, Check, ChevronRight } from 'lucide-react';

export const KakeiboDeepDive: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const [activePillar, setActivePillar] = useState<string>('essentials');

  // Exact 4 Pillar Colors required by specification
  const animatedPillars = [
    {
      id: 'essentials',
      title: 'Essentials (Needs)',
      japanese: '生活 (Seikatsu)',
      kanji: '必',
      role: 'Survival & Non-Negotiables',
      percentage: 50,
      color: '#54745A',
      bgLight: '#EFF5EE',
      description:
        'Fixed and essential living expenses you cannot live without. Rent, groceries, electricity, medicines, transit, and regular utility bills.',
      examples: ['House Rent & Maintenance', 'Groceries & Milk', 'Medicines & Clinic visits', 'Electricity & WiFi', 'Metro / Petrol'],
      mindfulTip: 'Audit quarterly contracts to ensure baseline survival expenses remain lean.',
    },
    {
      id: 'wants',
      title: 'Wants (Enjoyment)',
      japanese: '娯楽 (Goraku)',
      kanji: '楽',
      role: 'Mindful Leisure & Joy',
      percentage: 25,
      color: '#B38B60',
      bgLight: '#FBF5EE',
      description:
        'Expenses that bring joy, taste, and relaxation, but are not strictly vital. Dining out, weekend movies, coffee, travel, and shopping.',
      examples: ['Swiggy & Dining out', 'Specialty Coffee', 'Weekend Movies & Streaming', 'Fashion & Gadgets', 'Weekend Getaways'],
      mindfulTip: 'Never feel guilty for conscious enjoyment. Just budget for it in advance.',
    },
    {
      id: 'growth',
      title: 'Growth (Learning & Culture)',
      japanese: '教養 (Kyoyo)',
      kanji: '育',
      role: 'Self-Investment & Enrichment',
      percentage: 15,
      color: '#66899B',
      bgLight: '#EEF6F9',
      description:
        'Intentional spending to improve your mind, career, health, and spirit. Books, technical certifications, gym memberships, and cultural visits.',
      examples: ['Non-fiction Books & Kindle', 'Courses & Certifications', 'Gym / Yoga Memberships', 'Museums & Art workshops', 'Seminars'],
      mindfulTip: 'This pillar directly compounds your human capital and earning capacity.',
    },
    {
      id: 'unexpected',
      title: 'Unexpected (Unplanned)',
      japanese: '特別 (Tokubetsu)',
      kanji: '変',
      role: 'Unplanned Life Fluctuations',
      percentage: 10,
      color: '#8C7B99',
      bgLight: '#FAF0F5',
      description:
        'Irregular, unexpected costs that arise without warning: sudden vehicle service, urgent home repair, wedding gifts, or unexpected travel.',
      examples: ['Vehicle Puncture / Service', 'Urgent Appliance Repairs', 'Family Wedding Shagun', 'Emergency Clinic Visit', 'Urgent Domestic Travel'],
      mindfulTip: 'Having this buffer prevents surprise expenses from wrecking your savings goal.',
    },
  ];

  const kakeiboQuestions = [
    {
      num: '01',
      japanese: 'いくらあるか',
      question: 'How much money do you have?',
      meaning: 'Know your starting inflow, recurring fixed commitments, and clear carryover balance.',
    },
    {
      num: '02',
      japanese: 'いくら貯めたいか',
      question: 'How much would you like to save?',
      meaning: 'Pay yourself first. Commit to a defined savings goal before calculating available cash.',
    },
    {
      num: '03',
      japanese: 'いくら使っているか',
      question: 'How much are you spending?',
      meaning: 'Track daily transactions mindfully into the 4 Kakeibo pillars, noticing emotional value.',
    },
    {
      num: '04',
      japanese: 'どう改善できるか',
      question: 'How can you improve?',
      meaning: 'Reflect calmly at month-end through Kaizen (continuous small improvements).',
    },
  ];

  return (
    <section id="kakeibo" ref={ref} className="py-20 md:py-28 bg-[#EFF2E9]/50 border-t border-[#E1E6DD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={`max-w-3xl mx-auto text-center space-y-4 mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Philosophy & Origins</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1904</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#242C27] tracking-tight text-balance">
            An Old Japanese Money Philosophy. A Modern Digital Experience.
          </h2>
          <p className="text-base sm:text-lg text-[#727B73] leading-relaxed">
            Kakeibo (家計簿) is Japan’s century-old art of mindful budgeting. Created in 1904 by Hani Motoko, Japan’s first female journalist, it transformed how households build wealth with peace of mind.
          </p>
        </div>

        {/* The 4 Fundamental Questions */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#242C27]">
              The Four Questions at the Heart of Kakeibo
            </h3>
            <p className="text-xs sm:text-sm text-[#727B73] mt-1">
              Every month in MOKU revolves around answering these four questions honestly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kakeiboQuestions.map((q, idx) => (
              <div
                key={q.num}
                className={`bg-white rounded-2xl p-6 border border-[#E1E6DD] shadow-xs flex flex-col justify-between hover:border-[#A8B99E] transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display font-bold text-2xl text-[#294C3A]">
                      {q.num}
                    </span>
                    <span className="text-xs font-japanese text-[#727B73]">{q.japanese}</span>
                  </div>
                  <h4 className="text-base font-display font-bold text-[#242C27] mb-2">
                    {q.question}
                  </h4>
                  <p className="text-xs text-[#727B73] leading-relaxed">
                    {q.meaning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Animated Pillar Cards with Specified Palette (#54745A, #B38B60, #66899B, #8C7B99) */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#242C27]">
              The Four Kakeibo Spending Pillars
            </h3>
            <p className="text-xs sm:text-sm text-[#727B73] mt-1">
              Tap any card to view detailed allocations and Indian spending benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {animatedPillars.map((pillar, idx) => {
              const isActive = activePillar === pillar.id;
              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar.id)}
                  className={`bg-white rounded-3xl p-7 border transition-all duration-300 cursor-pointer group shadow-xs hover:-translate-y-1 hover:shadow-md ${
                    isActive ? 'ring-2' : 'border-[#E1E6DD]'
                  }`}
                  style={{
                    borderColor: isActive ? pillar.color : undefined,
                    boxShadow: isActive ? `0 0 0 2px ${pillar.color}40` : undefined,
                  }}
                >
                  <div className="flex items-start justify-between pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4
                          className="text-xl font-display font-bold text-[#242C27] group-hover:transition-colors"
                          style={{ color: isActive ? pillar.color : undefined }}
                        >
                          {pillar.title}
                        </h4>
                        <span className="text-xs font-japanese text-[#727B73]">
                          {pillar.japanese}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#727B73] mt-0.5 block">
                        {pillar.role} · Target ~{pillar.percentage}%
                      </span>
                    </div>

                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-japanese font-bold text-base transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: pillar.bgLight,
                        color: pillar.color,
                      }}
                    >
                      {pillar.kanji}
                    </span>
                  </div>

                  <p className="text-sm text-[#727B73] leading-relaxed my-3">
                    {pillar.description}
                  </p>

                  {/* Animated Progress Indicator Bar */}
                  <div className="space-y-1.5 my-4">
                    <div className="flex justify-between text-[11px] font-medium text-[#727B73]">
                      <span>Recommended Spendable Share</span>
                      <span className="font-bold tabular-nums" style={{ color: pillar.color }}>
                        {pillar.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-[#E1E6DD] h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${pillar.percentage}%` : '0%',
                          backgroundColor: pillar.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Typical Indian household examples */}
                  <div className="pt-3 border-t border-[#E1E6DD] space-y-2">
                    <span className="text-[11px] font-semibold text-[#242C27] block">
                      Common Indian Categories:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.examples.map((ex, i) => (
                        <span
                          key={i}
                          className="text-xs text-[#242C27] px-2.5 py-1 rounded-lg border border-[#E1E6DD] bg-[#F8F8F3]"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Explanatory Tip */}
                    <div
                      className="p-3 rounded-xl mt-3 text-xs leading-relaxed"
                      style={{
                        backgroundColor: pillar.bgLight,
                        color: pillar.color,
                      }}
                    >
                      <strong>Mindful Rule:</strong> {pillar.mindfulTip}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kaizen Notice */}
        <div className="mt-14 p-6 sm:p-8 bg-white rounded-2xl border border-[#E1E6DD] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
            <Sparkles className="w-4 h-4" />
            <span>The Power of Kaizen (Continuous Improvement)</span>
          </div>
          <p className="text-sm text-[#727B73] leading-relaxed">
            Kakeibo is never about deprivation or rigid frugality. It is about understanding which expenses bring deep contentment versus what dissipates into forgotten UPI micro-transactions.
          </p>
          <p className="text-[11px] text-[#727B73] pt-2 border-t border-[#E1E6DD]">
            <em>Notice: MOKU applies the time-tested principles of the Japanese Kakeibo budgeting method. MOKU is an independent software application and is not officially affiliated with any Japanese government body or cultural organisation.</em>
          </p>
        </div>

      </div>
    </section>
  );
};
