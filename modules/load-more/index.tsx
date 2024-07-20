"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDogs, useImagesPerPage } from "@/modules/app";
import Loader from "@/assets/loading.svg";
import Image from "next/image";


export function LoadMoreInfinite() {
 const imagesPerPage = useImagesPerPage();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["dogs", imagesPerPage],
    queryFn: ({ pageParam = 1 }) =>
      fetchDogs({ page: pageParam, imagesPerPage }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === imagesPerPage
        ? allPages.length + 1
        : undefined;
    },
    initialPageParam: 1,
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
      <h2 className="text-3xl">Infinite Scrolling with Load More Button - React Query</h2>
      <div
        className={`grid gap-10 min-w-full place-content-center ${
          imagesPerPage === 1
            ? "grid-cols-1"
            : imagesPerPage === 2
            ? "grid-cols-2"
            : imagesPerPage === 3
            ? "grid-cols-3"
            : "grid-cols-4"
        }`}
      >
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.map((img, index) => (
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
          </React.Fragment>
        ))}
      </div>
      {hasNextPage && (
        <button
          className="bg-red-500 py-3 px-4 z-30 rounded-lg"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )}
    </div>
  );
}
