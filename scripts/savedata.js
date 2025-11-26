const keys = {
    pulledCharacters: "pulled_characters",
    wishedCharacters: "wished_characters",
    lastSelectedPageIndex: "last_selected_page_index",
    lastSelectedBannerIndex: "last_selected_banner_index"
};

function keyExists(key) {
    return localStorage.getItem(key) !== null;
}

if (!keyExists(keys.pulledCharacters)) 
    localStorage.setItem(keys.pulledCharacters, 
        JSON.stringify([]));
if (!keyExists(keys.wishedCharacters)) {
    localStorage.setItem(keys.wishedCharacters, 
        JSON.stringify({
            Pilgrim:  ["Little Mermaid", "Rapi: Red Hood", "Red Hood", "Grave", "Cinderella"],
            Elysion:  ["Emma: Tactical Upgrade", "Eunhwa: Tactical Upgrade", "Vesti: Tactical Upgrade", "Guillotine", "D: Killer Wife"],
            Missilis: ["Elegg", "Maxwell", "Drake", "Laplace", "Mana"],
            Tetra:    ["Blanc", "Noir", "Bready", "Crust", "Rupee"]
    }));
}
if (!keyExists(keys.lastSelectedBannerIndex))
    localStorage.setItem(keys.lastSelectedBannerIndex, 1);
if (!keyExists(keys.lastSelectedPageIndex))
    localStorage.setItem(keys.lastSelectedPageIndex, 0);


function setWishList(character_object) {
    localStorage.setItem(keys.wishedCharacters, JSON.stringify(character_object));
}
function getWishList() { 
    return JSON.parse(localStorage.getItem(keys.wishedCharacters));
}
function getPullList() {
    return JSON.parse(localStorage.getItem(keys.pulledCharacters));
}
function setLastSelectedBannerIndex(index) {
    localStorage.setItem(keys.lastSelectedBannerIndex, index);
}
function getLastSelectedBannerIndex() {
    return Number(localStorage.getItem(keys.lastSelectedBannerIndex));
}
function setLastSelectedPageIndex(index) {
    localStorage.setItem(keys.lastSelectedPageIndex, index);
}
function getLastSelectedPageIndex() {
    return Number(localStorage.getItem(keys.lastSelectedPageIndex));
}

function characterInList(character_name, list) {
    const index_of_char = list.findIndex((cn) => cn === character_name);
    
    return { 
        state: (index_of_char !== -1),
        index_of: index_of_char
    };
}
function getCharacterPullCount(character_name) {
    const character = getPullList().find((c) => c.name === character_name);
    return character === null ? 0 : character.count;
}

function characterOnWishlist(character_name) {
    const wl = getWishList();
    return characterInList(character_name, [
        ...wl.Pilgrim, 
        ...wl.Elysion, 
        ...wl.Missilis, 
        ...wl.Tetra
    ]).state;
}

function hasCharacter(character_name) {
    const character_list = getPullList().map((c) => c.name);
    return characterInList(character_name, character_list);
}

function addCharacterToCollection(character_name) {
    const has_character = hasCharacter(character_name);
    const character_list = getPullList();

    if (has_character.state)
        character_list[has_character.index_of].count += 1;
    else
        character_list.push({ 
            name: character_name, 
            count: 1 
        });
    
    localStorage.setItem(keys.pulledCharacters, JSON.stringify(character_list));
}


export { 
    addCharacterToCollection, 
    hasCharacter, 
    getWishList, 
    setWishList,
    characterOnWishlist,
    getPullList,
    getCharacterPullCount,
    setLastSelectedBannerIndex,
    getLastSelectedBannerIndex,
    setLastSelectedPageIndex,
    getLastSelectedPageIndex
};