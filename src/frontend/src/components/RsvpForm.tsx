import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AttendanceStatus } from "../backend.d";
import { useSubmitRsvp } from "../hooks/useQueries";

export function RsvpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<AttendanceStatus | "">("");
  const [message, setMessage] = useState("");

  const submitRsvp = useSubmitRsvp();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !status) return;

    submitRsvp.mutate({
      name,
      email,
      status: status as AttendanceStatus,
      message,
    });
  }

  const inputStyle = {
    background: "oklch(0.18 0.02 40)",
    border: "1px solid oklch(0.72 0.05 75 / 0.3)",
    color: "oklch(0.92 0.01 85)",
  } as React.CSSProperties;

  return (
    <motion.section
      data-ocid="rsvp.section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 px-4"
      style={{
        background: `
          radial-gradient(ellipse at 50% 0%, oklch(0.22 0.05 15 / 0.3) 0%, transparent 60%),
          linear-gradient(180deg, oklch(0.13 0.01 50) 0%, oklch(0.15 0.015 45) 100%)
        `,
      }}
    >
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12">
          <p
            className="font-sans text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "oklch(0.72 0.07 75)" }}
          >
            Your Presence
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl mb-3"
            style={{ color: "oklch(0.95 0.01 85)" }}
          >
            RSVP
          </h2>
          <p
            className="font-serif italic"
            style={{ color: "oklch(0.65 0.04 70)" }}
          >
            Kindly respond by 15 March 2026
          </p>
          <div
            className="mt-4 mx-auto w-24 h-px"
            style={{ background: "oklch(0.72 0.08 75)" }}
          />
        </div>

        <AnimatePresence mode="wait">
          {submitRsvp.isSuccess ? (
            <motion.div
              data-ocid="rsvp.success_state"
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-14 px-8 rounded-2xl"
              style={{
                background: "oklch(0.18 0.03 40)",
                border: "1px solid oklch(0.72 0.07 75 / 0.4)",
                boxShadow: "0 0 60px oklch(0.72 0.07 75 / 0.1)",
              }}
            >
              <div className="text-5xl mb-4">🕊️</div>
              <h3
                className="font-serif text-3xl mb-3"
                style={{ color: "oklch(0.72 0.09 75)" }}
              >
                Thank You!
              </h3>
              <p className="font-sans" style={{ color: "oklch(0.75 0.02 80)" }}>
                Your response has been received.
                <br />
                We look forward to celebrating with you.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-6 p-6 md:p-8 rounded-2xl"
              style={{
                background: "oklch(0.16 0.02 45)",
                border: "1px solid oklch(0.72 0.06 75 / 0.25)",
              }}
            >
              <div className="space-y-2">
                <Label
                  className="font-sans text-xs tracking-widest uppercase"
                  style={{ color: "oklch(0.65 0.06 70)" }}
                >
                  Full Name
                </Label>
                <Input
                  data-ocid="rsvp.input"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={inputStyle}
                  className="placeholder:text-[oklch(0.45_0.03_50)] focus-visible:ring-[oklch(0.72_0.07_75)]"
                />
              </div>

              <div className="space-y-2">
                <Label
                  className="font-sans text-xs tracking-widest uppercase"
                  style={{ color: "oklch(0.65 0.06 70)" }}
                >
                  Email Address
                </Label>
                <Input
                  data-ocid="rsvp.email_input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                  className="placeholder:text-[oklch(0.45_0.03_50)] focus-visible:ring-[oklch(0.72_0.07_75)]"
                />
              </div>

              <div className="space-y-2">
                <Label
                  className="font-sans text-xs tracking-widest uppercase"
                  style={{ color: "oklch(0.65 0.06 70)" }}
                >
                  Will you attend?
                </Label>
                <Select
                  value={status}
                  onValueChange={(val) => setStatus(val as AttendanceStatus)}
                >
                  <SelectTrigger
                    data-ocid="rsvp.select"
                    style={inputStyle}
                    className="focus:ring-[oklch(0.72_0.07_75)]"
                  >
                    <SelectValue placeholder="Select your response" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "oklch(0.18 0.02 40)",
                      border: "1px solid oklch(0.72 0.06 75 / 0.3)",
                    }}
                  >
                    <SelectItem
                      value={AttendanceStatus.yes}
                      style={{ color: "oklch(0.9 0.01 85)" }}
                    >
                      Joyfully Accept
                    </SelectItem>
                    <SelectItem
                      value={AttendanceStatus.no}
                      style={{ color: "oklch(0.9 0.01 85)" }}
                    >
                      Regretfully Decline
                    </SelectItem>
                    <SelectItem
                      value={AttendanceStatus.maybe}
                      style={{ color: "oklch(0.9 0.01 85)" }}
                    >
                      Maybe
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  className="font-sans text-xs tracking-widest uppercase"
                  style={{ color: "oklch(0.65 0.06 70)" }}
                >
                  A message for the couple
                </Label>
                <Textarea
                  data-ocid="rsvp.textarea"
                  placeholder="Share your wishes or a kind message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  style={inputStyle}
                  className="resize-none placeholder:text-[oklch(0.45_0.03_50)] focus-visible:ring-[oklch(0.72_0.07_75)]"
                />
              </div>

              {submitRsvp.isError && (
                <div
                  data-ocid="rsvp.error_state"
                  className="px-4 py-3 rounded-lg text-sm font-sans"
                  style={{
                    background: "oklch(0.25 0.1 20 / 0.3)",
                    border: "1px solid oklch(0.45 0.12 20 / 0.5)",
                    color: "oklch(0.8 0.08 25)",
                  }}
                >
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                data-ocid="rsvp.submit_button"
                type="submit"
                disabled={submitRsvp.isPending || !name || !email || !status}
                className="w-full py-3 px-6 rounded-lg font-sans text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: submitRsvp.isPending
                    ? "oklch(0.45 0.08 15)"
                    : "linear-gradient(135deg, oklch(0.33 0.12 15) 0%, oklch(0.45 0.1 12) 100%)",
                  color: "oklch(0.92 0.01 85)",
                  border: "1px solid oklch(0.72 0.07 75 / 0.4)",
                  boxShadow: "0 4px 20px oklch(0.33 0.1 15 / 0.4)",
                }}
              >
                {submitRsvp.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send My Response"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
