export type Division = "england-and-wales" | "scotland" | "northern-ireland"

export const divisionLabels: Record<Division, string> = {
	"england-and-wales": "England and Wales",
	"scotland": "Scotland",
	"northern-ireland": "Northern Ireland"
}

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

export type DateState =
	| { status: 'idle' }
	| { status: 'dateNotSelected' }
	| { status: 'yes'; date: string; holiday: BankHolidayEvent }
	| { status: 'no'; date: string; nextHoliday: BankHolidayEvent | undefined }
	| { status: 'dateOutOfRange'; bound: "before" | "after"; year: number }
