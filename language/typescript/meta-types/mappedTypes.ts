interface Artist {
    id: number;
    name: string;
    bio: string;
}

type MyPartialType<Type> = {
    [Property in keyof Type]?: Type[Property];
} & { id: number };

type MappedArtistForEdit = MyPartialType<Artist>;

// const artistForEdit: MappedArtistForEdit = {}
// 'id' 속성이 '{}' 형식에 없지만 '{ id: number; }' 형식에서 필수입니다.
