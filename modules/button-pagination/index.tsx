"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDogs, useImagesPerPage } from "@/modules/app";
import Loader from "@/assets/loading.svg";
import Image from "next/image";
// Adjust the import as needed

interface ButtonPaginationProps {
  initialDogs: string[];
}

export function ButtonPagination({ initialDogs }: ButtonPaginationProps) {
  const [page, setPage] = useState(1);
  const imagesPerPage = useImagesPerPage();

  const { data, isLoading, isError } = useQuery<string[]>({
    queryKey: ["dogs", page, imagesPerPage],
    queryFn: () => fetchDogs({ page, imagesPerPage }),
    initialData: page === 1 ? initialDogs : undefined,
  });

  if (isLoading) {
    return (
      <div className="w-full h-[85vh] flex items-center justify-center">
        <div className="w-full h-full flex items-center gap-4 justify-center">
          <Loader className="w-20 h-20" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[85vh] flex items-center justify-center gap-4">
        Error loading dogs,{" "}
        <button
          className="bg-gray-500 rounded-lg py-3 px-4 hover:bg-gray-500/80 transition duration-300 ease-in-out"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full !h-full flex items-center !justify-between flex-col gap-10">
      <h2 className="text-3xl">
        Fetching Data using React Query and Button Pagination
      </h2>
      <div
        className={`grid ${
          imagesPerPage === 1
            ? "grid-cols-1"
            : imagesPerPage === 2
            ? "grid-cols-2"
            : imagesPerPage === 3
            ? "grid-cols-3"
            : "grid-cols-4"
        } gap-10 min-w-full place-content-center `}
      >
        {data?.map((img, index) => (
          <div key={index} className="rounded-[20px] max-w-[300px]">
            <Image
              src={img}
              alt={`Dog ${index + 1}`}
              width={300}
              height={250}
              objectFit="contain"
              className="rounded-xl w-full max-h-[250px]"
            />
          </div>
        ))}
      </div>
      <PaginationBtns
        pageIndex={page}
        prev={() => setPage((prev) => Math.max(prev - 1, 1))}
        next={() => setPage((prev) => prev + 1)}
        data={data}
      />
    </div>
  );
}

type PaginationBtnsProps = {
  data: string[] | undefined;
  prev: () => void;
  next: () => void;
  pageIndex: number;
};

export function PaginationBtns({
  data,
  prev,
  next,
  pageIndex,
}: PaginationBtnsProps) {
  const prevDisabled = pageIndex === 1;
  const imagesPerPage = useImagesPerPage();
  return (
    <div className="w-full flex items-center gap-8 justify-center z-30">
      <button
        onClick={prev}
        disabled={prevDisabled}
        className={`py-3 px-4 z-30 rounded-md ${
          prevDisabled ? "bg-new-secondary text-white/40" : "bg-red-500"
        }`}
      >
        Previous
      </button>
      <button
        className="bg-red-500 py-3 px-4 z-30 rounded-lg"
        onClick={next}
        disabled={data && data.length < imagesPerPage}
      >
        Next
      </button>
    </div>
  );
}
