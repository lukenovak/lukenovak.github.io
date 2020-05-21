// returns an rgb string with a randomly generated color
function generateColors() {
    hue = Math.floor(Math.random() * 255);
    sat = 40 + Math.floor(Math.random() * 50);
    lum = 35 + Math.floor(Math.random() * 35);
    return ["hsl(" + hue + ", " + sat + "%, " + lum + "%)", "hsl(" + hue + ", " + sat + "%, " + (lum - 30) + "%)"];
}

body = document.getElementsByTagName("body")[0];
colors = generateColors();
body.style.backgroundColor = colors[0];
body.style.color = colors[1];
document.getElementsByClassName("outer-border")[0].style.borderColor = colors[1];

// event listeners for the letter spinning
for (const letter of document.getElementsByClassName("circle")){
    if (screen.width > 758) {
        letter.addEventListener("mouseover", function(){
            setTimeout(function(){letter.classList.remove("spin-cw")}, 300);
            letter.classList.add("spin-cw")
        })
    }
    else {
        letter.addEventListener("click", function(){
            setTimeout(function(){letter.classList.remove("spin-cw")}, 300);
            letter.classList.add("spin-cw")
        })
    }

}