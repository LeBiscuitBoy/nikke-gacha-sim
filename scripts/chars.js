class Character {
    constructor(name, isInStandardPool, rarity, manufacturer, overspec = false) {
        this._name = name;
        this._isInStandardPool = isInStandardPool;
        this._rarity = rarity;
        this._manufacturer = manufacturer;
        this._overspec = overspec;

        this._imageName = `${this._rarity}_${this._name}.png`.toLowerCase();
        Character.IllegalImageChars.forEach((c) => this._imageName = this._imageName.replaceAll(c, ""));

        this.wishlisted = false;
    }

    get name() { return this._name };
    get isInStandardPool() { return this._isInStandardPool };
    get manufacturer() { return this._manufacturer };
    get overspec() { return this._overspec };
    get rarity() { return this._rarity };

    get characterCardImage() { return `${Character.ImageUrlPrefix}/card/${this._imageName}`; }
    get characterSpareBodyImage() { return `${Character.ImageUrlPrefix}/spare_body/${this._imageName}`; }
    get characterProfileImage() { return `${Character.ImageUrlPrefix}/profile/${this._imageName}`; }


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
    static ImageUrlPrefix = "/images/character";
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
    new Character("Anchor", false, Character.Rarities.SR, Character.Manufacturers.Elysion),

    new Character("Anis", true, Character.Rarities.SR, Character.Manufacturers.Tetra),
    new Character("Mica", true, Character.Rarities.SR, Character.Manufacturers.Tetra),
    new Character("Neve", false, Character.Rarities.SR, Character.Manufacturers.Tetra),
    new Character("Belorta", true, Character.Rarities.SR, Character.Manufacturers.Tetra),

    new Character("N102", true, Character.Rarities.SR, Character.Manufacturers.Missilis),
    new Character("Ether", true, Character.Rarities.SR, Character.Manufacturers.Missilis),
    new Character("Mihara", true, Character.Rarities.SR, Character.Manufacturers.Missilis),

    new Character("Ram", false, Character.Rarities.SR, Character.Manufacturers.Abnormal),
    new Character("Lily", false, Character.Rarities.SR, Character.Manufacturers.Abnormal),
    new Character("Claire", false, Character.Rarities.SR, Character.Manufacturers.Abnormal),
    new Character("Himeno", false, Character.Rarities.SR, Character.Manufacturers.Abnormal),
    new Character("Misato", false, Character.Rarities.SR, Character.Manufacturers.Abnormal),
    new Character("Pascal", false, Character.Rarities.SR, Character.Manufacturers.Abnormal),
    new Character("Sakura Suzuhara", false, Character.Rarities.SR, Character.Manufacturers.Abnormal),


    new Character("2B", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
    new Character("A2", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
    new Character("Ada", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
    new Character("Ada", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
    new Character("EVE", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
    new Character("Mari", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
    new Character("Jill", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
    new Character("Power", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
    new Character("Raven", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
    new Character("Asuka", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
    new Character("Emilia", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
    new Character("Makima", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
    new Character("Rei Ayanami", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
    new Character("Asuka: WILLE", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
    new Character("Rei Ayanami (Tentative Name)", false, Character.Rarities.SSR, Character.Manufacturers.Abnormal),
                        
    new Character("Ade", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Bay", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Rei", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Yan", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Aria", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Clay", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Exia", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Mary", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Nero", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Noir", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Milk", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Soda", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Noise", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Novel", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Moran", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Cocoa", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Blanc", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Leona", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Alice", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Crust", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Sugar", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Viper", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Yulha", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Dolla", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Frima", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Rouge", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Rupee", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Bready", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Rumani", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Volume", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Sakura", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Biscuit", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Rosanna", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Folkwang", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Ludmilla", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Ade: Agent Bunny", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Mica: Snow Buddy", false, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Mary: Bay Goddess", false, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Milk: Blooming Bunny", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Rosanna: Chic Ocean", false, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Soda: Twinkling Bunny", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Rupee: Winter Shopper", false, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Alice: Wonderland Bunny", true, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Ludmilla: Winter Owner", false, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Anis: Sparkling Summer", false, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    new Character("Sakura: Bloom In Summer", false, Character.Rarities.SSR, Character.Manufacturers.Tetra),
    
    new Character("Rapi: Red Hood", true, Character.Rarities.SSR, Character.Manufacturers.Elysion, true),
    new Character("K", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("D", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Brid", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Mast", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Poli", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Sora", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Zwei", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Emma", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Helm", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Quiry", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Vesti", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Arcana", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Signal", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Soline", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Diesel", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Eunhwa", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Maiden", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Phantom", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Miranda", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Privaty", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Marciana", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Guillotine", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("D: Killer Wife", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Helm: Aquamarine", false, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Maiden: Ice Rose", false, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Neon: Blue Ocean", false, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Delta: Ninja Thief", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Mast: Romantic Maid", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Privaty: Unkind Maid", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Anchor: Innocent Maid", false, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Emma: Tactical Upgrade", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Vesti: Tactical Upgrade", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Eunhwa: Tactical Upgrade", true, Character.Rarities.SSR, Character.Manufacturers.Elysion),
    new Character("Guillotine: Winter Slayer", false, Character.Rarities.SSR, Character.Manufacturers.Elysion),

    new Character("Mihara: Bonding Chain", true, Character.Rarities.SSR, Character.Manufacturers.Missilis, true),
    new Character("Ein", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Tia", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Admi", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Crow", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Mana", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Mori", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Naga", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Sin", false, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Tove", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Yuni", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Centi", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Drake", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Elegg", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Flora", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Julia", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Kilo", false, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Liter", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Trina", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Trony", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Epinel", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Jackal", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Pepper", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Guilty", false, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Laplace", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Maxwell", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Quency", false, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Quency: Escape Queen", true, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Anne: Miracle Fairy", false, Character.Rarities.SSR, Character.Manufacturers.Missilis),
    new Character("Elegg: Boom and Shock", false, Character.Rarities.SSR, Character.Manufacturers.Missilis),

    new Character("Noah", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Crown", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Grave", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Chime", false, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Harran", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Isabel", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Dorothy", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Nayuta", false, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Scarlet", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Modernia", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Rapunzel", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Red Hood", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Liberalio", false, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Snow White", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Cinderella", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Nihilister", false, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Little Mermaid", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Rapunzel: Pure Grace", false, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Scarlet: Black Shadow", true, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Dorothy: Serendipity", false, Character.Rarities.SSR, Character.Manufacturers.Pilgrim),
    new Character("Snow White: Innocent Days", false, Character.Rarities.SSR, Character.Manufacturers.Pilgrim)                     
];


export { characters, Character };