import { useEffect, useState } from "react"
import { divisionLabels, type BankHolidaysResponse, type BankHolidayState, type DateState, type Division } from "./data/api"
import LoadingStatus from "./components/LoadingStatus"
import ErrorStatus from "./components/ErrorStatus"
import { getTodayISO } from "./utils/formatData"
import Region from "./components/Region"
import NextHoliday from "./components/NextHoliday"
import UpcomingHolidays from "./components/UpcomingHolidays"
import CheckHolidayDate from "./components/CheckHolidayDate"
import { getDateState } from "./utils/dates"

export default function App() {
	const [state, setState] = useState<BankHolidayState>({ status: 'loading' })
	const [submittedDate, setSubmittedDate] = useState<string | null>(null)
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

	const regionHolidays = state.status === 'success'
		? [...state.data[region].events].sort((a, b) => a.date.localeCompare(b.date))
		: []

	const upcomingHolidays = regionHolidays.filter(event => event.date >= todayISO)

	const nextHoliday = upcomingHolidays[0]

	const years = regionHolidays.map(event => Number(event.date.slice(0, 4)))
	const minYear = years.length ? Math.min(...years) : null
	const maxYear = years.length ? Math.max(...years) : null

	function handleTryAgainClick() {
		setState({ status: 'loading' })
		setRetry((retry) => retry + 1)
	}

	const dateState: DateState = getDateState(submittedDate, minYear, maxYear, regionHolidays)

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault()
		const rawDate = String(new FormData(e.currentTarget).get('date') ?? '')
		setSubmittedDate(rawDate)
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
					<Region region={region} divisionLabels={divisionLabels} onRegionChange={setRegion} />


					{nextHoliday && (
						<NextHoliday nextHoliday={nextHoliday} todayISO={todayISO} />
					)}

					<UpcomingHolidays upcomingHolidays={upcomingHolidays} />

					<CheckHolidayDate
						dateState={dateState}
						region={region}
						divisionLabels={divisionLabels}
						onSubmit={handleSubmit}
						onDateClear={() => setSubmittedDate(null)}
					/>
				</>
			)}

		</main>
	)

}
