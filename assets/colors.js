// constants
const baseColor = "#DEDEDE";
const hookersGreen = "#49796b";
const japaneseCarmine = "#9D2933";
const spaceCadet = "#1d2951";
const mainNameId = "myName";
const colorMenuId = "hiddenMenu";
const headerId = "mainHeader";
const header = document.getElementById(headerId);


let currentColor = hookersGreen;

// changes the secondary color of the site
function changeColor(color) {
    const gcolor = document.getElementsByClassName("hgreen");
    for (var i = 0; i < gcolor.length; i++) {
        gcolor[i].style.color = color;
    }
    const gbg = document.getElementsByClassName("bg-hgreen");
    for (var i = 0; i < gbg.length; i++) {
        // we don't want to change the menu items
        if (gbg[i].parentElement.id != "hiddenMenu") {
            gbg[i].style.background = color;
        }
    }
    links = document.getElementsByTagName("a")
    for (let i = 0; i < links.length; i++) {
        thisLink = links[i];
        thisLink.addEventListener("mouseover", function(){links[i].style.color = color});
    }
    currentColor = color;
}

function closeDropdown() {
    const menu = document.getElementById(colorMenuId);
    menu.classList.add("d-none");
    header.classList.add("py-3");
    header.classList.remove("pb-3");
    header.classList.remove("mt-n1");
}

// opens the color change dropdown
function openDropdown() {
    const menu = document.getElementById(colorMenuId);
    header.classList.remove("py-3");
    header.classList.add("pb-3");
    header.classList.add("mt-n1");
    menu.classList.remove("d-none");
    menu.addEventListener("click", closeDropdown);
}

// add event listeners
document.getElementById("myName").addEventListener("mouseover", function(){
    document.getElementById("myName").style.color = currentColor; 
});
document.getElementById("myName").addEventListener("mouseleave", function(){
    document.getElementById("myName").style.color = baseColor; 
});
document.getElementById("myName").addEventListener("click", openDropdown)
// iterate through for link hovering
links = document.getElementsByTagName("a")
for (let i = 0; i < links.length; i++) {
    thisLink = links[i];
    thisLink.addEventListener("mouseover", function(){links[i].style.color = currentColor});
    thisLink.addEventListener("mouseleave", function(){links[i].style.color = baseColor});
}

// add the color change listeners
document.getElementById("changeGreen").addEventListener("click", function(){
    changeColor(hookersGreen);
})

document.getElementById("changeRed").addEventListener("click", function(){changeColor(japaneseCarmine)})

document.getElementById("changeBlue").addEventListener("click", function(){changeColor(spaceCadet)})