import { Character, characters } from './chars.js';
import { characterOnWishlist } from './savedata.js';


const lineup_elements = Array.from(document.getElementsByClassName("result-icon")).map((e) => {
    return {
        id: parseInt(e.id.substring(e.id.lastIndexOf("-") + 1)),
        self: e,
        icon: e.getElementsByClassName("icon-figure")[0],
        glow: e.getElementsByClassName("icon-glow")[0]
    }
});
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


function get_character_from_pool(pools, roll, has_banner_character) {
    if (roll <= pools.R.Rate)
        return getRandomElementFromArray(pools.R.Characters);
    else if (roll <= (pools.R.Rate + pools.SR.Rate))
        return getRandomElementFromArray(pools.SR.Characters);
    else if (roll <= (pools.R.Rate + pools.SR.Rate + pools.SSR.Rate))
        return getRandomElementFromArray(pools.SSR.Characters);
    else {
        if (!has_banner_character)
            return getRandomElementFromArray(pools.Special.Characters);

        if (roll <= pools.R.Rate + pools.SR.Rate + pools.SSR.Rate + pools.Special.Rate)  
            return getRandomElementFromArray(pools.Special.Characters);
        else
            return pools.RateUp.Character;
    }
};

function special_pull(rate_up_character, is_ten_pull = true) {
    const pool_filter = (character, rarity) => character.isInStandardPool && character.rarity === rarity;
    const isSpecial = (character) => (character.overspec || character.manufacturer === Character.Manufacturers.Pilgrim);

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
            Characters: characters.filter((c) => pool_filter(c, Character.Rarities.SSR) && !isSpecial(c) &&
                c.name !== rate_up_character.name),
            Rate: isSpecial(rate_up_character) ? 2 : 1.5
        },
        Special: {
            Characters : characters.filter((c) => c.rarity === Character.Rarities.SSR && 
                c.isInStandardPool && isSpecial(c)),
            Rate: isSpecial(rate_up_character) ? 1 : 0.5
        },
        RateUp: {
            Character: rate_up_character,
            Rate: isSpecial(rate_up_character) ? 1 : 2
        }
    };

    if (!is_ten_pull)
        return [ get_character_from_pool(pools, roundToNearestHalf(Math.random() * 100), true) ];

    let pulls = [];
    for (let r = 0; r < 10; r++)
        pulls.push(get_character_from_pool(pools, roundToNearestHalf(Math.random() * 100), true));

    return pulls;
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

    if (!is_ten_pull)
        return [ get_character_from_pool(pools,roundToNearestHalf(Math.random() * 100), false) ];

    let pulls = [];
    for (let r = 0; r < 10; r++)
        pulls.push(get_character_from_pool(pools, roundToNearestHalf(Math.random() * 100), false));
    return pulls;
}


export { result_elements, lineup_elements, standard_pull, special_pull };