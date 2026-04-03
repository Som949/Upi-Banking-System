const SignUp = () => {
	return (
		<main className="relative min-h-screen overflow-hidden bg-[#0F172A] text-[#FFFFFF]">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#3B82F6]/20 blur-3xl" />
				<div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#6366F1]/20 blur-3xl" />
				<div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#2563EB]/20 blur-3xl" />
			</div>

			<section className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
				<div className="grid w-full overflow-hidden rounded-3xl border border-[#374151] bg-[#111827]/90 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:grid-cols-2">
					  <div className="flex flex-col justify-between bg-linear-to-br from-[#1F2937] to-[#111827] p-8 sm:p-10 lg:p-12">
						<div>
							<p className="inline-flex items-center rounded-full border border-[#374151] bg-[#0F172A]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">
								Hello!
							</p>
							<h1 className="mt-6 text-3xl font-bold leading-tight text-[#FFFFFF] sm:text-4xl">
								Create your
								<span className="block bg-linear-to-r from-[#6366F1] to-[#3B82F6] bg-clip-text text-transparent">
									secure account
								</span>
							</h1>
							<p className="mt-4 max-w-md text-sm leading-6 text-[#E5E7EB]">
								Join our platform to manage transfers, track spending, and grow
								with real-time insights built for modern finance teams.
							</p>
						</div>

						<div className="mt-8 grid gap-4 sm:grid-cols-3">
							<article className="rounded-2xl border border-[#374151] bg-[#1F2937]/80 p-4">
								<p className="text-xs uppercase tracking-wide text-[#9CA3AF]">
									Fast & secure
								</p>
								<p className="mt-2 text-sm font-semibold text-[#FFFFFF]">
									Bank-level security
								</p>
							</article>
							<article className="rounded-2xl border border-[#374151] bg-[#1F2937]/80 p-4">
								<p className="text-xs uppercase tracking-wide text-[#9CA3AF]">
									Realtime tracking
								</p>
								<p className="mt-2 text-sm font-semibold text-[#FFFFFF]">
									Stay on top of your finances
								</p>
							</article>
							<article className="rounded-2xl border border-[#374151] bg-[#1F2937]/80 p-4">
								<p className="text-xs uppercase tracking-wide text-[#9CA3AF]">
									Support
								</p>
								<p className="mt-2 text-sm font-semibold text-[#FFFFFF]">
									24/7 coverage
								</p>
							</article>
						</div>
					</div>

					<div className="bg-[#111827]/95 p-8 sm:p-10 lg:p-12">
						<div className="mx-auto w-full max-w-md">
							<h2 className="text-2xl font-bold text-[#FFFFFF]">Sign up</h2>
							<p className="mt-2 text-sm text-[#9CA3AF]">
								Start in less than two minutes.
							</p>

							<form className="mt-8 space-y-5">
								<div>
									<label
										htmlFor="fullName"
										className="mb-2 block text-sm font-medium text-[#E5E7EB]"
									>
										Full name
									</label>
									<input
										id="fullName"
										type="text"
										placeholder="Aarav Mehta"
										className="w-full rounded-xl border border-[#374151] bg-[#1F2937] px-4 py-3 text-sm text-[#FFFFFF] placeholder-[#9CA3AF] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/40"
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="mb-2 block text-sm font-medium text-[#E5E7EB]"
									>
										Email
									</label>
									<input
										id="email"
										type="email"
										placeholder="name@company.com"
										className="w-full rounded-xl border border-[#374151] bg-[#1F2937] px-4 py-3 text-sm text-[#FFFFFF] placeholder-[#9CA3AF] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/40"
									/>
								</div>

								<div className="grid gap-5 sm:grid-cols-2">
									<div>
										<label
											htmlFor="password"
											className="mb-2 block text-sm font-medium text-[#E5E7EB]"
										>
											Password
										</label>
										<input
											id="password"
											type="password"
											placeholder="Create password"
											className="w-full rounded-xl border border-[#374151] bg-[#1F2937] px-4 py-3 text-sm text-[#FFFFFF] placeholder-[#9CA3AF] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/40"
										/>
									</div>

									<div>
										<label
											htmlFor="confirmPassword"
											className="mb-2 block text-sm font-medium text-[#E5E7EB]"
										>
											Confirm
										</label>
										<input
											id="confirmPassword"
											type="password"
											placeholder="Confirm password"
											className="w-full rounded-xl border border-[#374151] bg-[#1F2937] px-4 py-3 text-sm text-[#FFFFFF] placeholder-[#9CA3AF] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/40"
										/>
									</div>
								</div>

								<label className="flex items-start gap-3 text-sm text-[#E5E7EB]">
									<input
										type="checkbox"
										className="mt-1 h-4 w-4 rounded border border-[#374151] bg-[#1F2937] text-[#2563EB] focus:ring-[#3B82F6]/40"
										defaultChecked
									/>
									<span>
										I agree to the terms and privacy policy.
									</span>
								</label>

								<button
									type="submit"
									  className="w-full rounded-xl bg-linear-to-r from-[#6366F1] to-[#3B82F6] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(59,130,246,0.35)] transition hover:from-[#2563EB] hover:to-[#3B82F6] active:from-[#1D4ED8] active:to-[#2563EB]"
								>
									Create account
								</button>
							</form>

							<p className="mt-6 text-center text-sm text-[#9CA3AF]">
								Already have an account?{" "}
								<a
									href="#"
									className="font-medium text-[#3B82F6] transition hover:text-[#6366F1]"
								>
									Sign in
								</a>
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default SignUp;
