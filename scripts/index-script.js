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


{
    function toggleElement(element, is_visible) {
        element.style.display = (is_visible ? "block" : "none");
    }

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
    toggleElement(previous_banner_element, false);
    toggleElement(standard_banner_element, false);
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
        if (iterator === 1) {
            toggleButton(previous_button, false);
            return;
        }

        toggleButton(next_button, true);
        setBannerDetail(banner_elements, banners[--iterator]);
    });
    next_button.addEventListener("click", () => {
        if (iterator === banners.length - 1) {
            toggleButton(next_button, false);
            return;
        }

        toggleButton(previous_button, true);
        setBannerDetail(banner_elements, banners[++iterator]);
    });
}


const standard_single_button = document.getElementById("standard-single-pull-button");
const standard_multi_button = document.getElementById("standard-multi-pull-button");

standard_single_button.addEventListener("click", () => window.location.replace("gacha.html?singlepull"));
standard_multi_button.addEventListener("click", () => window.location.replace("gacha.html"));


console.log(getWishList());