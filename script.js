import { characters, Character} from './chars.js';


{
    const setWishlist = (name, wish) => characters.find((c) => c.name === name).wishlisted = wish;

    setWishlist("Little Mermaid", true);
    setWishlist("Rapi: Red Hood", true);
    setWishlist("Modernia", true);
    setWishlist("Scarlet", true);
    setWishlist("Rapunzel", true);
}


const standardPool = characters.filter((c) => 
    (c.isInStandardPool && c.rarity === Character.Rarities.SSR && c.wishlisted) || 
    (c.isInStandardPool && c.rarity !== Character.Rarities.SSR));


console.log((4 - 0.5) / 15.0);