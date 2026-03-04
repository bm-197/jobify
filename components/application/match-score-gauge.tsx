export function MatchScoreGauge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "text-emerald-400"
      : score >= 60
        ? "text-yellow-400"
        : "text-red-400";

  const strokeColor =
    score >= 80
      ? "#34d399"
      : score >= 60
        ? "#facc15"
        : "#f87171";

  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="#222"
          strokeWidth="5"
        />
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke={strokeColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={`absolute text-[16px] font-bold tabular-nums ${color}`}>
        {score}%
      </span>
    </div>
  );
}
