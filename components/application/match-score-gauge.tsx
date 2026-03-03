export function MatchScoreGauge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "text-green-400"
      : score >= 60
        ? "text-yellow-400"
        : "text-red-400";

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
          stroke="#1f1f1f"
          strokeWidth="6"
        />
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={color}
        />
      </svg>
      <span className={`absolute text-lg font-bold ${color}`}>{score}%</span>
    </div>
  );
}
