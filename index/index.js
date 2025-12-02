const button_ids = Array.from(document.querySelectorAll("div ul li button")).map((b) => b.id);


document.getElementById("navigation-option-container")
    .addEventListener("focusin", (ev) => console.log(ev.target.id));