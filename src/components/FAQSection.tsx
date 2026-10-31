import React, { useState } from 'react';
import { FAQ_DATA } from '../data/mokuData';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['what-is-moku', 'is-subscription', 'offline-mode']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = FAQ_DATA.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query)
    );
  });

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F8F8F3] border-t border-[#E1E6DD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
            <span aria-hidden="true">·</span>
            <span>Honest Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#242C27] tracking-tight text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#727B73] leading-relaxed">
            Everything you need to know about MOKU, the Kakeibo method, privacy, and lifetime access.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10 max-w-md mx-auto">
          <Search className="w-4 h-4 text-[#727B73] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. offline, Android, pricing, data)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#E1E6DD] rounded-xl text-sm text-[#242C27] placeholder:text-[#727B73]/60 focus:outline-hidden focus:border-[#294C3A] transition-colors shadow-xs"
            aria-label="Search frequently asked questions"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E1E6DD] p-6">
              <p className="text-sm text-[#727B73]">No questions found matching "{searchQuery}".</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs font-semibold text-[#294C3A] underline cursor-pointer"
              >
                Clear search filter
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#E1E6DD] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F8F8F3]/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-display font-bold text-[#242C27]">
                      {faq.question}
                    </span>
                    <span className={`w-7 h-7 rounded-full bg-[#EFF2E9] flex items-center justify-center shrink-0 text-[#294C3A] transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#476B57] text-white' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#727B73] leading-relaxed border-t border-[#E1E6DD]/40">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Helpdesk link */}
        <div className="mt-12 text-center text-xs text-[#727B73]">
          Have a question not listed here? Email us anytime at{' '}
          <a
            href="mailto:ami.kr.sin@gmail.com"
            className="text-[#294C3A] font-semibold underline underline-offset-2 hover:text-[#1E372A]"
          >
            ami.kr.sin@gmail.com
          </a>
        </div>

      </div>
    </section>
  );
};
