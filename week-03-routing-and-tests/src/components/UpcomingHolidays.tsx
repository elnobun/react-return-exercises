import type { BankHolidayEvent } from "../data/api";
import { formatHolidayDate } from "../utils/formatData";

type UpcomingHolidaysProps = {
	upcomingHolidays: BankHolidayEvent[]
}

export default function UpcomingHolidays({ upcomingHolidays }: UpcomingHolidaysProps) {
	return (
		<section className="card" aria-labelledby="upcoming-heading">
			<h2 id="upcoming-heading">Upcoming bank holidays</h2>
			<ul className="holiday-list">
				{upcomingHolidays.map(holiday => (
					<li key={holiday.date}>
						<span>
							<span className="holiday-name">{holiday.title}</span>{' '}
							{holiday.notes && <span className="holiday-note">({holiday.notes})</span>}
						</span>
						<span className="holiday-date">{formatHolidayDate(holiday.date)}</span>
					</li>
				))}
			</ul>
		</section>
	)
}
