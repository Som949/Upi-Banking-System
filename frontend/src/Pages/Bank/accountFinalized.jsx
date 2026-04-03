import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'

const DEFAULT_FINAL_DATA = {
	title: 'Account Created Successfully!',
	subtitle: 'Welcome to the future of digital banking. Your secure vault is ready.',
	securityBadge: 'Encrypted and verified',
	steps: [
		{ id: 'step-1', label: 'Step 1', status: 'completed' },
		{ id: 'step-2', label: 'Step 2', status: 'completed' },
		{ id: 'step-3', label: 'Step 3', status: 'completed' },
	],
	customer: {
		name: 'Rahul Sharma',
		userId: 'USR790837',
		accountNumber: '5753246179',
		phone: '9876543210',
		email: 'rahul@gmail.com',
	},
}

const mergeFinalData = (base, incoming) => {
	if (!incoming) {
		return base
	}

	return {
		...base,
		...incoming,
		steps: incoming.steps ?? base.steps,
		customer: {
			...base.customer,
			...(incoming.customer ?? {}),
		},
	}
}

function AccountFinalized({ finalDataSource, initialFinalData }) {
	const location = useLocation()
	const navigate = useNavigate()

	const [isAccountCreated, setIsAccountCreated] = useState(() => Boolean(location.state?.isAccountCreated))
	const [finalData, setFinalData] = useState(() =>
		mergeFinalData(DEFAULT_FINAL_DATA, {
			...initialFinalData,
			customer: {
				...initialFinalData?.customer,
				email: location.state?.email ?? initialFinalData?.customer?.email,
			},
		}),
	)

	useEffect(() => {
		let disposed = false

		const loadFinalData = async () => {
			if (!finalDataSource?.fetchFinalData) {
				return
			}

			try {
				const payload = await finalDataSource.fetchFinalData()
				if (!disposed) {
					if (typeof payload?.isAccountCreated === 'boolean') {
						setIsAccountCreated(payload.isAccountCreated)
					}
					setFinalData((prev) => mergeFinalData(prev, payload))
				}
			} catch (error) {
				console.error('Failed to load final account data:', error)
			}
		}

		loadFinalData()

		const unsubscribe = finalDataSource?.subscribeFinalData?.((update) => {
			if (typeof update?.isAccountCreated === 'boolean') {
				setIsAccountCreated(update.isAccountCreated)
			}
			setFinalData((prev) => mergeFinalData(prev, update))
		})

		return () => {
			disposed = true
			if (typeof unsubscribe === 'function') {
				unsubscribe()
			}
		}
	}, [finalDataSource])

	useEffect(() => {
		if (isAccountCreated) {
			return
		}

		toast.error('Account verification failed. Redirecting to dashboard...')
		const timer = window.setTimeout(() => {
			navigate('/adminDashboard', { replace: true })
		}, 1200)

		return () => {
			window.clearTimeout(timer)
		}
	}, [isAccountCreated, navigate])

	const detailRows = useMemo(
		() => [
			{ label: 'Name', value: finalData.customer.name },
			{ label: 'User ID', value: finalData.customer.userId },
			{ label: 'Account Number', value: finalData.customer.accountNumber, accent: true },
			{ label: 'Phone', value: finalData.customer.phone },
			{ label: 'Email', value: finalData.customer.email },
		],
		[finalData.customer],
	)

	if (!isAccountCreated) {
		return <Toaster position="top-right" />
	}

	return (
		<div className="min-h-screen bg-[#020a18] text-slate-100">
			<Toaster position="top-right" />

			<header className="border-b border-slate-800 bg-[#050d1f]/95">
				<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
					<Link to="/accounts/verification" className="flex items-center gap-2 text-sm text-slate-200 hover:text-blue-200">
						<span aria-hidden="true">←</span>
						<span>Vault</span>
					</Link>

					<nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.14em] text-slate-400 md:flex">
						<span>Home</span>
						<span>Accounts</span>
						<span>Wealth</span>
						<span>Support</span>
					</nav>

					<div className="flex items-center gap-3 text-slate-400">
						<span>?</span>
						<span>🛡</span>
					</div>
				</div>
			</header>

			<main className="mx-auto flex min-h-[calc(100vh-56px)] max-w-7xl justify-center bg-[radial-gradient(circle_at_20%_40%,rgba(36,64,126,0.2),transparent_45%),radial-gradient(circle_at_78%_50%,rgba(19,31,60,0.5),transparent_55%),#020a18] px-4 pb-10 pt-8 sm:px-6">
				<section className="w-full max-w-140">
					<ol className="mx-auto mb-8 flex w-full max-w-lg items-center">
						{finalData.steps.map((step, index) => {
							const isLast = index === finalData.steps.length - 1
							return (
								<li key={step.id} className="flex flex-1 items-center">
									<div className="flex flex-col items-center gap-1">
										<span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/90 bg-emerald-300 text-xs font-semibold text-emerald-950">
											✓
										</span>
										<span className="text-[11px] uppercase tracking-[0.14em] text-slate-300">{step.label}</span>
									</div>
									{!isLast ? <span className="mx-3 h-0.5 flex-1 bg-emerald-300/80" aria-hidden="true" /> : null}
								</li>
							)
						})}
					</ol>

					<article className="rounded-2xl border border-slate-800/80 bg-[linear-gradient(180deg,rgba(22,33,53,0.95)_0%,rgba(20,30,49,0.9)_100%)] p-6 shadow-[0_30px_60px_-38px_rgba(61,124,255,0.6)] sm:p-8">
						<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-300 bg-emerald-300/15 text-5xl text-emerald-300">
							✓
						</div>

						<h1 className="mt-6 text-center text-4xl font-semibold text-emerald-300">{finalData.title}</h1>
						<p className="mx-auto mt-2 max-w-md text-center text-base text-slate-300">{finalData.subtitle}</p>

						<div className="mt-6 rounded-xl border border-slate-700/80 bg-slate-900/25 p-4">
							{detailRows.map((row) => (
								<div key={row.label} className="grid grid-cols-[130px_1fr] items-center border-b border-slate-800/80 py-3 last:border-b-0">
									<span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">{row.label}</span>
									<span className={row.accent ? 'justify-self-end text-sm text-blue-300' : 'justify-self-end text-sm text-slate-100'}>{row.value}</span>
								</div>
							))}
						</div>

						<div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-300/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
							<span className="h-2.5 w-2.5 rounded-full bg-emerald-300" aria-hidden="true" />
							<span>{finalData.securityBadge}</span>
						</div>

						<div className="mt-6 grid gap-3 sm:grid-cols-2">
							<button
								type="button"
								onClick={() => window.print()}
								className="h-12 rounded-full border border-blue-400/70 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/10"
							>
								Print Details
							</button>
							<button
								type="button"
								onClick={() => navigate('/adminDashboard')}
								className="h-12 rounded-full bg-linear-to-r from-[#7ea3ff] to-[#4f7fff] text-sm font-semibold text-slate-950 transition hover:brightness-105"
							>
								Go to Dashboard
							</button>
						</div>

						<button
							type="button"
							onClick={() => navigate('/accounts/create')}
							className="mt-5 w-full text-center text-sm text-slate-300 transition hover:text-blue-200"
						>
							Create Another Account
						</button>
					</article>
				</section>
			</main>
		</div>
	)
}

export default AccountFinalized
