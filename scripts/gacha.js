import { Character, characters } from './chars.js';
import { characterOnWishlist } from './savedata.js';


const result_elements = Array.from(document.getElementsByClassName("result-container")).map((p) => {
    return {
        id: parseInt(p.id.substring(p.id.indexOf("-") + 1)),
        sparkle: p.getElementsByClassName("sparkle")[0],
        character_card: p.getElementsByClassName("character-card")[0],
        spare_body: p.getElementsByClassName("spare-body")[0],
        new_character: p.getElementsByClassName("new-character")[0]
    }
}).sort((l, r) => l.id - r.id);


const getRandomElementFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];
const roundToNearestHalf = (num) => {
    const flooredNum = Math.floor(num);
    const decimalPortion = Math.abs(num - flooredNum);

    if (decimalPortion > 0.75) return flooredNum + 1;
    if (decimalPortion > 0.25) return flooredNum + 0.5;
    return flooredNum;
}

function special_pull(rate_up_character, is_ten_pull = true) {
    console.log("NOT YET IMPLEMENTED");
}

function standard_pull(is_ten_pull = true) {
    const pool_filter = (character, rarity) => character.isInStandardPool && character.rarity === rarity;
    const is_special_character = (character) => character.manufacturer === Character.Manufacturers.Pilgrim || character.overspec;
    const pools = {
        R: {
            Characters: characters.filter((c) => pool_filter(c, Character.Rarities.R)),
            Rate: 53
        },
        SR: {
            Characters: characters.filter((c) => pool_filter(c, Character.Rarities.SR)),
            Rate: 43
        },
        SSR: {
            Characters: characters.filter((c) => pool_filter(c, Character.Rarities.SSR) && characterOnWishlist(c.name) && !is_special_character(c)),
            Rate: 3.5
        },
        Special: {
            Characters: characters.filter((c) => pool_filter(c, Character.Rarities.SSR) && characterOnWishlist(c.name) && is_special_character(c)),
            Rate: 0.5
        }
    };
    const get_character = (roll) => {
        if (roll <= pools.R.Rate)
            return getRandomElementFromArray(pools.R.Characters);
        else if (roll <= (pools.R.Rate + pools.SR.Rate))
            return getRandomElementFromArray(pools.SR.Characters);
        else if (roll <= (pools.R.Rate + pools.SR.Rate + pools.SSR.Rate))
            return getRandomElementFromArray(pools.SSR.Characters);
        else 
            return getRandomElementFromArray(pools.Special.Characters);
    };


    if (!is_ten_pull)
        return get_character(roundToNearestHalf(Math.random() * 100));

    let pulls = [];
    for (let r = 0; r < 10; r++)
        pulls.push(get_character(roundToNearestHalf(Math.random() * 100)));
    return pulls;
}


export { result_elements, standard_pull, special_pull };