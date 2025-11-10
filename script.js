import { characters, Character} from './chars.js';


{ // Temporary section for programmatically adding characters to the wishlist.
    const setWishlist = (name, wish) => characters.find((c) => c.name === name).wishlisted = wish;

    // Pilgrim/overspec
    setWishlist("Little Mermaid", true);
    setWishlist("Rapi: Red Hood", true);
    setWishlist("Modernia", true);
    setWishlist("Scarlet", true);
    setWishlist("Rapunzel", true);

    // Elysion
    setWishlist("Emma", true);
    setWishlist("Eunhwa", true);
    setWishlist("Vesti", true);
    setWishlist("Privaty", true);
    setWishlist("D: Killer Wife", true);

    // Missilis
    setWishlist("Yuni", true);
    setWishlist("Maxwell", true);
    setWishlist("Drake", true);
    setWishlist("Laplace", true);
    setWishlist("Elegg", true);

    // Tetra
    setWishlist("Blanc", true);
    setWishlist("Noir", true);
    setWishlist("Bready", true);
    setWishlist("Crust", true);
    setWishlist("Yulha", true);
}


const standardPool = characters.filter((c) => 
    (c.isInStandardPool && c.rarity === Character.Rarities.SSR && c.wishlisted) || 
    (c.isInStandardPool && c.rarity !== Character.Rarities.SSR));

const charsR = standardPool.filter((c) => c.rarity === Character.Rarities.R);
const charsSR = standardPool.filter((c) => c.rarity === Character.Rarities.SR);
const charsSSR = standardPool.filter((c) => c.rarity === Character.Rarities.SSR && !c.overspec && c.manufacturer !== Character.Manufacturers.Pilgrim);
const charsSpecialSSR = standardPool.filter((c) => c.rarity === Character.Rarities.SSR && (c.manufacturer === Character.Manufacturers.Pilgrim || c.overspec));


const roundToNearestHalf = (num) => {
    const flooredNum = Math.floor(num);
    const decimalPortion = Math.abs(num - flooredNum);

    if (decimalPortion > 0.75) return flooredNum + 1;
    if (decimalPortion > 0.25) return flooredNum + 0.5;
    return flooredNum;
}
const getRandomIndexFromArray = (arr) => Math.floor(Math.random() * arr.length);

function gamble() {
    const rateR = 53;
    const rateSR = 43;
    const rateSSR = 3.5;
    let rolledCharacters = [];

    for (let i = 0; i < 10; i++) {
        const roll = roundToNearestHalf(Math.random() * 100);

        if (roll <= rateR)
            rolledCharacters.push(charsR[getRandomIndexFromArray(charsR)]);
        else if (roll <= (rateR + rateSR))
            rolledCharacters.push(charsSR[getRandomIndexFromArray(charsSR)]);
        else if (roll <= (rateR + rateSR + rateSSR))
            rolledCharacters.push(charsSSR[getRandomIndexFromArray(charsSSR)]);
        else 
            rolledCharacters.push(charsSpecialSSR[getRandomIndexFromArray(charsSpecialSSR)]);
    }
    return rolledCharacters;
}


let i = 0;
gamble().forEach((c) => console.log(`${++i} - ${c.name}: ${c.rarity}`));