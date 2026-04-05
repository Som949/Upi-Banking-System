import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const iconStyles = 'h-5 w-5'

const Icons = {
	dashboard: ({ className = iconStyles }) => (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<path d="M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7v-9h-7v9Zm0-16v5h7V4h-7Z" fill="currentColor" />
		</svg>
	),
	// users: ({ className = iconStyles }) => (
	// 	<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
	// 		<path d="M16 11c1.66 0 2.99-1.57 2.99-3.5S17.66 4 16 4s-3 1.57-3 3.5 1.34 3.5 3 3.5Zm-8 0c1.66 0 2.99-1.57 2.99-3.5S9.66 4 8 4 5 5.57 5 7.5 6.34 11 8 11Zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.95 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5Z" fill="currentColor" />
	// 	</svg>
	// ),
	search: ({ className = iconStyles }) => (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<path d="m21 21-4.3-4.3m1.8-4.95a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	),
	deposit: ({ className = iconStyles }) => (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
			<circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
			<path d="M7 10h.01M17 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
		</svg>
	),
	withdraw: ({ className = iconStyles }) => (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<path d="M6 12h12m0 0-3.5-3.5M18 12l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
			<rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
		</svg>
	),
	transfer: ({ className = iconStyles }) => (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<path d="M7 7h11m0 0-3-3m3 3-3 3M17 17H6m0 0 3-3m-3 3 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	history: ({ className = iconStyles }) => (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.8" />
			<path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	),
	settings: ({ className = iconStyles }) => (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.5-3.5-.94-1.68.17-1.9-1.85-.71-.95-1.63-1.87.45-1.57-.92-1.56.92-1.88-.45-.95 1.63-1.85.7.17 1.91L4.5 12l.94 1.68-.17 1.9 1.85.71.95 1.63 1.88-.45 1.56.92 1.57-.92 1.87.45.95-1.63 1.85-.7-.17-1.91.93-1.68Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
		</svg>
	),
	support: ({ className = iconStyles }) => (
		<svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
			<path d="M9 9h6M9 13h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			<path d="M5 4h14v16l-3-2-3 2-3-2-3 2V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
		</svg>
	),
}

const DEFAULT_DASHBOARD_CONFIG = {
	brand: {
		title: 'SBI Bank',
		subtitle: 'Secure Terminal',
		homeRoute: '/adminDashboard',
	},
	topNav: [
		{ id: 'dashboard', label: 'Dashboard', route: '/adminDashboard' },
		{ id: 'reports', label: 'Reports', route: '/reports' },
		{ id: 'audit', label: 'Audit Log', route: '/audit-log' },
	],
	sidebar: [
		{ id: 'dashboard', label: 'Dashboard', icon: 'dashboard', route: '/adminDashboard' },
		// { id: 'accounts', label: 'Accounts', icon: 'users', route: '/accounts' },
		{ id: 'search', label: 'Search', icon: 'search', route: '/customers/search' },
		{ id: 'deposit', label: 'Deposit', icon: 'deposit', route: '/transactions/deposit' },
		{ id: 'withdraw', label: 'Withdraw', icon: 'withdraw', route: '/transactions/withdraw' },
		{ id: 'transfer', label: 'Transfer', icon: 'transfer', route: '/transactions/transfer' },
		{ id: 'history', label: 'History', icon: 'history', route: '/transactions/history' },
	],
	quickActions: [
		{
			id: 'create-account',
			title: 'Create Account',
			description: 'Open new savings or current accounts for customers',
			icon: 'users',
			route: '/accounts/create',
		},
		{
			id: 'search-customer',
			title: 'Search Customer',
			description: 'Look up existing customer profiles and accounts',
			icon: 'search',
			route: '/customers/search',
		},
		{
			id: 'deposit-money',
			title: 'Deposit Money',
			description: 'Process cash or check deposits into customer accounts',
			icon: 'deposit',
			route: '/transactions/deposit',
		},
		{
			id: 'withdraw-money',
			title: 'Withdraw Money',
			description: 'Authorize and process customer cash withdrawals',
			icon: 'withdraw',
			route: '/transactions/withdraw',
		},
		{
			id: 'transfer-funds',
			title: 'Transfer Funds',
			description: 'Move money between accounts or to external banks',
			icon: 'transfer',
			route: '/transactions/transfer',
		},
		{
			id: 'transaction-history',
			title: 'Transaction History',
			description: 'Review detailed logs of all system transactions',
			icon: 'history',
			route: '/transactions/history',
		},
	],
	health: {
		label: 'Encrypted Node',
		statusText: 'Last health check: 2 mins ago',
	},
	liquidity: {
		title: 'Total Managed Liquidity',
		value: '₹482.9M',
		trend: '+12.4% from last quarter',
	},
	links: {
		settings: '/settings',
		support: '/support',
		changePassword: '/changepassword',
	},
}

const mergeDashboardData = (base, incoming) => {
	if (!incoming) {
		return base
	}

	return {
		...base,
		...incoming,
		brand: { ...base.brand, ...incoming.brand },
		health: { ...base.health, ...incoming.health },
		liquidity: { ...base.liquidity, ...incoming.liquidity },
		links: { ...base.links, ...incoming.links },
		topNav: incoming.topNav ?? base.topNav,
		sidebar: incoming.sidebar ?? base.sidebar,
		quickActions: incoming.quickActions ?? base.quickActions,
	}
}

const formatToday = (date = new Date()) =>
	new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	}).format(date)

function AdminHomePage({
	dataSource,
	initialData,
	// currentUser = { initials: 'AD', name: 'Admin' },
	// ✅ UPDATED: currentUser localStorage se lo
	currentUser = {
		initials: 'AD',
		name: localStorage.getItem('admin_name') || 'Admin',
	},
	onLogout,
}) {
	const navigate = useNavigate() // ✅ ADDED
	// ✅ ADDED: auth check — token nahi hai toh login pe bhejo
	useEffect(() => {
		const token = localStorage.getItem('bank_token')
		if (!token) {
			navigate('/login')
		}
	}, [navigate])

	// ✅ ADDED: logout handler
	const handleLogout = () => {
		localStorage.removeItem('bank_token')
		localStorage.removeItem('is_default_password')
		navigate('/login')
	}

	const [dashboardData, setDashboardData] = useState(() =>
		mergeDashboardData(DEFAULT_DASHBOARD_CONFIG, initialData),
	)

	useEffect(() => {
		let disposed = false

		const loadDashboard = async () => {
			if (!dataSource?.fetchDashboardData) {
				return
			}

			try {
				const response = await dataSource.fetchDashboardData()
				if (!disposed) {
					setDashboardData((prev) => mergeDashboardData(prev, response))
				}
			} catch (error) {
				console.error('Failed to load dashboard data:', error)
			}
		}

		loadDashboard()

		const unsubscribe = dataSource?.subscribeDashboard?.((update) => {
			setDashboardData((prev) => mergeDashboardData(prev, update))
		})

		return () => {
			disposed = true
			if (typeof unsubscribe === 'function') {
				unsubscribe()
			}
		}
	}, [dataSource])

	const pageDate = useMemo(() => formatToday(), [])

	const renderIcon = (iconName, className) => {
		const Icon = Icons[iconName] ?? Icons.dashboard
		return <Icon className={className} />
	}

	return (
		<div className="min-h-screen bg-[#060d1e] text-slate-200">
			<div className="mx-auto flex min-h-screen w-full max-w-360 bg-[radial-gradient(circle_at_25%_20%,rgba(52,82,155,0.16),transparent_42%),linear-gradient(180deg,#08142c_0%,#050b18_100%)]">
				<aside className="hidden w-64 flex-col border-r border-slate-800/70 bg-[linear-gradient(180deg,#091224_0%,#0a1324_54%,#101a2c_100%)] px-4 py-5 lg:flex">
					<Link
						to={dashboardData.brand.homeRoute}
						className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3"
					>
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
							{renderIcon('history')}
						</div>
						<div>
							<h2 className="text-base font-semibold tracking-wide text-blue-100">{dashboardData.brand.title}</h2>
							<p className="text-[10px] uppercase tracking-[0.24em] text-blue-200/70">{dashboardData.brand.subtitle}</p>
						</div>
					</Link>

					<nav className="mt-6 space-y-1">
						{dashboardData.sidebar.map((item) => (
							<NavLink
								key={item.id}
								to={item.route}
								className={({ isActive }) =>
									[
										'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition',
										isActive
											? 'bg-slate-700/45 text-blue-100'
											: 'text-slate-300/90 hover:bg-slate-700/30 hover:text-slate-100',
									].join(' ')
								}
							>
								<span className="text-slate-400 group-hover:text-blue-200">{renderIcon(item.icon)}</span>
								<span>{item.label}</span>
							</NavLink>
						))}
					</nav>

					<div className="mt-auto space-y-2 pb-2">
						<Link
							to={dashboardData.links.settings}
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/30"
						>
							{renderIcon('settings')}
							<span>Settings</span>
						</Link>
						<Link
							to={dashboardData.links.support}
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/30"
						>
							{renderIcon('support')}
							<span>Support</span>
						</Link>
					</div>
				</aside>

				<div className="flex min-h-screen flex-1 flex-col">
					<header className="sticky top-0 z-20 border-b border-slate-800/70 bg-[#081327]/95 px-5 py-4 backdrop-blur">
						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-6">
								<h1 className="hidden text-2xl font-semibold tracking-[0.12em] text-slate-100 md:block">ADMIN PORTAL</h1>
								{/* <nav className="flex items-center gap-1 rounded-xl bg-slate-900/40 p-1">
									{dashboardData.topNav.map((tab) => (
										<NavLink
											key={tab.id}
											to={tab.route}
											className={({ isActive }) =>
												[
													'rounded-lg px-3 py-2 text-sm transition',
													isActive
														? 'bg-blue-500/15 text-blue-200'
														: 'text-slate-400 hover:bg-slate-700/35 hover:text-slate-100',
												].join(' ')
											}
										>
											{tab.label}
										</NavLink>
									))}
								</nav> */}
							</div>

							<div className="flex items-center gap-2">
								<Link
									to={dashboardData.links.changePassword}
									className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-700"
								>
									<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/40 text-xs font-semibold text-blue-100">
										{currentUser.initials}
									</span>
									<span className="hidden sm:inline">{currentUser.name}</span>
								</Link>
								<button
									type="button"
									onClick={handleLogout}
									className="rounded-full bg-blue-500/85 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-blue-500"
								>
									Logout
								</button>
							</div>
						</div>
					</header>

					<main className="flex-1 px-5 py-7 sm:px-7">
						<section>
							<h2 className="text-4xl font-semibold text-slate-100">Welcome, {currentUser.name}</h2>
							<p className="mt-2 text-sm text-slate-400">{pageDate}</p>
						</section>

						<section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
							{dashboardData.quickActions.map((action) => (
								<Link
									key={action.id}
									to={action.route}
									className="group rounded-2xl border border-slate-700/80 bg-[linear-gradient(180deg,rgba(14,25,46,0.96)_0%,rgba(13,24,43,0.92)_100%)] p-6 transition hover:-translate-y-0.5 hover:border-blue-500/50 hover:shadow-[0_8px_28px_-14px_rgba(72,118,255,0.7)]"
								>
									<div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/15 text-blue-200">
										{renderIcon(action.icon, 'h-6 w-6')}
									</div>
									<h3 className="text-3xl/7 font-semibold text-slate-100">{action.title}</h3>
									<p className="mt-3 text-sm leading-6 text-slate-400">{action.description}</p>
								</Link>
							))}
						</section>

						<section className="mt-8 grid gap-4 lg:grid-cols-[2fr_1fr]">
							<article className="rounded-2xl border border-slate-700/70 bg-[#0e172b]/85 p-6">
								<h3 className="text-2xl font-semibold text-slate-100">System Security Status</h3>
								<div className="mt-5 flex flex-wrap items-center gap-4">
									<span className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
										<span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
										{dashboardData.health.label}
									</span>
									<p className="text-sm text-slate-400">{dashboardData.health.statusText}</p>
								</div>
							</article>

							<article className="rounded-2xl border border-blue-500/35 bg-[linear-gradient(145deg,#0e1f48_0%,#101a32_100%)] p-6">
								<p className="text-xs uppercase tracking-[0.26em] text-blue-200/80">{dashboardData.liquidity.title}</p>
								<p className="mt-2 text-4xl font-bold text-slate-100">{dashboardData.liquidity.value}</p>
								<p className="mt-2 text-sm text-blue-200/80">{dashboardData.liquidity.trend}</p>
							</article>
						</section>
					</main>
				</div>
			</div>
		</div>
	)
}

export default AdminHomePage
