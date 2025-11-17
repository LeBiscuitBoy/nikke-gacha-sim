import { Character, characters } from './chars.js';
import { result_elements, lineup_elements, standard_pull, special_pull  } from './gacha.js';
import { hasCharacter, addCharacterToCollection, getCharacterPullCount, setWishList } from './savedata.js';



// Temporary section for programmatically adding characters to the wishlist.
setWishList({
    Pilgrim:  ["Little Mermaid", "Rapi: Red Hood", "Red Hood", "Grave", "Cinderella"],
    Elysion:  ["Emma: Tactical Upgrade", "Eunhwa: Tactical Upgrade", "Vesti: Tactical Upgrade", "Privaty", "D: Killer Wife"],
    Missilis: ["Elegg", "Maxwell", "Drake", "Laplace", "Mana"],
    Tetra:    ["Blanc", "Noir", "Bready", "Crust", "Rupee"]
});



const query_parameters = new URLSearchParams(window.location.search);
const banner_parameters = {
    IsSinglePull: query_parameters.has("singlepull"),
    GetRateUpCharacter: () => {
        const param = "character";
        const char = query_parameters.has(param) ? characters.find((c) => 
            c.bannerName === query_parameters.get(param).toLowerCase() &&
            c.rarity == Character.Rarities.SSR && 
            c.hasBanner) : null;
        return char != null ? char : null;
    }
};

function setImageDetail(img, source = "", title = "") {
    img.src = source;
    img.title = title;
}

function setCardElementDetail(element, character, from_single_pull = false) {
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

    setImageDetail(element.sparkle, getGlowAsset());
    setImageDetail(element.character_card, `${char_url_prefix}/${character.characterCardImage}`, character.name);

    if (from_single_pull) {
        const bottom_glow = new Image();
        bottom_glow.src = getGlowAsset();
        bottom_glow.style.position = "relative";
        bottom_glow.style.zIndex = "-1";
        bottom_glow.style.transform = "scaleY(-1)";
        element.self.appendChild(bottom_glow);

        element.new_character.style.top = "29%";
        element.spare_body.style.bottom = "27%";
    }

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



const rate_up_character = banner_parameters.GetRateUpCharacter();
const is_rate_up = (rate_up_character != null);
{
    const currency_prefix = "images/pull_assets/currency";
    const reroll_currency = document.getElementById("reroll-currency");
    const gained_ticket = document.getElementById("gained-ticket-image");

    if (is_rate_up) {
        setImageDetail(reroll_currency, `${currency_prefix}/special_recruit_ticket.webp`, "Special Recruitment Ticket");
        setImageDetail(gained_ticket, `${currency_prefix}/golden_mileage_ticket.png`, "Golden Mileage Ticket");
    }
    else {
        setImageDetail(reroll_currency, `${currency_prefix}/standard_recruit_ticket.webp`, "Standard Recruitment Ticket");
        setImageDetail(gained_ticket, `${currency_prefix}/silver_mileage_ticket.webp`, "Silver Mileage Ticket");
    }
}
{
    const pulls = (is_rate_up ? 
        special_pull(rate_up_character, !banner_parameters.IsSinglePull) :
        standard_pull(!banner_parameters.IsSinglePull)); 

    if (!banner_parameters.IsSinglePull)
        for (let i = 0; i < pulls.length; i++) {
            const element = result_elements[i];
            const character = pulls[i];

            setCardElementDetail(element, character);
            addCharacterToCollection(character.name);
        }
    else {
        lineup_elements.filter((l) => l.id > 1).forEach((l) => l.self.remove());
        result_elements.filter((e) => e.id > 1).forEach((e) => {
            if (e.id !== 6)
                e.self.parentElement.remove();
            else
                e.self.remove();
        });

        setCardElementDetail(result_elements[0], pulls[0], true);
        addCharacterToCollection(pulls[0].name);
    }


    let pull = 0;
    const id = setInterval(() => {
        const getIconForRarity = (type) => `images/pull_assets/lineup/${type.toLowerCase()}.png`;
        const element = lineup_elements[pull];

        element.icon.src = getIconForRarity(pulls[pull].rarity);
        element.self.style.visibility = "visible";
        element.glow.style.visibility = pulls[pull].rarity === Character.Rarities.SSR 
            ? "visible" : "hidden";
        
        pull += 1;
        if (pull === pulls.length) {
            clearInterval(id);
            setTimeout(() => {
                document.getElementById("lineup").style.display = "none";
                document.getElementById("gacha").style.display = "block";

                const getScreenImage = () => {
                    const prefix = "images/pull_assets/gachascreen-";

                    if (window.innerWidth < 800) 
                        return `${prefix}small.png`;
                    else if (window.innerWidth < 1200) 
                        return `${prefix}medium.png`;
                    else 
                        return `${prefix}large.png`;
                };
                document.getElementsByTagName("body")[0].style.backgroundImage = `url(${getScreenImage()})`;
            }, 1000);
        }
    }, 55);
}


console.log(banner_parameters.GetRateUpCharacter());