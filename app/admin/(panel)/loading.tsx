import { CardsSkeleton, TableSkeleton, TitleSkeleton } from "../skeletons";

export default function Loading() {
  return (
    <>
      <TitleSkeleton />
      <CardsSkeleton />
      <div className="mt-12"><TableSkeleton rows={5} cols={2} /></div>
    </>
  );
}
