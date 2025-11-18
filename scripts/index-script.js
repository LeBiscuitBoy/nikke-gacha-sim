import { Character } from './chars.js';


const banners = [
    "Nayuta",   
    "Liberalio",
]
function setImage(img, url, title) {
    img.src = url,
    img.title = title;
}

const newest_banner = banners[0];
const sanitized_name = newest_banner.toLowerCase();
Character.IllegalImageChars.forEach((c) => sanitized_name.replaceAll(c, ""));


document.getElementById("current-banner-title").innerText = newest_banner.toUpperCase();
setImage(document.getElementById("current-banner-image"), `images/banners/${sanitized_name}.png`, `Rate Up: ${newest_banner}`)


document.getElementById("rate-up-single-pull-button").addEventListener("click", () => {
    window.location.replace(`gacha.html?character=${sanitized_name}&singlepull`);
});
document.getElementById("rate-up-multi-pull-button").addEventListener("click", () => {
    window.location.replace(`gacha.html?character=${sanitized_name}`);
});