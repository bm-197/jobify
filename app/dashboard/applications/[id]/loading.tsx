import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicationLoading() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <Skeleton className="h-8 w-64 bg-[#1f1f1f]" />
          <Skeleton className="mt-2 h-4 w-40 bg-[#1f1f1f]" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full bg-[#1f1f1f]" />
          <Skeleton className="h-10 w-40 bg-[#1f1f1f]" />
        </div>
      </div>
      <Skeleton className="h-10 w-96 bg-[#1f1f1f]" />
      <Skeleton className="h-80 rounded-xl bg-[#1f1f1f]" />
      <Skeleton className="h-40 rounded-xl bg-[#1f1f1f]" />
    </div>
  );
}
