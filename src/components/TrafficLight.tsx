import type { Classification } from "@/lib/types";

type TrafficLightProps = {
  active?: Classification | "idle";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const SIZES = {
  sm: { wrap: "w-14", housing: "p-1.5 gap-1.5 rounded-2xl", light: "h-3 w-3" },
  md: {
    wrap: "w-20",
    housing: "p-2 gap-2 rounded-[1.4rem]",
    light: "h-[18px] w-[18px]",
  },
  lg: { wrap: "w-28", housing: "p-3 gap-3 rounded-[1.8rem]", light: "h-7 w-7" },
  xl: {
    wrap: "w-32 sm:w-48",
    housing: "p-3.5 sm:p-5 gap-3.5 sm:gap-5 rounded-[2rem]",
    light: "h-10 w-10 sm:h-14 sm:w-14",
  },
};

const LIGHTS: Classification[] = ["vermelho", "amarelo", "verde"];

const COLOR: Record<Classification, { on: string; off: string }> = {
  vermelho: {
    on: "bg-[#ff5c61] shadow-[0_0_28px_rgba(255,92,97,0.75)]",
    off: "bg-[#3a1618]",
  },
  amarelo: {
    on: "bg-[#f5c542] shadow-[0_0_28px_rgba(245,197,66,0.75)]",
    off: "bg-[#3a2f12]",
  },
  verde: {
    on: "bg-[#3ddc84] shadow-[0_0_28px_rgba(61,220,132,0.75)]",
    off: "bg-[#163a28]",
  },
};

export function TrafficLight({
  active = "idle",
  size = "lg",
  className = "",
}: TrafficLightProps) {
  const scale = SIZES[size];

  return (
    <div
      className={`relative ${scale.wrap} ${className}`}
      aria-hidden="true"
    >
      <div className="absolute top-0 left-1/2 h-3 w-2 -translate-x-1/2 -translate-y-[70%] rounded-t-full bg-[#2a241e]" />
      <div
        className={`relative flex flex-col items-center border border-white/8 bg-linear-to-b from-[#2a241e] to-[#15110e] ${scale.housing}`}
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 40px rgba(0,0,0,0.35)",
        }}
      >
        {LIGHTS.map((color) => {
          const isOn = active === "idle" || active === color;
          const idleOpacity =
            active === "idle"
              ? color === "verde"
                ? 0.9
                : color === "amarelo"
                  ? 0.55
                  : 0.35
              : 1;

          return (
            <span
              key={color}
              className={`relative block rounded-full ${scale.light} ${
                isOn
                  ? `${COLOR[color].on} ${active === color ? "light-on" : ""}`
                  : COLOR[color].off
              }`}
              style={{
                opacity: isOn ? idleOpacity : 0.45,
              }}
            >
              <span className="absolute inset-[18%] rounded-full bg-white/25 blur-[1px]" />
            </span>
          );
        })}
      </div>
    </div>
  );
}
