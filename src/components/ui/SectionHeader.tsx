import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * Eyebrow, masked headline, optional body — the header every section opens on.
 *
 * The reference sets the eyebrow as a wide-tracked mono label on its own line
 * above a headline that reveals line by line, and repeats that shape on every
 * section without exception. That consistency is doing real work on a page this
 * long: it is the only cue that tells a reader they have crossed into a new
 * section, since there are no boxes or rules to mark one.
 */
export default function SectionHeader({
  eyebrow,
  heading,
  body,
  align = "start",
  className,
  headingClassName,
  tone = "dark",
}: {
  eyebrow?: string;
  heading: readonly string[];
  body?: string;
  align?: "start" | "center";
  className?: string;
  headingClassName?: string;
  /** `light` for the orange and bone panels, where type inverts to ink. */
  tone?: "dark" | "light";
}) {
  const muted = tone === "light" ? "text-ink/55" : "text-ash-dim";
  const strong = tone === "light" ? "text-ink" : "text-chalk";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <Reveal y={16}>
          <p className={cn("t-micro", tone === "light" ? "text-ink/50" : "text-ash-faint")}>
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <LineReveal
        lines={heading}
        as="h2"
        className={cn("t-title", strong, headingClassName)}
      />

      {body ? (
        <Reveal y={22} delay={0.1}>
          <p className={cn("t-lede max-w-[62ch]", muted)}>{body}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
