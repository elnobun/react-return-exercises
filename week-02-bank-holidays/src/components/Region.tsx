import type { Division } from "../data/api"

type RegionProps = {
	region: Division;
	divisionLabels: Record<Division, string>;
	onRegionChange: (value: Division) => void
}

export default function Region({ region, divisionLabels, onRegionChange }: RegionProps) {
	return (
		<div className="card">
			<div className="field">
				<label htmlFor="region">Region</label>
				<select id="region"
					value={region}
					onChange={(e) => onRegionChange(e.target.value as Division)}
				>
					{Object.entries(divisionLabels).map(([value, label]) => (
						<option key={value} value={value}>{label}</option>
					))}
				</select>
			</div>
		</div>
	)
}
