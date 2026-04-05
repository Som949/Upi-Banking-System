// import { useEffect, useMemo, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { searchProfile, deleteAccount } from '../../api'

// const DEFAULT_CUSTOMER = {
// 	accountNumber: '5753246179',
// 	fullName: 'Rahul Sharma',
// 	userId: 'USR790837',
// 	dateOfBirth: '12/05/1995',
// 	phone: '+91 9876543210',
// 	email: 'rahul@gmail.com',
// 	balance: 24500,
// 	initials: 'RS',
// 	status: 'Active',
// 	verification: 'KYC Verified',
// 	lastActivity: '2 Hours ago',
// 	securityStatus: '2FA Enabled',
// 	securityUpdated: 'Last updated 15 days ago',
// 	riskProfile: 'Low Risk',
// 	riskHint: 'Merchant consistency high',
// 	linkedEntities: '2 Joint Accounts',
// 	linkedHint: 'Family household linked',
// }

// const FALLBACK_CUSTOMERS = [DEFAULT_CUSTOMER]

// const formatCurrency = (amount) =>
// 	new Intl.NumberFormat('en-IN', {
// 		minimumFractionDigits: 2,
// 		maximumFractionDigits: 2,
// 	}).format(amount)

// function SearchCustomer({ dataSource, initialCustomers = FALLBACK_CUSTOMERS }) {
// 	const [customers, setCustomers] = useState(initialCustomers)
// 	const [query, setQuery] = useState(() => initialCustomers[0]?.accountNumber ?? '')
// 	const [selectedCustomer, setSelectedCustomer] = useState(initialCustomers[0] ?? null)
// 	const [isSearching, setIsSearching] = useState(false)

// 	useEffect(() => {
// 		let disposed = false

// 		const loadInitialCustomers = async () => {
// 			if (!dataSource?.fetchInitialCustomers) {
// 				return
// 			}

// 			try {
// 				const payload = await dataSource.fetchInitialCustomers()
// 				if (!disposed && Array.isArray(payload) && payload.length > 0) {
// 					setCustomers(payload)
// 					setSelectedCustomer(payload[0])
// 					setQuery(payload[0].accountNumber)
// 				}
// 			} catch (error) {
// 				console.error('Failed to load initial customer data:', error)
// 			}
// 		}

// 		loadInitialCustomers()

// 		const unsubscribe = dataSource?.subscribeCustomerUpdates?.((updatedCustomer) => {
// 			if (!updatedCustomer?.accountNumber) {
// 				return
// 			}

// 			setCustomers((prev) => {
// 				const hasExisting = prev.some((item) => item.accountNumber === updatedCustomer.accountNumber)
// 				if (!hasExisting) {
// 					return [...prev, updatedCustomer]
// 				}

// 				return prev.map((item) =>
// 					item.accountNumber === updatedCustomer.accountNumber ? { ...item, ...updatedCustomer } : item,
// 				)
// 			})

// 			setSelectedCustomer((prev) => {
// 				if (prev?.accountNumber !== updatedCustomer.accountNumber) {
// 					return prev
// 				}
// 				return { ...prev, ...updatedCustomer }
// 			})
// 		})

// 		return () => {
// 			disposed = true
// 			if (typeof unsubscribe === 'function') {
// 				unsubscribe()
// 			}
// 		}
// 	}, [dataSource])

// 	const topTabs = useMemo(
// 		() => [
// 			{ id: 'dashboard', label: 'Dashboard', route: '/adminDashboard' },
// 			{ id: 'accounts', label: 'Accounts', route: '/customers/search' },
// 			{ id: 'security', label: 'Security', route: '/security' },
// 			{ id: 'reports', label: 'Reports', route: '/reports' },
// 		],
// 		[],
// 	)

// 	// const handleSearch = async () => {
// 	// 	const normalized = query.trim()
// 	// 	if (!normalized) {
// 	// 		return
// 	// 	}

// 	// 	setIsSearching(true)
// 	// 	try {
// 	// 		if (dataSource?.searchCustomerByAccount) {
// 	// 			const customer = await dataSource.searchCustomerByAccount(normalized)
// 	// 			if (customer) {
// 	// 				setSelectedCustomer(customer)
// 	// 				setCustomers((prev) => {
// 	// 					const exists = prev.some((item) => item.accountNumber === customer.accountNumber)
// 	// 					return exists ? prev : [...prev, customer]
// 	// 				})
// 	// 				return
// 	// 			}
// 	// 		}

// 	// 		const matched = customers.find((item) => item.accountNumber.includes(normalized))
// 	// 		setSelectedCustomer(matched ?? null)
// 	// 	} catch (error) {
// 	// 		console.error('Search request failed:', error)
// 	// 		const matched = customers.find((item) => item.accountNumber.includes(normalized))
// 	// 		setSelectedCustomer(matched ?? null)
// 	// 	} finally {
// 	// 		setIsSearching(false)
// 	// 	}
// 	// }
// 	// ✅ UPDATED: Real API se connected
// const handleSearch = async () => {
//     const normalized = query.trim()
//     if (!normalized) return

//     setIsSearching(true)
//     setSelectedCustomer(null)
//     setSearchError('')

//     try {
//         const res = await searchProfile(normalized)
//         if (res.success) {
//             const d = res.data
//             setSelectedCustomer({
//                 accountNumber:  d.account_number,
//                 fullName:       d.full_name,
//                 userId:         d.user_id,
//                 dateOfBirth:    new Date(d.dob).toLocaleDateString('en-IN'),
//                 phone:          d.phone_number,
//                 email:          d.email,
//                 balance:        d.balance,
//                 initials:       d.full_name.split(' ').map((n) => n[0]).join('').toUpperCase(),
//                 status:         d.is_active ? 'Active' : 'Inactive',
//                 verification:   'KYC Verified',
//                 lastActivity:   new Date(d.member_since).toLocaleDateString('en-IN'),
//                 securityStatus: '2FA Enabled',
//                 securityUpdated:'Last updated recently',
//                 riskProfile:    'Low Risk',
//                 riskHint:       'Normal transaction pattern',
//                 linkedEntities: 'Standard Account',
//                 linkedHint:     'No linked accounts',
//             })
//         } else {
//             setSearchError(res.message || 'Customer nahi mila')
//         }
//     } catch {
//         setSearchError('Server se connect nahi ho pa raha')
//     } finally {
//         setIsSearching(false)
//     }
// } 

// // ✅ ADDED: Delete account handler
// const handleDelete = async () => {
//     if (!selectedCustomer) return
//     const confirm = window.confirm(
//         `Kya aap sach mein ${selectedCustomer.fullName} (${selectedCustomer.accountNumber}) ka account delete karna chahte hain?`
//     )
//     if (!confirm) return

//     try {
//         const res = await deleteAccount(selectedCustomer.accountNumber)
//         if (res.success) {
//             setSelectedCustomer(null)
//             setQuery('')
//             alert('Account successfully delete ho gaya!')
//         } else {
//             alert(res.message || 'Delete nahi hua')
//         }
//     } catch {
//         alert('Server error')
//     }
// }

// 	return (
// 		<div className="min-h-screen bg-[#020a18] text-slate-100">
// 			<div className="mx-auto flex min-h-screen max-w-7xl border-x border-slate-900/60">
// 				<aside className="hidden w-52 flex-col border-r border-slate-800 bg-[linear-gradient(180deg,#050d1f_0%,#040a17_100%)] p-5 lg:flex">
// 					<h1 className="text-xl font-semibold tracking-[0.14em] text-slate-200">VAULT ADMIN</h1>

// 					<nav className="mt-8 space-y-2">
// 						<Link to="/adminDashboard" className="flex items-center rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800/30 hover:text-slate-200">Overview</Link>
// 						<Link to="/customers/search" className="flex items-center rounded-lg bg-blue-500/20 px-3 py-2 text-sm font-medium text-blue-200">Customer Search</Link>
// 						<Link to="/transactions/history" className="flex items-center rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800/30 hover:text-slate-200">Transaction Logs</Link>
// 						<Link to="/fraud-alerts" className="flex items-center rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800/30 hover:text-slate-200">Fraud Alerts</Link>
// 						<Link to="/audit-log" className="flex items-center rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800/30 hover:text-slate-200">Audit Trail</Link>
// 					</nav>

// 					<div className="mt-auto rounded-xl border border-slate-700/70 bg-slate-900/40 p-3">
// 						<p className="text-sm font-semibold text-slate-200">System Admin</p>
// 						<p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">Level 4 Access</p>
// 						<button type="button" className="mt-3 w-full rounded-lg bg-slate-800 py-2 text-xs text-blue-200 hover:bg-slate-700">Secure Logout</button>
// 					</div>
// 				</aside>

// 				<div className="flex flex-1 flex-col bg-[radial-gradient(circle_at_20%_30%,rgba(43,85,169,0.2),transparent_45%),#020a18]">
// 					<header className="border-b border-slate-800 bg-[#060f21]/90 px-5 py-4">
// 						<div className="flex items-center justify-between">
// 							<div className="flex items-center gap-3">
// 								<Link to="/adminDashboard" className="text-xl text-slate-300 hover:text-blue-200">&larr;</Link>
// 								<h2 className="text-2xl font-semibold text-slate-100">Search Customer</h2>
// 							</div>

// 							<nav className="hidden items-center gap-4 md:flex">
// 								{topTabs.map((tab) => (
// 									<Link
// 										key={tab.id}
// 										to={tab.route}
// 										className={[
// 											'text-sm transition',
// 											tab.id === 'accounts' ? 'text-blue-300' : 'text-slate-400 hover:text-slate-200',
// 										].join(' ')}
// 									>
// 										{tab.label}
// 									</Link>
// 								))}
// 							</nav>
// 						</div>
// 					</header>

// 					<main className="p-5 sm:p-7">
// 						<section className="rounded-xl border border-slate-800 bg-[#0b162b]/85 p-3">
// 							<div className="flex flex-col gap-3 sm:flex-row">
// 								<input
// 									value={query}
// 									onChange={(event) => setQuery(event.target.value)}
// 									placeholder="Enter account number"
// 									className="h-12 flex-1 rounded-lg border border-slate-700 bg-slate-900/60 px-4 text-sm text-slate-100 outline-none focus:border-blue-400"
// 								/>
// 								<button
// 									type="button"
// 									onClick={handleSearch}
// 									disabled={isSearching}
// 									className="h-12 rounded-lg bg-linear-to-r from-[#7298ff] to-[#4f7fff] px-6 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:opacity-60"
// 								>
// 									{isSearching ? 'Searching...' : 'Search'} 
// 									const [searchError, setSearchError] = useState('')
// 								</button>
// 							</div>
// 						</section>

// 						{selectedCustomer ? (
// 							<section className="mt-6 rounded-3xl border border-slate-800 bg-[linear-gradient(145deg,rgba(20,32,53,0.96),rgba(13,23,40,0.9))] p-5 shadow-[0_30px_60px_-36px_rgba(66,126,255,0.6)] sm:p-7">
// 								<div className="grid gap-6 xl:grid-cols-[190px_1fr_250px]">
// 									<div>
// 										<div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 text-5xl font-bold text-blue-200">
// 											{selectedCustomer.initials}
// 										</div>
// 										<span className="mx-auto mt-3 inline-flex w-fit rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-200">
// 											{selectedCustomer.status}
// 										</span>
// 										<p className="mt-5 text-xs uppercase tracking-[0.18em] text-slate-500">Verification</p>
// 										<p className="mt-1 text-sm font-medium text-emerald-300">{selectedCustomer.verification}</p>
// 									</div>

// 									<div>
// 										<p className="text-xs uppercase tracking-[0.16em] text-slate-500">Full Name</p>
// 										<h3 className="mt-1 text-4xl font-semibold text-slate-100">{selectedCustomer.fullName}</h3>

// 										<div className="mt-6 grid gap-5 sm:grid-cols-2">
// 											<div>
// 												<p className="text-xs uppercase tracking-[0.16em] text-slate-500">User ID</p>
// 												<p className="mt-1 text-xl text-slate-100">{selectedCustomer.userId}</p>
// 											</div>
// 											<div>
// 												<p className="text-xs uppercase tracking-[0.16em] text-slate-500">Date of Birth</p>
// 												<p className="mt-1 text-xl text-slate-100">{selectedCustomer.dateOfBirth}</p>
// 											</div>
// 										</div>

// 										<div className="mt-6">
// 											<p className="text-xs uppercase tracking-[0.16em] text-slate-500">Contact Information</p>
// 											<p className="mt-2 text-sm text-slate-300">{selectedCustomer.phone}</p>
// 											<p className="mt-1 text-sm text-slate-300">{selectedCustomer.email}</p>
// 										</div>
// 									</div>

// 									<div>
// 										<p className="text-xs uppercase tracking-[0.16em] text-slate-500">Account Number</p>
// 										<p className="mt-1 text-3xl text-blue-300">{selectedCustomer.accountNumber}</p>

// 										<p className="mt-6 text-xs uppercase tracking-[0.16em] text-slate-500">Current Balance</p>
// 										<p className="mt-1 text-6xl font-semibold text-emerald-300">Rs. {formatCurrency(selectedCustomer.balance)}</p>

// 										<div className="mt-6 rounded-lg border border-slate-700 bg-slate-900/35 p-3">
// 											<p className="text-xs uppercase tracking-[0.14em] text-slate-500">Last Activity</p>
// 											<p className="mt-1 text-sm text-slate-200">{selectedCustomer.lastActivity}</p>
// 										</div>
// 									</div>
// 								</div>

// 								<div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
// 									<Link to="/transactions/deposit" className="rounded-xl border border-blue-500/35 bg-blue-500/10 px-4 py-3 text-center text-sm font-semibold text-blue-200">Deposit</Link>
// 									<Link to="/transactions/withdraw" className="rounded-xl border border-blue-500/35 bg-blue-500/10 px-4 py-3 text-center text-sm font-semibold text-blue-200">Withdraw</Link>
// 									<Link to="/transactions/transfer" className="rounded-xl border border-blue-500/35 bg-blue-500/10 px-4 py-3 text-center text-sm font-semibold text-blue-200">Transfer</Link>
// 									<Link to="/transactions/history" className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-center text-sm font-semibold text-emerald-200">Transactions</Link>
// 									<button type="button" className="rounded-xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-300">Delete Account</button>
// 								</div>
// 							</section>
// 						) : (
// 							<section className="mt-6 rounded-2xl border border-slate-800 bg-[#0b162b]/70 p-10 text-center">
// 								<h3 className="text-2xl font-semibold text-slate-100">No customer found</h3>
// 								<p className="mt-2 text-sm text-slate-400">Try another account number or wait for backend results.</p>
// 							</section>
// 						)}

// 						{selectedCustomer ? (
// 							<section className="mt-6 grid gap-3 md:grid-cols-3">
// 								<article className="rounded-2xl border border-slate-800 bg-[#0d172b]/80 p-5">
// 									<p className="text-xs uppercase tracking-[0.16em] text-slate-500">Security Status</p>
// 									<p className="mt-2 text-2xl font-semibold text-slate-100">{selectedCustomer.securityStatus}</p>
// 									<p className="mt-1 text-sm text-slate-400">{selectedCustomer.securityUpdated}</p>
// 								</article>
// 								<article className="rounded-2xl border border-slate-800 bg-[#0d172b]/80 p-5">
// 									<p className="text-xs uppercase tracking-[0.16em] text-slate-500">Risk Profile</p>
// 									<p className="mt-2 text-2xl font-semibold text-slate-100">{selectedCustomer.riskProfile}</p>
// 									<p className="mt-1 text-sm text-slate-400">{selectedCustomer.riskHint}</p>
// 								</article>
// 								<article className="rounded-2xl border border-slate-800 bg-[#0d172b]/80 p-5">
// 									<p className="text-xs uppercase tracking-[0.16em] text-slate-500">Linked Entities</p>
// 									<p className="mt-2 text-2xl font-semibold text-slate-100">{selectedCustomer.linkedEntities}</p>
// 									<p className="mt-1 text-sm text-slate-400">{selectedCustomer.linkedHint}</p>
// 								</article>
// 							</section>
// 						) : null}
// 					</main>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default SearchCustomer


import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchProfile, deleteAccount } from '../../api'

const formatCurrency = (amount) =>
	new Intl.NumberFormat('en-IN', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount)

function SearchCustomer() {
	const [query, setQuery] = useState('')
	const [selectedCustomer, setSelectedCustomer] = useState(null)
	const [isSearching, setIsSearching] = useState(false)
	const [searchError, setSearchError] = useState('') // ✅ ADDED

	const topTabs = useMemo(
		() => [
			{ id: 'dashboard', label: 'Dashboard', route: '/adminDashboard' },
			{ id: 'accounts', label: 'Accounts', route: '/customers/search' },
			{ id: 'security', label: 'Security', route: '/security' },
			// { id: 'reports', label: 'Reports', route: '/reports' },
		],
		[],
	)

	// ✅ UPDATED: Real API se connected
	const handleSearch = async () => {
		const normalized = query.trim()
		if (!normalized) return

		setIsSearching(true)
		setSelectedCustomer(null)
		setSearchError('')

		try {
			const res = await searchProfile(normalized)
			if (res.success) {
				const d = res.data
				setSelectedCustomer({
					accountNumber:   d.account_number,
					fullName:        d.full_name,
					userId:          d.user_id,
					dateOfBirth:     new Date(d.dob).toLocaleDateString('en-IN'),
					phone:           d.phone_number,
					email:           d.email,
					balance:         d.balance,
					initials:        d.full_name.split(' ').map((n) => n[0]).join('').toUpperCase(),
					status:          d.is_active ? 'Active' : 'Inactive',
					verification:    'KYC Verified',
					lastActivity:    new Date(d.member_since).toLocaleDateString('en-IN'),
					securityStatus:  '2FA Enabled',
					securityUpdated: 'Last updated recently',
					riskProfile:     'Low Risk',
					riskHint:        'Normal transaction pattern',
					linkedEntities:  'Standard Account',
					linkedHint:      'No linked accounts',
				})
			} else {
				setSearchError(res.message || 'Customer is not found')
			}
		} catch {
			setSearchError('Server is not Connected')
		} finally {
			setIsSearching(false)
		}
	}

	// ✅ ADDED: Delete handler
	const handleDelete = async () => {
		if (!selectedCustomer) return
		const confirmed = window.confirm(
			`Kya aap sach mein ${selectedCustomer.fullName} (${selectedCustomer.accountNumber}) ka account delete karna chahte hain?`
		)
		if (!confirmed) return

		try {
			const res = await deleteAccount(selectedCustomer.accountNumber)
			if (res.success) {
				setSelectedCustomer(null)
				setQuery('')
				alert('Account Deleted successfully!')
			} else {
				alert(res.message || 'Account not Deleted')
			}
		} catch {
			alert('Server error')
		}
	}

	// ✅ ADDED: Enter key se search
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') handleSearch()
	}

	return (
		<div className="min-h-screen bg-[#020a18] text-slate-100">
			<div className="mx-auto flex min-h-screen max-w-7xl border-x border-slate-900/60">
				<aside className="hidden w-52 flex-col border-r border-slate-800 bg-[linear-gradient(180deg,#050d1f_0%,#040a17_100%)] p-5 lg:flex">
					<h1 className="text-xl font-semibold tracking-[0.14em] text-slate-200">VAULT ADMIN</h1>
					<nav className="mt-8 space-y-2">
						<Link to="/adminDashboard" className="flex items-center rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800/30 hover:text-slate-200">Overview</Link>
						<Link to="/customers/search" className="flex items-center rounded-lg bg-blue-500/20 px-3 py-2 text-sm font-medium text-blue-200">Customer Search</Link>
						<Link to="/transactions/history" className="flex items-center rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800/30 hover:text-slate-200">Transaction Logs</Link>
						{/* <Link to="/fraud-alerts" className="flex items-center rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800/30 hover:text-slate-200">Fraud Alerts</Link>
						<Link to="/audit-log" className="flex items-center rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800/30 hover:text-slate-200">Audit Trail</Link> */}
					</nav>
					<div className="mt-auto rounded-xl border border-slate-700/70 bg-slate-900/40 p-3">
						<p className="text-sm font-semibold text-slate-200">System Admin</p>
						<p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">Level 4 Access</p>
						<button type="button" className="mt-3 w-full rounded-lg bg-slate-800 py-2 text-xs text-blue-200 hover:bg-slate-700">Secure Logout</button>
					</div>
				</aside>

				<div className="flex flex-1 flex-col bg-[radial-gradient(circle_at_20%_30%,rgba(43,85,169,0.2),transparent_45%),#020a18]">
					<header className="border-b border-slate-800 bg-[#060f21]/90 px-5 py-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Link to="/adminDashboard" className="text-xl text-slate-300 hover:text-blue-200">&larr;</Link>
								<h2 className="text-2xl font-semibold text-slate-100">Search Customer</h2>
							</div>
							<nav className="hidden items-center gap-4 md:flex">
								{topTabs.map((tab) => (
									<Link
										key={tab.id}
										to={tab.route}
										className={['text-sm transition', tab.id === 'accounts' ? 'text-blue-300' : 'text-slate-400 hover:text-slate-200'].join(' ')}
									>
										{tab.label}
									</Link>
								))}
							</nav>
						</div>
					</header>

					<main className="p-5 sm:p-7">
						{/* Search Bar */}
						<section className="rounded-xl border border-slate-800 bg-[#0b162b]/85 p-3">
							<div className="flex flex-col gap-3 sm:flex-row">
								<input
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									onKeyDown={handleKeyDown}
									placeholder="Enter account number"
									className="h-12 flex-1 rounded-lg border border-slate-700 bg-slate-900/60 px-4 text-sm text-slate-100 outline-none focus:border-blue-400"
								/>
								<button
									type="button"
									onClick={handleSearch}
									disabled={isSearching || !query.trim()}
									className="h-12 rounded-lg bg-linear-to-r from-[#7298ff] to-[#4f7fff] px-6 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:opacity-60"
								>
									{isSearching ? 'Searching...' : 'Search'}
								</button>
							</div>

							{/* ✅ ADDED: Error message */}
							{searchError && (
								<p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
									{searchError}
								</p>
							)}
						</section>

						{/* Customer Profile */}
						{selectedCustomer ? (
							<section className="mt-6 rounded-3xl border border-slate-800 bg-[linear-gradient(145deg,rgba(20,32,53,0.96),rgba(13,23,40,0.9))] p-5 shadow-[0_30px_60px_-36px_rgba(66,126,255,0.6)] sm:p-7">
								<div className="grid gap-6 xl:grid-cols-[190px_1fr_250px]">
									<div>
										<div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 text-5xl font-bold text-blue-200">
											{selectedCustomer.initials}
										</div>
										<span className="mx-auto mt-3 inline-flex w-fit rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-200">
											{selectedCustomer.status}
										</span>
										<p className="mt-5 text-xs uppercase tracking-[0.18em] text-slate-500">Verification</p>
										<p className="mt-1 text-sm font-medium text-emerald-300">{selectedCustomer.verification}</p>
									</div>

									<div>
										<p className="text-xs uppercase tracking-[0.16em] text-slate-500">Full Name</p>
										<h3 className="mt-1 text-4xl font-semibold text-slate-100">{selectedCustomer.fullName}</h3>
										<div className="mt-6 grid gap-5 sm:grid-cols-2">
											<div>
												<p className="text-xs uppercase tracking-[0.16em] text-slate-500">User ID</p>
												<p className="mt-1 text-xl text-slate-100">{selectedCustomer.userId}</p>
											</div>
											<div>
												<p className="text-xs uppercase tracking-[0.16em] text-slate-500">Date of Birth</p>
												<p className="mt-1 text-xl text-slate-100">{selectedCustomer.dateOfBirth}</p>
											</div>
										</div>
										<div className="mt-6">
											<p className="text-xs uppercase tracking-[0.16em] text-slate-500">Contact Information</p>
											<p className="mt-2 text-sm text-slate-300">{selectedCustomer.phone}</p>
											<p className="mt-1 text-sm text-slate-300">{selectedCustomer.email}</p>
										</div>
									</div>

									<div>
										<p className="text-xs uppercase tracking-[0.16em] text-slate-500">Account Number</p>
										<p className="mt-1 text-3xl text-blue-300">{selectedCustomer.accountNumber}</p>
										<p className="mt-6 text-xs uppercase tracking-[0.16em] text-slate-500">Current Balance</p>
										<p className="mt-1 text-2xl font-semibold text-emerald-300">Rs. {formatCurrency(selectedCustomer.balance)}</p>
										<div className="mt-6 rounded-lg border border-slate-700 bg-slate-900/35 p-3">
											<p className="text-xs uppercase tracking-[0.14em] text-slate-500">Last Activity</p>
											<p className="mt-1 text-sm text-slate-200">{selectedCustomer.lastActivity}</p>
										</div>
									</div>
								</div>

								{/* ✅ UPDATED: Links with account pre-fill + handleDelete */}
								<div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
									<Link to={`/transactions/deposit?account=${selectedCustomer.accountNumber}`} className="rounded-xl border border-blue-500/35 bg-blue-500/10 px-4 py-3 text-center text-sm font-semibold text-blue-200">Deposit</Link>
									<Link to={`/transactions/withdraw?account=${selectedCustomer.accountNumber}`} className="rounded-xl border border-blue-500/35 bg-blue-500/10 px-4 py-3 text-center text-sm font-semibold text-blue-200">Withdraw</Link>
									<Link to={`/transactions/transfer?account=${selectedCustomer.accountNumber}`} className="rounded-xl border border-blue-500/35 bg-blue-500/10 px-4 py-3 text-center text-sm font-semibold text-blue-200">Transfer</Link>
									<Link to={`/transactions/history?account=${selectedCustomer.accountNumber}`} className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-center text-sm font-semibold text-emerald-200">Transactions</Link>
									<button type="button" onClick={handleDelete} className="rounded-xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-300">Delete Account</button>
								</div>
							</section>
						) : (
							!isSearching && !searchError && (
								<section className="mt-6 rounded-2xl border border-slate-800 bg-[#0b162b]/70 p-10 text-center">
									<h3 className="text-2xl font-semibold text-slate-100">Search</h3>
									<p className="mt-2 text-sm text-slate-400">Enter Account number to search</p>
								</section>
							)
						)}

						{selectedCustomer && (
							<section className="mt-6 grid gap-3 md:grid-cols-3">
								<article className="rounded-2xl border border-slate-800 bg-[#0d172b]/80 p-5">
									<p className="text-xs uppercase tracking-[0.16em] text-slate-500">Security Status</p>
									<p className="mt-2 text-2xl font-semibold text-slate-100">{selectedCustomer.securityStatus}</p>
									<p className="mt-1 text-sm text-slate-400">{selectedCustomer.securityUpdated}</p>
								</article>
								<article className="rounded-2xl border border-slate-800 bg-[#0d172b]/80 p-5">
									<p className="text-xs uppercase tracking-[0.16em] text-slate-500">Risk Profile</p>
									<p className="mt-2 text-2xl font-semibold text-slate-100">{selectedCustomer.riskProfile}</p>
									<p className="mt-1 text-sm text-slate-400">{selectedCustomer.riskHint}</p>
								</article>
								<article className="rounded-2xl border border-slate-800 bg-[#0d172b]/80 p-5">
									<p className="text-xs uppercase tracking-[0.16em] text-slate-500">Linked Entities</p>
									<p className="mt-2 text-2xl font-semibold text-slate-100">{selectedCustomer.linkedEntities}</p>
									<p className="mt-1 text-sm text-slate-400">{selectedCustomer.linkedHint}</p>
								</article>
							</section>
						)}
					</main>
				</div>
			</div>
		</div>
	)
}

export default SearchCustomer
