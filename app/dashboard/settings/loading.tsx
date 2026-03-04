import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <Skeleton className="h-8 w-24 bg-[#1f1f1f]" />
        <Skeleton className="mt-2 h-4 w-48 bg-[#1f1f1f]" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-64  bg-[#1f1f1f]" />
      ))}
    </div>
  );
}
