"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button } from "@/components/ui/Button";
import { DpMark } from "@/components/brand/Logo";
import { services, site } from "@/content/site";

const roles = ["A brand", "A founder / expert", "A creator", "An agency / team"];
const budgets = ["< ₹50k / mo", "₹50k – 1.5L / mo", "₹1.5L – 5L / mo", "₹5L+ / mo", "Project based"];

// TODO(phase 4): post to /api/contact (Resend) instead of opening the mail client.
export function Contact() {
  const [role, setRole] = useState(roles[0]);
  const [picked, setPicked] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const msg = String(f.get("message") || "").trim();
    const errs = { name: !name, email: !/^\S+@\S+\.\S+$/.test(email) };
    setErrors(errs);
    if (errs.name || errs.email) return;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${f.get("phone") || "-"}`,
      `I am: ${role}`,
      `Interested in: ${picked.join(", ") || "-"}`,
      `Budget: ${budget || "-"}`,
      "",
      msg,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`New project enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 text-paper md:py-36" aria-labelledby="contact-title">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(31,59,255,.4),transparent_62%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(21,255,236,.22),transparent_62%)]" />

      <div className="container-x relative grid gap-10 md:gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-aqua">Start a project</p>
          <SplitReveal id="contact-title" className="display mt-5 text-[clamp(3rem,7vw,6.2rem)]">
            Your next idea deserves an audience.
          </SplitReveal>
          <p className="mt-8 max-w-md text-lg text-paper/65">
            Tell us a little about you. We&apos;ll come back within one working day with next steps for a discovery call.
          </p>
          <a href={`mailto:${site.email}`} className="mt-8 inline-block border-b border-paper/25 pb-1 text-xl transition-colors hover:border-aqua hover:text-aqua">
            {site.email}
          </a>
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[420px] flex-col items-start justify-center rounded-[32px] bg-paper/5 p-10 ring-1 ring-paper/10"
              >
                <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 120, damping: 12 }}>
                  <DpMark className="h-20 w-auto" lettersClassName="text-paper" />
                </motion.div>
                <p className="mt-8 font-display text-4xl font-extrabold tracking-tight">Your email is ready to send.</p>
                <p className="mt-3 max-w-md text-paper/65">
                  Your mail app should have opened with the details filled in. Hit send and we&apos;ll take it from there.
                </p>
                <button onClick={() => setSent(false)} className="mt-8 text-sm text-aqua underline-offset-4 hover:underline">
                  Edit my details
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-[26px] bg-paper p-5 text-ink sm:p-6 md:rounded-[32px] md:p-10"
              >
                <fieldset>
                  <legend className="eyebrow text-muted">I am</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {roles.map((r) => (
                      <Chip key={r} active={role === r} onClick={() => setRole(r)}>
                        {r}
                      </Chip>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field name="name" label="Your name" error={errors.name} autoComplete="name" />
                  <Field name="email" label="Email" type="email" error={errors.email} autoComplete="email" />
                  <Field name="phone" label="Phone / WhatsApp (optional)" type="tel" autoComplete="tel" className="sm:col-span-2" />
                </div>

                <fieldset className="mt-8">
                  <legend className="eyebrow text-muted">Interested in</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {services.map((s) => (
                      <Chip key={s.slug} active={picked.includes(s.short)} onClick={() => toggle(s.short)}>
                        {s.short}
                      </Chip>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="mt-8">
                  <legend className="eyebrow text-muted">Budget</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <Chip key={b} active={budget === b} onClick={() => setBudget(budget === b ? null : b)}>
                        {b}
                      </Chip>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-8">
                  <Field name="message" label="Tell us about the project" textarea />
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-muted">We only use your details to reply to you.</p>
                  <Button type="submit" size="lg">
                    Send enquiry
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={clsx(
        "rounded-full px-4 py-2 text-sm font-medium ring-1 transition-all duration-300 active:scale-95",
        active ? "bg-ink text-paper ring-ink" : "bg-white text-ink ring-line hover:ring-ink",
      )}
    >
      {active && <span className="mr-1.5 inline-block size-1.5 -translate-y-0.5 rounded-full bg-aqua" />}
      {children}
    </button>
  );
}

function Field({
  name,
  label,
  type = "text",
  textarea,
  error,
  className,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  error?: boolean;
  className?: string;
  autoComplete?: string;
}) {
  const common =
    "peer w-full rounded-2xl bg-white px-4 pb-3 pt-6 text-[16px] outline-none ring-1 transition-all duration-300 placeholder:text-transparent focus:ring-2 focus:ring-blue " +
    (error ? "ring-red-500 animate-[shake_.4s]" : "ring-line hover:ring-ink/40");
  return (
    <div className={clsx("relative", className)}>
      {textarea ? (
        <textarea id={name} name={name} placeholder={label} rows={4} className={clsx(common, "resize-none")} />
      ) : (
        <input id={name} name={name} type={type} placeholder={label} autoComplete={autoComplete} aria-invalid={error || undefined} className={common} />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-1.5 text-xs font-medium text-muted transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue"
      >
        {label}
      </label>
      {error && <p className="mt-1.5 text-xs text-red-600">{name === "email" ? "Please enter a valid email." : "This one's required."}</p>}
    </div>
  );
}
