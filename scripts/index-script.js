import { getWishList, setWishList, setLastSelectedBannerIndex, getLastSelectedBannerIndex, setLastSelectedPageIndex, getLastSelectedPageIndex } from './savedata.js';
import { Character, characters } from './chars.js';


const ce = "click";
const banners = characters.filter((c) => c.hasBanner).map((c) => {
    return {
        CharacterName: c.name,
        BannerName: c.bannerName
    }
});
const scroll_params = {
    behavior: "smooth",
    block: "center"
};
const setImage = (img, url, title) => {
    img.src = url,
    img.title = title;
}

{
    const current_banner_elements = {
        Title: document.getElementById("current-banner-title"),
        Image: document.getElementById("current-banner-image"),
        SinglePullButton: document.getElementById("rate-up-single-pull-button"),
        MultiPullButton: document.getElementById("rate-up-multi-pull-button"),
        Data: banners[0]
    };
    const data = current_banner_elements.Data;
    setImage(current_banner_elements.Image, 
        `images/banners/${data.BannerName}.png`, `Rate Up: ${data.CharacterName}`);
    current_banner_elements.Title.innerText = data.CharacterName.toUpperCase();

    current_banner_elements.SinglePullButton.addEventListener(ce, () => 
        window.location.replace(`gacha.html?character=${data.BannerName}&singlepull`));
    current_banner_elements.MultiPullButton.addEventListener(ce, () => 
        window.location.replace(`gacha.html?character=${data.BannerName}`));
}

{
    const tabs = [
        document.getElementById("current-banner-container"), 
        document.getElementById("previous-banners-container"), 
        document.getElementById("standard-banner-container")
    ];
    const showIndexTab = (tab_index) => tabs.forEach((t, i) => t.style.display = (i === tab_index) ? "block" : "none");
    function handleTabClick(index) {
        showIndexTab(index);
        setLastSelectedPageIndex(index);
    }

    document.getElementById("current-banner-button").addEventListener(ce, () => handleTabClick(0));
    document.getElementById("previous-banners-button").addEventListener(ce, () => handleTabClick(1));
    document.getElementById("standard-banner-button").addEventListener(ce, () => handleTabClick(2));
    showIndexTab(getLastSelectedPageIndex()); // Default tab to show.
}


{ 
    const previous_banner_elements = {
        Container: document.getElementById("previous-banners-container"),
        SearchBox: document.getElementById("banner-search-input"),
        Display: document.getElementById("previous-banner-display"),
        SinglePullButton: function() { return this.Container.getElementsByClassName("single-pull-button")[0] },
        MultiPullButton: function() { return this.Container.getElementsByClassName("multi-pull-button")[0] }
    };
    const idOfLeftMostBannerImage = () => {
        const images = Array.from(previous_banner_elements.Display.getElementsByTagName("img"));
        return images.filter((i) => i.x > 0)[0].id;
    }

    function handleClick(is_single) {
        const char_id = idOfLeftMostBannerImage();
        const address_prefix = "gacha.html?character=";

        window.location.replace(`${address_prefix}${banners[char_id].BannerName}${is_single ? "&singlepull" : ""}`)
        setLastSelectedBannerIndex(char_id);
    }
    previous_banner_elements.SinglePullButton().addEventListener(ce, () => handleClick(true));
    previous_banner_elements.MultiPullButton().addEventListener(ce, () => handleClick(false));

    previous_banner_elements.SearchBox.addEventListener("change", () => {
        const box = previous_banner_elements.SearchBox;
        const banner_id = banners.findLastIndex((b) => b.BannerName.includes(box.value.toLowerCase()));
        box.value = "";
        
        if (banner_id < 1) return; 
        document.getElementById(banner_id).scrollIntoView(scroll_params);
    });

    // Render all character banners.
    for (let i = 1; i < banners.length; i++) {
        let img = new Image();
        img.setAttribute("id", i);
        img.classList.add("banner-image");

        setImage(img, `images/banners/${banners[i].BannerName}.png`, `Rate Up: ${banners[i].CharacterName}`);
        previous_banner_elements.Display.appendChild(img);
    }
    document.getElementById(getLastSelectedBannerIndex()).scrollIntoView(scroll_params);
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
                all = all.filter((m) => m.Name !== manufacturer.Name);

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
            character_selector.Container.scrollIntoView(scroll_params);
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