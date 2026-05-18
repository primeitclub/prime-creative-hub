import SectionHeader from '@/components/ui/SectionHeader';
import HistoryTimeline from '@/components/history/HistoryTimeline';
import { getHistoryEvents, urlFor } from '@/lib/sanity';

export default async function HistorySection() {
  const raw = await getHistoryEvents();

  const events = (raw as any[]).map((e) => ({
    _id: e._id as string,
    title: e.title as string,
    description: e.description as string,
    startYear: e.startYear as number,
    endYear: (e.endYear ?? undefined) as number | undefined,
    imageUrl: e.image ? urlFor(e.image).width(600).url() : null,
  }));

  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px]">
      {/* <SectionHeader title="OUR HISTORY" showArrow={false} /> */}

      {events.length === 0 ? (
        <p
          className="text-center py-24"
          style={{
            fontFamily: 'var(--font-mona-sans)',
            fontSize: '13px',
            color: 'rgba(226,255,254,0.25)',
          }}
        >
          Our story is still being written.
        </p>
      ) : (
        <HistoryTimeline events={events} />
      )}
    </section>
  );
}
