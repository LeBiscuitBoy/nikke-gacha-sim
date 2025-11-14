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


export { result_elements };