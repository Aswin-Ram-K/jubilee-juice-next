'use client';

import { useState } from 'react';
import { site } from '@/data/site';
import { hours } from '@/data/hours';

// TODO: Wire Save buttons to a database mutation (e.g., Prisma + server action) once connected.

interface ToastState {
  message: string;
  type: 'info' | 'success';
}

function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  function show(message: string, type: ToastState['type'] = 'info') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }

  return { toast, show };
}

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-5">
      <h2 className="font-satoshi font-bold text-base text-[#1A1A1A]">{title}</h2>
      {description && <p className="text-sm text-[#1A1A1A]/50 mt-0.5">{description}</p>}
    </div>
  );
}

function FormField({
  label,
  id,
  value,
  onChange,
  type = 'text',
  prefix,
  suffix,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
        {label}
      </label>
      <div className="flex">
        {prefix && (
          <span className="inline-flex items-center px-3 border border-r-0 border-[#E8DDD3] rounded-l-lg bg-[#E8DDD3] text-[#1A1A1A]/50 text-sm">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 px-4 py-2.5 text-sm border border-[#E8DDD3] bg-[#FAF7F2] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:ring-2 focus:ring-[#E8722A]/30 focus:border-[#E8722A] transition-colors ${
            prefix ? 'rounded-r-lg' : suffix ? 'rounded-l-lg' : 'rounded-lg'
          }`}
        />
        {suffix && (
          <span className="inline-flex items-center px-3 border border-l-0 border-[#E8DDD3] rounded-r-lg bg-[#E8DDD3] text-[#1A1A1A]/50 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function SaveButton({ onSave }: { onSave: () => void }) {
  return (
    <div className="flex justify-end pt-4 border-t border-[#E8DDD3]">
      <button
        onClick={onSave}
        className="bg-[#E8722A] hover:bg-[#d4611f] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
      >
        Save Changes
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const { toast, show: showToast } = useToast();

  // Business Info
  const [bizName, setBizName] = useState<string>(site.name);
  const [bizAddress, setBizAddress] = useState<string>(site.address);
  const [bizPhone, setBizPhone] = useState<string>(site.phone);
  const [bizEmail, setBizEmail] = useState<string>(site.email);

  // Operating Hours — mutable copy
  const [operatingHours, setOperatingHours] = useState(
    hours.map((h) => ({ ...h }))
  );

  function updateHour(index: number, field: 'open' | 'close', value: string) {
    setOperatingHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h))
    );
  }

  // Financial settings
  const [taxRate, setTaxRate] = useState('10.25');
  const [deliveryFee, setDeliveryFee] = useState('3.99');
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState('30.00');

  // Delivery settings
  const [ubereatsUrl, setUbereatsUrl] = useState<string>(site.delivery.ubereats);
  const [doordashUrl, setDoordashUrl] = useState<string>(site.delivery.doordash);

  function handleSave() {
    showToast('Connect database first — changes are not persisted in dev mode', 'info');
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Toast */}
      {toast !== null && (
        <div className="fixed top-6 right-6 z-50 bg-[#2C2420] text-[#FAF7F2] text-sm px-4 py-3 rounded-xl shadow-lg max-w-sm">
          <div className="flex items-start gap-2">
            <svg
              className="shrink-0 mt-0.5 text-[#E8722A]"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {toast.message}
          </div>
        </div>
      )}

      {/* Page header */}
      <div>
        <h1 className="font-satoshi font-bold text-2xl text-[#1A1A1A]">Settings</h1>
        <p className="text-sm text-[#1A1A1A]/50 mt-1">
          Manage your restaurant configuration. Changes require a database connection to persist.
        </p>
      </div>

      {/* Business Info */}
      <section className="bg-white rounded-xl border border-[#E8DDD3] p-6 space-y-5">
        <SectionHeader
          title="Business Info"
          description="Your restaurant's public-facing details."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Restaurant Name"
            id="biz-name"
            value={bizName}
            onChange={setBizName}
          />
          <FormField
            label="Phone Number"
            id="biz-phone"
            value={bizPhone}
            onChange={setBizPhone}
            type="tel"
          />
          <FormField
            label="Email Address"
            id="biz-email"
            value={bizEmail}
            onChange={setBizEmail}
            type="email"
          />
        </div>
        <FormField
          label="Street Address"
          id="biz-address"
          value={bizAddress}
          onChange={setBizAddress}
        />
        <SaveButton onSave={handleSave} />
      </section>

      {/* Operating Hours */}
      <section className="bg-white rounded-xl border border-[#E8DDD3] p-6">
        <SectionHeader
          title="Operating Hours"
          description="Set your opening and closing times for each day."
        />
        <div className="space-y-3">
          {operatingHours.map((row, i) => (
            <div key={row.day} className="grid grid-cols-3 gap-3 items-center">
              <span className="text-sm font-medium text-[#1A1A1A]">{row.day}</span>
              <div>
                <label className="sr-only" htmlFor={`open-${i}`}>
                  {row.day} open
                </label>
                <input
                  id={`open-${i}`}
                  type="text"
                  value={row.open}
                  onChange={(e) => updateHour(i, 'open', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8DDD3] rounded-lg bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#E8722A]/30 focus:border-[#E8722A]"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor={`close-${i}`}>
                  {row.day} close
                </label>
                <input
                  id={`close-${i}`}
                  type="text"
                  value={row.close}
                  onChange={(e) => updateHour(i, 'close', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8DDD3] rounded-lg bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#E8722A]/30 focus:border-[#E8722A]"
                />
              </div>
            </div>
          ))}
        </div>
        <SaveButton onSave={handleSave} />
      </section>

      {/* Financial Settings */}
      <section className="bg-white rounded-xl border border-[#E8DDD3] p-6 space-y-5">
        <SectionHeader
          title="Financial Settings"
          description="Tax rates, delivery fees, and threshold configuration."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField
            label="Tax Rate"
            id="tax-rate"
            value={taxRate}
            onChange={setTaxRate}
            suffix="%"
          />
          <FormField
            label="Delivery Fee"
            id="delivery-fee"
            value={deliveryFee}
            onChange={setDeliveryFee}
            prefix="$"
          />
          <FormField
            label="Free Delivery Above"
            id="free-delivery"
            value={freeDeliveryThreshold}
            onChange={setFreeDeliveryThreshold}
            prefix="$"
          />
        </div>
        <SaveButton onSave={handleSave} />
      </section>

      {/* Delivery Settings */}
      <section className="bg-white rounded-xl border border-[#E8DDD3] p-6 space-y-5">
        <SectionHeader
          title="Delivery Settings"
          description="Third-party delivery platform integration URLs."
        />
        <FormField
          label="Uber Eats URL"
          id="ubereats-url"
          value={ubereatsUrl}
          onChange={setUbereatsUrl}
          type="url"
        />
        <FormField
          label="DoorDash URL"
          id="doordash-url"
          value={doordashUrl}
          onChange={setDoordashUrl}
          type="url"
        />
        <SaveButton onSave={handleSave} />
      </section>
    </div>
  );
}
