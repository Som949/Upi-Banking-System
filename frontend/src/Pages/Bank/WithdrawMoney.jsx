import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function WithdrawMoney() {
	const navigate = useNavigate()
	const [withdrawData, setWithdrawData] = useState({
		accountNumber: '5753246179',
		customerName: 'Rahul Sharma',
		currentBalance: 24500,
		withdrawAmount: 30000,
	})
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	const dailyLimit = 100000
	const dailyUsed = 0
	const remainingDaily = dailyLimit - dailyUsed
	const hasError = withdrawData.withdrawAmount > withdrawData.currentBalance
	const exceedsDailyLimit = withdrawData.withdrawAmount > remainingDaily

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setWithdrawData((prev) => ({
			...prev,
			[name]: value ? parseFloat(value) : '',
		}))
		setError('')
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!withdrawData.withdrawAmount) {
			setError('Please enter a withdrawal amount')
			return
		}

		if (hasError) {
			setError(`Insufficient balance. Available for withdrawal: Rs. ${withdrawData.currentBalance.toLocaleString()}`)
			return
		}

		if (exceedsDailyLimit) {
			setError(`Exceeds daily limit. Remaining: Rs. ${remainingDaily.toLocaleString()}`)
			return
		}

		setIsLoading(true)

		try {
			// Replace with your actual API endpoint
			const response = await fetch('/api/withdrawals', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(withdrawData),
			})

			if (response.ok) {
				setSuccessMessage(`Withdrawal of Rs. ${withdrawData.withdrawAmount.toLocaleString()} processed successfully!`)
				setTimeout(() => {
					navigate('/adminDashboard')
				}, 2000)
			}
		} catch (error) {
			console.error('Withdrawal failed:', error)
			setError('Withdrawal transaction failed. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-[#0a1428] to-[#050b18] text-slate-200">
			<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8 flex items-center gap-3">
					<button
						onClick={() => navigate('/adminDashboard')}
						className="rounded-lg bg-slate-800/50 p-2 hover:bg-slate-800 transition"
					>
						<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
					<div>
						<h1 className="text-3xl font-bold text-slate-100">Withdraw Money</h1>
						<p className="text-sm text-slate-400 uppercase tracking-widest">ADMIN TERMINAL</p>
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className="mb-8 flex gap-4 border-b border-slate-700/50">
					{/* <button className="px-4 py-3 text-sm font-medium text-slate-100 border-b-2 border-blue-500">
						Dashboard
					</button> */}
					<button className="px-4 py-3 text-sm text-blue-400 border-b-2 border-blue-500">
						Withdrawals
					</button>
					{/* <button className="px-4 py-3 text-sm text-slate-400 hover:text-slate-200">
						Reports
					</button> */}
				</div>

				{/* Main Content Card */}
				<div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/70 to-slate-950/70 p-8 backdrop-blur-sm">
					<div className="mb-8 flex items-center gap-4">
						<div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
							<svg className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
								<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
							</svg>
						</div>
						<div>
							<h2 className="text-2xl font-bold text-slate-100">Withdraw Money</h2>
							<p className="text-sm text-slate-400">Submit a withdrawal request for the selected account</p>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Source Account */}
						<div>
							<label className="block text-sm font-medium text-slate-300 mb-2">SOURCE ACCOUNT</label>
							<div className="flex gap-2">
								<input
									type="text"
									name="accountNumber"
									value={withdrawData.accountNumber}
									onChange={handleInputChange}
									disabled
									className="flex-1 rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3 text-slate-200 disabled:opacity-60"
								/>
								<button
									type="button"
									className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-4 py-3 text-emerald-400 hover:bg-emerald-500/20 transition"
								>
									<svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
										<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
									</svg>
								</button>
							</div>

							{/* Customer Info */}
							<div className="mt-3 flex items-center gap-2 text-sm">
								<span className="h-2 w-2 rounded-full bg-emerald-400" />
								<span className="text-slate-300">{withdrawData.customerName}</span>
							</div>
						</div>

						{/* Current Balance */}
						<div>
							<label className="block text-sm font-medium text-slate-300 mb-2">CURRENT BALANCE</label>
							<div className="rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3">
								<p className="text-xl font-semibold text-slate-200">
									Rs. {withdrawData.currentBalance.toLocaleString()}
								</p>
							</div>
						</div>

						{/* Withdrawal Amount */}
						<div>
							<label className="block text-sm font-medium text-slate-300 mb-2">WITHDRAWAL AMOUNT</label>
							<div className="flex items-baseline gap-2 rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3">
								<span className="text-slate-400">Rs.</span>
								<input
									type="number"
									name="withdrawAmount"
									value={withdrawData.withdrawAmount}
									onChange={handleInputChange}
									placeholder="0.00"
									className="flex-1 bg-transparent text-3xl text-slate-100 placeholder-slate-600 outline-none"
									step="0.01"
									min="0"
								/>
							</div>
						</div>

						{/* Daily Limits */}
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
									DAILY LIMIT
								</label>
								<p className="text-sm text-slate-200">RS. {dailyLimit.toLocaleString()}</p>
							</div>
							<div>
								<label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
									REMAINING
								</label>
								<p className="text-sm text-slate-200">RS. {remainingDaily.toLocaleString()}</p>
							</div>
						</div>

						{/* Error Message */}
						{(hasError || exceedsDailyLimit || error) && (
							<div className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 flex items-start gap-3">
								<svg className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
								</svg>
								<div className="flex-1">
									<p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-1">
										INSUFFICIENT BALANCE
									</p>
									<p className="text-sm text-red-300">
										Available for withdrawal: Rs. {withdrawData.currentBalance.toLocaleString()}
									</p>
								</div>
							</div>
						)}

						{/* Withdraw Button */}
						<button
							type="submit"
							disabled={isLoading || !withdrawData.withdrawAmount || hasError || exceedsDailyLimit}
							className="w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 py-3 text-lg font-semibold text-white transition hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
						>
							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<path d="M12 5v14m7-7H5" strokeWidth="2" strokeLinecap="round" />
							</svg>
							<span>{isLoading ? 'Processing...' : 'Withdraw'}</span>
						</button>

						{/* Security Info */}
						{/* <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-2">
							<span className="h-2 w-2 rounded-full bg-emerald-400" />
							END-TO-END ENCRYPTED SESSION
						</p> */}

						{/* Success Message */}
						{successMessage && (
							<div className="rounded-lg border border-emerald-400/30 bg-emerald-400/15 px-4 py-3 text-sm text-emerald-200 flex items-center gap-2">
								<span className="h-5 w-5 rounded-full bg-emerald-400/30 flex items-center justify-center">
									<span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
								</span>
								{successMessage}
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	)
}
