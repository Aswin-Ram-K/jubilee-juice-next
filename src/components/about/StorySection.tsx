import Image from 'next/image';

interface StorySectionProps {
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

export default function StorySection({
  title,
  paragraphs,
  image,
  imageAlt,
  reverse = false,
}: StorySectionProps) {
  return (
    <div
      className={`flex flex-col gap-10 lg:gap-16 lg:flex-row items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}
    >
      <div className="flex-1 min-w-0">
        <h3
          className="font-black text-3xl md:text-4xl text-charcoal mb-6 leading-tight"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          {title}
        </h3>
        <div className="space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-charcoal/70 text-lg leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>
      <div className="flex-1 min-w-0 w-full">
        <div className="relative h-72 sm:h-96 lg:h-[420px] rounded-3xl overflow-hidden shadow-lg">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
