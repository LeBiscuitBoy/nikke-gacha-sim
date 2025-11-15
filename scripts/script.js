import { Character } from './chars.js';
import { result_elements, standard_pull  } from './gacha.js';
import { hasCharacter, addCharacterToCollection, setWishList, getPullList } from './savedata.js';


function setElementDetail(element, character) {
    const asset_url_prefix = "images/pull_assets";
    const char_url_prefix = "images/character";

    function getGlowAsset() {
        if (character.rarity === Character.Rarities.R)
            return `${asset_url_prefix}/glow_none.png`;
        else if (character.rarity === Character.Rarities.SR)
            return `${asset_url_prefix}/glow_sr.png`;
        else
            return `${asset_url_prefix}/glow_ssr.png`;
    }

    element.sparkle.src = getGlowAsset();
    element.character_card.src = `${char_url_prefix}/${character.characterCardImage}`;
    element.character_card.title = character.name;
    
    if (character.rarity !== Character.Rarities.R) {
        const addClass = (top, bottom) => element.character_card.classList.add(element.id <= 5 ? top : bottom);
        
        if (character.rarity === Character.Rarities.SR)
            addClass("sr-top", "sr-bottom");
        else
            addClass("ssr-top", "ssr-bottom");
    }

    if (hasCharacter(character.name)) {
        element.spare_body.src = `${char_url_prefix}/${character.characterSpareBodyImage}`;
        element.spare_body.title = `${character.name}'s Spare Body`;

        element.new_character.src = "";
        element.new_character.title = "";
    }
    else {
        element.spare_body.src = `${asset_url_prefix}/new_body_empty.png`;
        element.spare_body.title = "";
        
        element.new_character.src = `${asset_url_prefix}/new_character.png`;
        element.new_character.title = "New!";
    }
};


// Temporary section for programmatically adding characters to the wishlist.
setWishList({
    Pilgrim:  ["Little Mermaid", "Rapi: Red Hood", "Red Hood", "Grave", "Cinderella"],
    Elysion:  ["Emma: Tactical Upgrade", "Eunhwa: Tactical Upgrade", "Vesti: Tactical Upgrade", "Privaty", "D: Killer Wife"],
    Missilis: ["Elegg", "Maxwell", "Drake", "Laplace", "Mana"],
    Tetra:    ["Blanc", "Noir", "Bready", "Crust", "Rupee"]
});



const pulls = standard_pull(true);
for (let i = 0; i < 10; i++) {
    const element = result_elements[i];
    const character = pulls[i];

    setElementDetail(element, character);
    addCharacterToCollection(character.name);
}