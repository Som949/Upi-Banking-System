import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const DEFAULT_WORKFLOW = {
	headerTitle: 'The Vaulted Sanctuary',
	pageTitle: 'Create Account',
	leftSteps: [
		{ id: 'identity', label: 'Identity' },
		{ id: 'security', label: 'Security' },
		{ id: 'verification', label: 'Verification' },
		{ id: 'complete', label: 'Complete' },
	],
	currentStepId: 'identity',
	progressStages: [
		{ id: 'details', label: 'Details', status: 'current' },
		{ id: 'otp', label: 'OTP', status: 'pending' },
		{ id: 'success', label: 'Success', status: 'pending' },
	],
	form: {
		fullName: '',
		dateOfBirth: '',
		phoneNumber: '',
		emailAddress: '',
		pin: '',
	},
}

const mergeWorkflow = (base, incoming) => {
	if (!incoming) {
		return base
	}

	return {
		...base,
		...incoming,
		form: {
			...base.form,
			...(incoming.form ?? {}),
		},
		leftSteps: incoming.leftSteps ?? base.leftSteps,
		progressStages: incoming.progressStages ?? base.progressStages,
	}
}

const normalizeStepStatuses = (steps, currentStepId) => {
	const activeIndex = steps.findIndex((step) => step.id === currentStepId)
	if (activeIndex === -1) {
		return steps.map((step) => ({ ...step, status: step.status ?? 'pending' }))
	}

	return steps.map((step, index) => {
		if (step.status) {
			return step
		}

		if (index < activeIndex) {
			return { ...step, status: 'completed' }
		}

		if (index === activeIndex) {
			return { ...step, status: 'current' }
		}

		return { ...step, status: 'pending' }
	})
}

function AccountCreation({ workflowSource, initialWorkflow, onSubmitDetails }) {
	const navigate = useNavigate()
	const [workflow, setWorkflow] = useState(() => mergeWorkflow(DEFAULT_WORKFLOW, initialWorkflow))
	const [formData, setFormData] = useState(() => mergeWorkflow(DEFAULT_WORKFLOW, initialWorkflow).form)

	useEffect(() => {
		let disposed = false

		const loadWorkflow = async () => {
			if (!workflowSource?.fetchWorkflow) {
				return
			}

			try {
				const payload = await workflowSource.fetchWorkflow()
				if (!disposed) {
					setWorkflow((prev) => mergeWorkflow(prev, payload))
					if (payload?.form) {
						setFormData((prev) => ({ ...prev, ...payload.form }))
					}
				}
			} catch (error) {
				console.error('Failed to load account creation workflow:', error)
			}
		}

		loadWorkflow()

		const unsubscribe = workflowSource?.subscribeWorkflow?.((update) => {
			setWorkflow((prev) => mergeWorkflow(prev, update))
			if (update?.form) {
				setFormData((prev) => ({ ...prev, ...update.form }))
			}
		})

		return () => {
			disposed = true
			if (typeof unsubscribe === 'function') {
				unsubscribe()
			}
		}
	}, [workflowSource])

	const sideSteps = useMemo(
		() => normalizeStepStatuses(workflow.leftSteps, workflow.currentStepId),
		[workflow.leftSteps, workflow.currentStepId],
	)

	const activeStepNumber = useMemo(() => {
		const index = sideSteps.findIndex((step) => step.status === 'current')
		return index >= 0 ? index + 1 : 1
	}, [sideSteps])

	const handleInputChange = (field) => (event) => {
		const value = event.target.value
		setFormData((prev) => ({ ...prev, [field]: value }))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!onSubmitDetails) {
			navigate('/accounts/verification', { state: { email: formData.emailAddress } })
			return
		}

		await onSubmitDetails(formData, workflow)
	}

	const getBadgeClasses = (status) => {
		if (status === 'completed') {
			return 'border-emerald-300/70 bg-emerald-400/85 text-emerald-950'
		}

		if (status === 'current') {
			return 'border-blue-300/70 bg-blue-400/90 text-blue-950'
		}

		return 'border-slate-700 bg-slate-800 text-slate-300'
	}

	const getStepTextClasses = (status) => {
		if (status === 'completed') {
			return 'text-emerald-300'
		}

		if (status === 'current') {
			return 'text-blue-200'
		}

		return 'text-slate-500'
	}

	return (
		<div className="min-h-screen bg-[#040b1a] text-slate-100">
			<header className="border-b border-slate-800 bg-[#060e20]/95">
				<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
					<Link to="/adminDashboard" className="flex items-center gap-2 text-sm text-slate-200 hover:text-blue-200">
						<span aria-hidden="true">←</span>
						<span>Create Account</span>
					</Link>
					<p className="text-sm font-semibold uppercase tracking-[0.17em] text-slate-200">{workflow.headerTitle}</p>
					  <div className="w-24" aria-hidden="true" />
				</div>
			</header>

			<div className="mx-auto grid min-h-[calc(100vh-56px)] max-w-7xl grid-cols-1 lg:grid-cols-[248px_1fr]">
				<aside className="border-r border-slate-800 bg-[linear-gradient(180deg,#111a2a_0%,#121c2c_100%)] px-5 py-7">
					<h1 className="text-3xl font-semibold text-slate-100">{workflow.pageTitle}</h1>
					<p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">Step {activeStepNumber} of {sideSteps.length}</p>

					<nav className="mt-8 space-y-5">
						{sideSteps.map((step) => (
							<div key={step.id} className="flex items-center gap-3">
								<span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold ${getBadgeClasses(step.status)}`}>
									{step.status === 'completed' ? '✓' : '•'}
								</span>
								<span className={`text-sm ${getStepTextClasses(step.status)}`}>{step.label}</span>
								{step.status === 'current' ? <span className="ml-auto h-5 w-0.5 bg-blue-400" aria-hidden="true" /> : null}
							</div>
						))}
					</nav>
				</aside>

				<main className="bg-[radial-gradient(circle_at_45%_15%,rgba(31,73,152,0.2),transparent_42%),linear-gradient(180deg,#020a18_0%,#020916_100%)] px-4 py-8 sm:px-10">
					<form
						onSubmit={handleSubmit}
						className="mx-auto w-full max-w-140 rounded-2xl border border-slate-800/90 bg-[linear-gradient(180deg,rgba(4,12,25,0.94)_0%,rgba(5,12,24,0.88)_100%)] p-6 shadow-[0_24px_60px_-36px_rgba(20,90,255,0.7)] sm:p-8"
					>
						<ol className="mb-10 flex items-start">
							{workflow.progressStages.map((stage, index) => {
								const isLast = index === workflow.progressStages.length - 1
								const isCompleted = stage.status === 'completed'
								const isCurrent = stage.status === 'current'

								return (
									<li key={stage.id} className="flex flex-1 items-center">
										<div className="flex flex-col items-center">
											<span
												className={[
													'inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold',
													isCompleted
														? 'border-emerald-300/70 bg-emerald-400 text-emerald-950'
														: isCurrent
															? 'border-blue-300/80 bg-blue-400 text-blue-950'
															: 'border-slate-700 bg-slate-800 text-slate-300',
												].join(' ')}
											>
												{isCompleted ? '✓' : index + 1}
											</span>
											<span
												className={[
													'mt-2 text-[11px]',
													isCompleted ? 'text-emerald-300' : isCurrent ? 'text-blue-200' : 'text-slate-500',
												].join(' ')}
											>
												{stage.label}
											</span>
										</div>

										{!isLast ? (
											<div className="mx-2 mb-5 h-px flex-1 bg-slate-700">
												<div
													className={[
														'h-full transition-all',
														isCompleted ? 'w-full bg-emerald-300' : isCurrent ? 'w-1/2 bg-blue-300' : 'w-0 bg-slate-700',
													].join(' ')}
												/>
											</div>
										) : null}
									</li>
								)
							})}
						</ol>

						<h2 className="text-4xl font-semibold text-slate-100">Customer Information</h2>
						<p className="mt-2 text-sm text-slate-400">Please provide your legal details to initiate the vault activation.</p>

						<div className="mt-7 space-y-4">
							<label className="block">
								<span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Full Name</span>
								<input
									type="text"
									value={formData.fullName}
									onChange={handleInputChange('fullName')}
									placeholder="Johnathan Doe"
									className="h-11 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400"
								/>
							</label>

							<label className="block">
								<span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Date of Birth</span>
								<input
									type="date"
									value={formData.dateOfBirth}
									onChange={handleInputChange('dateOfBirth')}
									className="h-11 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 text-sm text-slate-100 outline-none transition focus:border-blue-400"
								/>
							</label>

							<div className="grid gap-4 sm:grid-cols-2">
								<label className="block">
									<span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Phone Number</span>
									<input
										type="tel"
										value={formData.phoneNumber}
										onChange={handleInputChange('phoneNumber')}
										placeholder="10 digits"
										className="h-11 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400"
									/>
								</label>

								<label className="block">
									<span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Email Address</span>
									<input
										type="email"
										value={formData.emailAddress}
										onChange={handleInputChange('emailAddress')}
										placeholder="name@sanctuary.com"
										className="h-11 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400"
									/>
								</label>
							</div>

							<label className="block">
								<span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">PIN</span>
								<input
									type="password"
									value={formData.pin}
									onChange={handleInputChange('pin')}
									maxLength={6}
									placeholder="• • • • • •"
									className="h-11 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400"
								/>
								<span className="mt-2 block text-xs text-slate-500">Used for UPI verification, 4 to 6 digits</span>
							</label>
						</div>

						<button
							type="submit"
							className="mt-8 h-12 w-full rounded-full bg-linear-to-r from-[#7ea3ff] to-[#3f74ff] text-sm font-medium text-slate-950 transition hover:brightness-110"
						>
							Send OTP to Email
						</button>

						<p className="mt-7 border-t border-slate-800 pt-5 text-center text-xs text-slate-500">
							By proceeding, you agree to our Secure Banking Protocols and Privacy Charter.
						</p>
					</form>

					  <div className="mx-auto mt-9 flex w-full max-w-140 flex-wrap items-center justify-center gap-8 text-[10px] uppercase tracking-[0.18em] text-slate-500">
						<span>AES-256 Encrypted</span>
						<span>Sovereign Protection</span>
						<span>Federal Compliant</span>
					</div>
				</main>
			</div>
		</div>
	)
}

export default AccountCreation
