import { Skeleton } from "@/components/ui/skeleton";

export default function TrackerLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-32 bg-[#1f1f1f]" />
        <Skeleton className="mt-2 h-4 w-64 bg-[#1f1f1f]" />
      </div>
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-96 w-64 flex-shrink-0  bg-[#1f1f1f]" />
        ))}
      </div>
    </div>
  );
}
