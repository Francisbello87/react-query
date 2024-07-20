import { fetchDogs } from "@/modules/app";



import dynamic from "next/dynamic";

const ButtonPagination = dynamic(
  () =>
    import("@/modules/button-pagination").then((mod) => mod.ButtonPagination),
  {
    ssr: false,
  }
);

export default async function Home() {
const initialDogs = await fetchDogs({ page: 1, imagesPerPage: 4 });
  return <ButtonPagination initialDogs={initialDogs} />;
}

