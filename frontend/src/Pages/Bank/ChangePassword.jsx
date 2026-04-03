import { useState } from 'react'
import { Link } from 'react-router-dom'

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

const ShieldTinyIcon = () => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		className="h-3.5 w-3.5"
		aria-hidden="true"
	>
		<path d="M12 3 5 6v5c0 4.5 2.9 7.8 7 9 4.1-1.2 7-4.5 7-9V6l-7-3Z" />
		<path d="m9.5 12 1.8 1.8 3.2-3.6" />
	</svg>
)

const DangerDot = () => (
	<span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#F0565F]" aria-hidden="true" />
)

const ChangePassword = () => {
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const [showCurrentPassword, setShowCurrentPassword] = useState(false)
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const passwordsDontMatch = confirmPassword.length > 0 && newPassword !== confirmPassword
	const weakPassword = newPassword.length > 0 && newPassword.length < 12

	return (
		<main className="relative min-h-screen overflow-hidden bg-[#020A19] px-4 py-8 text-[#DFE8FF] sm:px-8 sm:py-10">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-16 top-16 h-80 w-80 rounded-full bg-[#0049D8]/20 blur-3xl" />
				<div className="absolute -right-16 top-0 h-96 w-96 rounded-full bg-[#2B65FF]/20 blur-3xl" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_45%,rgba(53,207,255,0.15),transparent_35%),radial-gradient(circle_at_75%_15%,rgba(81,128,255,0.18),transparent_42%)]" />
			</div>

			<section className="relative mx-auto w-full max-w-6xl">
				<div className="overflow-hidden rounded-[30px] border border-[#1E2C49] bg-[#030D20]/85 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:grid lg:grid-cols-[1.2fr_1fr]">
					<div className="relative min-h-140 border-b border-[#1D2B46] bg-linear-to-br from-[#061A34] via-[#04152A] to-[#020D1F] p-8 sm:p-10 lg:border-b-0 lg:border-r">
						<div className="flex items-center gap-3">
							<div className="grid h-8 w-8 place-items-center rounded-lg bg-linear-to-br from-[#5D8DFF] to-[#3D69EB]">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.8"
									className="h-4 w-4 text-[#05132A]"
									aria-hidden="true"
								>
									<path d="M4 7h16v10H4z" />
									<path d="M8 11h8" />
								</svg>
							</div>
							  <p className="text-lg font-semibold tracking-tight text-white">Vault Admin</p>
						</div>

						<div className="relative mt-12">
							<div className="pointer-events-none absolute left-0 top-0 h-105 w-full bg-[radial-gradient(circle,rgba(41,212,255,0.25)_2%,rgba(20,130,200,0.15)_22%,transparent_62%)] blur-sm" />

							<svg
								viewBox="0 0 320 380"
								className="relative z-10 mx-auto mt-4 h-80 w-72 text-[#4CD9FF]/35"
								fill="none"
								stroke="currentColor"
								strokeWidth="7"
								aria-hidden="true"
							>
								<rect x="55" y="145" width="210" height="190" rx="26" />
								<path d="M90 145v-35c0-38 30-68 68-68h4c38 0 68 30 68 68v35" />
								<circle cx="160" cy="227" r="20" className="fill-[#9AB7FF]/30 stroke-none" />
								<path d="M160 245v38" />
							</svg>

							<div className="relative z-10 mt-2 max-w-md">
								<h1 className="text-5xl font-semibold leading-tight text-white sm:text-6xl">
									Secure your
									<span className="block bg-linear-to-r from-[#8FB3FF] via-[#7FA1FF] to-[#6E86F1] bg-clip-text text-transparent">
										Account Access.
									</span>
								</h1>
								<p className="mt-5 max-w-lg text-base leading-8 text-[#A8B8D8]">
									Your security is our priority. We use advanced multi-layer
									encryption to ensure your financial sanctuary remains
									impenetrable.
								</p>
							</div>
						</div>

						<div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-[#A6B7D8]">
							<p className="flex items-center gap-2 rounded-full border border-[#2A3C63] bg-[#0A1A34]/75 px-4 py-2">
								<span className="text-[#7DFFC8]">
									<ShieldTinyIcon />
								</span>
								AES-256 Encrypted
							</p>
							<p className="flex items-center gap-2 rounded-full border border-[#2A3C63] bg-[#0A1A34]/75 px-4 py-2">
								<span className="text-[#7DFFC8]">
									<ShieldTinyIcon />
								</span>
								Real-Time Auditing
							</p>
						</div>
					</div>

					<div className="flex min-h-140 flex-col justify-between bg-[#040D1D]/95 p-8 sm:p-10">
						<div>
							<Link to="/login" className="text-sm text-[#9AB0D7] hover:text-[#B7C8E8]">
								← Back to Settings
							</Link>

							<h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
								Update Password
							</h2>
							<p className="mt-3 max-w-sm text-base leading-7 text-[#A7B7D3]">
								Enter your current details to refresh your security credentials.
							</p>

							<form className="mt-9 space-y-5" onSubmit={(e) => e.preventDefault()}>
								<div>
									<label
										htmlFor="currentPassword"
										className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-[#90A5CA]"
									>
										Current Password
									</label>
									<div className="flex items-center gap-3 rounded-xl border border-[#2B3A58] bg-[#18253D] px-4 py-3 focus-within:border-[#5D83FF] focus-within:ring-2 focus-within:ring-[#5D83FF]/35">
										<input
											id="currentPassword"
											type={showCurrentPassword ? 'text' : 'password'}
											value={currentPassword}
											onChange={(e) => setCurrentPassword(e.target.value)}
											placeholder="Enter current password"
											className="w-full bg-transparent text-sm tracking-[0.25em] text-white outline-none"
										/>
										<button
											type="button"
											onClick={() => setShowCurrentPassword((prev) => !prev)}
											className="text-[#8AA3CC] hover:text-[#B8C8E4]"
											aria-label="Show current password"
										>
											<EyeIcon />
										</button>
									</div>
									{currentPassword.length > 0 && (
										<p className="mt-2 flex items-center gap-2 text-xs text-[#F65E66]">
											<DangerDot />
											Incorrect current password
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="newPassword"
										className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-[#90A5CA]"
									>
										New Password
									</label>
									<div className="flex items-center gap-3 rounded-xl border border-[#2B3A58] bg-[#18253D] px-4 py-3 focus-within:border-[#5D83FF] focus-within:ring-2 focus-within:ring-[#5D83FF]/35">
										<input
											id="newPassword"
											type={showNewPassword ? 'text' : 'password'}
											value={newPassword}
											onChange={(e) => setNewPassword(e.target.value)}
											placeholder="Enter new password"
											className="w-full bg-transparent text-sm tracking-[0.25em] text-white outline-none"
										/>
										<button
											type="button"
											onClick={() => setShowNewPassword((prev) => !prev)}
											className="text-[#8AA3CC] hover:text-[#B8C8E4]"
											aria-label="Show new password"
										>
											<EyeIcon />
										</button>
									</div>

									{newPassword.length > 0 && (
										<>
											<div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em]">
												<p className="font-semibold text-[#F25F63]">
													{weakPassword ? 'Weak Password' : 'Strong Password'}
												</p>
												<p className="text-[#9BB0D4]">
													{weakPassword ? '35% Secure' : '100% Secure'}
												</p>
											</div>
											<div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#3A4253]">
												<div
													className={`h-full rounded-full ${
														weakPassword ? 'w-[35%] bg-[#EF525A]' : 'w-full bg-[#56DA9E]'
													}`}
												/>
											</div>
											<p className="mt-2 text-xs text-[#9BAFD2]">
												Use at least 12 characters, including numbers and symbols.
											</p>
										</>
									)}
								</div>

								<div>
									<label
										htmlFor="confirmPassword"
										className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-[#90A5CA]"
									>
										Confirm New Password
									</label>
									<div className="flex items-center gap-3 rounded-xl border border-[#2B3A58] bg-[#18253D] px-4 py-3 focus-within:border-[#5D83FF] focus-within:ring-2 focus-within:ring-[#5D83FF]/35">
										<input
											id="confirmPassword"
											type={showConfirmPassword ? 'text' : 'password'}
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											placeholder="Confirm new password"
											className="w-full bg-transparent text-sm tracking-[0.25em] text-white outline-none"
										/>
										<button
											type="button"
											onClick={() => setShowConfirmPassword((prev) => !prev)}
											className="text-[#8AA3CC] hover:text-[#B8C8E4]"
											aria-label="Show confirm password"
										>
											<EyeIcon />
										</button>
									</div>
									{passwordsDontMatch && (
										<p className="mt-2 flex items-center gap-2 text-xs text-[#F65E66]">
											<DangerDot />
											Passwords don't match
										</p>
									)}
								</div>

								<button
									type="submit"
									className="mt-2 w-full rounded-full bg-linear-to-r from-[#6F94F6] to-[#446FEA] px-5 py-3 text-sm font-semibold text-[#08162E] shadow-[0_12px_30px_rgba(86,131,255,0.45)] transition hover:from-[#7CA1FF] hover:to-[#537AF3]"
								>
									Change Password [Secure]
								</button>
							</form>
						</div>

						<div className="mt-8 rounded-2xl border border-[#233350] bg-[#111D33]/75 p-4">
							<p className="text-sm font-semibold text-white">Need help?</p>
							<p className="mt-1 text-xs leading-6 text-[#9AB0D2]">
								If you've forgotten your current credentials, please contact our
								support desk or initiate a security reset.
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default ChangePassword
