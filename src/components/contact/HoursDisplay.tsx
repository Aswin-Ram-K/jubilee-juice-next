import { hours } from '@/data/hours';

export default function HoursDisplay() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="bg-white rounded-2xl border border-sand p-7">
      <h3
        className="font-black text-2xl text-charcoal mb-6"
        style={{ fontFamily: "'Satoshi', sans-serif" }}
      >
        Hours
      </h3>
      <div className="space-y-2">
        {hours.map(({ day, open, close }) => {
          const isToday = day === today;
          return (
            <div
              key={day}
              className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${
                isToday ? 'bg-orange/10 border border-orange/20' : 'hover:bg-cream'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${
                    isToday ? 'text-orange' : 'text-charcoal'
                  }`}
                >
                  {day}
                </span>
                {isToday && (
                  <span className="bg-orange text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Today
                  </span>
                )}
              </div>
              <span
                className={`text-sm ${
                  isToday ? 'text-orange font-semibold' : 'text-charcoal/60'
                }`}
              >
                {open} – {close}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
