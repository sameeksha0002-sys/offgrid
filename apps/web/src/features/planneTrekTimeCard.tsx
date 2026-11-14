import { formatDuration, summariseTrekTime, type Place } from "@offgrid/core";
import { Card, SectionTitle } from "../../design/Card";

/**
 * Rough walking time for the trek, from Naismith's rule. Hidden for places with no trekking.
 * `trekDays` is the number of days in the plan that have walking on them.
 */
export function TrekTimeCard({ place, trekDays }: { place: Pick<Place, "distance_km" | "elevation_gain_m">; trekDays: number }) {
  if (place.distance_km <= 0) return null;
  const { totalHours, perDayHours } = summariseTrekTime(place, trekDays);

  return (
    <Card>
      <SectionTitle hint="A rough guide for planning your start time. Your pace may differ.">⏱️ Walking time</SectionTitle>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-muted">Whole trek</dt>
          <dd className="text-lg font-extrabold">{formatDuration(totalHours)}</dd>
        </div>
        {perDayHours > 0 && (
          <div>
            <dt className="text-muted">Average per trekking day</dt>
            <dd className="text-lg font-extrabold">{formatDuration(perDayHours)}</dd>
          </div>
        )}
      </dl>
      <p className="mt-3 text-xs text-muted">
        Based on Naismith's rule: 5 km an hour on the flat, plus 1 hour for every 600 m you climb. It doesn't include breaks, meals or
        photo stops, and altitude, snow or heavy packs will slow you down. Start early and plan to finish well before dark.
      </p>
    </Card>
  );
}
