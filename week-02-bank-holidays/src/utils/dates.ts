import type { BankHolidayEvent, DateState } from "../data/api"

export function getDateState(
	submittedDate: string | null,
	minYear: number | null,
	maxYear: number | null,
	regionHolidays: BankHolidayEvent[]): DateState {
	if (submittedDate === null) return { status: 'idle' }
	if (!submittedDate) return { status: 'dateNotSelected' }

	const selectedYear = Number(submittedDate.slice(0, 4))
	if (maxYear && selectedYear > maxYear) {
		return { status: 'dateOutOfRange', bound: 'after', year: maxYear }
	}

	if (minYear && selectedYear < minYear) {
		return { status: 'dateOutOfRange', bound: 'before', year: minYear }
	}

	const matchedHoliday = regionHolidays.find(holiday => holiday.date === submittedDate)
	if (matchedHoliday) {
		return { status: 'yes', date: submittedDate, holiday: matchedHoliday }
	}
	const nextHolidayInput = regionHolidays.find(holiday => holiday.date > submittedDate)
	return { status: 'no', date: submittedDate, nextHoliday: nextHolidayInput }

}
