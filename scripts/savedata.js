const keys = {
    pulledCharacters: "pulled_characters",
    wishedCharacters: "wished_characters"
}

function keyExists(key) {
    return localStorage.getItem(key) !== null;
}

if (!keyExists(keys.pulledCharacters)) 
    localStorage.setItem(keys.pulledCharacters, 
        JSON.stringify([]));
if (!keyExists(keys.wishedCharacters)) 
    localStorage.setItem(keys.wishedCharacters, 
        JSON.stringify([]));



function setWishList(character_object) {
    localStorage.setItem(keys.wishedCharacters, 
        JSON.stringify(character_object));
}
function getWishList() { 
    return JSON.parse(localStorage.getItem(keys.wishedCharacters));
}
function getPullList() {
    return JSON.parse(localStorage.getItem(keys.pulledCharacters));
}

function characterInList(character_name, list) {
    const index_of_char = list.findIndex((cn) => cn === character_name);
    
    return { 
        state: (index_of_char !== -1),
        index_of: index_of_char
    };
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
    const character_list = JSON.parse(
        localStorage.getItem(keys.pulledCharacters)).map((c) => c.name);
    return characterInList(character_name, character_list).state;
}


function addCharacterToCollection(character_name) {
    const has_character = hasCharacter(character_name);
    const character_list = JSON.parse(localStorage.getItem(keys.pulledCharacters));

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
    getPullList
};