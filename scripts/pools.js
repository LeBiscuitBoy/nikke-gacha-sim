import { Character, characters } from './chars.js';
import { characterOnWishlist } from './savedata.js';



const standard_pool_filter = (character, rarity) => character.isInStandardPool && character.rarity === rarity;
const is_special_character = (character) => character.manufacturer === Character.Manufacturers.Pilgrim || character.overspec;

const pools = {
    R: characters.filter((c) => standard_pool_filter(c, Character.Rarities.R)),
    SR: characters.filter((c) => standard_pool_filter(c, Character.Rarities.SR)),
    SSR: characters.filter((c) => standard_pool_filter(c, Character.Rarities.SSR))
}


function getManufacturerMoldPool(manufacturer) {
    return {
        R: {
            Characters: pools.R,
            Rate: 20
        },
        SR: {
            Characters: pools.SR,
            Rate: 30
        },
        SSR: {
            Characters: (manufacturer !== Character.Manufacturers.Pilgrim) ? 
                pools.SSR.filter((c) => c.manufacturer === manufacturer && !is_special_character(c)) : 
                pools.SSR.filter((c) => is_special_character(c)),
            Rate: 50
        }
    }
}

function getStandardPool() {    
    return {
        R: {
            Characters: pools.R,
            Rate: 53
        },
        SR: {
            Characters: pools.SR,
            Rate: 43
        },
        SSR: {
            Characters: pools.SSR.filter((c) => characterOnWishlist(c.name) && !is_special_character(c)),
            Rate: 3.5
        },
        Special: {
            Characters: pools.SSR.filter((c) => characterOnWishlist(c.name) && is_special_character(c)),
            Rate: 0.5
        }
    };
}

function getRateUpPool(rate_up_character) {
    const rate_up_special = is_special_character(rate_up_character);
    const special_pool_filter = (character) => 
        character.dateAvailable <= rate_up_character.dateAvailable &&
        character.name !== rate_up_character.name;

    return {
        R: {
            Characters: pools.R,
            Rate: 53
        },
        SR: {
            Characters: pools.SR,
            Rate: 43
        },
        SSR: {
            Characters: pools.SSR.filter((c) => special_pool_filter(c) && !is_special_character(c)),
            Rate: rate_up_special ? 2.5 : 1.75
        },
        Special: {
            Characters: pools.SSR.filter((c) => special_pool_filter(c) && is_special_character(c)),
            Rate: rate_up_special ? 0.5 : 0.25
        },
        RateUp: {
            Character: rate_up_character,
            Rate: rate_up_special ? 1 : 2
        }
    };
}


export { getManufacturerMoldPool, getStandardPool, getRateUpPool };