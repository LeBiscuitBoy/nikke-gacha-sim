import { getWishList, setWishList } from './savedata.js';
import { Character, characters } from './chars.js';


const ce = "click";
const banners = characters.filter((c) => c.hasBanner).map((c) => c.name);
const setImage = (img, url, title) => {
    img.src = url,
    img.title = title;
}
const setBannerDetail = (banner, banner_name) => {
    banner.SanitizedName = banner_name.toLowerCase();
    Character.IllegalImageChars.forEach((c) => banner.SanitizedName = banner.SanitizedName.replaceAll(c, ""));
    
    banner.Title.innerHTML = banner_name.toUpperCase();
    setImage(banner.Image, `images/banners/${banner.SanitizedName}.png`, `Rate Up: ${banner_name}`);
}

{
    const banner = {
        Title: document.getElementById("current-banner-title"),
        Image: document.getElementById("current-banner-image"),
        SinglePullButton: document.getElementById("rate-up-single-pull-button"),
        MultiPullButton: document.getElementById("rate-up-multi-pull-button"),
        SanitizedName: ""
    };
    setBannerDetail(banner, banners[0]);

    banner.SinglePullButton.addEventListener(ce, () => window.location.replace(`gacha.html?character=${banner.SanitizedName}&singlepull`));
    banner.MultiPullButton.addEventListener(ce, () => window.location.replace(`gacha.html?character=${banner.SanitizedName}`));
}

{
    const tabs = [
        document.getElementById("current-banner-container"), 
        document.getElementById("previous-banners-container"), 
        document.getElementById("standard-banner-container")
    ];
    const showIndexTab = (tab_index) => tabs.forEach((t, i) => t.style.display = (i === tab_index) ? "block" : "none");

    document.getElementById("current-banner-button").addEventListener(ce, () => showIndexTab(0));
    document.getElementById("previous-banners-button").addEventListener(ce, () => showIndexTab(1));
    document.getElementById("standard-banner-button").addEventListener(ce, () => showIndexTab(2));

    showIndexTab(0); // Default tab to show.
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

    banner_elements.SinglePullButton.addEventListener(ce, () => window.location.replace(`gacha.html?character=${banner_elements.SanitizedName}&singlepull`));
    banner_elements.MultiPullButton.addEventListener(ce, () => window.location.replace(`gacha.html?character=${banner_elements.SanitizedName}`));

    
    let iterator = 1;
    const toggleButton = (button, is_enabled) => button.disabled = !is_enabled;

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
    const updatesButtonAndBanner = (caller_button, other_button, disable_button_condition, increment_iterator) => {
        if (disable_button_condition)
            toggleButton(caller_button, false);
        else {
            toggleButton(other_button, true);
            setBannerDetail(banner_elements, banners[increment_iterator ? ++iterator : --iterator]);
        }
    };
    previous_button.addEventListener(ce, () => updatesButtonAndBanner(previous_button, next_button, iterator === 1, false));
    next_button.addEventListener(ce, () => updatesButtonAndBanner(next_button, previous_button, iterator === banners.length - 1, true));
}

document.getElementById("standard-single-pull-button").addEventListener(ce, () => window.location.replace("gacha.html?singlepull"));
document.getElementById("standard-multi-pull-button").addEventListener(ce, () => window.location.replace("gacha.html"));


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
        for (let i = 0; i < max_wishlist_length; i++) {
            const wished_character_name = manufacturer.CurrentlyWishedCharacters[i];
            const banner_name = characters.find((c) => c.name === wished_character_name).bannerName;
            
            setImage(manufacturer.WishListImageElements[i], `images/character/profile/${banner_name}.png`, wished_character_name);
        }
    };

    const character_selector = {
        SelectedManufacturer: null,
        IsOpen: false,
        Container: document.getElementById("wishlist-character-selector"),
        SelectedCharacters: []
    };
    const deleteProfileElements = () => Array.from(character_selector.Container.getElementsByTagName("img")).forEach((p) => p.remove());
    const createProfileElements = (manufacturer) => manufacturer.WishableCharacters.forEach((c) => {
        let clicked_before = false;
        let img = new Image();

        img.addEventListener(ce, () => {
            if (clicked_before) {
                img.style.opacity = 0.5;
                character_selector.SelectedCharacters = character_selector.SelectedCharacters.filter((sc) => sc !== c.name);
            }
            else if (character_selector.SelectedCharacters.length < max_wishlist_length) {                
                img.style.opacity = 1;
                character_selector.SelectedCharacters.push(c.name);
            }
            clicked_before = !clicked_before;
        });

        setImage(img, `images/character/${c.characterProfileImage}`, c.name);
        character_selector.Container.appendChild(img);
    });
    const toggleSelector = (manufacturer) => {
        const toggleWishlistOpacity = (toggle) => {
            let all = [manufacturers.Elysion, manufacturers.Missilis, manufacturers.PilgrimOverspec, manufacturers.Tetra];
            if (toggle) 
                all = all.filter((m) => m.Name !== manufacturer.Name)

            all.map((m) => m.WishListImageElements).forEach((me) => Array.from(me).forEach((mi) => mi.style.opacity = toggle ? 0.5 : 1));
        };
        
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
            character_selector.SelectedManufacturer = null;
            toggleWishlistOpacity(false);
        }
        else {
            createProfileElements(manufacturer);
            character_selector.Container.scrollIntoView();
            character_selector.SelectedManufacturer = manufacturer.Name;
            toggleWishlistOpacity(true);
        }
        character_selector.SelectedCharacters = [];
    };

    [manufacturers.Elysion, manufacturers.Tetra, manufacturers.Missilis, manufacturers.PilgrimOverspec].forEach((m) => {
        m.Container.addEventListener(ce, () => toggleSelector(m));
        assignCharactersToList(m);
    });
}