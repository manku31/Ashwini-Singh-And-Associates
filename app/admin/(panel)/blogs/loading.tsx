import { TableSkeleton, TitleSkeleton } from "../../skeletons";

export default function Loading() {
  return (
    <>
      <TitleSkeleton />
      <div className="mt-6"><TableSkeleton rows={6} cols={6} /></div>
    </>
  );
}
