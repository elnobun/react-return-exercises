export type Division = "england-and-wales" | "scotland" | "northern-ireland"

export interface BankHolidayEvent {
	title: string;
	date: string;
	notes: string;
	bunting: boolean;
}

export type BankHolidayResponse = {
	[k in Division]: {
		division: k;
		events: BankHolidayEvent[]
	}
}
