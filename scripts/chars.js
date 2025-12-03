// Note: 
// date_available is the start of the characters most recent banner, if they have a banner.
// Otherwise it is the date of their release. I.e. Chime. Chime is an SSR with a release date and no banner.

class Character {
    constructor(name, is_in_standard_pool, rarity, manufacturer, date_available = new Date(2022, 10, 4), has_banner = false, banner_end_date = null, overspec = false) {
        this._name = name;
        this._isInStandardPool = is_in_standard_pool;
        this._rarity = rarity;
        this._manufacturer = manufacturer;
        this._date_available = date_available;
        this._hasBanner = has_banner;
        this._banner_end_date = banner_end_date;
        this._overspec = overspec;

        this._imageName = `${this._name}.png`.toLowerCase();
        Character.IllegalImageChars.forEach((c) => this._imageName = this._imageName.replaceAll(c, ""));
        this._bannerName = `${this._imageName.replace(".png", "")}`;
    }

    get name() { return this._name };
    get isInStandardPool() { return this._isInStandardPool };
    get manufacturer() { return this._manufacturer };
    get dateAvailable() { return this._date_available };
    get overspec() { return this._overspec };
    get rarity() { return this._rarity };
    get hasBanner() { return this._hasBanner };
    get bannerEndDate() { return this._banner_end_date; }

    get characterCardImage() { return `card/${this._rarity.toLowerCase()}_${this._imageName}`; }
    get characterSpareBodyImage() { return `spare_body/${this._imageName}`; }
    get characterProfileImage() { return `profile/${this._imageName}`; }
    get bannerName() { return this._bannerName; }

    static IllegalImageChars = [":", " ", "(", ")"];
}

const rarities = { 
    SSR: "SSR", 
    SR: "SR", 
    R: "R" 
};
const manufacturers = {
    Elysion: "Elysion",
    Missilis: "Missilis",
    Tetra: "Tetra",
    Pilgrim: "Pilgrim",
    Abnormal: "Abnormal"
};

const characters = [
    new Character("IDoll Sun", true, rarities.R, manufacturers.Tetra),
    new Character("IDoll Ocean", true, rarities.R, manufacturers.Tetra),
    new Character("IDoll Flower", true, rarities.R, manufacturers.Tetra),

    new Character("Product 08", true, rarities.R, manufacturers.Missilis),
    new Character("Product 12", true, rarities.R, manufacturers.Missilis),
    new Character("Product 23", true, rarities.R, manufacturers.Missilis),

    new Character("Soldier EG", true, rarities.R, manufacturers.Elysion),
    new Character("Soldier FA", true, rarities.R, manufacturers.Elysion),
    new Character("Soldier OW", true, rarities.R, manufacturers.Elysion),


    new Character("Neon", true, rarities.SR, manufacturers.Elysion),
    new Character("Rapi", true, rarities.SR, manufacturers.Elysion),
    new Character("Delta", true, rarities.SR, manufacturers.Elysion),
    new Character("Anchor", false, rarities.SR, manufacturers.Elysion, new Date(2023, 7, 3)),

    new Character("Anis", true, rarities.SR, manufacturers.Tetra),
    new Character("Mica", true, rarities.SR, manufacturers.Tetra),
    new Character("Neve", false, rarities.SR, manufacturers.Tetra, new Date(2022, 11, 8)),
    new Character("Belorta", true, rarities.SR, manufacturers.Tetra),

    new Character("N102", true, rarities.SR, manufacturers.Missilis),
    new Character("Ether", true, rarities.SR, manufacturers.Missilis),
    new Character("Mihara", true, rarities.SR, manufacturers.Missilis),

    new Character("Ram", false, rarities.SR, manufacturers.Abnormal, new Date(2024, 2, 21)),
    new Character("Lily", false, rarities.SR, manufacturers.Abnormal, new Date(2025, 5, 12)),
    new Character("Claire", false, rarities.SR, manufacturers.Abnormal, new Date(2025, 8, 24)),
    new Character("Himeno", false, rarities.SR, manufacturers.Abnormal, new Date(2023, 1, 22)),
    new Character("Misato", false, rarities.SR, manufacturers.Abnormal, new Date(2024, 7, 22)),
    new Character("Pascal", false, rarities.SR, manufacturers.Abnormal, new Date(2023, 8, 1)),
    new Character("Sakura Suzuhara", false, rarities.SR, manufacturers.Abnormal, new Date(2025, 1, 20)),


    new Character("2B", false, rarities.SSR, manufacturers.Abnormal, new Date(2025, 6, 3), true, new Date(2025, 6, 31)),
    new Character("A2", false, rarities.SSR, manufacturers.Abnormal, new Date(2025, 6, 10), true, new Date(2023, 6, 31)),
    new Character("Rem", false, rarities.SSR, manufacturers.Abnormal, new Date(2024, 2, 27), true, new Date(2024, 3, 11)),
    new Character("Ada", false, rarities.SSR, manufacturers.Abnormal, new Date(2025, 8, 24), true, new Date(2025, 9, 21)),
    new Character("EVE", false, rarities.SSR, manufacturers.Abnormal, new Date(2025, 5, 12), true, new Date(2025, 6, 3)),
    new Character("Mari", false, rarities.SSR, manufacturers.Abnormal, new Date(2025, 1, 27), true, new Date(2025, 2, 13)),
    new Character("Jill", false, rarities.SSR, manufacturers.Abnormal, new Date(2025, 9, 2), true, new Date(2025, 9, 21)),
    new Character("Power", false, rarities.SSR, manufacturers.Abnormal, new Date(2023, 1, 22), true, new Date(2023, 2, 15)),
    new Character("Raven", false, rarities.SSR, manufacturers.Abnormal, new Date(2025, 5, 19), true, new Date(2025, 6, 10)),
    new Character("Asuka", false, rarities.SSR, manufacturers.Abnormal, new Date(2025, 1, 20), true, new Date(2025, 2, 13)),
    new Character("Emilia", false, rarities.SSR, manufacturers.Abnormal, new Date(2024, 2, 21), true, new Date(2024, 3, 11)),
    new Character("Makima", false, rarities.SSR, manufacturers.Abnormal, new Date(2023, 1, 22), true, new Date(2023, 2, 15)),
    new Character("Rei Ayanami", false, rarities.SSR, manufacturers.Abnormal, new Date(2025, 1, 27), true, new Date(2025, 2, 13)),
    new Character("Asuka: WILLE", false, rarities.SSR, manufacturers.Abnormal, new Date(2025, 1, 20), true, new Date(2025, 2, 13)),
    new Character("Rei Ayanami (Tentative Name)", false, rarities.SSR, manufacturers.Abnormal, new Date(2025, 1, 27), true, new Date(2025, 2, 13)),
                        
    new Character("Ade", true, rarities.SSR, manufacturers.Tetra, new Date(2024, 1, 15), true, new Date(2024, 1, 29)),
    new Character("Bay", true, rarities.SSR, manufacturers.Tetra, new Date(2024, 3, 11), true, new Date(2024, 3, 23)),
    new Character("Rei", false, rarities.SSR, manufacturers.Tetra),
    new Character("Yan", true, rarities.SSR, manufacturers.Tetra),
    new Character("Aria", true, rarities.SSR, manufacturers.Tetra),
    new Character("Clay", true, rarities.SSR, manufacturers.Tetra, new Date(2024, 5, 20), true, new Date(2024, 6, 3)),
    new Character("Exia", true, rarities.SSR, manufacturers.Tetra),
    new Character("Mary", true, rarities.SSR, manufacturers.Tetra),
    new Character("Nero", true, rarities.SSR, manufacturers.Tetra),
    new Character("Noir", true, rarities.SSR, manufacturers.Tetra, new Date(2023, 4, 25), true, new Date(2023, 5, 8)),
    new Character("Milk", true, rarities.SSR, manufacturers.Tetra),
    new Character("Soda", true, rarities.SSR, manufacturers.Tetra, new Date(2023, 1, 1), true, new Date(2023, 2, 5)),
    new Character("Noise", true, rarities.SSR, manufacturers.Tetra),
    new Character("Novel", true, rarities.SSR, manufacturers.Tetra),
    new Character("Moran", true, rarities.SSR, manufacturers.Tetra, new Date(2024, 0, 25), true, new Date(2024, 1, 8)),
    new Character("Cocoa", true, rarities.SSR, manufacturers.Tetra, new Date(2023, 1, 1), true, new Date(2023, 2, 5)),
    new Character("Blanc", true, rarities.SSR, manufacturers.Tetra, new Date(2023, 4, 18), true, new Date(2023, 5, 1)),
    new Character("Leona", true, rarities.SSR, manufacturers.Tetra, new Date(2024, 0, 11), true, new Date(2024, 0, 25)),
    new Character("Alice", true, rarities.SSR, manufacturers.Tetra, new Date(2023, 3, 13), true, new Date(2023, 3, 27)),
    new Character("Crust", true, rarities.SSR, manufacturers.Tetra, new Date(2025, 3, 10), true, new Date(2025, 3, 23)),
    new Character("Sugar", true, rarities.SSR, manufacturers.Tetra),
    new Character("Viper", true, rarities.SSR, manufacturers.Tetra, new Date(2023, 0, 12), true, new Date(2023, 0, 25)),
    new Character("Yulha", true, rarities.SSR, manufacturers.Tetra),
    new Character("Dolla", true, rarities.SSR, manufacturers.Tetra),
    new Character("Frima", true, rarities.SSR, manufacturers.Tetra),
    new Character("Rouge", true, rarities.SSR, manufacturers.Tetra, new Date(2024, 8, 19), true, new Date(2024, 9, 3)),
    new Character("Rupee", true, rarities.SSR, manufacturers.Tetra),
    new Character("Bready", true, rarities.SSR, manufacturers.Tetra, new Date(2025, 2, 27), true, new Date(2025, 3, 10)),
    new Character("Rumani", true, rarities.SSR, manufacturers.Tetra, new Date(2024, 9, 17), true, new Date(2024, 9, 30)),
    new Character("Volume", true, rarities.SSR, manufacturers.Tetra),
    new Character("Sakura", true, rarities.SSR, manufacturers.Tetra, new Date(2023, 2, 30), true, new Date(2023, 3, 13)),
    new Character("Biscuit", true, rarities.SSR, manufacturers.Tetra, new Date(2023, 2, 15), true, new Date(2023, 2, 30)),
    new Character("Rosanna", true, rarities.SSR, manufacturers.Tetra, new Date(2023, 5, 1), true, new Date(2023, 5, 15)),
    new Character("Folkwang", true, rarities.SSR, manufacturers.Tetra),
    new Character("Ludmilla", true, rarities.SSR, manufacturers.Tetra),
    new Character("Ade: Agent Bunny", true, rarities.SSR, manufacturers.Tetra, new Date(2025, 8, 4),true, new Date(2025, 8, 23)),
    new Character("Mica: Snow Buddy", false, rarities.SSR, manufacturers.Tetra, new Date(2023, 11, 14), true, new Date(2023, 11, 31)),
    new Character("Mary: Bay Goddess", false, rarities.SSR, manufacturers.Tetra, new Date(2025, 8, 4), true, new Date(2025, 8, 25)),
    new Character("Milk: Blooming Bunny", true, rarities.SSR, manufacturers.Tetra, new Date(2025, 8, 11), true, new Date(2025, 9, 2)),
    new Character("Rosanna: Chic Ocean", false, rarities.SSR, manufacturers.Tetra, new Date(2025, 6, 31), true, new Date(2025, 7, 21)),
    new Character("Soda: Twinkling Bunny", true, rarities.SSR, manufacturers.Tetra, new Date(2024, 4, 30), true, new Date(2024, 5, 20)),
    new Character("Rupee: Winter Shopper", false, rarities.SSR, manufacturers.Tetra, new Date(2025, 8, 4), true, new Date(2025, 8, 25)),
    new Character("Alice: Wonderland Bunny", true, rarities.SSR, manufacturers.Tetra, new Date(2024, 5, 6), true, new Date(2024, 5, 27)),
    new Character("Ludmilla: Winter Owner", false, rarities.SSR, manufacturers.Tetra, new Date(2023, 11, 7), true, new Date(2023, 11, 28)),
    new Character("Anis: Sparkling Summer", false, rarities.SSR, manufacturers.Tetra, new Date(2025, 8, 4), true, new Date(2025, 8, 25)),
    new Character("Sakura: Bloom In Summer", false, rarities.SSR, manufacturers.Tetra, new Date(2025, 6, 24), true, new Date(2025, 7, 14)),
    
    new Character("Rapi: Red Hood", true, rarities.SSR, manufacturers.Elysion, new Date(2025, 0, 1), true, new Date(2025, 0, 23), true),
    new Character("K", true, rarities.SSR, manufacturers.Elysion, new Date(2025, 4, 29), true, new Date(2025, 5, 11)),
    new Character("D", true, rarities.SSR, manufacturers.Elysion, new Date(2023, 3, 13), true, new Date(2023, 3, 27)),
    new Character("Brid", true, rarities.SSR, manufacturers.Elysion),
    new Character("Mast", true, rarities.SSR, manufacturers.Elysion, new Date(2023, 6, 20), true, new Date(2023, 7, 3)),
    new Character("Poli", true, rarities.SSR, manufacturers.Elysion),
    new Character("Sora", true, rarities.SSR, manufacturers.Elysion, new Date(2025, 6, 3), true, new Date(2025, 6, 17)),
    new Character("Zwei", true, rarities.SSR, manufacturers.Elysion, new Date(2024, 7, 8), true, new Date(2024, 7, 21)),
    new Character("Emma", true, rarities.SSR, manufacturers.Elysion),
    new Character("Helm", true, rarities.SSR, manufacturers.Elysion, new Date(2022, 10, 10), true, new Date(2022, 10, 24)),
    new Character("Quiry", true, rarities.SSR, manufacturers.Elysion, new Date(2023, 9, 19), true, new Date(2023, 10, 1)),
    new Character("Vesti", true, rarities.SSR, manufacturers.Elysion),
    new Character("Arcana", true, rarities.SSR, manufacturers.Elysion, new Date(2025, 4, 15), true, new Date(2025, 4, 29)),
    new Character("Signal", true, rarities.SSR, manufacturers.Elysion),
    new Character("Soline", true, rarities.SSR, manufacturers.Elysion),
    new Character("Diesel", true, rarities.SSR, manufacturers.Elysion),
    new Character("Eunhwa", true, rarities.SSR, manufacturers.Elysion),
    new Character("Maiden", true, rarities.SSR, manufacturers.Elysion),
    new Character("Phantom", true, rarities.SSR, manufacturers.Elysion, new Date(2024, 9, 10), true, new Date(2024, 9, 24)),
    new Character("Miranda", true, rarities.SSR, manufacturers.Elysion),
    new Character("Privaty", true, rarities.SSR, manufacturers.Elysion),
    new Character("Marciana", true, rarities.SSR, manufacturers.Elysion, new Date(2023, 8, 21), true, new Date(2023, 9, 5)),
    new Character("Guillotine", true, rarities.SSR, manufacturers.Elysion),
    new Character("D: Killer Wife", true, rarities.SSR, manufacturers.Elysion, new Date(2024, 2, 7), true, new Date(2024, 2, 20)),
    new Character("Helm: Aquamarine", false, rarities.SSR, manufacturers.Elysion, new Date(2025, 8, 4), true, new Date(2025, 8, 25)),
    new Character("Maiden: Ice Rose", false, rarities.SSR, manufacturers.Elysion, new Date(2024, 11, 5), true, new Date(2024, 11, 26)),
    new Character("Neon: Blue Ocean", false, rarities.SSR, manufacturers.Elysion, new Date(2025, 8, 4), true, new Date(2025, 8, 25)),
    new Character("Delta: Ninja Thief", true, rarities.SSR, manufacturers.Elysion, new Date(2025, 9, 16), true, new Date(2025, 9, 29)),
    new Character("Mast: Romantic Maid", true, rarities.SSR, manufacturers.Elysion, new Date(2025, 0, 30), true, new Date(2025, 1, 19)),
    new Character("Soline: Frost Ticket", false, rarities.SSR, manufacturers.Elysion, new Date(2025, 10, 19), true, new Date(2025, 11, 7)),
    new Character("Privaty: Unkind Maid", true, rarities.SSR, manufacturers.Elysion, new Date(2024, 1, 5), true, new Date(2024, 2, 6)),
    new Character("Anchor: Innocent Maid", true, rarities.SSR, manufacturers.Elysion, new Date(2025, 1, 6), true, new Date(2025, 1, 27)),
    new Character("Emma: Tactical Upgrade", true, rarities.SSR, manufacturers.Elysion, new Date(2025, 7, 7), true, new Date(2025, 8, 4)),
    new Character("Vesti: Tactical Upgrade", true, rarities.SSR, manufacturers.Elysion, new Date(2025, 7, 21), true, new Date(2025, 8, 11)),
    new Character("Eunhwa: Tactical Upgrade", true, rarities.SSR, manufacturers.Elysion, new Date(2025, 7, 14), true, new Date(2025, 8, 4)),
    new Character("Guillotine: Winter Slayer", false, rarities.SSR, manufacturers.Elysion, new Date(2024, 11, 12), true, new Date(2024, 11, 31)),

    new Character("Mihara: Bonding Chain", true, rarities.SSR, manufacturers.Missilis, new Date(2025, 4, 1), true, new Date(2025, 4, 22), true),
    new Character("Ein", true, rarities.SSR, manufacturers.Missilis, new Date(2024, 6, 25), true, new Date(2024, 7, 8)),
    new Character("Tia", true, rarities.SSR, manufacturers.Missilis, new Date(2023, 9, 12), true, new Date(2023, 9, 26)),
    new Character("Admi", true, rarities.SSR, manufacturers.Missilis),
    new Character("Crow", true, rarities.SSR, manufacturers.Missilis),
    new Character("Mana", true, rarities.SSR, manufacturers.Missilis, new Date(2025, 0, 16), true, new Date(2025, 0, 30)),
    new Character("Mori", true, rarities.SSR, manufacturers.Missilis, new Date(2025, 3, 24)),
    new Character("Naga", true, rarities.SSR, manufacturers.Missilis, new Date(2023, 9, 5), true, new Date(2023, 9, 19)),
    new Character("Sin", false, rarities.SSR, manufacturers.Missilis),
    new Character("Tove", true, rarities.SSR, manufacturers.Missilis, new Date(2023, 10, 23), true, new Date(2023, 11, 7)),
    new Character("Yuni", true, rarities.SSR, manufacturers.Missilis),
    new Character("Centi", true, rarities.SSR, manufacturers.Missilis),
    new Character("Drake", true, rarities.SSR, manufacturers.Missilis),
    new Character("Elegg", true, rarities.SSR, manufacturers.Missilis, new Date(2024, 1, 22), true, new Date(2024, 2, 6)),
    new Character("Flora", true, rarities.SSR, manufacturers.Missilis, new Date(2024, 10, 21), true, new Date(2024, 11, 5)),
    new Character("Julia", true, rarities.SSR, manufacturers.Missilis),
    new Character("Kilo", false, rarities.SSR, manufacturers.Missilis),
    new Character("Liter", true, rarities.SSR, manufacturers.Missilis),
    new Character("Trina", true, rarities.SSR, manufacturers.Missilis, new Date(2025, 2, 13), true, new Date(2025, 2, 27)),
    new Character("Trony", true, rarities.SSR, manufacturers.Missilis, new Date(2024, 4, 16), true, new Date(2024, 4, 30)),
    new Character("Epinel", true, rarities.SSR, manufacturers.Missilis),
    new Character("Jackal", true, rarities.SSR, manufacturers.Missilis, new Date(2023, 0, 12), true, new Date(2023, 0, 25)),
    new Character("Pepper", true, rarities.SSR, manufacturers.Missilis),
    new Character("Guilty", false, rarities.SSR, manufacturers.Missilis),
    new Character("Laplace", true, rarities.SSR, manufacturers.Missilis, new Date(2022, 10, 24), true, new Date(2022, 11, 8)),
    new Character("Maxwell", true, rarities.SSR, manufacturers.Missilis),
    new Character("Quency", false, rarities.SSR, manufacturers.Missilis),
    new Character("Quency: Escape Queen", true, rarities.SSR, manufacturers.Missilis, new Date(2024, 9, 3), true, new Date(2024, 9, 17)),
    new Character("Anne: Miracle Fairy", false, rarities.SSR, manufacturers.Missilis, new Date(2025, 8, 4), true, new Date(2025, 8, 25)),
    new Character("Elegg: Boom and Shock", false, rarities.SSR, manufacturers.Missilis, new Date(2025, 6, 24), true, new Date(2025, 7, 14)),

    new Character("Noah", true, rarities.SSR, manufacturers.Pilgrim),
    new Character("Crown", true, rarities.SSR, manufacturers.Pilgrim, new Date(2024, 3, 25), true, new Date(2024, 4, 16)),
    new Character("Grave", true, rarities.SSR, manufacturers.Pilgrim, new Date(2024, 10, 7), true, new Date(2024, 10, 28)),
    new Character("Chime", false, rarities.SSR, manufacturers.Pilgrim, new Date(2025, 30, 9)),
    new Character("Harran", true, rarities.SSR, manufacturers.Pilgrim),
    new Character("Isabel", true, rarities.SSR, manufacturers.Pilgrim),
    new Character("Dorothy", true, rarities.SSR, manufacturers.Pilgrim, new Date(2025, 9, 30), true, new Date(2025, 10, 20)),
    new Character("Nayuta", false, rarities.SSR, manufacturers.Pilgrim, new Date(2025, 9, 30), true, new Date(2025, 10, 20)),
    new Character("Scarlet", true, rarities.SSR, manufacturers.Pilgrim),
    new Character("Modernia", true, rarities.SSR, manufacturers.Pilgrim, new Date(2025, 9, 30), true, new Date(2025, 10, 20)),
    new Character("Rapunzel", true, rarities.SSR, manufacturers.Pilgrim),
    new Character("Red Hood", true, rarities.SSR, manufacturers.Pilgrim, new Date(2025, 9, 30), true, new Date(2025, 10, 20)),
    new Character("Liberalio", false, rarities.SSR, manufacturers.Pilgrim, new Date(2025, 10, 6), true, new Date(2025, 10, 27)),
    new Character("Snow White", true, rarities.SSR, manufacturers.Pilgrim),
    new Character("Cinderella", true, rarities.SSR, manufacturers.Pilgrim, new Date(2024, 9, 31), true, new Date(2024, 10, 21)),
    new Character("Nihilister", false, rarities.SSR, manufacturers.Pilgrim),
    new Character("Little Mermaid", true, rarities.SSR, manufacturers.Pilgrim, new Date(2025, 3, 24), true, new Date(2025, 4, 15)),
    new Character("Rapunzel: Pure Grace", false, rarities.SSR, manufacturers.Pilgrim, new Date(2024, 9, 31)),
    new Character("Scarlet: Black Shadow", true, rarities.SSR, manufacturers.Pilgrim, new Date(2025, 0, 1), true, new Date(2025, 0, 23)),
    new Character("Dorothy: Serendipity", false, rarities.SSR, manufacturers.Pilgrim, new Date(2025, 6, 17), true, new Date(2025, 7, 7)),
    new Character("Snow White: Innocent Days", false, rarities.SSR, manufacturers.Pilgrim, new Date(2023, 10, 2))                     
].sort((l, r) => r.dateAvailable - l.dateAvailable);

export { characters, Character, manufacturers, rarities };