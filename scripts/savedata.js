const keys = {
    pulledCharacters: "pulled_characters"
}

function keyExists(key) {
    return localStorage.getItem(key) !== null;
}

if (!keyExists(keys.pulledCharacters)) 
    localStorage.setItem(keys.pulledCharacters, 
        JSON.stringify([]));


function hasCharacter(character_name) {
    const character_list = JSON.parse(localStorage.getItem(keys.pulledCharacters));
    const index_of_char = character_list.findIndex((c) => c.name === character_name);
    return { 
        state: (index_of_char !== -1),
        index_of: index_of_char
    };
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

    console.clear();
    console.log(character_list);
}


export { addCharacterToCollection, hasCharacter };