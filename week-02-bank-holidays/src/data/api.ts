export type Division = "england-and-wales" | "scotland" | "northern-ireland"

export interface BankHolidayEvent {
	title: string;
	date: string;
	notes: string;
	bunting: boolean;
}

export type BankHolidaysResponse = {
	[k in Division]: {
		division: k;
		events: BankHolidayEvent[]
	}
}

export type BankHolidayState =
	| { status: 'loading' }
	| { status: 'error' }
	| { status: 'success'; data: BankHolidaysResponse }
