import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-32 bg-[#1f1f1f]" />
          <Skeleton className="mt-2 h-4 w-48 bg-[#1f1f1f]" />
        </div>
        <Skeleton className="h-10 w-40 bg-[#1f1f1f]" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl bg-[#1f1f1f]" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-xl bg-[#1f1f1f]" />
    </div>
  );
}
