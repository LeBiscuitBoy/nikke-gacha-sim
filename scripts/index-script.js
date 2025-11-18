import { Character } from './chars.js';


const banners = [
    "Liberalio",
    "Nayuta",   
    "Delta: Ninja Thief",
    "Ada",
    "Jill",
]
function setImage(img, url, title) {
    img.src = url,
    img.title = title;
}


const newest_banner = banners[0];
let sanitized_name = newest_banner.toLowerCase();
Character.IllegalImageChars.forEach((c) => sanitized_name = sanitized_name.replaceAll(c, ""));

document.getElementById("current-banner-title").innerText = newest_banner.toUpperCase();
setImage(document.getElementById("current-banner-image"), `images/banners/${sanitized_name}.png`, `Rate Up: ${newest_banner}`)


{
    function toggleElement(element, is_visible) {
        element.style.display = (is_visible ? "block" : "none");
    }

    const current_banner_element = document.getElementById("current-banner-container");
    const previous_banner_element = document.getElementById("previous-banners-container");

    document.getElementById("current-banner-button").addEventListener("click", () => {
        toggleElement(current_banner_element, true);
        toggleElement(previous_banner_element, false);
    });
    document.getElementById("previous-banners-button").addEventListener("click", () => {
        toggleElement(current_banner_element, false);
        toggleElement(previous_banner_element, true);
    });
    document.getElementById("standard-banner-button").addEventListener("click", () => {
        toggleElement(current_banner_element, false);
        toggleElement(previous_banner_element, false);
    });
    toggleElement(previous_banner_element, false);
}

document.getElementById("rate-up-single-pull-button").addEventListener("click", () => {
    window.location.replace(`gacha.html?character=${sanitized_name}&singlepull`);
});
document.getElementById("rate-up-multi-pull-button").addEventListener("click", () => {
    window.location.replace(`gacha.html?character=${sanitized_name}`);
});