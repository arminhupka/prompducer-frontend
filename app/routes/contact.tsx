import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { useSendContact } from "~/queries/contact";

export function meta() {
	return [
		{ title: "Contact | SUMMONIC" },
		{
			name: "description",
			content:
				"Get in touch with the SUMMONIC team for support, billing, or partnership questions.",
		},
	];
}

const schema = z.object({
	name: z.string().min(2, "Please enter your name."),
	email: z.string().email("Enter a valid email address."),
	subject: z.string().min(3, "Add a short subject."),
	message: z.string().min(10, "Tell us a little more (10+ characters)."),
});

type ContactForm = z.infer<typeof schema>;

const fieldClass =
	"mt-1.5 w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-cyan-300/60";

export default function Contact() {
	const sendContact = useSendContact();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ContactForm>({ resolver: zodResolver(schema) });

	const onSubmit = (values: ContactForm) => {
		sendContact.mutate(values, {
			onSuccess: () => {
				toast.success("Message sent — we'll be in touch soon.");
				reset();
			},
			onError: () => {
				toast.error(
					"Couldn't send right now. Please email support@producersources.com.",
				);
			},
		});
	};

	return (
		<div className="mx-auto max-w-2xl space-y-8 pb-6">
			<header className="text-center">
				<p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
					Support
				</p>
				<h1 className="vst-display vst-glow-text text-4xl text-white sm:text-5xl">
					Contact us
				</h1>
				<p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
					Questions about generation, credits, billing, or partnerships? Send us
					a note and a human will get back to you within 2 business days.
				</p>
				<a
					href="mailto:support@producersources.com"
					className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-white"
				>
					<Mail className="size-4" />
					support@producersources.com
				</a>
			</header>

			{sendContact.isSuccess ? (
				<div className="vst-panel flex flex-col items-center gap-3 p-9 text-center">
					<CheckCircle2 className="size-10 text-emerald-300" />
					<h2 className="vst-display text-2xl text-white">Message sent</h2>
					<p className="max-w-md text-sm text-white/75">
						Thanks for reaching out. We’ll reply to the email you provided as soon
						as we can.
					</p>
					<Button
						variant="ghost"
						className="vst-button-ghost mt-2 h-auto cursor-pointer px-6 py-2.5"
						onClick={() => sendContact.reset()}
					>
						Send another
					</Button>
				</div>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="vst-panel space-y-5 p-6 sm:p-8"
					noValidate={true}
				>
					<div className="grid gap-5 sm:grid-cols-2">
						<div>
							<Label className="text-sm text-white/80">Name</Label>
							<input
								type="text"
								className={fieldClass}
								placeholder="Your name"
								{...register("name")}
							/>
							{errors.name && (
								<p className="mt-1 text-xs text-rose-300">{errors.name.message}</p>
							)}
						</div>
						<div>
							<Label className="text-sm text-white/80">Email</Label>
							<input
								type="email"
								className={fieldClass}
								placeholder="you@example.com"
								{...register("email")}
							/>
							{errors.email && (
								<p className="mt-1 text-xs text-rose-300">
									{errors.email.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<Label className="text-sm text-white/80">Subject</Label>
						<input
							type="text"
							className={fieldClass}
							placeholder="What's this about?"
							{...register("subject")}
						/>
						{errors.subject && (
							<p className="mt-1 text-xs text-rose-300">
								{errors.subject.message}
							</p>
						)}
					</div>

					<div>
						<Label className="text-sm text-white/80">Message</Label>
						<textarea
							rows={6}
							className={`${fieldClass} resize-y`}
							placeholder="How can we help?"
							{...register("message")}
						/>
						{errors.message && (
							<p className="mt-1 text-xs text-rose-300">
								{errors.message.message}
							</p>
						)}
					</div>

					<Button
						type="submit"
						size="lg"
						variant="ghost"
						disabled={sendContact.isPending}
						className="vst-button-primary h-auto w-full cursor-pointer py-3 text-base"
					>
						{sendContact.isPending ? "Sending..." : "Send message"}
					</Button>
				</form>
			)}
		</div>
	);
}
