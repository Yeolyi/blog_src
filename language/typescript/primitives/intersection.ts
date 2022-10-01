interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}
interface ArtworksData {
  artworks: { title: string }[];
}
type ArtworksResponse = ArtworksData & ErrorHandling;

const handleArtistsResponse = (response: ArtworksResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }
  console.log(response.artworks);
};
