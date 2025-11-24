import { getManufacturerMoldPool, getRateUpPool, getStandardPool } from './pools.js';


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
        self: p,
        sparkle: p.getElementsByClassName("sparkle")[0],
        character_card: p.getElementsByClassName("character-card")[0],
        spare_body: p.getElementsByClassName("spare-body")[0],
        new_character: p.getElementsByClassName("new-character")[0]
    }
}).sort((l, r) => l.id - r.id);

const getRandomElementFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

function get_character_from_pool(pools, roll, has_rate_up_character) {
    if (roll <= pools.R.Rate)
        return getRandomElementFromArray(pools.R.Characters);
    else if (roll <= (pools.R.Rate + pools.SR.Rate))
        return getRandomElementFromArray(pools.SR.Characters);
    else if (roll <= (pools.R.Rate + pools.SR.Rate + pools.SSR.Rate))
        return getRandomElementFromArray(pools.SSR.Characters);
    else {
        if (!has_rate_up_character)
            return getRandomElementFromArray(pools.Special.Characters);

        if (roll <= pools.R.Rate + pools.SR.Rate + pools.SSR.Rate + pools.Special.Rate)  
            return getRandomElementFromArray(pools.Special.Characters);
        else
            return pools.RateUp.Character;
    }
};
function roll_against_pool(pool, is_ten_pull, has_rate_up_character) {
    const roll = () => get_character_from_pool(pool, Math.random() * 100, has_rate_up_character);
    
    if (!is_ten_pull)
        return [ roll() ];

    let pulls = [];
    for (let r = 0; r < 10; r++)
        pulls.push(roll());
    return pulls;
}


const special_pull = (rate_up_character, is_ten_pull = true) => roll_against_pool(getRateUpPool(rate_up_character), is_ten_pull, true);
const standard_pull = (is_ten_pull = true) => roll_against_pool(getStandardPool(), is_ten_pull, false);
const mold_pull = (manufacturer) => roll_against_pool(getManufacturerMoldPool(manufacturer), false, false);

export { result_elements, lineup_elements, standard_pull, special_pull, mold_pull };