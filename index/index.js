import { characters } from '../scripts/chars.js';
import { setLastSelectedBannerIndex, getLastSelectedBannerIndex, setLastSelectedPageIndex, getLastSelectedPageIndex } from '../scripts/savedata.js';


document.getElementById("last-update-info").innerText = `Latest Update: ${new Date(2025, 11, 3).toLocaleDateString()}`;
{
    const tabs = Array.from(document.querySelectorAll("body section"));
    const showIndexTab = (tab_index) => tabs.forEach((t, i) => t.style.display = (i === tab_index) ? "block" : "none");

    const container_name = "navigation-option-container";
    document.getElementById(container_name).addEventListener("focusin", (ev) => {
        const valid_button_ids = Array.from(document.querySelectorAll(`#${container_name} ul li button`)).map((b) => b.id);
        const index = valid_button_ids.findIndex((vid) => vid === ev.target.id);

        if (index < 4) {
            showIndexTab(index);
            setLastSelectedPageIndex(index);
        }
        else
            localStorage.clear();
    });
    showIndexTab(getLastSelectedPageIndex());
}

const scroll_params = {
    behavior: "smooth",
    block: "center"
};
const banners = characters.filter((c) => c.hasBanner).map((c) => {
    return {
        Character: c.name,
        Name: c.bannerName,
        StartDate: c.dateAvailable,
        EndDate: c.bannerEndDate
    }
});


{
    const createNewBanner = (banner_detail, id_prefix, index_id) => {
        const image = new Image();
        const setImageDetail = (src, title) => {
            image.src = src;
            image.title = title;
        };
        const setElementDetail = (e, id, cl) => {
            e.setAttribute("id", id);
            e.setAttribute("class", cl);
        };
        
        const new_banner = document.createElement("div");
        setElementDetail(new_banner, `${id_prefix}-${index_id}`, "banner-container");
        setImageDetail(`../images/banners/${banner_detail.Name}.png`, `Rate Up: ${banner_detail.Character}`);
        return new_banner.appendChild(image).parentElement;
    };
    const toggleBarOpacity = (bar, opaque) => bar.style.opacity = (opaque ? 1 : 0);
    const setAnchorLocations = (bar, banner_name) => {
        const url_prefix = `../gacha.html?rate-up=${banner_name}`;
        bar.SinglePullButton.href = `${url_prefix}&singlepull`;
        bar.MultiPullButton.href = url_prefix;
    };
    const getIndexIdNumber = (target) => {
        const element = (target.tagName === "IMG") ? target.parentElement : target;
        return element.id.substring(element.id.lastIndexOf("-") + 1);
    };

    {
        const container_names = {
            Multi: "newest-banners-container",
            Single: "newest-banners-container-single"
        };
        const pull_bar = {
            Bar: document.getElementById("newest-banners-pull-bar"),
            SinglePullButton: document.getElementById("newest-single-pull"),
            MultiPullButton: document.getElementById("newest-multi-pull")
        };
        const latest_banners_container = document.getElementById(container_names.Multi);
        const latest_banners = banners.filter((b) => b.StartDate === banners[0].StartDate);
        const selected_char_text = document.getElementById("newest-banner-selected-character-text");

        if (latest_banners.length === 1)
            latest_banners_container.setAttribute("id", container_names.Single);
        latest_banners.forEach((lb, i) => latest_banners_container.appendChild(createNewBanner(lb, latest_banners_container.id, i)));
        setAnchorLocations(pull_bar, latest_banners[0].Name);

        latest_banners_container.addEventListener("click", (ev) => {
            if (ev.target.id === container_names.Multi || ev.target.id === container_names.Single) {
                toggleBarOpacity(pull_bar.Bar, false);
                selected_char_text.innerText = "";
                return;
            }

            const selected_banner = latest_banners[getIndexIdNumber(ev.target)];
            selected_char_text.innerText = selected_banner.Character
            setAnchorLocations(pull_bar, selected_banner.Name);
            toggleBarOpacity(pull_bar.Bar, true);
        });
    }
    {
        const pull_bar = {
            Bar: document.getElementById("previous-banners-pull-bar"),
            SinglePullButton: document.getElementById("previous-single-pull"),
            MultiPullButton: document.getElementById("previous-multi-pull")
        };
        const previous_banners_container = document.getElementById("previous-banners-container");
        const selected_char_text = document.getElementById("previous-banner-selected-character-text");
        const search_box = document.getElementById("previous-banner-selected-character-text");
        const previous_banners = banners.filter((b) => b.StartDate < banners[0].StartDate);

        previous_banners.forEach((lb, i) => previous_banners_container.appendChild(createNewBanner(lb, previous_banners_container.id, i)));
        setAnchorLocations(pull_bar, previous_banners[0].Name);

        previous_banners_container.addEventListener("click", (ev) => {      
            if (ev.target.id === previous_banners_container.id) {
                toggleBarOpacity(pull_bar.Bar, false);
                selected_char_text.value = "";
                return;
            }

            const index = getIndexIdNumber(ev.target);
            const selected_banner = previous_banners[index];

            selected_char_text.value = selected_banner.Character
            setLastSelectedBannerIndex(index);

            setAnchorLocations(pull_bar, selected_banner.Name);
            toggleBarOpacity(pull_bar.Bar, true);
        });

        const getBannerElementFromIndex = (index) => document.getElementById(`${previous_banners_container.id}-${index}`);
        search_box.addEventListener("change", () => {
            if (search_box.value.length < 3) return;
            const banner_index = previous_banners.findLastIndex((b) => b.Character.toLowerCase().includes(search_box.value.toLowerCase()));
            if (banner_index === -1) return;

            toggleBarOpacity(pull_bar.Bar, true);
            setAnchorLocations(pull_bar, previous_banners[banner_index].Name);
            setLastSelectedBannerIndex(banner_index);
            getBannerElementFromIndex(banner_index).scrollIntoView(scroll_params);
        });

        getBannerElementFromIndex(getLastSelectedBannerIndex()).scrollIntoView(scroll_params);
    }
}