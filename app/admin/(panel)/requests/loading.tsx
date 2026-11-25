import { PillsSkeleton, TableSkeleton, TitleSkeleton } from "../../skeletons";

export default function Loading() {
  return (
    <>
      <TitleSkeleton />
      <PillsSkeleton />
      <div className="mt-6"><TableSkeleton rows={6} cols={5} /></div>
    </>
  );
}
