// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { ArrowDown } from 'lucide-react'

// export default function TransferMoney() {
// 	const navigate = useNavigate()
// 	const [transferData, setTransferData] = useState({
// 		fromAccount: '5753246179',
// 		customerName: 'Rahul Sharma',
// 		availableBalance: 24500,
// 		toAccount: '',
// 		transferAmount: 5000,
// 	})
// 	const [isLoading, setIsLoading] = useState(false)
// 	const [error, setError] = useState('')
// 	const [successMessage, setSuccessMessage] = useState('')

// 	const dailyLimit = 300000
// 	const dailyUsed = 0
// 	const remainingDaily = dailyLimit - dailyUsed
// 	const hasError = transferData.transferAmount > transferData.availableBalance
// 	const exceedsDailyLimit = transferData.transferAmount > remainingDaily
// 	const invalidReceiver = !transferData.toAccount || transferData.toAccount.length === 0

// 	const handleInputChange = (e) => {
// 		const { name, value } = e.target
// 		if (name === 'transferAmount') {
// 			setTransferData((prev) => ({
// 				...prev,
// 				[name]: value ? parseFloat(value) : '',
// 			}))
// 		} else {
// 			setTransferData((prev) => ({
// 				...prev,
// 				[name]: value,
// 			}))
// 		}
// 		setError('')
// 	}

// 	const handleSubmit = async (e) => {
// 		e.preventDefault()

// 		if (!transferData.toAccount) {
// 			setError('Please enter receiver account number')
// 			return
// 		}

// 		if (!transferData.transferAmount) {
// 			setError('Please enter transfer amount')
// 			return
// 		}

// 		if (hasError) {
// 			setError(`Insufficient balance. Available: Rs. ${transferData.availableBalance.toLocaleString()}`)
// 			return
// 		}

// 		if (exceedsDailyLimit) {
// 			setError(`Exceeds daily transfer limit. Remaining: Rs. ${remainingDaily.toLocaleString()}`)
// 			return
// 		}

// 		setIsLoading(true)

// 		try {
// 			// Replace with your actual API endpoint
// 			const response = await fetch('/api/transfers', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify(transferData),
// 			})

// 			if (response.ok) {
// 				setSuccessMessage(`Transfer successful! Rs. ${transferData.transferAmount.toLocaleString()} transferred to account ${transferData.toAccount}`)
// 				setTimeout(() => {
// 					navigate('/adminDashboard')
// 				}, 2000)
// 			}
// 		} catch (error) {
// 			console.error('Transfer failed:', error)
// 			setError('Transfer transaction failed. Please try again.')
// 		} finally {
// 			setIsLoading(false)
// 		}
// 	}

// 	return (
// 		<div className="min-h-screen bg-linear-to-b from-[#0a1428] to-[#050b18] text-slate-200">
// 			<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
// 				{/* Header */}
// 				<div className="mb-8 flex items-center gap-3">
// 					<button
// 						onClick={() => navigate('/adminDashboard')}
// 						className="rounded-lg bg-slate-800/50 p-2 hover:bg-slate-800 transition"
// 					>
// 						<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// 							<path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
// 						</svg>
// 					</button>
// 					<div>
// 						<h1 className="text-3xl font-bold text-slate-100">Transfer Money</h1>
// 						<p className="text-sm text-slate-400 uppercase tracking-widest">THE VAULTED SANCTUARY</p>
// 					</div>
// 				</div>

// 				{/* Navigation Tabs */}
// 				<div className="mb-8 flex gap-4 border-b border-slate-700/50">
// 					<button className="px-4 py-3 text-sm text-slate-400 hover:text-slate-200">
// 						Overview
// 					</button>
// 					{/* <button className="px-4 py-3 text-sm font-medium text-blue-400 border-b-2 border-blue-500">
// 						Transfers
// 					</button>
// 					<button className="px-4 py-3 text-sm text-slate-400 hover:text-slate-200">
// 						Vaults
// 					</button>
// 					<button className="px-4 py-3 text-sm text-slate-400 hover:text-slate-200">
// 						Security
// 					</button> */}
// 				</div>

// 				{/* Main Content Card */}
// 				<div className="rounded-2xl border border-slate-700/50 bg-linear-to-br from-slate-900/70 to-slate-950/70 p-8 backdrop-blur-sm">
// 					<div className="mb-8">
// 						<h2 className="text-2xl font-bold text-slate-100 mb-6">Transfer Money</h2>
// 					</div>

// 					<form onSubmit={handleSubmit} className="space-y-6">
// 						{/* From Account Section */}
// 						<div>
// 							<label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
// 								FROM ACCOUNT
// 							</label>
// 							<div className="space-y-3">
// 								<div className="flex items-end justify-between">
// 									<div>
// 										<p className="text-2xl font-bold text-slate-100">{transferData.fromAccount}</p>
// 										<div className="flex items-center gap-2 mt-2">
// 											<span className="h-2 w-2 rounded-full bg-emerald-400" />
// 											<span className="text-sm text-slate-400">{transferData.customerName}</span>
// 											<span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded">VERIFIED</span>
// 										</div>
// 									</div>
// 									<div className="text-right">
// 										<p className="text-xs text-slate-400 mb-1">AVAILABLE BALANCE</p>
// 										<p className="text-xl font-semibold text-slate-100">Rs. {transferData.availableBalance.toLocaleString()}</p>
// 									</div>
// 								</div>
// 							</div>
// 						</div>

// 						{/* Transfer Arrow */}
// 						<div className="flex justify-center py-4">
// 							<div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-purple-500/30 to-purple-600/30 border border-purple-500/50">
// 								<ArrowDown className="h-6 w-6 text-purple-300" />
// 							</div>
// 						</div>

// 						{/* To Account Section */}
// 						<div>
// 							<label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
// 								TO ACCOUNT
// 							</label>
// 							<div className="flex gap-2">
// 								<input
// 									type="text"
// 									name="toAccount"
// 									value={transferData.toAccount}
// 									onChange={handleInputChange}
// 									placeholder="Enter receiver account number"
// 									className="flex-1 rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3 text-slate-200 placeholder-slate-600 outline-none focus:border-purple-500/50 focus:bg-slate-800/50 transition"
// 								/>
// 								<button
// 									type="button"
// 									className="rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3 text-slate-300 hover:bg-slate-700/50 transition"
// 								>
// 									<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// 										<path d="M12 5v14m7-7H5" strokeWidth="2" strokeLinecap="round" />
// 									</svg>
// 								</button>
// 							</div>
// 						</div>

// 						{/* Transfer Amount */}
// 						<div>
// 							<label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
// 								AMOUNT (Rs.)
// 							</label>
// 							<div className="flex items-baseline gap-2 rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3">
// 								<input
// 									type="number"
// 									name="transferAmount"
// 									value={transferData.transferAmount}
// 									onChange={handleInputChange}
// 									placeholder="0"
// 									className="flex-1 bg-transparent text-4xl font-bold text-slate-100 placeholder-slate-600 outline-none"
// 									step="0.01"
// 									min="0"
// 								/>
// 								<span className="text-slate-400 text-lg">INR</span>
// 							</div>
// 						</div>

// 						{/* Daily Transfer Limit */}
// 						<div className="rounded-lg border border-slate-600/30 bg-slate-800/20 p-4">
// 							<div className="flex justify-between items-center mb-3">
// 								<p className="text-xs font-semibold uppercase tracking-widest text-slate-400">DAILY TRANSFER LIMIT</p>
// 								<p className="text-xs font-semibold uppercase tracking-widest text-slate-400">REMAINING</p>
// 							</div>
// 							<div className="flex justify-between items-end">
// 								<p className="text-lg font-semibold text-slate-200">Rs. {dailyLimit.toLocaleString()}</p>
// 								<p className="text-lg font-semibold text-slate-200">Rs. {remainingDaily.toLocaleString()}</p>
// 							</div>
// 							<div className="mt-3 flex gap-2">
// 								<div className="flex-1 h-2 bg-purple-500/50 rounded-full" />
// 								<span className="text-xs text-slate-500">{((dailyUsed / dailyLimit) * 100).toFixed(0)}%</span>
// 							</div>
// 						</div>

// 						{/* Error Message */}
// 						{(hasError || exceedsDailyLimit || error) && (
// 							<div className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 flex items-start gap-3">
// 								<svg className="h-5 w-5 text-red-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
// 									<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
// 								</svg>
// 								<div className="flex-1">
// 									<p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-1">
// 										{hasError ? 'INSUFFICIENT BALANCE' : 'LIMIT EXCEEDED'}
// 									</p>
// 									<p className="text-sm text-red-300">
// 										{error}
// 									</p>
// 								</div>
// 							</div>
// 						)}

// 						{/* Transfer Button */}
// 						<button
// 							type="submit"
// 							disabled={isLoading || invalidReceiver || !transferData.transferAmount || hasError || exceedsDailyLimit}
// 							className="w-full rounded-full bg-linear-to-r from-purple-500 to-purple-600 py-3 text-lg font-semibold text-white transition hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// 						>
// 							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
// 								<path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
// 							</svg>
// 							<span>{isLoading ? 'Processing...' : 'Transfer Now'}</span>
// 						</button>

// 						{/* Security Info */}
// 						{/* <p className="text-center text-xs text-slate-500 uppercase tracking-widest">
// 							ENCRYPTION STATUS: AES-256 BIT SECURE CONNECTION ACTIVE
// 						</p> */}

// 						{/* Success Message */}
// 						{successMessage && (
// 							<div className="rounded-lg border border-emerald-400/30 bg-emerald-400/15 px-4 py-3 flex items-start gap-3">
// 								<svg className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
// 									<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
// 								</svg>
// 								<div className="flex-1">
// 									<p className="text-sm font-semibold text-emerald-300 mb-1">Transfer successful!</p>
// 									<p className="text-sm text-emerald-200">{successMessage}</p>
// 								</div>
// 							</div>
// 						)}
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }


import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { transferMoney } from '../../api'
import { ArrowDown } from 'lucide-react'

export default function TransferMoney() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams() // ✅ Search page se pre-fill

	const [senderAccount, setSenderAccount] = useState(searchParams.get('account') || '')
	const [receiverAccount, setReceiverAccount] = useState('')
	const [amount, setAmount] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		setSuccess(null)

		if (!senderAccount) {
			setError('Enter Sender account number')
			return
		}
		if (!receiverAccount) {
			setError('Enter Receiver account number')
			return
		}
		if (senderAccount === receiverAccount) {
			setError('Sender aur receiver cannot be same')
			return
		}
		if (!amount || Number(amount) <= 0) {
			setError('Valid amount daalo')
			return
		}

		setIsLoading(true)
		try {
			const res = await transferMoney({
				sender_account_no:   senderAccount,
				receiver_account_no: receiverAccount,
				amount:              Number(amount),
			})

			if (res.success) {
				setSuccess(res.data)
				setAmount('')
				setReceiverAccount('')
			} else {
				setError(res.message || 'No Transfer')
			}
		} catch {
			setError('Server is not connected')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-linear-to-b from-[#0a1428] to-[#050b18] text-slate-200">
			<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8 flex items-center gap-3">
					<button onClick={() => navigate('/adminDashboard')} className="rounded-lg bg-slate-800/50 p-2 hover:bg-slate-800 transition">
						<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
					<div>
						<h1 className="text-3xl font-bold text-slate-100">Transfer Money</h1>
						<p className="text-sm text-slate-400 uppercase tracking-widest">THE VAULTED SANCTUARY</p>
					</div>
				</div>

				{/* Main Card */}
				<div className="rounded-2xl border border-slate-700/50 bg-linear-to-br from-slate-900/70 to-slate-950/70 p-8 backdrop-blur-sm">
					<h2 className="text-2xl font-bold text-slate-100 mb-6">Transfer Money</h2>

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Sender Account */}
						<div>
							<label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
								FROM ACCOUNT
							</label>
							<input
								type="text"
								value={senderAccount}
								onChange={(e) => setSenderAccount(e.target.value)}
								placeholder="Sender account number"
								className="w-full rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3 text-slate-200 placeholder-slate-600 outline-none focus:border-purple-500/50"
							/>
						</div>

						{/* Arrow */}
						<div className="flex justify-center py-2">
							<div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 border border-purple-500/40">
								<ArrowDown className="h-6 w-6 text-purple-300" />
							</div>
						</div>

						{/* Receiver Account */}
						<div>
							<label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
								TO ACCOUNT
							</label>
							<input
								type="text"
								value={receiverAccount}
								onChange={(e) => setReceiverAccount(e.target.value)}
								placeholder="Receiver account number"
								className="w-full rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3 text-slate-200 placeholder-slate-600 outline-none focus:border-purple-500/50"
							/>
						</div>

						{/* Amount */}
						<div>
							<label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
								AMOUNT (Rs.)
							</label>
							<div className="flex items-baseline gap-2 rounded-lg border border-slate-600/50 bg-slate-800/30 px-4 py-3">
								<input
									type="number"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									placeholder="0"
									className="flex-1 bg-transparent text-4xl font-bold text-slate-100 placeholder-slate-600 outline-none"
									min="1"
								/>
								<span className="text-slate-400 text-lg">INR</span>
							</div>
						</div>

						{/* Daily Limit Info */}
						<div className="rounded-lg border border-slate-600/30 bg-slate-800/20 p-4">
							<p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">DAILY TRANSFER LIMIT</p>
							<p className="text-sm text-slate-200">Max Rs. 50,000 per day</p>
						</div>

						{/* Error */}
						{error && (
							<div className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
								{error}
							</div>
						)}

						{/* Success */}
						{success && (
							<div className="rounded-lg border border-emerald-400/30 bg-emerald-400/15 px-4 py-3 text-sm text-emerald-200 space-y-1">
								<p className="font-semibold">✅ Transfer successful!</p>
								<p>Sender: {success.sender.full_name} → New Balance: Rs. {success.sender.new_balance}</p>
								<p>Receiver: {success.receiver.full_name}</p>
								<p>Amount: Rs. {success.transferred_amount || amount}</p>
							</div>
						)}

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading || !senderAccount || !receiverAccount || !amount}
							className="w-full rounded-full bg-linear-to-r from-purple-500 to-purple-600 py-3 text-lg font-semibold text-white transition hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? 'Processing...' : 'Transfer Now'}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

