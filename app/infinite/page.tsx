import { fetchDogs } from "@/modules/app";
import dynamic from "next/dynamic";


const InfiniteScroll = dynamic(
  () =>
    import("@/modules/infinite-scrolling").then(
      (mod) => mod.InfiniteScroll
    ),
  {
    ssr: false,
  }
);

export default async function Infinite() {
  const initialDogs = await fetchDogs({ page: 1, imagesPerPage: 4 });

  return <InfiniteScroll initialDogs={initialDogs} />;
}
