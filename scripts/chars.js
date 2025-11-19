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


    static Rarities = { 
        SSR: "SSR", 
        SR: "SR", 
        R: "R" 
    };
    static Manufacturers = {
        Elysion: "Elysion",
        Missilis: "Missilis",
        Tetra: "Tetra",
        Pilgrim: "Pilgrim",
        Abnormal: "Abnormal"
    }
    static IllegalImageChars = [":", " ", "(", ")"];
}

const characters = [
    new Character("IDoll Sun", true, Character.Rarities.R, Character.Manufacturers.Tetra),
    new Character("IDoll Ocean", true, Character.Rarities.R, Character.Manufacturers.Tetra),
    new Character("IDoll Flower", true, Character.Rarities.R, Character.Manufacturers.Tetra),

    new Character("Product 08", true, Character.Rarities.R, Character.Manufacturers.Missilis),
    new Character("Product 12", true, Character.Rarities.R, Character.Manufacturers.Missilis),
    new Character("Product 23", true, Character.Rarities.R, Character.Manufacturers.Missilis),

    new Character("Soldier EG", true, Character.Rarities.R, Character.Manufacturers.Elysion),
    new Character("Soldier FA", true, Character.Rarities.R, Character.Manufacturers.Elysion),
    new Character("Soldier OW", true, Character.Rarities.R, Character.Manufacturers.Elysion),


    new Character("Neon", true, Character.Rarities.SR, Character.Manufacturers.Elysion),
    new Character("Rapi", true, Character.Rarities.SR, Character.Manufacturers.Elysion),
    new Character("Delta", true, Character.Rarities.SR, Character.Manufacturers.Elysion),
    new Character("Anchor", false, Character.Rarities.SR, Character.Manufacturers.Elysion, new Date(2023, 7, 3)),

    new Character("Anis", true, Character.Rarities.SR, Character.Manufacturers.Tetra),
    new Character("Mica", true, Character.Rarities.SR, Character.Manufacturers.Tetra),
    new Character("Neve", false, Character.Rarities.SR, Character.Manufacturers.Tetra, new Date(2022, 11, 8)),
    new Character("Belorta", true, Character.Rarities.SR, Character.Manufacturers.Tetra),

    new Character("N102", true, Character.Rarities.SR, Character.Manufacturers.Missilis),
    new Character("Ether", true, Character.Rarities.SR, Character.Manufacturers.Missilis),
    new Character("Mihara", true, Character.Rarities.SR, Character.Manufacturers.Missilis),

    new Character("Ram", false, Character.Rarities.SR, Character.Manufacturers.Abnormal, new Date(2024, 2, 21)),
    new Character("Lily", false, Character.Rarities.SR, Character.Manufacturers.Abnormal, new Date(2025, 5, 12)),
    new Character("Claire", false, Character.Rarities.SR, Character.Manufacturers.Abnormal, new Date(2025, 8, 24)),
    new Character("Himeno", false, Character.Rarities.SR, Character.Manufacturers.Abnormal, new Date(2023, 1, 22)),
    new Character("Misato", false, Character.Rarities.SR, Character.Manufacturers.Abnormal, new Date(2024, 7, 22)),
    new Character("Pascal", false, Character.Rarities.SR, Character.Manufacturers.Abnormal, new Date(2023, 8, 1)),
    new Character("Sakura Suzuhara", false, Character.Rarities.SR, Character.Manufacturers.Abnormal, new Date(2025, 1, 20)),


    new Character("2B", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2025, 6, 3), true, new Date(2025, 6, 31)),
    new Character("A2", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2025, 6, 10), true, new Date(2023, 6, 31)),
    new Character("Rem", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2024, 2, 27), true, new Date(2024, 3, 11)),
    new Character("Ada", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2025, 8, 24), true, new Date(2025, 9, 21)),
    new Character("EVE", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2025, 5, 12), true, new Date(2025, 6, 3)),
    new Character("Mari", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2025, 1, 27), true, new Date(2025, 2, 13)),
    new Character("Jill", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2025, 9, 2), true, new Date(2025, 9, 21)),
    new Character("Power", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2023, 1, 22), true, new Date(2023, 2, 15)),
    new Character("Raven", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2025, 5, 19), true, new Date(2025, 6, 10)),
    new Character("Asuka", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2025, 1, 20), true, new Date(2025, 2, 13)),
    new Character("Emilia", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2024, 2, 21), true, new Date(2024, 3, 11)),
    new Character("Makima", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2023, 1, 22), true, new Date(2023, 2, 15)),
    new Character("Rei Ayanami", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2025, 1, 27), true, new Date(2025, 2, 13)),
    new Character("Asuka: WILLE", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2025, 1, 20), true, new Date(2025, 2, 13)),
    new Character("Rei Ayanami (Tentative Name)", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal, new Date(2025, 1, 27), true, new Date(2025, 2, 13)),
                        
    new Character("Ade", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2024, 1, 15), true, new Date(2024, 1, 29)),
    new Character("Bay", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2024, 3, 11), true, new Date(2024, 3, 23)),
    new Character("Rei", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Yan", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Aria", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Clay", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2024, 5, 20), true, new Date(2024, 6, 3)),
    new Character("Exia", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Mary", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Nero", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2023, 6, 6), true, new Date(2023, 6, 20)),
    new Character("Noir", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2023, 4, 25), true, new Date(2023, 5, 8)),
    new Character("Milk", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Soda", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2023, 1, 1), true, new Date(2023, 2, 5)),
    new Character("Noise", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Novel", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Moran", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2024, 0, 25), true, new Date(2024, 1, 8)),
    new Character("Cocoa", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2023, 1, 1), true, new Date(2023, 2, 5)),
    new Character("Blanc", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2023, 4, 18), true, new Date(2023, 5, 1)),
    new Character("Leona", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2024, 0, 11), true, new Date(2024, 0, 25)),
    new Character("Alice", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2023, 3, 13), true, new Date(2023, 3, 27)),
    new Character("Crust", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2025, 3, 10), true, new Date(2025, 3, 23)),
    new Character("Sugar", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Viper", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2023, 0, 12), true, new Date(2023, 0, 25)),
    new Character("Yulha", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Dolla", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Frima", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Rouge", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2024, 8, 19), true, new Date(2024, 9, 3)),
    new Character("Rupee", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Bready", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2025, 2, 27), true, new Date(2025, 3, 10)),
    new Character("Rumani", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2024, 9, 17), true, new Date(2024, 9, 30)),
    new Character("Volume", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Sakura", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2023, 2, 30), true, new Date(2023, 3, 13)),
    new Character("Biscuit", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2023, 2, 15), true, new Date(2023, 2, 30)),
    new Character("Rosanna", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2023, 5, 1), true, new Date(2023, 5, 15)),
    new Character("Folkwang", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Ludmilla", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Ade: Agent Bunny", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2025, 8, 4),true, new Date(2025, 8, 23)),
    new Character("Mica: Snow Buddy", false, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2023, 11, 14), true, new Date(2023, 11, 31)),
    new Character("Mary: Bay Goddess", false, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2025, 8, 4), true, new Date(2025, 8, 25)),
    new Character("Milk: Blooming Bunny", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2025, 8, 11), true, new Date(2025, 9, 2)),
    new Character("Rosanna: Chic Ocean", false, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2025, 6, 31), true, new Date(2025, 7, 21)),
    new Character("Soda: Twinkling Bunny", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2024, 4, 30), true, new Date(2024, 5, 20)),
    new Character("Rupee: Winter Shopper", false, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2025, 8, 4), true, new Date(2025, 8, 25)),
    new Character("Alice: Wonderland Bunny", true, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2024, 5, 6), true, new Date(2024, 5, 27)),
    new Character("Ludmilla: Winter Owner", false, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2023, 11, 7), true, new Date(2023, 11, 28)),
    new Character("Anis: Sparkling Summer", false, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2025, 8, 4), true, new Date(2025, 8, 25)),
    new Character("Sakura: Bloom In Summer", false, Character.Rarities.SSR, Character.Manufacturers.Tetra, new Date(2025, 6, 24), true, new Date(2025, 7, 14)),
    
    new Character("Rapi: Red Hood", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2025, 0, 1), true, new Date(2025, 0, 23), true),
    new Character("K", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2025, 4, 29), true, new Date(2025, 5, 11)),
    new Character("D", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2023, 3, 13), true, new Date(2023, 3, 27)),
    new Character("Brid", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Mast", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2023, 6, 20), true, new Date(2023, 7, 3)),
    new Character("Poli", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Sora", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2025, 6, 3), true, new Date(2025, 6, 17)),
    new Character("Zwei", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2024, 7, 8), true, new Date(2024, 7, 21)),
    new Character("Emma", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Helm", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2022, 10, 10), true, new Date(2022, 10, 24)),
    new Character("Quiry", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2023, 9, 19), true, new Date(2023, 10, 1)),
    new Character("Vesti", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Arcana", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2025, 4, 15), true, new Date(2025, 4, 29)),
    new Character("Signal", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Soline", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Diesel", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Eunhwa", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Maiden", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Phantom", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2024, 9, 10), true, new Date(2024, 9, 24)),
    new Character("Miranda", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Privaty", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Marciana", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2023, 8, 21), true, new Date(2023, 9, 5)),
    new Character("Guillotine", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("D: Killer Wife", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2024, 2, 7), true, new Date(2024, 2, 20)),
    new Character("Helm: Aquamarine", false, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2025, 8, 4), true, new Date(2025, 8, 25)),
    new Character("Maiden: Ice Rose", false, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2024, 11, 5), true, new Date(2024, 11, 26)),
    new Character("Neon: Blue Ocean", false, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2025, 8, 4), true, new Date(2025, 8, 25)),
    new Character("Delta: Ninja Thief", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2025, 9, 16), true, new Date(2025, 9, 29)),
    new Character("Mast: Romantic Maid", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2025, 0, 30), true, new Date(2025, 1, 19)),
    new Character("Privaty: Unkind Maid", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2024, 1, 5), true, new Date(2024, 2, 6)),
    new Character("Anchor: Innocent Maid", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2025, 1, 6), true, new Date(2025, 1, 27)),
    new Character("Emma: Tactical Upgrade", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2025, 7, 7), true, new Date(2025, 8, 4)),
    new Character("Vesti: Tactical Upgrade", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2025, 7, 21), true, new Date(2025, 8, 11)),
    new Character("Eunhwa: Tactical Upgrade", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2025, 7, 14), true, new Date(2025, 8, 4)),
    new Character("Guillotine: Winter Slayer", false, Character.Rarities.SSR, Character.Manufacturers.Elysion, new Date(2024, 11, 12), true, new Date(2024, 11, 31)),

    new Character("Mihara: Bonding Chain", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2025, 4, 1), true, new Date(2025, 4, 22), true),
    new Character("Ein", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2024, 6, 25), true, new Date(2024, 7, 8)),
    new Character("Tia", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2023, 9, 12), true, new Date(2023, 9, 26)),
    new Character("Admi", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Crow", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Mana", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2025, 0, 16), true, new Date(2025, 0, 30)),
    new Character("Mori", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2025, 3, 24)),
    new Character("Naga", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2023, 9, 5), true, new Date(2023, 9, 19)),
    new Character("Sin", false, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Tove", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2023, 10, 23), true, new Date(2023, 11, 7)),
    new Character("Yuni", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Centi", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Drake", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Elegg", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2024, 1, 22), true, new Date(2024, 2, 6)),
    new Character("Flora", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2024, 10, 21), true, new Date(2024, 11, 5)),
    new Character("Julia", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Kilo", false, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Liter", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Trina", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2025, 2, 13), true, new Date(2025, 2, 27)),
    new Character("Trony", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2024, 4, 16), true, new Date(2024, 4, 30)),
    new Character("Epinel", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Jackal", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2023, 0, 12), true, new Date(2023, 0, 25)),
    new Character("Pepper", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Guilty", false, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Laplace", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2022, 10, 24), true, new Date(2022, 11, 8)),
    new Character("Maxwell", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Quency", false, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Quency: Escape Queen", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2024, 9, 3), true, new Date(2024, 9, 17)),
    new Character("Anne: Miracle Fairy", false, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2025, 8, 4), true, new Date(2025, 8, 25)),
    new Character("Elegg: Boom and Shock", false, Character.Rarities.SSR, Character.Manufacturers.Missilis, new Date(2025, 6, 24), true, new Date(2025, 7, 14)),

    new Character("Noah", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Crown", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim, new Date(2024, 3, 25), true, new Date(2024, 4, 16)),
    new Character("Grave", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim, new Date(2024, 10, 7), true, new Date(2024, 10, 28)),
    new Character("Chime", false, Character.Rarities.SSR, Character.Manufacturers.Pilgrim, new Date(2025, 30, 9)),
    new Character("Harran", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Isabel", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Dorothy", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim, new Date(2025, 9, 30), true, new Date(2025, 10, 20)),
    new Character("Nayuta", false, Character.Rarities.SSR, Character.Manufacturers.Pilgrim, new Date(2025, 9, 30), true, new Date(2025, 10, 20)),
    new Character("Scarlet", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Modernia", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim, new Date(2025, 9, 30), true, new Date(2025, 10, 20)),
    new Character("Rapunzel", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Red Hood", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim, new Date(2025, 9, 30), true, new Date(2025, 10, 20)),
    new Character("Liberalio", false, Character.Rarities.SSR, Character.Manufacturers.Pilgrim, new Date(2025, 10, 6), true, new Date(2025, 10, 27)),
    new Character("Snow White", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Cinderella", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim, new Date(2024, 9, 31), true, new Date(2024, 10, 21)),
    new Character("Nihilister", false, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Little Mermaid", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim, new Date(2025, 3, 24), true, new Date(2025, 4, 15)),
    new Character("Rapunzel: Pure Grace", false, Character.Rarities.SSR, Character.Manufacturers.Pilgrim, new Date(2024, 9, 31)),
    new Character("Scarlet: Black Shadow", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim, new Date(2025, 0, 1), true, new Date(2025, 0, 23)),
    new Character("Dorothy: Serendipity", false, Character.Rarities.SSR, Character.Manufacturers.Pilgrim, new Date(2025, 6, 17), true, new Date(2025, 7, 7)),
    new Character("Snow White: Innocent Days", false, Character.Rarities.SSR, Character.Manufacturers.Pilgrim, new Date(2023, 10, 2))                     
].sort((l, r) => r.dateAvailable - l.dateAvailable);

export { characters, Character };