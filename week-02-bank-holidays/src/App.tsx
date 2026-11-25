import { useEffect, useState } from "react"
import type { BankHolidayResponse } from "./data/api"

export default function App() {
	const [holidays, setHolidays] = useState<BankHolidayResponse | null>(null)

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		async function fetchHolidays() {
			try {
				const response = await fetch("https://www.gov.uk/bank-holidays.json", { signal })

				if (!response.ok) {
					throw new Error(`Failed to fetch: ${response.status}`)
				}

				const responseJson: BankHolidayResponse = await response.json()
				setHolidays(responseJson)
			} catch (error) {
				console.error(error)
			}
		}

		fetchHolidays()

		return () => controller.abort()

	}, [])


	return (
		<main className="page">
			<h1>UK bank holidays</h1>
			<p className="page-intro">Upcoming bank holidays from GOV.UK, by region.</p>
			<p className="state-label">State 1: loading (replaces everything below the intro)</p>

			{holidays && <p>England and Wales: {holidays["england-and-wales"].events.length} bank holidays loaded</p>}


			<div className="card status" role="status">
				<p>Loading bank holidays…</p>
			</div>

			<p className="state-label">State 2: error (replaces everything below the intro)</p>

			<div className="card status status-error" role="alert">
				<p>Bank holidays could not be loaded. Check your connection and try again.</p>
				<button className="button" type="button">Try again</button>
			</div>

			<p className="state-label">State 3: loaded (today is Tuesday 24 November 2026, region England and Wales)</p>

			<div className="card">
				<div className="field">
					<label htmlFor="region">Region</label>
					<select id="region">
						<option value="england-and-wales">England and Wales</option>
						<option value="scotland">Scotland</option>
						<option value="northern-ireland">Northern Ireland</option>
					</select>
				</div>
			</div>

			<section className="card next-holiday" aria-labelledby="next-heading">
				<h2 id="next-heading">Next bank holiday</h2>
				<p className="next-name">Christmas Day</p>
				<p className="next-when">Friday 25 December 2026 · in 31 days</p>
			</section>

			<section className="card" aria-labelledby="upcoming-heading">
				<h2 id="upcoming-heading">Upcoming bank holidays</h2>
				<ul className="holiday-list">
					<li>
						<span className="holiday-name">Christmas Day</span>
						<span className="holiday-date">Friday 25 December 2026</span>
					</li>
					<li>
						<span><span className="holiday-name">Boxing Day</span> <span className="holiday-note">(Substitute
							day)</span></span>
						<span className="holiday-date">Monday 28 December 2026</span>
					</li>
					<li>
						<span className="holiday-name">New Year’s Day</span>
						<span className="holiday-date">Friday 1 January 2027</span>
					</li>
					<li>
						<span className="holiday-name">Good Friday</span>
						<span className="holiday-date">Friday 26 March 2027</span>
					</li>
					<li>
						<span className="holiday-name">Easter Monday</span>
						<span className="holiday-date">Monday 29 March 2027</span>
					</li>
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
		</main>
	)
}
