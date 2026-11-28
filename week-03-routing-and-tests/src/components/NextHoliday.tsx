import type { BankHolidayEvent } from "../data/api";
import { formatHolidayDate, formatRelativeDays } from "../utils/formatData";

type NextHolidayProps = {
	nextHoliday: BankHolidayEvent;
	todayISO: string;
}

export default function NextHoliday({ nextHoliday, todayISO }: NextHolidayProps) {
	return (
		<section className="card next-holiday" aria-labelledby="next-heading">
			<h2 id="next-heading">Next bank holiday</h2>
			<p className="next-name">{nextHoliday.title}</p>
			<p className="next-when">{formatHolidayDate(nextHoliday.date)} · {formatRelativeDays(nextHoliday.date, todayISO)}</p>
		</section>
	)
}
