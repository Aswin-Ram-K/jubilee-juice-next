export default function LocationCard() {
  return (
    <div className="bg-white rounded-2xl border border-sand p-7">
      <h3
        className="font-black text-2xl text-charcoal mb-6"
        style={{ fontFamily: "'Satoshi', sans-serif" }}
      >
        Find Us
      </h3>
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-orange/10 rounded-xl flex items-center justify-center text-lg">
            📍
          </div>
          <div>
            <p className="font-semibold text-charcoal mb-0.5">Address</p>
            <p className="text-charcoal/60 leading-relaxed">
              167 N. Morgan St.<br />
              Chicago, IL 60607<br />
              West Loop
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-orange/10 rounded-xl flex items-center justify-center text-lg">
            📞
          </div>
          <div>
            <p className="font-semibold text-charcoal mb-0.5">Phone</p>
            <a
              href="tel:+13122432255"
              className="text-orange hover:text-[#d06422] transition-colors font-medium"
            >
              (312) 243-2255
            </a>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-orange/10 rounded-xl flex items-center justify-center text-lg">
            ✉️
          </div>
          <div>
            <p className="font-semibold text-charcoal mb-0.5">Email</p>
            <a
              href="mailto:info@jubileejuicegrill.com"
              className="text-orange hover:text-[#d06422] transition-colors font-medium break-all"
            >
              info@jubileejuicegrill.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
