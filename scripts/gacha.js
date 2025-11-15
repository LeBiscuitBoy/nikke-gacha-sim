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


export { result_elements };