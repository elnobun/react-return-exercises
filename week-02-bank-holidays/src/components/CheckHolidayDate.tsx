import type { DateState, Division } from "../data/api"
import { formatHolidayDate } from "../utils/formatData"

type CheckHolidayDateProps = {
	dateState: DateState
	region: Division;
	divisionLabels: Record<Division, string>;
	onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
	onDateClear: () => void
}

export default function CheckHolidayDate({
	dateState,
	region,
	divisionLabels,
	onSubmit,
	onDateClear
}: CheckHolidayDateProps) {

	const hasDateError = dateState.status === 'dateNotSelected'


	return (

		<section className="card" aria-labelledby="check-heading">
			<h2 id="check-heading">Is it a bank holiday?</h2>
			<form noValidate onSubmit={onSubmit}>
				<div className={`field ${hasDateError ? 'has-error' : ''}`}>
					<label htmlFor="check-date">Date</label>
					{hasDateError && (
						<p className="field-error-message" id="check-date-error">Enter a date</p>
					)}
					<input id="check-date"
						name="date"
						type="date"
						onChange={(e) => { if (!e.target.value) onDateClear() }}
						aria-invalid={hasDateError || undefined}
						aria-describedby={hasDateError ? "check-date-error" : undefined}
					/>
				</div>
				<button className="button" type="submit">Check date</button>
			</form>
			<div aria-live="polite">

				{

					dateState.status === 'yes' ? (
						<div className="check-result check-result-yes">
							<p>Yes. {formatHolidayDate(dateState.date)} is a bank holiday in{' '}
								{divisionLabels[region]}: {dateState.holiday.title}.</p>
						</div>
					) : dateState.status === 'no' ? (
						<div className="check-result check-result-no">
							<p>No. {formatHolidayDate(dateState.date)} is not a bank holiday in {divisionLabels[region]}.</p>
							{dateState.nextHoliday && (
								<p>The next one is {dateState.nextHoliday.title}{' '}
									{dateState.nextHoliday.notes ? `(${dateState.nextHoliday.notes})` : ''}{' '}
									on {formatHolidayDate(dateState.nextHoliday.date)}.</p>
							)}
						</div>
					) : dateState.status === 'dateOutOfRange' ? (
						<div className="check-result check-result-no">
							<p>
								{dateState.bound === 'after'
									? `GOV.UK only lists bank holidays up to the end of ${dateState.year} for ${divisionLabels[region]}, so this date cannot be checked.`
									: `GOV.UK only lists bank holidays from ${dateState.year} for ${divisionLabels[region]}, so this date cannot be checked.`
								}

							</p>
						</div>
					) : null
				}
			</div>
		</section>
	)
}
