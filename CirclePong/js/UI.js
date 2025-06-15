const playBtn = document.querySelector("main button");
const backBtn = document.querySelector(".backBtn");
const controlsBtn = document.querySelector(".controlsBtn");
const optionsBtn = document.querySelector(".optionsBtn");
const main = document.querySelector("main");

let menuCreated = false;

function createMenu(title, texto){
    if (!menuCreated) {
        const menuTop = document.createElement("div");
        menuTop.classList.add("menuTop");
        menuCreated = true;
        const newMenu = document.createElement("div");
        newMenu.classList.add("newMenu");
        const newTitle = document.createElement("h1");
        newTitle.innerText = title;
        const newDescription = document.createElement("p");
        newDescription.innerText = texto;
        
        const closeBtn = document.createElement("button");
        closeBtn.classList.add("closeBtn");
        closeBtn.innerText = "x";

        closeBtn.addEventListener("click", () =>{
            closeBtn.parentElement.parentElement.remove();
            menuCreated = false;
        });

        main.appendChild(newMenu);
        newMenu.appendChild(menuTop);
        menuTop.appendChild(newTitle);
        menuTop.appendChild(closeBtn);
        newMenu.appendChild(newDescription);
    }else{
        const oldTitle = document.querySelector(".newMenu h1");
        oldTitle.innerText = title;
        const oldText = document.querySelector(".newMenu p");
        oldText.innerText = texto;
    }
}

controlsBtn.addEventListener("click", () => {
    const title = "Controls";
    const texto = "Use the left and right arrow keys to move."
    createMenu(title, texto);
});
optionsBtn.addEventListener("click", () =>{
    const title = "Options";
    const texto = "Under construction...";
    createMenu(title, texto);
});

if (backBtn){
    backBtn.addEventListener("click", () =>{
        window.location.href = "index.html"
    });
}
if (playBtn){
    playBtn.addEventListener("click", () =>{
        window.location.href = "game.html";
    });
}