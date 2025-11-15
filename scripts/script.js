import { Character } from './chars.js';
import { result_elements, standard_pull  } from './gacha.js';
import { hasCharacter, addCharacterToCollection, setWishList, getCharacterPullCount } from './savedata.js';


function setCardElementDetail(element, character) {
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
    function setImageDetail(img, source = "", title = "") {
        img.src = source;
        img.title = title;
    }

    setImageDetail(element.sparkle, getGlowAsset());
    setImageDetail(element.character_card, `${char_url_prefix}/${character.characterCardImage}`, character.name);

    if (character.rarity !== Character.Rarities.R) {
        const addClass = (top, bottom) => element.character_card.classList.add(element.id <= 5 ? top : bottom);
        
        if (character.rarity === Character.Rarities.SR)
            addClass("sr-top", "sr-bottom");
        else
            addClass("ssr-top", "ssr-bottom");
    }


    if (hasCharacter(character.name).state) {
        const showSpareBody = (rarity, pull_count) => 
            (rarity === Character.Rarities.R && pull_count <= 2) || 
            (rarity === Character.Rarities.SR && pull_count <= 3) || 
            (rarity === Character.Rarities.SSR && pull_count <= 11);

        setImageDetail(element.new_character);
        if (showSpareBody(character.rarity, getCharacterPullCount(character.name)))
            setImageDetail(element.spare_body, `${char_url_prefix}/${character.characterSpareBodyImage}`, `${character.name}'s Spare Body`);
        else
            setImageDetail(element.spare_body);
    }
    else {
        setImageDetail(element.spare_body);
        setImageDetail(element.new_character, `${asset_url_prefix}/new_character.png`, "New!");
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

    setCardElementDetail(element, character);
    addCharacterToCollection(character.name);
}