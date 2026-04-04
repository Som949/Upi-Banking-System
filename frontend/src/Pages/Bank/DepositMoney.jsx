import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DepositMoney() {
	const navigate = useNavigate()
	const [depositData, setDepositData] = useState({
		accountNumber: '5753246179',
		customerName: 'Rahul Sharma',
		depositAmount: '',
	})
	const [isLoading, setIsLoading] = useState(false)
	const [successMessage, setSuccessMessage] = useState('')

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setDepositData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			// Replace with your actual API endpoint
			const response = await fetch('/api/deposits', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(depositData),
			})

			if (response.ok) {
				setSuccessMessage(`₹ 5,000 received successfully! Pending for 7 days`)
				setTimeout(() => {
					navigate('/adminDashboard')
				}, 2000)
			}
		} catch (error) {
			console.error('Deposit failed:', error)
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
						<h1 className="text-3xl font-bold text-slate-100">Add Money / Deposit</h1>
						<p className="text-sm text-slate-400 uppercase tracking-widest">THE VAULTED SANCTUARY</p>
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className="mb-8 flex gap-4 border-b border-slate-700/50">
					<button className="px-4 py-3 text-sm font-medium text-slate-100 border-b-2 border-blue-500">
						Dashboard
					</button>
					<button className="px-4 py-3 text-sm text-slate-400 hover:text-slate-200">
						Accounts
					</button>
					<button className="px-4 py-3 text-sm text-slate-400 hover:text-slate-200">
						Transactions
					</button>
					<button className="px-4 py-3 text-sm text-slate-400 hover:text-slate-200">
						Analytics
					</button>
				</div>

				{/* Main Content Card */}
				<div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/70 to-slate-950/70 p-8 backdrop-blur-sm">
					<div className="mb-8 flex items-center gap-4">
						<div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
							<svg className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
							</svg>
						</div>
						<div>
							<h2 className="text-2xl font-bold text-slate-100">Add Money</h2>
							<span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
								<span className="h-2 w-2 rounded-full bg-emerald-400" />
								SECURE ENTRY
							</span>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Account Number */}
						<div>
							<label className="block text-sm font-medium text-slate-300 mb-2">ACCOUNT NUMBER</label>
							<div className="flex gap-2">
								<input
									type="text"
									name="accountNumber"
									value={depositData.accountNumber}
									onChange={handleInputChange}
									disabled
									className="flex-1 rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3 text-slate-200 disabled:opacity-60"
								/>
								<button
									type="button"
									className="rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3 text-slate-300 hover:bg-slate-700/50 transition"
								>
									<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
										<circle cx="11" cy="11" r="8" strokeWidth="2" />
										<path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
									</svg>
								</button>
							</div>
						</div>

						{/* Customer Name */}
						<div>
							<label className="block text-sm font-medium text-slate-300 mb-2">CUSTOMER NAME</label>
							<div className="flex items-center gap-3 rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3">
								<span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
								<span className="text-slate-200">{depositData.customerName} — Active</span>
							</div>
						</div>

						{/* Deposit Amount */}
						<div>
							<label className="block text-sm font-medium text-slate-300 mb-2">DEPOSIT AMOUNT</label>
							<div className="flex items-baseline gap-2 rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3">
								<span className="text-slate-400">Rs.</span>
								<input
									type="number"
									name="depositAmount"
									value={depositData.depositAmount}
									onChange={handleInputChange}
									placeholder="0.00"
									className="flex-1 bg-transparent text-3xl text-slate-100 placeholder-slate-600 outline-none"
									step="0.01"
									min="0"
								/>
							</div>
						</div>

						{/* Usage Limits */}
						<div className="rounded-lg border border-slate-600/30 bg-slate-800/20 p-4">
							<p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">USAGE LIMITS</p>
							<div className="flex justify-between text-sm mb-2">
								<span className="text-slate-400">Daily Limit:</span>
								<span className="text-slate-200">Rs. 1,00,000</span>
							</div>
							<div className="flex justify-between text-sm mb-3">
								<span className="text-slate-400">Used:</span>
								<span className="text-slate-200">Rs. 0</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-slate-400">Rem:</span>
								<span className="text-slate-200">Rs. 1,00,000</span>
							</div>
							<div className="mt-3 flex gap-2">
								<div className="flex-1 h-1 bg-emerald-500 rounded-full" />
								<span className="text-xs text-slate-500">0% USED</span>
							</div>
						</div>

						{/* Add Money Button */}
						<button
							type="submit"
							disabled={isLoading || !depositData.depositAmount}
							className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 py-3 text-lg font-semibold text-white transition hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
						>
							<span>+</span>
							<span>{isLoading ? 'Processing...' : 'Add Money'}</span>
						</button>

						{/* Info Text */}
						<p className="text-center text-xs text-slate-500">
							Cash received from customer must be verified before deposit
						</p>

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

				{/* Sidebar Info */}
				<div className="mt-8 grid gap-4 md:grid-cols-2">
					<div className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-6">
						<p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Admin Console</p>
						<p className="text-sm text-slate-300">Verified Access</p>
					</div>
					<div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-6">
						<p className="text-xs uppercase tracking-widest text-blue-300 mb-1">System Status</p>
						<div className="flex items-center gap-2">
							<span className="h-2 w-2 rounded-full bg-emerald-400" />
							<span className="text-sm text-slate-200">All systems operational</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
