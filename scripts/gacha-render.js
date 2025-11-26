import { characters, rarities } from './chars.js';
import { result_elements, lineup_elements, standard_pull, special_pull, mold_pull  } from './gacha.js';
import { hasCharacter, addCharacterToCollection, getCharacterPullCount } from './savedata.js';


const redirect = "index.html";
const asset_url_prefix = "images/pull_assets";
const character_url_prefix = "images/character";
const currency_url_prefix = "images/pull_assets/currency";
const reroll_currency = document.getElementById("reroll-currency");
const gained_ticket = document.getElementById("gained-ticket-image");

const query_parameters = new URLSearchParams(window.location.search);
const banner_keys = {
    Mold: "mold",
    SinglePull: "singlepull",
    RateUp: "rate-up",
    Standard: "standard"
};
const banner_parameters = {
    IsMoldPull: query_parameters.has(banner_keys.Mold),
    IsSinglePull: query_parameters.has(banner_keys.SinglePull),
    IsRateUp: query_parameters.has(banner_keys.RateUp),
    IsStandard: query_parameters.has(banner_keys.Standard)
};

const setImageDetail = (img, source = "", title = "") => {
    img.src = source;
    img.title = title;
}
const removeExtraResultCards = () => {
    lineup_elements.filter((l) => l.id > 1).forEach((l) => l.self.remove());
    result_elements.filter((e) => e.id > 1).forEach((e) => {
        if (e.id !== 6)
            e.self.parentElement.remove();
        else
            e.self.remove();
    });
};
const getCardGlowImage = (rarity, is_bottom, img = null) => {
    if (img == null)
        img = new Image();
    if (is_bottom)
        img.classList.add("single-sparkle-bottom");

    img.src = (rarity === rarities.R) ?
        `${asset_url_prefix}/glow_none.png` :
        `${asset_url_prefix}/glow_${rarity.toLowerCase()}.png`;
    return img;
};
const populateCard = (card, character, from_single_pull) => {
    const showSpareBody = (rarity, pull_count) => 
        (rarity === rarities.R && pull_count <= 2) || 
        (rarity === rarities.SR && pull_count <= 3) || 
        (rarity === rarities.SSR && pull_count <= 11);

    setImageDetail(card.character_card, `${character_url_prefix}/${character.characterCardImage}`, character.name);
    card.sparkle = getCardGlowImage(character.rarity, false, card.sparkle);

    if (from_single_pull) {
        card.self.appendChild(getCardGlowImage(character.rarity, true));
        card.new_character.style.top = "29%";
        card.spare_body.style.bottom = "27%";
    }

    if (character.rarity !== rarities.R) {
        const rarity_key = character.rarity.toLowerCase();
        card.character_card.classList.add(card.id <= 5 ? `${rarity_key}-top` : `${rarity_key}-bottom`);
    }

    if (hasCharacter(character.name).state) {
        if (showSpareBody(character.rarity, getCharacterPullCount(character.name)))
            setImageDetail(card.spare_body, `${character_url_prefix}/${character.characterSpareBodyImage}`, `${character.name}'s Spare Body`);
        else
            card.spare_body.remove();
        card.new_character.remove();
    }
    else {
        setImageDetail(card.new_character, `${asset_url_prefix}/new_character.png`, "New!");
        card.spare_body.remove();
    }
};
const populateCards = (pulls) => pulls.forEach((p, i) => {
    populateCard(result_elements[i], p, (pulls.length === 1));
    addCharacterToCollection(p.name);
});
const setGainedTicketsDisplays = () => {
    const qty = document.getElementById("quantity");
    const mileage = document.getElementById("gained-mileage-quantity");

    // Temporarily update currency quantities until currency is properly implemented.
    if (banner_parameters.IsSinglePull) {
        qty.innerText = 1;
        mileage.innerText = "+1";
    }
    else if (banner_parameters.IsMoldPull) {
        qty.parentElement.remove();
        mileage.parentElement.remove();
    }
}
const handleIntroDisplay = (pulls) => {
    let pull = 0;
    const id = setInterval(() => {
        const getIconForRarity = (type) => `images/pull_assets/lineup/${type.toLowerCase()}.png`;
        const element = lineup_elements[pull];

        element.icon.src = getIconForRarity(pulls[pull].rarity);
        element.self.style.visibility = "visible";
        element.glow.style.visibility = pulls[pull].rarity === rarities.SSR ? "visible" : "hidden";
        
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
const handleDisplayTransition = (pulls) => {
    setGainedTicketsDisplays();
    populateCards(pulls);
    handleIntroDisplay(pulls);
}

if (banner_parameters.IsMoldPull || banner_parameters.IsSinglePull)
    removeExtraResultCards();

if (banner_parameters.IsMoldPull) {
    const capitaliseFirstLetter = (text) => text.slice(0, 1).toUpperCase() + text.slice(1);
    const isManufacturerValid = (manufacturer) => {
        const manufacturers = Object.entries(manufacturers)
            .map((e) => e[1].toLowerCase())
            .filter((m) => m !== manufacturers.Abnormal.toLowerCase());
        return manufacturers.find((m) => m === manufacturer) != null;
    };
    
    const manufacturer = query_parameters.get(banner_keys.Mold);
    if (isManufacturerValid(manufacturer))
        handleDisplayTransition(mold_pull(capitaliseFirstLetter(manufacturer)));
    else
        window.location.replace(redirect);
}
else if (banner_parameters.IsRateUp) {
    const getRateUpCharacter = () => {
        const char = query_parameters.has(banner_keys.RateUp) ? characters.find((c) => 
            c.bannerName === query_parameters.get(banner_keys.RateUp).toLowerCase() &&
            c.rarity == rarities.SSR && 
            c.hasBanner) : null;
        return char != null ? char : null;
    }
    setImageDetail(reroll_currency, `${currency_url_prefix}/special_recruit_ticket.webp`, "Special Recruitment Ticket");
    setImageDetail(gained_ticket, `${currency_url_prefix}/golden_mileage_ticket.png`, "Golden Mileage Ticket");

    const rate_up_character = getRateUpCharacter();
    if (rate_up_character != null)
        handleDisplayTransition(special_pull(rate_up_character, !banner_parameters.IsSinglePull));
    else
        window.location.replace(redirect);
}
else if (banner_parameters.IsStandard) {
    setImageDetail(reroll_currency, `${currency_url_prefix}/standard_recruit_ticket.webp`, "Standard Recruitment Ticket");
    setImageDetail(gained_ticket, `${currency_url_prefix}/silver_mileage_ticket.webp`, "Silver Mileage Ticket");
    
    handleDisplayTransition(standard_pull(!banner_parameters.IsSinglePull));
}
else
    window.location.replace(redirect); // Malformed query parameters, go home.