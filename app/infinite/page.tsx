import { fetchDogs } from "@/modules/app";
import { InfiniteScroll } from "@/modules/infinite-scrolling";


export default async function Infinite() {
const initialDogs = await fetchDogs({ page: 1, imagesPerPage: 4 });
  return <InfiniteScroll initialDogs={initialDogs} />;
}
