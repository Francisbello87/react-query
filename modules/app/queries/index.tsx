type FetchDogsParams = {
  page?: number;
  imagesPerPage?: number;
};

export async function fetchDogs({
  page = 1,
  imagesPerPage = 4,
}: FetchDogsParams): Promise<string[]> {
  const url = "https://dog.ceo/api/breed/hound/images";

  const response = await fetch(url);
  const data = await response.json();

  const start = (page - 1) * imagesPerPage;
  const end = page * imagesPerPage;

  const paginatedImages = data.message.slice(start, end);

  return paginatedImages;
}
