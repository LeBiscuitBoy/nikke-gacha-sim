import { characters, Character} from './chars.js';


{ // Temporary section for programmatically adding characters to the wishlist.
    const setWishlist = (name, wish) => characters.find((c) => c.name === name).wishlisted = wish;

    // Pilgrim/overspec
    setWishlist("Little Mermaid", true);
    setWishlist("Rapi: Red Hood", true);
    setWishlist("Red Hood", true);
    setWishlist("Grave", true);
    setWishlist("Cinderella", true);

    // Elysion
    setWishlist("Emma: Tactical Upgrade", true);
    setWishlist("Eunhwa: Tactical Upgrade", true);
    setWishlist("Vesti: Tactical Upgrade", true);
    setWishlist("Privaty", true);
    setWishlist("D: Killer Wife", true);

    // Missilis
    setWishlist("Elegg", true);
    setWishlist("Maxwell", true);
    setWishlist("Drake", true);
    setWishlist("Laplace", true);
    setWishlist("Elegg", true);

    // Tetra
    setWishlist("Blanc", true);
    setWishlist("Noir", true);
    setWishlist("Bready", true);
    setWishlist("Crust", true);
    setWishlist("Rupee", true);
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


let i = 1;
gamble().forEach((c) => {
    const image_dir = "/images/pull_assets/";

    const result_container = document.getElementById(`result-${i}`);
    const char_image = result_container.getElementsByClassName("char-img")[0];
    const new_char = result_container.getElementsByClassName("new-char-img")[0];
    const spare_body = result_container.getElementsByClassName("spare-body-label")[0];
    const sparkle = result_container.getElementsByClassName("sparkle")[0];

    char_image.src = c.characterImage;
    char_image.setAttribute("title", c.name);
    char_image.setAttribute("alt", c.name);

    const top = i++ < 6;
    if (c.rarity === "SSR") {
        char_image.classList.add(top ? "ssr-top" : "ssr-bottom");
        sparkle.src = `${image_dir}glow_ssr.png`;
    }
    else if (c.rarity === "SR") {
        char_image.classList.add(top ? "sr-top" : "sr-bottom");
        sparkle.src = `${image_dir}glow_sr.png`;
    }
});
