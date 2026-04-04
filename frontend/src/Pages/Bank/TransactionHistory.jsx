import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, Printer } from 'lucide-react'

const DUMMY_TRANSACTIONS = [
	{
		id: 1,
		dateTime: '22/03/2026 10:30',
		type: 'Deposit',
		amount: 5000,
		amountDisplay: '+Rs. 5,000',
		source: 'Bank',
		status: 'Success',
		amountColor: 'text-emerald-400',
	},
	{
		id: 2,
		dateTime: '22/03/2026 11:15',
		type: 'UPI Transfer',
		amount: -500,
		amountDisplay: '-Rs. 500',
		source: 'UPI',
		status: 'Success',
		amountColor: 'text-red-400',
	},
	{
		id: 3,
		dateTime: '22/03/2026 11:16',
		type: 'Cashback',
		amount: 1.75,
		amountDisplay: '+Rs. 1.75',
		source: 'Reward',
		status: 'Success',
		amountColor: 'text-emerald-400',
	},
	{
		id: 4,
		dateTime: '22/03/2026 14:00',
		type: 'Withdrawal',
		amount: -1000,
		amountDisplay: '-Rs. 1,000',
		source: 'Bank',
		status: 'Success',
		amountColor: 'text-red-400',
	},
	{
		id: 5,
		dateTime: '21/03/2026 09:00',
		type: 'Bank Transfer',
		amount: -2000,
		amountDisplay: '-Rs. 2,000',
		source: 'Bank',
		status: 'Success',
		amountColor: 'text-red-400',
	},
	{
		id: 6,
		dateTime: '20/03/2026 16:45',
		type: 'UPI Transfer',
		amount: -300,
		amountDisplay: '-Rs. 300',
		source: 'UPI',
		status: 'Success',
		amountColor: 'text-red-400',
	},
]

export default function TransactionHistory() {
	const navigate = useNavigate()
	const [searchAccount, setSearchAccount] = useState('')
	const [filterType, setFilterType] = useState('All')
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')

	const filteredTransactions = useMemo(() => {
		return DUMMY_TRANSACTIONS.filter((transaction) => {
			// Filter by transaction type
			if (filterType === 'Bank Only' && !['Deposit', 'Withdrawal', 'Bank Transfer'].includes(transaction.type)) {
				return false
			}
			if (filterType === 'UPI Only' && !['UPI Transfer'].includes(transaction.type)) {
				return false
			}

			return true
		})
	}, [filterType])

	const handlePrint = () => {
		window.print()
	}

	const handleDownloadCSV = () => {
		const headers = ['Date & Time', 'Type', 'Amount', 'Source', 'Status']
		const rows = filteredTransactions.map((t) => [
			t.dateTime,
			t.type,
			t.amountDisplay,
			t.source,
			t.status,
		])

		const csv =
			[headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n') +
			'\n'

		const blob = new Blob([csv], { type: 'text/csv' })
		const url = window.URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `transaction_history_${new Date().getTime()}.csv`
		a.click()
		window.URL.revokeObjectURL(url)
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-[#0a1428] to-[#050b18] text-slate-200">
			<div className="min-h-screen flex flex-col overflow-hidden">
				{/* Main Content */}
				<div className="flex-1 flex flex-col overflow-hidden">
					{/* Header */}
					<header className="border-b border-slate-800/70 bg-[#081327]/95 px-8 py-4 backdrop-blur">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<button
									onClick={() => navigate('/adminDashboard')}
									className="rounded-lg bg-slate-800/50 p-2 hover:bg-slate-800 transition"
								>
									<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
										<path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
								<h1 className="text-2xl font-semibold tracking-wide text-slate-100">Transaction History</h1>
							</div>
							<div className="flex items-center gap-4">
								<button className="rounded-lg bg-slate-800/50 p-2 hover:bg-slate-800 transition">
									<Printer className="h-5 w-5" />
								</button>
								<button className="rounded-lg bg-slate-800/50 p-2 hover:bg-slate-800 transition">
									<Download className="h-5 w-5" />
								</button>
								<div className="flex items-center gap-2">
									<span className="text-xs text-slate-400">Admin User</span>
									<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/40 text-xs font-semibold text-blue-100">
										👤
									</span>
								</div>
							</div>
						</div>
					</header>

					{/* Content */}
					<main className="flex-1 overflow-auto px-8 py-6">
						{/* Search and Filters Section */}
						<div className="mb-6 space-y-4">
							<div className="flex gap-4">
								<div className="flex-1 relative">
									<input
										type="text"
										placeholder="Search by Account Number (e.g. 9876XXXXXXXX)"
										value={searchAccount}
										onChange={(e) => setSearchAccount(e.target.value)}
										className="w-full rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3 text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500/50"
									/>
									<svg className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
										<circle cx="11" cy="11" r="8" strokeWidth="2" />
										<path d="m21 21-4.35-4.35" strokeWidth="2" />
									</svg>
								</div>
								<button className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition">
									Search Records
								</button>
							</div>

							{/* Filter Buttons and Date Range */}
							<div className="flex flex-wrap items-center justify-between gap-4">
								<div className="flex gap-3">
									{['All', 'Bank Only', 'UPI Only'].map((type) => (
										<button
											key={type}
											onClick={() => setFilterType(type)}
											className={[
												'rounded-lg px-4 py-2 text-sm font-medium transition',
												filterType === type
													? 'bg-blue-500 text-white'
													: 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50',
											].join(' ')}
										>
											{type}
										</button>
									))}
								</div>

								<div className="flex items-center gap-4">
									<span className="text-sm text-slate-400">Date Range:</span>
									<input
										type="text"
										placeholder="mm/dd/yyyy"
										value={startDate}
										onChange={(e) => setStartDate(e.target.value)}
										className="w-32 rounded-lg border border-slate-600/50 bg-slate-800/30 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500/50"
									/>
									<span className="text-slate-500">to</span>
									<input
										type="text"
										placeholder="mm/dd/yyyy"
										value={endDate}
										onChange={(e) => setEndDate(e.target.value)}
										className="w-32 rounded-lg border border-slate-600/50 bg-slate-800/30 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500/50"
									/>
								</div>
							</div>
						</div>

						{/* Transactions Table */}
						<div className="rounded-lg border border-slate-700/50 bg-[#0a1428]/50 backdrop-blur-sm overflow-hidden">
							<table className="w-full">
								<thead>
									<tr className="border-b border-slate-700/50 bg-slate-900/40">
										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
											DATE & TIME
										</th>
										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
											TYPE
										</th>
										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
											AMOUNT
										</th>
										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
											SOURCE
										</th>
										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
											STATUS
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredTransactions.map((transaction) => (
										<tr
											key={transaction.id}
											className="border-b border-slate-700/30 hover:bg-slate-800/30 transition"
										>
											<td className="px-6 py-4 text-sm text-slate-300">{transaction.dateTime}</td>
											<td className="px-6 py-4 text-sm text-slate-300">{transaction.type}</td>
											<td className={`px-6 py-4 text-sm font-semibold ${transaction.amountColor}`}>
												{transaction.amountDisplay}
											</td>
											<td className="px-6 py-4 text-sm">
												<span className="inline-flex items-center gap-1 rounded-full bg-slate-700/40 px-3 py-1 text-xs font-medium text-slate-300">
													{transaction.source === 'Bank' && '🏦'}
													{transaction.source === 'UPI' && '📱'}
													{transaction.source === 'Reward' && '🎁'}
													{transaction.source}
												</span>
											</td>
											<td className="px-6 py-4 text-sm">
												<span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
													<span className="h-2 w-2 rounded-full bg-emerald-400" />
													{transaction.status}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* Action Buttons */}
						<div className="mt-6 flex justify-end gap-4">
							<button
								onClick={handlePrint}
								className="flex items-center gap-2 rounded-lg border border-slate-600/50 bg-slate-800/30 px-6 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-700/50 transition"
							>
								<Printer className="h-4 w-4" />
								Print Details
							</button>
							<button
								onClick={handleDownloadCSV}
								className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition"
							>
								<Download className="h-4 w-4" />
								Download CSV
							</button>
						</div>
					</main>

					{/* Footer */}
					<footer className="border-t border-slate-800/70 bg-[#081327]/95 px-8 py-3 text-center text-xs text-slate-500">
						© 2026 MIDNIGHT LEDGER SECURE INFRASTRUCTURE • END-TO-END ENCRYPTED TERMINAL
					</footer>
				</div>
			</div>
		</div>
	)
}
