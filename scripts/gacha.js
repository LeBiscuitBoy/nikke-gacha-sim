const class_names = {
    sparkle: "sparkle",
    character_card: "character-card",
    spare_body: "spare-body",
    new_character: "new-character"
};
const result_elements = Array.from(document.getElementsByClassName("result-container")).map((p) => {
    return {
        id: parseInt(p.id.substring(p.id.indexOf("-") + 1)),
        sparkle: p.getElementsByClassName(class_names.sparkle)[0],
        character_card: p.getElementsByClassName(class_names.character_card)[0],
        spare_body: p.getElementsByClassName(class_names.spare_body)[0],
        new_character: p.getElementsByClassName(class_names.new_character)[0]
    }
}).sort((l, r) => l.id - r.id);


const character = characters.find((c) => c.name === "Little Mermaid");
const pull_assets_url = "images/pull_assets";

result_elements.forEach((e) => {
    e.character_card.src = character.characterCardImage;
    e.character_card.title = character.name;
    e.new_character.src = `${pull_assets_url}/new_character.png`;
    e.spare_body.src = character.characterSpareBodyImage;
    e.spare_body.title = `${character.name}'s Spare Body`;

    if (character.rarity === Character.Rarities.SR) {
        e.character_card.classList.add(e.id <= 5 ? "sr-top" : "sr-bottom");
        e.sparkle.src = `${pull_assets_url}/glow_sr.png`;
    }
    else if (character.rarity === Character.Rarities.SSR) {
        e.character_card.classList.add(e.id <= 5 ? "ssr-top" : "ssr-bottom");
        e.sparkle.src = `${pull_assets_url}/glow_ssr.png`;
    } 
    else
        e.sparkle.src = `${pull_assets_url}/glow_none.png`;
});


export { result_elements };