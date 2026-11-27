const dateOption = new Intl.DateTimeFormat('en-GB', {
	weekday: 'long',
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	timeZone: 'UTC'
})

const relativeOption = new Intl.RelativeTimeFormat('en-GB', {
	// Outputs "today", "tomorrow", "yesterday" instead of "in 0 days"
	numeric: 'auto'
})

export function formatHolidayDate(dateString: string): string {
	const dateObject = new Date(`${dateString}T00:00:00Z`)
	return dateOption.format(dateObject).replace(',', '')
}

export function formatRelativeDays(dateString: string, todayISO: string): string {
	// 1. Parse target API date ("2026-12-25") at UTC midnight
	const targetDate = new Date(`${dateString}T00:00:00Z`)
	const todayUTC = new Date(`${todayISO}T00:00:00Z`)

	// 3. Calculate exact difference in days
	const msPerDay = 1000 * 60 * 60 * 24
	const diffInDays = Math.round((targetDate.getTime() - todayUTC.getTime()) / msPerDay)

	return relativeOption.format(diffInDays, 'day')

}

export function getTodayISO(): string {
	const now = new Date()
	const year = now.getFullYear()
	const month = String(now.getMonth() + 1).padStart(2, '0')
	const day = String(now.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}
