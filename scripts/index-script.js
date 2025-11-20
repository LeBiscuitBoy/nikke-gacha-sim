import { getWishList, setWishList } from './savedata.js';
import { Character, characters } from './chars.js';


function setImage(img, url, title) {
    img.src = url,
    img.title = title;
}
function setBannerDetail(banner, banner_name) {
    banner.SanitizedName = banner_name.toLowerCase();
    Character.IllegalImageChars.forEach((c) => banner.SanitizedName = banner.SanitizedName.replaceAll(c, ""));
    
    banner.Title.innerHTML = banner_name.toUpperCase();
    setImage(banner.Image, `images/banners/${banner.SanitizedName}.png`, `Rate Up: ${banner_name}`);
}

const banners = characters.filter((c) => c.hasBanner).map((c) => c.name);
{
    const banner = {
        Title: document.getElementById("current-banner-title"),
        Image: document.getElementById("current-banner-image"),
        SinglePullButton: document.getElementById("rate-up-single-pull-button"),
        MultiPullButton: document.getElementById("rate-up-multi-pull-button"),
        SanitizedName: ""
    };
    setBannerDetail(banner, banners[0]);

    banner.SinglePullButton.addEventListener("click", () => {
        window.location.replace(`gacha.html?character=${banner.SanitizedName}&singlepull`);
    });
    banner.MultiPullButton.addEventListener("click", () => {
        window.location.replace(`gacha.html?character=${banner.SanitizedName}`);
    });
}


function toggleElement(element, is_visible) {
    element.style.display = (is_visible ? "block" : "none");
}
{
    const current_banner_element = document.getElementById("current-banner-container");
    const previous_banner_element = document.getElementById("previous-banners-container");
    const standard_banner_element = document.getElementById("standard-banner-container");

    document.getElementById("current-banner-button").addEventListener("click", () => {
        toggleElement(current_banner_element, true);
        toggleElement(previous_banner_element, false);
        toggleElement(standard_banner_element, false);
    });
    document.getElementById("previous-banners-button").addEventListener("click", () => {
        toggleElement(current_banner_element, false);
        toggleElement(previous_banner_element, true);
        toggleElement(standard_banner_element, false);
    });
    document.getElementById("standard-banner-button").addEventListener("click", () => {
        toggleElement(current_banner_element, false);
        toggleElement(previous_banner_element, false);
        toggleElement(standard_banner_element, true);
    });
    toggleElement(current_banner_element, false);
    toggleElement(previous_banner_element, false);
    toggleElement(standard_banner_element, true);
}



{ 
    // Banner iterator
    const previous_button = document.getElementById("previous-banner-button");
    const next_button = document.getElementById("next-banner-button");
    const banner_search_box = document.getElementById("banner-search-input");

    const previous_banner = document.getElementById("previous-banners-container");
    const banner_elements = {
        Title: previous_banner.getElementsByClassName("banner-title")[0],
        Image: previous_banner.getElementsByClassName("banner-image")[0],
        SinglePullButton: previous_banner.getElementsByClassName("single-pull-button")[0],
        MultiPullButton: previous_banner.getElementsByClassName("multi-pull-button")[0],
        SanitizedName: ""
    };
    setBannerDetail(banner_elements, banners[1]);

    banner_elements.SinglePullButton.addEventListener("click", () => window.location.replace(`gacha.html?character=${banner_elements.SanitizedName}&singlepull`));
    banner_elements.MultiPullButton.addEventListener("click", () => window.location.replace(`gacha.html?character=${banner_elements.SanitizedName}`));

    function toggleButton(button, is_enabled) {
        button.disabled = !is_enabled;
    }

    let iterator = 1;
    banner_search_box.addEventListener("change", () => {
        const search = banner_search_box.value.toLowerCase();
        const index = banners.findLastIndex((b) => b.toLowerCase().includes(search));
        banner_search_box.value = "";
        
        if (index < 1) return; 
        iterator = index;

        toggleButton(previous_button, index > 1);
        toggleButton(next_button, index < (banners.length - 1));
        setBannerDetail(banner_elements, banners[index]);
        
    });
    previous_button.addEventListener("click", () => {
        if (iterator === 1)
            toggleButton(previous_button, false);
        else {
            toggleButton(next_button, true);
            setBannerDetail(banner_elements, banners[--iterator]);
        }
    });
    next_button.addEventListener("click", () => {
        if (iterator === banners.length - 1)
            toggleButton(next_button, false);
        else {
            toggleButton(previous_button, true);
            setBannerDetail(banner_elements, banners[++iterator]);
        }
    });
}


const standard_single_button = document.getElementById("standard-single-pull-button");
const standard_multi_button = document.getElementById("standard-multi-pull-button");
standard_single_button.addEventListener("click", () => window.location.replace("gacha.html?singlepull"));
standard_multi_button.addEventListener("click", () => window.location.replace("gacha.html"));


{
    // Wishlist section.
    const wishlist = getWishList();
    const max_wishlist_length = 5;
    const charFilter = (c, manufacturer) => c.isInStandardPool && c.manufacturer === manufacturer && 
        c.rarity === Character.Rarities.SSR && !c.overspec;

    const manufacturers = {
        Elysion: {
            Name: Character.Manufacturers.Elysion,
            Container: document.getElementById("wishlist-elysion"),
            WishListImageElements: document.getElementById("wishlist-elysion")
                .getElementsByClassName("character-display")[0].getElementsByClassName("wishlist-character-image"),
            WishableCharacters: characters.filter((c) => charFilter(c, Character.Manufacturers.Elysion)),
            CurrentlyWishedCharacters: wishlist.Elysion
        },
        Tetra: {
            Name: Character.Manufacturers.Tetra,
            Container: document.getElementById("wishlist-tetra"),
            WishListImageElements: document.getElementById("wishlist-tetra")
                .getElementsByClassName("character-display")[0].getElementsByClassName("wishlist-character-image"),
            WishableCharacters: characters.filter((c) => charFilter(c, Character.Manufacturers.Tetra)),
            CurrentlyWishedCharacters: wishlist.Tetra
        },
        Missilis: {
            Name: Character.Manufacturers.Missilis,
            Container: document.getElementById("wishlist-missilis"),
            WishListImageElements: document.getElementById("wishlist-missilis")
                .getElementsByClassName("character-display")[0].getElementsByClassName("wishlist-character-image"),
            WishableCharacters: characters.filter((c) => charFilter(c, Character.Manufacturers.Missilis)),
            CurrentlyWishedCharacters: wishlist.Missilis
        },
        PilgrimOverspec: {
            Name: Character.Manufacturers.Pilgrim,
            Container: document.getElementById("wishlist-pilgrim-overspec"),
            WishListImageElements: document.getElementById("wishlist-pilgrim-overspec")
                .getElementsByClassName("character-display")[0].getElementsByClassName("wishlist-character-image"),
            WishableCharacters: characters.filter((c) => c.isInStandardPool && c.rarity === Character.Rarities.SSR && 
                (c.manufacturer === Character.Manufacturers.Pilgrim || c.overspec)),
            CurrentlyWishedCharacters: wishlist.Pilgrim
        }
    };

    const assignCharactersToList = (manufacturer) => {
        const profile_prefix = "images/character/profile";
        
        for (let i = 0; i < max_wishlist_length; i++) {
            const wished_character_name = manufacturer.CurrentlyWishedCharacters[i];
            const banner_name = characters.find((c) => c.name === wished_character_name).bannerName;
            
            setImage(manufacturer.WishListImageElements[i], `${profile_prefix}/${banner_name}.png`, wished_character_name);
        }
    };

    const character_selector = {
        SelectedManufacturer: "",
        IsOpen: false,
        Container: document.getElementById("wishlist-character-selector"),
        SelectedCharacters: []
    };
    const deleteProfileElements = () => Array.from(character_selector.Container.getElementsByTagName("img")).forEach((p) => p.remove());
    const createProfileElements = (manufacturer) => manufacturer.WishableCharacters.forEach((c) => {
        let clicked_before = false;
        let img = new Image();

        img.addEventListener("click", () => {
            if (clicked_before) {
                img.style.backgroundColor = "var(--select-character-profile-backcolour)";
                img.style.opacity = 1;
                character_selector.SelectedCharacters = character_selector.SelectedCharacters.filter((sc) => sc !== c.name);
            }
            else if (character_selector.SelectedCharacters.length < max_wishlist_length) {                
                img.style.backgroundColor = "green";
                img.style.opacity = 0.5;
                character_selector.SelectedCharacters.push(c.name);
            }
            clicked_before = !clicked_before;
        });

        setImage(img, `images/character/${c.characterProfileImage}`, c.name);
        character_selector.Container.appendChild(img);
    });
    const toggleSelector = (manufacturer) => {
        character_selector.IsOpen = !character_selector.IsOpen;
        
        if (!character_selector.IsOpen) {
            deleteProfileElements();
            
            if (character_selector.SelectedManufacturer === manufacturer.Name && character_selector.SelectedCharacters.length === max_wishlist_length) {
                manufacturer.CurrentlyWishedCharacters = character_selector.SelectedCharacters;
                assignCharactersToList(manufacturer);
                setWishList({
                    Pilgrim:  manufacturers.PilgrimOverspec.CurrentlyWishedCharacters,
                    Elysion:  manufacturers.Elysion.CurrentlyWishedCharacters,
                    Missilis: manufacturers.Missilis.CurrentlyWishedCharacters,
                    Tetra:    manufacturers.Tetra.CurrentlyWishedCharacters
                });
            }
            character_selector.SelectedManufacturer = "";
        }
        else {
            createProfileElements(manufacturer);
            character_selector.Container.scrollIntoView();
            character_selector.SelectedManufacturer = manufacturer.Name;
        }
        character_selector.SelectedCharacters = [];
    };

    [manufacturers.Elysion, manufacturers.Tetra, manufacturers.Missilis, manufacturers.PilgrimOverspec].forEach((m) => {
        m.Container.addEventListener("click", () => toggleSelector(m));
        assignCharactersToList(m);
    });
}