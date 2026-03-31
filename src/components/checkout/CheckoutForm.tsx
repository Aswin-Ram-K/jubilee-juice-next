'use client';

import { useState, type FormEvent } from 'react';

const INPUT_BASE =
  'w-full rounded-xl border border-sand bg-cream px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange transition-colors text-base';

const LABEL = 'block text-sm font-semibold text-charcoal mb-1.5';

type FulfillmentType = 'delivery' | 'pickup';

export default function CheckoutForm() {
  const [fulfillment, setFulfillment] = useState<FulfillmentType>('pickup');
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoading(false);
    setPlaced(true);
  }

  if (placed) {
    return (
      <div className="bg-white rounded-2xl border border-sand p-8 text-center">
        <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center text-3xl mx-auto mb-5">
          🎉
        </div>
        <h2
          className="font-black text-2xl text-charcoal mb-3"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          Online Ordering Coming Soon!
        </h2>
        <p className="text-charcoal/60 leading-relaxed mb-6 max-w-sm mx-auto">
          Direct online ordering is on its way. For now, order through your favorite delivery platform or call us directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://www.ubereats.com/store/jubilee-juice-grill/N_0hm0kOUCqqKHHBvKNJMg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-charcoal text-white font-semibold px-5 py-3 rounded-full hover:bg-espresso transition-colors"
          >
            Order on UberEats
          </a>
          <a
            href="https://www.doordash.com/store/jubilee-juice-grill-chicago-24230395/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#FF3008] text-white font-semibold px-5 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Order on DoorDash
          </a>
        </div>
        <p className="mt-6 text-charcoal/40 text-sm">
          Or call us: <a href="tel:+13122432255" className="text-orange hover:underline">(312) 243-2255</a>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Fulfillment toggle */}
      <div className="bg-white rounded-2xl border border-sand p-6">
        <h2
          className="font-black text-xl text-charcoal mb-4"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          How would you like your order?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {(['pickup', 'delivery'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFulfillment(type)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ${
                fulfillment === type
                  ? 'border-orange bg-orange/5 text-orange'
                  : 'border-sand text-charcoal/60 hover:border-charcoal/30'
              }`}
            >
              <span className="text-2xl">{type === 'pickup' ? '🏪' : '🚗'}</span>
              <span className="font-semibold text-sm capitalize">{type}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer info */}
        <div className="bg-white rounded-2xl border border-sand p-6">
          <h2
            className="font-black text-xl text-charcoal mb-5"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Your Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={LABEL}>
                  First Name <span className="text-orange">*</span>
                </label>
                <input id="firstName" name="firstName" type="text" required placeholder="Jane" className={INPUT_BASE} />
              </div>
              <div>
                <label htmlFor="lastName" className={LABEL}>
                  Last Name <span className="text-orange">*</span>
                </label>
                <input id="lastName" name="lastName" type="text" required placeholder="Smith" className={INPUT_BASE} />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className={LABEL}>
                Phone <span className="text-orange">*</span>
              </label>
              <input id="phone" name="phone" type="tel" required placeholder="(312) 555-0100" className={INPUT_BASE} />
            </div>
            <div>
              <label htmlFor="email" className={LABEL}>
                Email <span className="text-orange">*</span>
              </label>
              <input id="email" name="email" type="email" required placeholder="jane@example.com" className={INPUT_BASE} />
            </div>
          </div>
        </div>

        {/* Delivery address */}
        {fulfillment === 'delivery' && (
          <div className="bg-white rounded-2xl border border-sand p-6">
            <h2
              className="font-black text-xl text-charcoal mb-5"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Delivery Address
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="street" className={LABEL}>
                  Street Address <span className="text-orange">*</span>
                </label>
                <input id="street" name="street" type="text" required placeholder="123 W. Madison St." className={INPUT_BASE} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="apt" className={LABEL}>
                    Apt / Unit
                  </label>
                  <input id="apt" name="apt" type="text" placeholder="Apt 4B" className={INPUT_BASE} />
                </div>
                <div>
                  <label htmlFor="zip" className={LABEL}>
                    ZIP Code <span className="text-orange">*</span>
                  </label>
                  <input id="zip" name="zip" type="text" required placeholder="60607" className={INPUT_BASE} />
                </div>
              </div>
              <div>
                <label htmlFor="instructions" className={LABEL}>
                  Delivery Instructions
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  rows={2}
                  placeholder="Buzz 4B, leave at door…"
                  className={`${INPUT_BASE} resize-none`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Payment */}
        <div className="bg-white rounded-2xl border border-sand p-6">
          <h2
            className="font-black text-xl text-charcoal mb-5"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Payment
          </h2>

          {/* Digital wallets */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-sand bg-black text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <span aria-hidden="true">🍎</span> Apple Pay
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-sand bg-white text-charcoal font-semibold text-sm hover:bg-sand transition-colors shadow-sm"
            >
              <span aria-hidden="true">G</span> Google Pay
            </button>
          </div>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-sand" />
            </div>
            <div className="relative flex justify-center text-xs text-charcoal/40">
              <span className="bg-white px-3">or pay with card</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="cardName" className={LABEL}>
                Name on Card <span className="text-orange">*</span>
              </label>
              <input id="cardName" name="cardName" type="text" placeholder="Jane Smith" className={INPUT_BASE} />
            </div>
            <div>
              <label htmlFor="cardNumber" className={LABEL}>
                Card Number <span className="text-orange">*</span>
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={INPUT_BASE}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className={LABEL}>
                  Expiry <span className="text-orange">*</span>
                </label>
                <input id="expiry" name="expiry" type="text" placeholder="MM / YY" maxLength={7} className={INPUT_BASE} />
              </div>
              <div>
                <label htmlFor="cvv" className={LABEL}>
                  CVV <span className="text-orange">*</span>
                </label>
                <input id="cvv" name="cvv" type="text" inputMode="numeric" placeholder="123" maxLength={4} className={INPUT_BASE} />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange text-white font-black text-lg py-4 rounded-2xl hover:bg-[#d06422] active:scale-95 transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          {loading ? 'Processing…' : 'Place Order'}
        </button>

        <p className="text-xs text-charcoal/40 text-center leading-relaxed">
          By placing your order you agree to our terms of service. Online ordering is a demonstration — no charges will be made.
        </p>
      </form>
    </div>
  );
}
