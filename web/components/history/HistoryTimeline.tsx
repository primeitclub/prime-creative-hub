'use client';

import { useEffect, useRef } from 'react';

export interface HistoryEventData {
  _id: string;
  title: string;
  description: string;
  startYear: number;
  endYear?: number;
  imageUrl: string | null;
}

function TimelineNode({ isLatest }: { isLatest: boolean }) {
  return (
    <div className="relative w-[14px] h-[14px] flex-shrink-0 mt-[3px]">
      {isLatest && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: 'rgba(10,196,208,0.35)' }}
        />
      )}
      <span
        className="block w-[14px] h-[14px] rounded-full border-2 transition-colors duration-300"
        style={{
          borderColor: '#0AC4D0',
          backgroundColor: isLatest ? '#0AC4D0' : '#050301',
        }}
      />
    </div>
  );
}

function EventCard({
  event,
  yearLabel,
  align,
}: {
  event: HistoryEventData;
  yearLabel: string;
  align: 'left' | 'right';
}) {
  const isRight = align === 'right';

  return (
    <article
      className="group"
      style={{ maxWidth: '400px', textAlign: isRight ? 'right' : 'left' }}
    >
      {/* Year chip */}
      <span
        className="block mb-2"
        style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#0AC4D0',
        }}
      >
        {yearLabel}
      </span>

      {/* Accent line */}
      <div
        className={isRight ? 'ml-auto' : ''}
        style={{
          width: '32px',
          height: '1px',
          marginBottom: '16px',
          background: isRight
            ? 'linear-gradient(to left, rgba(10,196,208,0.65), transparent)'
            : 'linear-gradient(to right, rgba(10,196,208,0.65), transparent)',
        }}
      />

      {/* Title */}
      <h3
        className="mb-3 transition-colors duration-300 group-hover:text-[#0AC4D0]/85"
        style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: 'clamp(14px, 1.3vw, 19px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
          color: '#E2FFFE',
        }}
      >
        {event.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-mona-sans)',
          fontSize: '13px',
          lineHeight: 1.75,
          color: 'rgba(226,255,254,0.38)',
        }}
      >
        {event.description}
      </p>

      {/* Image */}
      {event.imageUrl && (
        <div
          className={isRight ? 'ml-auto' : ''}
          style={{
            marginTop: '18px',
            width: '100%',
            maxWidth: '260px',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <img
            src={event.imageUrl}
            alt={event.title}
            className="block w-full transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-95"
            style={{ height: '130px', objectFit: 'cover', opacity: 0.65 }}
          />
        </div>
      )}
    </article>
  );
}

export default function HistoryTimeline({ events }: { events: HistoryEventData[] }) {
  const mobileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const all = [
      ...mobileRefs.current.filter(Boolean),
      ...desktopRefs.current.filter(Boolean),
    ] as HTMLDivElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLDivElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) translateX(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    );

    all.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [events]);

  function transition(i: number) {
    const delay = `${Math.min(i * 0.06, 0.3)}s`;
    return `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}`;
  }

  return (
    <div className="relative py-2">
      {/* Desktop centre spine */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute h-full w-px pointer-events-none"
        style={{
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(10,196,208,0.45) 4%, rgba(10,196,208,0.22) 88%, transparent 100%)',
        }}
      />
      {/* Mobile left spine */}
      <div
        aria-hidden="true"
        className="md:hidden absolute h-full w-px pointer-events-none"
        style={{
          left: '20px',
          top: 0,
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(10,196,208,0.45) 4%, rgba(10,196,208,0.22) 88%, transparent 100%)',
        }}
      />

      <div>
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          const isLatest = index === 0;
          const yearLabel = event.endYear
            ? `${event.startYear}–${event.endYear}`
            : String(event.startYear);

          return (
            <div key={event._id} className="relative">
              {/* Faint watermark year */}
              <div
                aria-hidden="true"
                className="absolute select-none pointer-events-none font-black leading-none"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(80px, 12vw, 160px)',
                  letterSpacing: '-0.05em',
                  color: '#E2FFFE',
                  opacity: 0.016,
                  top: '-0.15em',
                  ...(isEven
                    ? { right: '52%' }
                    : { left: '52%' }),
                }}
              >
                {event.startYear}
              </div>

              {/* Node */}
              <div
                className="absolute z-10"
                style={{
                  left: '20px',
                  top: 0,
                }}
              >
                {/* Mobile node */}
                <div className="md:hidden">
                  <TimelineNode isLatest={isLatest} />
                </div>
              </div>
              <div
                className="hidden md:block absolute z-10"
                style={{
                  left: '50%',
                  top: 0,
                  transform: 'translateX(-50%)',
                }}
              >
                <TimelineNode isLatest={isLatest} />
              </div>

              {/* ── Mobile layout ─────────────────── */}
              <div className="md:hidden" style={{ paddingLeft: '48px', paddingBottom: '56px' }}>
                <div
                  ref={(el) => { mobileRefs.current[index] = el; }}
                  style={{
                    opacity: 0,
                    transform: 'translateY(22px)',
                    transition: transition(index),
                  }}
                >
                  <EventCard event={event} yearLabel={yearLabel} align="left" />
                </div>
              </div>

              {/* ── Desktop layout ────────────────── */}
              <div className="hidden md:block" style={{ paddingBottom: '88px' }}>
                {isEven ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      paddingRight: '56px',
                      width: '50%',
                    }}
                  >
                    <div
                      ref={(el) => { desktopRefs.current[index] = el; }}
                      style={{
                        opacity: 0,
                        transform: 'translateY(22px) translateX(-14px)',
                        transition: transition(index),
                      }}
                    >
                      <EventCard event={event} yearLabel={yearLabel} align="right" />
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      paddingLeft: '56px',
                      marginLeft: '50%',
                    }}
                  >
                    <div
                      ref={(el) => { desktopRefs.current[index] = el; }}
                      style={{
                        opacity: 0,
                        transform: 'translateY(22px) translateX(14px)',
                        transition: transition(index),
                      }}
                    >
                      <EventCard event={event} yearLabel={yearLabel} align="left" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
