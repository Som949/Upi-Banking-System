import { Link } from 'react-router-dom'

const LockIcon = () => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		className="h-4 w-4"
		aria-hidden="true"
	>
		<rect x="5" y="10" width="14" height="10" rx="2" />
		<path d="M8 10V7a4 4 0 0 1 8 0v3" />
	</svg>
)

const EyeIcon = () => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		className="h-4 w-4"
		aria-hidden="true"
	>
		<path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6-10-6-10-6Z" />
		<circle cx="12" cy="12" r="2.5" />
	</svg>
)

const ShieldIcon = () => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		className="h-4 w-4"
		aria-hidden="true"
	>
		<path d="M12 3 5 6v5c0 4.5 2.9 7.8 7 9 4.1-1.2 7-4.5 7-9V6l-7-3Z" />
		<path d="m9.5 12 1.8 1.8 3.2-3.6" />
	</svg>
)

const AdminLogin = () => {
	return (
		<main className="relative min-h-screen overflow-hidden bg-[#020B1C] px-4 py-8 text-[#DFE8FF] sm:px-8 sm:py-10">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#0046C7]/25 blur-3xl" />
				<div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-[#1E60FF]/20 blur-3xl" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_40%,rgba(97,163,255,0.11),transparent_35%),radial-gradient(circle_at_78%_20%,rgba(70,120,255,0.16),transparent_42%)]" />
			</div>

			<section className="relative mx-auto w-full max-w-6xl">
				<div className="overflow-hidden rounded-[28px] border border-[#1F2C45] bg-[#030E21]/80 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:grid lg:grid-cols-[1.1fr_1fr]">
					  <div className="relative flex min-h-140 flex-col justify-between border-b border-[#1E2A43] bg-linear-to-br from-[#081833] via-[#061628] to-[#04101F] p-7 sm:p-10 lg:border-b-0 lg:border-r">
						<div className="flex items-center gap-3">
							<div className="grid h-8 w-8 place-items-center rounded-lg bg-linear-to-br from-[#5F8FFF] to-[#3B66E6]">
								<div className="h-3 w-3 rounded-xs border-2 border-white/90" />
							</div>
							<p className="text-lg font-semibold tracking-tight text-white">Vault Admin</p>
						</div>

						<div className="relative z-10 mt-8 max-w-lg">
							<h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
								Securing the
								<span className="block bg-linear-to-r from-[#7AA2FF] via-[#6E90FF] to-[#5F7DE3] bg-clip-text text-transparent">
									Digital Frontier.
								</span>
							</h1>
							<p className="mt-6 max-w-md text-base leading-7 text-[#A9B7D7]">
								Terminal Alpha provides enterprise-grade monitoring and compliance
								tools for high-stakes banking environments.
							</p>
						</div>

						<div className="pointer-events-none absolute inset-x-0 bottom-24 top-36">
							<div className="h-full w-full bg-[linear-gradient(115deg,transparent_10%,rgba(84,184,255,0.32)_40%,transparent_72%)] opacity-40 blur-2xl" />
						</div>

						<div className="relative z-10 mt-10 flex items-center gap-4 rounded-xl border border-[#2A3D65] bg-[#071A34]/70 px-4 py-3 text-sm text-[#C9D9FF] backdrop-blur">
							<div className="flex -space-x-2">
								<div className="grid h-7 w-7 place-items-center rounded-full border border-[#1A2C4D] bg-[#12335E] text-[10px] font-semibold text-[#D9E7FF]">
									AK
								</div>
								<div className="grid h-7 w-7 place-items-center rounded-full border border-[#1A2C4D] bg-[#234E82] text-[10px] font-semibold text-[#D9E7FF]">
									DS
								</div>
							</div>
							<p>
								<span className="font-semibold text-[#79F7CF]">128 Secure Sessions</span>{' '}
								active globally
							</p>
						</div>
					</div>

					  <div className="flex min-h-140 flex-col justify-between bg-[#050E1D]/90 p-7 sm:p-10">
						<div>
							<h2 className="text-3xl font-semibold tracking-tight text-white">Admin Login</h2>
							<p className="mt-2 text-sm text-[#A8B6D2]">
								Enter your secure credentials to access Terminal Alpha.
							</p>

							<form className="mt-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
								<div>
									<label
										htmlFor="adminPassword"
										className="mb-2 block text-xs font-semibold uppercase tracking-[0.28em] text-[#7E93BA]"
									>
										Secure Password
									</label>
									<div className="group flex items-center gap-3 rounded-xl border border-[#2A3A59] bg-[#15233B] px-4 py-3 transition focus-within:border-[#5D83FF] focus-within:ring-2 focus-within:ring-[#5D83FF]/35">
										<span className="text-[#8AA3CC]">
											<LockIcon />
										</span>
										<input
											id="adminPassword"
											type="password"
											placeholder="••••••••••••"
											className="w-full bg-transparent text-sm tracking-[0.2em] text-white placeholder:text-[#6C81A8] outline-none"
										/>
										<button
											type="button"
											className="text-[#8AA3CC] transition hover:text-[#B7C8E8]"
											aria-label="Show password"
										>
											<EyeIcon />
										</button>
									</div>
								</div>

								<div className="flex items-start gap-3 rounded-xl border border-[#2A3A59] bg-[#111F35]/80 px-4 py-3 text-xs leading-5 text-[#9FB0CF]">
									<span className="mt-0.5 text-[#72F2BE]">
										<ShieldIcon />
									</span>
									<p>
										Two-factor authentication will be required on the next step for
										verified IP addresses.
									</p>
								</div>

								<div className="space-y-3 pt-3">
									<button
										type="submit"
										className="w-full rounded-full bg-linear-to-r from-[#587FEF] to-[#6E95FF] px-5 py-3 text-sm font-semibold text-[#0A1730] shadow-[0_10px_28px_rgba(94,139,255,0.45)] transition hover:from-[#6E95FF] hover:to-[#7BA4FF]"
									>
										Login →
									</button>
									<Link
										to="/changepassword"
										className="block w-full rounded-full border border-[#24375A] bg-transparent px-5 py-3 text-center text-sm font-semibold text-[#C8D5EF] transition hover:border-[#3A5487] hover:bg-[#0B1730]"
									>
										Change Password
									</Link>
								</div>
							</form>

							<p className="mt-10 text-center text-sm text-[#93A5C8]">
								System issues?{' '}
								<Link to="/changepassword" className="font-medium text-[#7CA5FF] hover:text-[#9FBEFF]">
									Contact Support
								</Link>
							</p>
						</div>

						<div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-[#1F2E4C] pt-5 text-[11px] uppercase tracking-[0.16em] text-[#7085AA]">
							<span>AES-256</span>
							<span>OAuth 2.0</span>
							<span>SOC2 Type II</span>
						</div>
					</div>
				</div>

				<p className="mt-8 text-center text-[10px] uppercase tracking-[0.42em] text-[#5D7298] sm:text-xs">
					Authorized Personnel Only • IP Tracking Active • Vault 2.4.0
				</p>
			</section>
		</main>
	)
}

export default AdminLogin
