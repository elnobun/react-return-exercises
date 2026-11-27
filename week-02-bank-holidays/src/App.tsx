import { useEffect, useState } from "react"
import { divisionLabels, type BankHolidaysResponse, type BankHolidayState, type Division } from "./data/api"
import LoadingStatus from "./components/LoadingStatus"
import ErrorStatus from "./components/ErrorStatus"
import { formatHolidayDate, formatRelativeDays, getTodayISO } from "./utils/formatData"

export default function App() {
	const [state, setState] = useState<BankHolidayState>({ status: 'loading' })
	const [region, setRegion] = useState<Division>("england-and-wales")
	const [retry, setRetry] = useState(0)

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		async function fetchHolidays() {
			try {

				const response = await fetch("https://www.gov.uk/bank-holidays.json", { signal })

				if (!response.ok) {
					throw new Error(`Failed to fetch: ${response.status}`)
				}

				const responseJson: BankHolidaysResponse = await response.json()

				if (!signal.aborted) {
					setState({ status: 'success', data: responseJson })
				}

			} catch (error) {
				if (signal.aborted) return
				console.error(error)
				setState({ status: 'error' })
			}
		}

		fetchHolidays()

		return () => controller.abort()

	}, [retry])

	const todayISO = getTodayISO()
	const upcomingHolidays = state.status === 'success'
		? state.data[region].events
			.filter((event) => event.date >= todayISO)
			.sort((a, b) => a.date.localeCompare(b.date))
		: []

	const nextHoliday = upcomingHolidays[0]

	function handleTryAgainClick() {
		setState({ status: 'loading' })
		setRetry((retry) => retry + 1)
	}


	return (
		<main className="page">
			<h1>UK bank holidays</h1>
			<p className="page-intro">Upcoming bank holidays from GOV.UK, by region.</p>

			{state.status === 'loading' ? (
				<LoadingStatus />
			) : state.status === 'error' ? (
				<ErrorStatus onTryAgain={handleTryAgainClick} />
			) : (
				<>

					<div className="card">
						<div className="field">
							<label htmlFor="region">Region</label>
							<select id="region"
								value={region}
								onChange={(e) => setRegion(e.target.value as Division)}
							>
								{Object.entries(divisionLabels).map(([value, label]) => (
									<option key={value} value={value}>{label}</option>
								))}
							</select>
						</div>
					</div>

					{nextHoliday && (
						<section className="card next-holiday" aria-labelledby="next-heading">
							<h2 id="next-heading">Next bank holiday</h2>
							<p className="next-name">{nextHoliday.title}</p>
							<p className="next-when">{formatHolidayDate(nextHoliday.date)} · {formatRelativeDays(nextHoliday.date, todayISO)}</p>
						</section>
					)}



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

					<section className="card" aria-labelledby="check-heading">
						<h2 id="check-heading">Is it a bank holiday?</h2>
						<form noValidate>
							<div className="field">
								<label htmlFor="check-date">Date</label>
								<input id="check-date" type="date" />
							</div>
							<button className="button" type="submit">Check date</button>
						</form>
						<div aria-live="polite">{/* result appears here after submit */}</div>
					</section>

					<p className="state-label">State 4: submitted with no date</p>

					<section className="card" aria-labelledby="check-heading-4">
						<h2 id="check-heading-4">Is it a bank holiday?</h2>
						<form noValidate>
							<div className="field has-error">
								<label htmlFor="check-date-4">Date</label>
								<p className="field-error-message" id="check-date-4-error">Enter a date</p>
								<input id="check-date-4" type="date" aria-invalid="true" aria-describedby="check-date-4-error" />
							</div>
							<button className="button" type="submit">Check date</button>
						</form>
						<div aria-live="polite"></div>
					</section>

					<p className="state-label">State 5: result, yes</p>

					<section className="card" aria-labelledby="check-heading-5">
						<h2 id="check-heading-5">Is it a bank holiday?</h2>
						<form noValidate>
							<div className="field">
								<label htmlFor="check-date-5">Date</label>
								<input id="check-date-5" type="date" />
							</div>
							<button className="button" type="submit">Check date</button>
						</form>
						<div aria-live="polite">
							<div className="check-result check-result-yes">
								<p>Yes. Monday 3 May 2027 is a bank holiday in England and Wales: Early May bank holiday.</p>
							</div>
						</div>
					</section>

					<p className="state-label">State 6: result, no</p>

					<section className="card" aria-labelledby="check-heading-6">
						<h2 id="check-heading-6">Is it a bank holiday?</h2>
						<form noValidate>
							<div className="field">
								<label htmlFor="check-date-6">Date</label>
								<input id="check-date-6" type="date" />
							</div>
							<button className="button" type="submit">Check date</button>
						</form>
						<div aria-live="polite">
							<div className="check-result check-result-no">
								<p>No. Saturday 26 December 2026 is not a bank holiday in England and Wales.</p>
								<p>The next one is Boxing Day (Substitute day) on Monday 28 December 2026.</p>
							</div>
						</div>
					</section>

					<p className="state-label">State 7: date outside the data's range</p>

					<section className="card" aria-labelledby="check-heading-7">
						<h2 id="check-heading-7">Is it a bank holiday?</h2>
						<form noValidate>
							<div className="field">
								<label htmlFor="check-date-7">Date</label>
								<input id="check-date-7" type="date" />
							</div>
							<button className="button" type="submit">Check date</button>
						</form>
						<div aria-live="polite">
							<div className="check-result check-result-no">
								<p>GOV.UK only lists bank holidays up to the end of 2027 for England and Wales, so this date cannot
									be checked.</p>
							</div>
						</div>
					</section>
				</>
			)}

		</main>
	)

}
