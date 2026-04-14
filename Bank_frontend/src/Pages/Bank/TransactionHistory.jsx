// import { useState, useMemo } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Download, Printer } from 'lucide-react'

// const DUMMY_TRANSACTIONS = [
// 	{
// 		id: 1,
// 		dateTime: '22/03/2026 10:30',
// 		type: 'Deposit',
// 		amount: 5000,
// 		amountDisplay: '+Rs. 5,000',
// 		source: 'Bank',
// 		status: 'Success',
// 		amountColor: 'text-emerald-400',
// 	},
// 	{
// 		id: 2,
// 		dateTime: '22/03/2026 11:15',
// 		type: 'UPI Transfer',
// 		amount: -500,
// 		amountDisplay: '-Rs. 500',
// 		source: 'UPI',
// 		status: 'Success',
// 		amountColor: 'text-red-400',
// 	},
// 	{
// 		id: 3,
// 		dateTime: '22/03/2026 11:16',
// 		type: 'Cashback',
// 		amount: 1.75,
// 		amountDisplay: '+Rs. 1.75',
// 		source: 'Reward',
// 		status: 'Success',
// 		amountColor: 'text-emerald-400',
// 	},
// 	{
// 		id: 4,
// 		dateTime: '22/03/2026 14:00',
// 		type: 'Withdrawal',
// 		amount: -1000,
// 		amountDisplay: '-Rs. 1,000',
// 		source: 'Bank',
// 		status: 'Success',
// 		amountColor: 'text-red-400',
// 	},
// 	{
// 		id: 5,
// 		dateTime: '21/03/2026 09:00',
// 		type: 'Bank Transfer',
// 		amount: -2000,
// 		amountDisplay: '-Rs. 2,000',
// 		source: 'Bank',
// 		status: 'Success',
// 		amountColor: 'text-red-400',
// 	},
// 	{
// 		id: 6,
// 		dateTime: '20/03/2026 16:45',
// 		type: 'UPI Transfer',
// 		amount: -300,
// 		amountDisplay: '-Rs. 300',
// 		source: 'UPI',
// 		status: 'Success',
// 		amountColor: 'text-red-400',
// 	},
// ]

// export default function TransactionHistory() {
// 	const navigate = useNavigate()
// 	const [searchAccount, setSearchAccount] = useState('')
// 	const [filterType, setFilterType] = useState('All')
// 	const [startDate, setStartDate] = useState('')
// 	const [endDate, setEndDate] = useState('')

// 	const filteredTransactions = useMemo(() => {
// 		return DUMMY_TRANSACTIONS.filter((transaction) => {
// 			// Filter by transaction type
// 			if (filterType === 'Bank Only' && !['Deposit', 'Withdrawal', 'Bank Transfer'].includes(transaction.type)) {
// 				return false
// 			}
// 			if (filterType === 'UPI Only' && !['UPI Transfer'].includes(transaction.type)) {
// 				return false
// 			}

// 			return true
// 		})
// 	}, [filterType])

// 	const handlePrint = () => {
// 		window.print()
// 	}

// 	const handleDownloadCSV = () => {
// 		const headers = ['Date & Time', 'Type', 'Amount', 'Source', 'Status']
// 		const rows = filteredTransactions.map((t) => [
// 			t.dateTime,
// 			t.type,
// 			t.amountDisplay,
// 			t.source,
// 			t.status,
// 		])

// 		const csv =
// 			[headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n') +
// 			'\n'

// 		const blob = new Blob([csv], { type: 'text/csv' })
// 		const url = window.URL.createObjectURL(blob)
// 		const a = document.createElement('a')
// 		a.href = url
// 		a.download = `transaction_history_${new Date().getTime()}.csv`
// 		a.click()
// 		window.URL.revokeObjectURL(url)
// 	}

// 	return (
// 		<div className="min-h-screen bg-linear-to-b from-[#0a1428] to-[#050b18] text-slate-200">
// 			<div className="min-h-screen flex flex-col overflow-hidden">
// 				{/* Main Content */}
// 				<div className="flex-1 flex flex-col overflow-hidden">
// 					{/* Header */}
// 					<header className="border-b border-slate-800/70 bg-[#081327]/95 px-8 py-4 backdrop-blur">
// 						<div className="flex items-center justify-between">
// 							<div className="flex items-center gap-4">
// 								<button
// 									onClick={() => navigate('/adminDashboard')}
// 									className="rounded-lg bg-slate-800/50 p-2 hover:bg-slate-800 transition"
// 								>
// 									<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// 										<path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
// 									</svg>
// 								</button>
// 								<h1 className="text-2xl font-semibold tracking-wide text-slate-100">Transaction History</h1>
// 							</div>
// 							<div className="flex items-center gap-4">
// 								<button className="rounded-lg bg-slate-800/50 p-2 hover:bg-slate-800 transition">
// 									<Printer className="h-5 w-5" />
// 								</button>
// 								<button className="rounded-lg bg-slate-800/50 p-2 hover:bg-slate-800 transition">
// 									<Download className="h-5 w-5" />
// 								</button>
// 								<div className="flex items-center gap-2">
// 									<span className="text-xs text-slate-400">Admin User</span>
// 									<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/40 text-xs font-semibold text-blue-100">
// 										👤
// 									</span>
// 								</div>
// 							</div>
// 						</div>
// 					</header>

// 					{/* Content */}
// 					<main className="flex-1 overflow-auto px-8 py-6">
// 						{/* Search and Filters Section */}
// 						<div className="mb-6 space-y-4">
// 							<div className="flex gap-4">
// 								<div className="flex-1 relative">
// 									<input
// 										type="text"
// 										placeholder="Search by Account Number (e.g. 9876XXXXXXXX)"
// 										value={searchAccount}
// 										onChange={(e) => setSearchAccount(e.target.value)}
// 										className="w-full rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3 text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500/50"
// 									/>
// 									<svg className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// 										<circle cx="11" cy="11" r="8" strokeWidth="2" />
// 										<path d="m21 21-4.35-4.35" strokeWidth="2" />
// 									</svg>
// 								</div>
// 								<button className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition">
// 									Search Records
// 								</button>
// 							</div>

// 							{/* Filter Buttons and Date Range */}
// 							<div className="flex flex-wrap items-center justify-between gap-4">
// 								<div className="flex gap-3">
// 									{['All', 'Bank Only', 'UPI Only'].map((type) => (
// 										<button
// 											key={type}
// 											onClick={() => setFilterType(type)}
// 											className={[
// 												'rounded-lg px-4 py-2 text-sm font-medium transition',
// 												filterType === type
// 													? 'bg-blue-500 text-white'
// 													: 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50',
// 											].join(' ')}
// 										>
// 											{type}
// 										</button>
// 									))}
// 								</div>

// 								<div className="flex items-center gap-4">
// 									<span className="text-sm text-slate-400">Date Range:</span>
// 									<input
// 										type="text"
// 										placeholder="mm/dd/yyyy"
// 										value={startDate}
// 										onChange={(e) => setStartDate(e.target.value)}
// 										className="w-32 rounded-lg border border-slate-600/50 bg-slate-800/30 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500/50"
// 									/>
// 									<span className="text-slate-500">to</span>
// 									<input
// 										type="text"
// 										placeholder="mm/dd/yyyy"
// 										value={endDate}
// 										onChange={(e) => setEndDate(e.target.value)}
// 										className="w-32 rounded-lg border border-slate-600/50 bg-slate-800/30 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500/50"
// 									/>
// 								</div>
// 							</div>
// 						</div>

// 						{/* Transactions Table */}
// 						<div className="rounded-lg border border-slate-700/50 bg-[#0a1428]/50 backdrop-blur-sm overflow-hidden">
// 							<table className="w-full">
// 								<thead>
// 									<tr className="border-b border-slate-700/50 bg-slate-900/40">
// 										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
// 											DATE & TIME
// 										</th>
// 										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
// 											TYPE
// 										</th>
// 										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
// 											AMOUNT
// 										</th>
// 										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
// 											SOURCE
// 										</th>
// 										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
// 											STATUS
// 										</th>
// 									</tr>
// 								</thead>
// 								<tbody>
// 									{filteredTransactions.map((transaction) => (
// 										<tr
// 											key={transaction.id}
// 											className="border-b border-slate-700/30 hover:bg-slate-800/30 transition"
// 										>
// 											<td className="px-6 py-4 text-sm text-slate-300">{transaction.dateTime}</td>
// 											<td className="px-6 py-4 text-sm text-slate-300">{transaction.type}</td>
// 											<td className={`px-6 py-4 text-sm font-semibold ${transaction.amountColor}`}>
// 												{transaction.amountDisplay}
// 											</td>
// 											<td className="px-6 py-4 text-sm">
// 												<span className="inline-flex items-center gap-1 rounded-full bg-slate-700/40 px-3 py-1 text-xs font-medium text-slate-300">
// 													{transaction.source === 'Bank' && '🏦'}
// 													{transaction.source === 'UPI' && '📱'}
// 													{transaction.source === 'Reward' && '🎁'}
// 													{transaction.source}
// 												</span>
// 											</td>
// 											<td className="px-6 py-4 text-sm">
// 												<span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
// 													<span className="h-2 w-2 rounded-full bg-emerald-400" />
// 													{transaction.status}
// 												</span>
// 											</td>
// 										</tr>
// 									))}
// 								</tbody>
// 							</table>
// 						</div>

// 						{/* Action Buttons */}
// 						<div className="mt-6 flex justify-end gap-4">
// 							<button
// 								onClick={handlePrint}
// 								className="flex items-center gap-2 rounded-lg border border-slate-600/50 bg-slate-800/30 px-6 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-700/50 transition"
// 							>
// 								<Printer className="h-4 w-4" />
// 								Print Details
// 							</button>
// 							<button
// 								onClick={handleDownloadCSV}
// 								className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition"
// 							>
// 								<Download className="h-4 w-4" />
// 								Download CSV
// 							</button>
// 						</div>
// 					</main>

// 					{/* Footer */}
// 					<footer className="border-t border-slate-800/70 bg-[#081327]/95 px-8 py-3 text-center text-xs text-slate-500">
// 						© 2026 MIDNIGHT LEDGER SECURE INFRASTRUCTURE • END-TO-END ENCRYPTED TERMINAL
// 					</footer>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }


import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getTransactions } from '../../api'
import { Download, Printer } from 'lucide-react'

export default function TransactionHistory() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams() // ✅ Search page se pre-fill

	const [searchAccount, setSearchAccount] = useState(searchParams.get('account') || '')
	const [transactions, setTransactions] = useState([])
	const [customerName, setCustomerName] = useState('')
	const [filterType, setFilterType] = useState('All')
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [searched, setSearched] = useState(false)

	
	useState(() => {
		const acc = searchParams.get('account')
		if (acc) handleSearch(acc)
	})

	const handleSearch = async (accOverride) => {
		const acc = accOverride || searchAccount.trim()
		if (!acc) return

		setIsLoading(true)
		setError('')
		setTransactions([])
		setSearched(true)

		try {
			const res = await getTransactions(acc)
			if (res.success) {
				setCustomerName(res.data.full_name)
				setTransactions(res.data.transactions)
			} else {
				setError(res.message || 'Transactions not found')
			}
		} catch {
			setError('Server is not Connected')
		} finally {
			setIsLoading(false)
		}
	}

	// ✅ Filter logic
	const filteredTransactions = useMemo(() => {
		return transactions.filter((txn) => {
			if (filterType === 'Bank Only' && txn.txn_source !== 'bank') return false
			if (filterType === 'UPI Only' && txn.txn_source !== 'upi') return false

			if (startDate) {
				const txnDate = new Date(txn.date)
				const from = new Date(startDate)
				if (txnDate < from) return false
			}
			if (endDate) {
				const txnDate = new Date(txn.date)
				const to = new Date(endDate)
				to.setHours(23, 59, 59)
				if (txnDate > to) return false
			}
			return true
		})
	}, [transactions, filterType, startDate, endDate])

	// ✅ Format date
	const formatDate = (dateStr) => {
		const d = new Date(dateStr)
		return d.toLocaleDateString('en-IN', {
			day: '2-digit', month: '2-digit', year: 'numeric',
			hour: '2-digit', minute: '2-digit',
		})
	}

	// ✅ Amount color
	const getAmountDisplay = (txn) => {
		if (txn.direction === 'credit') {
			return { text: `+Rs. ${txn.amount}`, color: 'text-emerald-400' }
		}
		return { text: `-Rs. ${txn.amount}`, color: 'text-red-400' }
	}

	// ✅ Source badge
	const getSourceBadge = (source) => {
		if (source === 'bank') return { icon: '🏦', label: 'Bank', color: 'bg-blue-500/20 text-blue-300' }
		if (source === 'upi')  return { icon: '📱', label: 'UPI',  color: 'bg-emerald-500/20 text-emerald-300' }
		return { icon: '🎁', label: 'Reward', color: 'bg-amber-500/20 text-amber-300' }
	}

	// ✅ Print
	const handlePrint = () => window.print()

	// ✅ Download CSV
	const handleDownloadCSV = () => {
		const headers = ['Date & Time', 'Type', 'Direction', 'Amount', 'Source', 'Status']
		const rows = filteredTransactions.map((t) => [
			formatDate(t.date),
			t.txn_type,
			t.direction,
			t.amount,
			t.txn_source,
			t.status,
		])
		const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n')
		const blob = new Blob([csv], { type: 'text/csv' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `transactions_${searchAccount}_${Date.now()}.csv`
		a.click()
		URL.revokeObjectURL(url)
	}

	return (
		<div className="min-h-screen bg-linear-to-b from-[#0a1428] to-[#050b18] text-slate-200">
			<div className="flex flex-col min-h-screen">
				{/* Header */}
				<header className="border-b border-slate-800/70 bg-[#081327]/95 px-8 py-4 backdrop-blur">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<button onClick={() => navigate('/adminDashboard')} className="rounded-lg bg-slate-800/50 p-2 hover:bg-slate-800 transition">
								<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>
							<div>
								<h1 className="text-2xl font-semibold text-slate-100">Transaction History</h1>
								{customerName && (
									<p className="text-sm text-slate-400">{customerName}</p>
								)}
							</div>
						</div>
						<div className="flex items-center gap-3">
							<button onClick={handlePrint} className="rounded-lg bg-slate-800/50 p-2 hover:bg-slate-800 transition">
								<Printer className="h-5 w-5" />
							</button>
							<button onClick={handleDownloadCSV} className="rounded-lg bg-slate-800/50 p-2 hover:bg-slate-800 transition">
								<Download className="h-5 w-5" />
							</button>
						</div>
					</div>
				</header>

				{/* Content */}
				<main className="flex-1 px-8 py-6">
					{/* Search */}
					<div className="mb-6 space-y-4">
						<div className="flex gap-4">
							<input
								type="text"
								placeholder="Account number daalo"
								value={searchAccount}
								onChange={(e) => setSearchAccount(e.target.value)}
								onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
								className="flex-1 rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3 text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500/50"
							/>
							<button
								onClick={() => handleSearch()}
								disabled={isLoading || !searchAccount}
								className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition disabled:opacity-60"
							>
								{isLoading ? 'Searching...' : 'Search'}
							</button>
						</div>

						{/* Filters */}
						<div className="flex flex-wrap items-center justify-between gap-4">
							<div className="flex gap-3">
								{['All', 'Bank Only', 'UPI Only'].map((type) => (
									<button
										key={type}
										onClick={() => setFilterType(type)}
										className={[
											'rounded-lg px-4 py-2 text-sm font-medium transition',
											filterType === type ? 'bg-blue-500 text-white' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50',
										].join(' ')}
									>
										{type}
									</button>
								))}
							</div>
							<div className="flex items-center gap-3">
								<span className="text-sm text-slate-400">Date Range:</span>
								<input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
									className="rounded-lg border border-slate-600/50 bg-slate-800/30 px-3 py-2 text-sm text-slate-200 outline-none" />
								<span className="text-slate-500">to</span>
								<input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
									className="rounded-lg border border-slate-600/50 bg-slate-800/30 px-3 py-2 text-sm text-slate-200 outline-none" />
							</div>
						</div>
					</div>

					{/* Error */}
					{error && (
						<div className="mb-4 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
							{error}
						</div>
					)}

					{/* Table */}
					{filteredTransactions.length > 0 ? (
						<div className="rounded-lg border border-slate-700/50 bg-[#0a1428]/50 overflow-hidden">
							<table className="w-full">
								<thead>
									<tr className="border-b border-slate-700/50 bg-slate-900/40">
										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">DATE & TIME</th>
										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">TYPE</th>
										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">AMOUNT</th>
										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">SOURCE</th>
										<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">STATUS</th>
									</tr>
								</thead>
								<tbody>
									{filteredTransactions.map((txn) => {
										const amt = getAmountDisplay(txn)
										const badge = getSourceBadge(txn.txn_source)
										return (
											<tr key={txn.txn_id} className="border-b border-slate-700/30 hover:bg-slate-800/30 transition">
												<td className="px-6 py-4 text-sm text-slate-300">{formatDate(txn.date)}</td>
												<td className="px-6 py-4 text-sm text-slate-300 capitalize">{txn.txn_type.replace('_', ' ')}</td>
												<td className={`px-6 py-4 text-sm font-semibold ${amt.color}`}>{amt.text}</td>
												<td className="px-6 py-4 text-sm">
													<span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${badge.color}`}>
														{badge.icon} {badge.label}
													</span>
												</td>
												<td className="px-6 py-4 text-sm">
													<span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
														<span className="h-2 w-2 rounded-full bg-emerald-400" />
														{txn.status}
													</span>
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					) : (
						searched && !isLoading && (
							<div className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-10 text-center">
								<p className="text-slate-400">No transactions is found</p>
							</div>
						)
					)}

					{/* Action Buttons */}
					{filteredTransactions.length > 0 && (
						<div className="mt-6 flex justify-end gap-4">
							<button onClick={handlePrint} className="flex items-center gap-2 rounded-lg border border-slate-600/50 bg-slate-800/30 px-6 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-700/50 transition">
								<Printer className="h-4 w-4" /> Print
							</button>
							<button onClick={handleDownloadCSV} className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition">
								<Download className="h-4 w-4" /> Download CSV
							</button>
						</div>
					)}
				</main>

				{/* Footer */}
				<footer className="border-t border-slate-800/70 bg-[#081327]/95 px-8 py-3 text-center text-xs text-slate-500">
					© 2026 DIGITAL BANKING SYSTEM • END-TO-END ENCRYPTED
				</footer>
			</div>
		</div>
	)
}
