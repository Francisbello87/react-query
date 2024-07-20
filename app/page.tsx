// pages/index.tsx
import { fetchDogs } from "@/modules/app";
import { ButtonPagination } from "@/modules/button-pagination";




export default async function Home() {
const initialDogs = await fetchDogs({ page: 1, imagesPerPage: 4 });
  return <ButtonPagination initialDogs={initialDogs} />;
}

