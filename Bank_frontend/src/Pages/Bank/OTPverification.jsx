import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { createAccount } from '../../api'

const DEFAULT_OTP_FLOW = {
	topTitle: 'Create Account',
	stages: [
		{ id: 'step-1', label: 'Step 1', status: 'completed' },
		{ id: 'verification', label: 'Verification', status: 'current' },
		{ id: 'finalize', label: 'Finalize', status: 'pending' },
	],
	recipientEmail: 'rahul@gmail.com',
	otpLength: 6,
	resendSeconds: 45,
	securityLabel: 'Bank-grade 256-bit encryption',
}

const mergeOtpFlow = (base, incoming) => {
	if (!incoming) {
		return base
	}

	return {
		...base,
		...incoming,
		stages: incoming.stages ?? base.stages,
	}
}

function OTPverification({ flowSource, initialFlow, onVerifyOtp, onResendOtp }) {
	const location = useLocation()
	const navigate = useNavigate()
	const [flow, setFlow] = useState(() => mergeOtpFlow(DEFAULT_OTP_FLOW, initialFlow))
	const [otp, setOtp] = useState(() => Array(mergeOtpFlow(DEFAULT_OTP_FLOW, initialFlow).otpLength).fill(''))
	const [secondsLeft, setSecondsLeft] = useState(() => mergeOtpFlow(DEFAULT_OTP_FLOW, initialFlow).resendSeconds)
	const [otpError, setOtpError]       = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
	const inputRefs = useRef([]) 

	useEffect(() => {
		const emailFromState = location.state?.email
		if (emailFromState) {
			setFlow((prev) => ({ ...prev, recipientEmail: emailFromState }))
		}
	}, [location.state])

	useEffect(() => {
		let disposed = false

		const loadFlow = async () => {
			if (!flowSource?.fetchOtpFlow) {
				return
			}

			try {
				const payload = await flowSource.fetchOtpFlow()
				if (!disposed) {
					setFlow((prev) => mergeOtpFlow(prev, payload))
				}
			} catch (error) {
				console.error('Failed to load OTP flow:', error)
			}
		}

		loadFlow()

		const unsubscribe = flowSource?.subscribeOtpFlow?.((update) => {
			setFlow((prev) => mergeOtpFlow(prev, update))
		})

		return () => {
			disposed = true
			if (typeof unsubscribe === 'function') {
				unsubscribe()
			}
		}
	}, [flowSource])

	useEffect(() => {
		if (secondsLeft <= 0) {
			return
		}

		const timerId = window.setInterval(() => {
			setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
		}, 1000)

		return () => {
			window.clearInterval(timerId)
		}
	}, [secondsLeft])

	useEffect(() => {
		setOtp((prev) => {
			if (prev.length === flow.otpLength) {
				return prev
			}
			return Array(flow.otpLength).fill('')
		})
	}, [flow.otpLength])

	const canSubmit = useMemo(() => otp.every((digit) => digit.trim() !== ''), [otp])

	const handleInput = (index) => (event) => {
		const raw = event.target.value.replace(/\D/g, '')
		const nextValue = raw.slice(-1)

		setOtp((prev) => {
			const next = [...prev]
			next[index] = nextValue
			return next
		})

		if (nextValue && index < otp.length - 1) {
			inputRefs.current[index + 1]?.focus()
		}
	}

	const handleKeyDown = (index) => (event) => {
		if (event.key === 'Backspace' && !otp[index] && index > 0) {
			inputRefs.current[index - 1]?.focus()
		}
	}

	const handlePaste = (event) => {
		event.preventDefault()
		const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, flow.otpLength)
		if (!pasted) {
			return
		}

		const next = Array(flow.otpLength).fill('')
		pasted.split('').forEach((char, idx) => {
			next[idx] = char
		})
		setOtp(next)

		const focusIndex = Math.min(pasted.length, flow.otpLength - 1)
		inputRefs.current[focusIndex]?.focus()
	}

	// const handleVerify = async () => {
	// 	if (!canSubmit) {
	// 		return
	// 	}

	// 	if (!onVerifyOtp) {
	// 		navigate('/accounts/finalized', {
	// 			state: {
	// 				isAccountCreated: true,
	// 				email: flow.recipientEmail,
	// 			},
	// 		})
	// 		return
	// 	}

	// 	const result = await onVerifyOtp(otp.join(''), flow)
	// 	navigate('/accounts/finalized', {
	// 		state: {
	// 			isAccountCreated: Boolean(result?.isAccountCreated ?? result ?? false),
	// 			email: flow.recipientEmail,
	// 		},
	// 	})
	// }
	// ✅ UPDATED: API se connected
const handleVerify = async () => {
    if (!canSubmit) return

    setIsVerifying(true)  // ✅ loading state
    try {
        const res = await createAccount({
            email: flow.recipientEmail,
            otp:   otp.join(''),
        })

        if (res.success) {
            navigate('/accounts/finalized', {
                state: {
                    isAccountCreated: true,
                    email:          res.data.email,
                    name:           res.data.full_name,
                    userId:         res.data.user_id,
                    accountNumber:  res.data.account_number,
                    phone:          res.data.phone_number,
                },
            })
        } else {
            setOtpError(res.message || 'Wrong OTP!')
        }
    } catch {
        setOtpError('Not Connected with server')
    } finally {
        setIsVerifying(false)
    }
}

	const handleResend = async () => {
		if (secondsLeft > 0) {
			return
		}
		setSecondsLeft(flow.resendSeconds)
		if (onResendOtp) {
			await onResendOtp(flow)
		}
	}

	return (
		<div className="min-h-screen bg-[#030b19] text-slate-100">
			<header className="border-b border-slate-800 bg-[#050d1f]/95">
				<div className="relative mx-auto flex h-14 max-w-7xl items-center justify-center px-4 sm:px-6">
					<Link to="/accounts/create" className="absolute left-4 flex items-center gap-2 text-2xl text-slate-200 hover:text-blue-200 sm:left-6">
						<span aria-hidden="true">&larr;</span>
						<span className="text-sm">{flow.topTitle}</span>
					</Link>
					<div className="text-center text-sm font-medium text-slate-200">{flow.topTitle}</div>
					<div className="absolute right-4 text-slate-400 sm:right-6">?</div>
				</div>
			</header>

			<main className="mx-auto flex min-h-[calc(100vh-56px)] max-w-7xl items-start justify-center bg-[radial-gradient(circle_at_22%_38%,rgba(52,88,178,0.2),transparent_46%),radial-gradient(circle_at_80%_50%,rgba(22,33,58,0.5),transparent_52%),#020a17] px-4 pb-10 pt-12 sm:px-6">
				<section className="mx-auto w-full max-w-4xl">
					  <ol className="mx-auto mb-10 flex w-full max-w-md items-start">
						{flow.stages.map((stage, index) => {
							const isLast = index === flow.stages.length - 1
							const isCompleted = stage.status === 'completed'
							const isCurrent = stage.status === 'current'

							return (
								<li key={stage.id} className="flex flex-1 items-center">
									<div className="flex items-center gap-2">
										<span
											className={[
												'inline-flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold',
												isCompleted
													? 'border-emerald-300/80 bg-emerald-300 text-emerald-950'
													: isCurrent
														? 'border-blue-300/80 bg-blue-400 text-blue-950'
														: 'border-slate-700 bg-[#09152b] text-slate-500',
											].join(' ')}
										>
											{isCompleted ? '✓' : index + 1}
										</span>
										<span className={['text-xs uppercase tracking-[0.13em]', isCurrent ? 'text-blue-200' : isCompleted ? 'text-emerald-300' : 'text-slate-500'].join(' ')}>
											{stage.label}
										</span>
									</div>

									{!isLast ? <span className="mx-3 h-px flex-1 bg-slate-700/70" aria-hidden="true" /> : null}
								</li>
							)
						})}
					</ol>

					  <article className="mx-auto w-full max-w-lg rounded-3xl border border-slate-800/80 bg-[linear-gradient(180deg,rgba(12,22,42,0.95)_0%,rgba(11,21,39,0.9)_100%)] p-7 shadow-[0_26px_58px_-34px_rgba(42,99,255,0.7)] sm:p-8">
						<div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-500/15 text-blue-300">
							<svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
								<path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="1.8" />
								<path d="m4 8 8 5 8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>

						<h1 className="text-center text-4xl font-semibold text-slate-100">Verify Email Address</h1>
						<p className="mt-2 text-center text-xl text-slate-400">
							OTP sent to <span className="font-semibold text-slate-200">{flow.recipientEmail}</span>
						</p>

						<div className="mt-8 flex justify-center gap-3" onPaste={handlePaste}>
							{otp.map((digit, index) => (
								<input
									key={index}
									ref={(node) => {
										inputRefs.current[index] = node
									}}
									type="text"
									inputMode="numeric"
									maxLength={1}
									value={digit}
									onChange={handleInput(index)}
									onKeyDown={handleKeyDown(index)}
									className="h-12 w-12 rounded-xl border border-slate-700 bg-slate-800/70 text-center text-lg font-semibold text-slate-100 outline-none transition focus:border-blue-400"
									aria-label={`OTP digit ${index + 1}`}
								/>
							))}
						</div>
						{otpError && (
    <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-center text-sm text-red-400">
        {otpError}
    </p>
)}

						{/* <button
							type="button"
							onClick={handleVerify}
							disabled={!canSubmit}
							className="mt-8 h-14 w-full rounded-full bg-linear-to-r from-emerald-500 to-emerald-600 text-base font-semibold text-emerald-50 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
						>
							  Verify & Create Account -&gt;
						</button> */}
						<button
                            type="button"
                            onClick={handleVerify}
                            disabled={!canSubmit || isVerifying}
                            className="mt-8 h-14 w-full rounded-full bg-linear-to-r from-emerald-500 to-emerald-600 text-base font-semibold text-emerald-50 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isVerifying ? 'Verifying...' : 'Verify & Create Account →'}
                        </button> 

						<div className="mt-7 flex items-center justify-center gap-2 text-sm text-slate-400">
							<span>Didn't receive OTP?</span>
							<button
								type="button"
								onClick={handleResend}
								disabled={secondsLeft > 0}
								className="font-semibold text-blue-300 transition hover:text-blue-200 disabled:cursor-not-allowed disabled:text-blue-500/50"
							>
								Resend OTP
							</button>
							<span className="rounded-lg bg-slate-800 px-2 py-0.5 text-xs text-slate-300">{secondsLeft}s</span>
						</div>
					</article>

					<div className="mx-auto mt-10 flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-300/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
						<span className="h-2.5 w-2.5 rounded-full bg-emerald-300" aria-hidden="true" />
						<span>{flow.securityLabel}</span>
					</div>
				</section>
			</main>
		</div>
	)
}

export default OTPverification
