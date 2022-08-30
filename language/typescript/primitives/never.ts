enum Flower {
    Rose,
    Rhododendron,
    Violet,
    Daisy,
    Tulip
}

const flowerLatinName = (flower: Flower) => {
    switch (flower) {
        case Flower.Rose:
            return "Rosa rubiginosa";
        case Flower.Rhododendron:
            return "Rhododendron ferrugineum";
        case Flower.Violet:
            return "Viola reichenbachiana";
        case Flower.Daisy:
            return "Bellis perennis";

        default:
            // 'Flower' 형식은 'never' 형식에 할당할 수 없습니다.
            const _exhaustiveCheck: never = flower;
            return _exhaustiveCheck;
    }
};
