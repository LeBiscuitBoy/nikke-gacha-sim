import { getWishList, setWishList, setLastSelectedBannerIndex, getLastSelectedBannerIndex, setLastSelectedPageIndex, getLastSelectedPageIndex } from './savedata.js';
import { Character, characters } from './chars.js';


const gachaUrl = "gacha.html";
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
const navigation_page_ids = {
    NewestBanner: 0,
    PreviousBanners: 1,
    StandardBanner: 2,
    ClearData: 3
};
const setImage = (img, url, title) => {
    img.src = url,
    img.title = title;
}
const searchParentFromChild = (child_element, parent_tag_name, max_search_depth) => {
    let i = 0;
    let target = child_element;

    while (target.tagName !== parent_tag_name && i++ !== max_search_depth)
        target = target.parentElement;
    return target.tagName === parent_tag_name ? target : null;
};


document.getElementById("standard-multi-pull-button").href = gachaUrl;
document.getElementById("standard-single-pull-button").href = `${gachaUrl}?singlepull`;

{   
    const newest = banners[0]; 
    const url = `${gachaUrl}?rate-up=${newest.BannerName}`;
    
    document.getElementById("current-banner-title").innerText = newest.CharacterName.toUpperCase();
    document.getElementById("rate-up-single-pull-button").href = `${url}&singlepull`;
    document.getElementById("rate-up-multi-pull-button").href = url;
    setImage(document.getElementById("current-banner-image"), `images/banners/${newest.BannerName}.png`, `Rate Up: ${newest.CharacterName}`);
}

{
    const nav_bar = document.getElementById("selector");
    const tabs = [
        document.getElementById("current-banner-container"), 
        document.getElementById("previous-banners-container"), 
        document.getElementById("standard-banner-container")
    ];
    const showIndexTab = (tab_index) => tabs.forEach((t, i) => t.style.display = (i === tab_index) ? "block" : "none");

    nav_bar.addEventListener("click", (ev) => {
        if (ev.target.tagName === "NAV") return;

        const button = searchParentFromChild(ev.target, "BUTTON", 2);
        if (button == null) return;

        Array.from(nav_bar.children).map((c) => c.id).forEach((id, i) => {
            if (id !== button.id) return;
            if (i === navigation_page_ids.ClearData)
                localStorage.clear();
            else {
                showIndexTab(i);
                setLastSelectedPageIndex(i);
            }
        });
    });

    showIndexTab(getLastSelectedPageIndex()); // Default tab to show.
}

{ 
    const createBannerImage = (id) => {
        let img = new Image();
        img.setAttribute("id", id);
        img.classList.add("banner-image");
        return img;
    } 

    const buttons = document.getElementById("previous-banner-recruitment-options").getElementsByTagName("a");
    setInterval(() => {
        if (getLastSelectedPageIndex() !== navigation_page_ids.PreviousBanners) return 
        const idOfLeftMostBannerImage = () => Number(Array.from(
            document.getElementById("previous-banner-display").getElementsByTagName("img")).filter((i) => i.x > 0)[0].id);

        const banner_index = idOfLeftMostBannerImage();
        const banner = banners[banner_index];

        buttons[1].href = `${gachaUrl}?rate-up=${banner.BannerName}`;
        buttons[0].href = `${gachaUrl}?rate-up=${banner.BannerName}&singlepull`;

        if (banner_index !== getLastSelectedBannerIndex())
            setLastSelectedBannerIndex(banner_index);
    }, 500);

    const search_box = document.getElementById("banner-search-input");
    search_box.addEventListener("change", () => {
        const banner_id = banners.findLastIndex((b) => b.BannerName.includes(search_box.value.toLowerCase()));
        search_box.value = "";
        
        if (banner_id < 1) return; 
        document.getElementById(banner_id).scrollIntoView(scroll_params);
    });

    // Render all character banners.
    const banner_display = document.getElementById("previous-banner-display");
    for (let i = 1; i < banners.length; i++) {
        const img = createBannerImage(i);
        setImage(img, `images/banners/${banners[i].BannerName}.png`, `Rate Up: ${banners[i].CharacterName}`);
        banner_display.appendChild(img);
    }
    document.getElementById(getLastSelectedBannerIndex()).scrollIntoView(scroll_params);
}




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

        img.addEventListener("click", () => {
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
        m.Container.addEventListener("click", () => toggleSelector(m));
        assignCharactersToList(m);
    });
}

document.getElementById("latest-update").innerHTML = `Latest update: ${new Date(2025, 10, 25).toLocaleDateString()}`;
document.getElementById("secret").style.display = (Math.random() > 0.75 ? "block" : "none");