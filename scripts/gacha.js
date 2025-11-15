import { Character, characters } from './chars.js';
import { setWishList, characterOnWishlist } from './savedata.js';


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

export { result_elements };