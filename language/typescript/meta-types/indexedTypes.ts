interface ArtworkSearchResponse {
    artists: {
        name: string;
        artworks: {
            name: string;
            deathdate: string | null;
            bio: string;
        }[];
    }[];
}
// artworks 부분을 수동으로 빼오면 out of sync할 위험성이 있다. 
// 0 첨자 접근은 반드시 있어야 하네
type InferredArtwork = ArtworkSearchResponse["artists"][0]["artworks"][0];
