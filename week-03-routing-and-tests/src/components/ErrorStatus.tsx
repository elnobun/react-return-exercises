type ErrorStatusProps = {
	onTryAgain: () => void
}

export default function ErrorStatus({ onTryAgain }: ErrorStatusProps) {
	return (
		<div className="card status status-error" role="alert">
			<p>Bank holidays could not be loaded. Check your connection and try again.</p>
			<button className="button" type="button" onClick={onTryAgain}>Try again</button>
		</div>
	)
}
