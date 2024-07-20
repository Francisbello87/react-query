import dynamic from "next/dynamic";

const LoadMoreInfinite = dynamic(
  () => import("@/modules/load-more").then((mod) => mod.LoadMoreInfinite),
  {
    ssr: false,
  }
);
export default async function Home() {
  return <LoadMoreInfinite />;
}
