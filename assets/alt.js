// returns an rgb string with a randomly generated color
function generateColors() {
    hue = Math.floor(Math.random() * 255);
    sat = 40 + Math.floor(Math.random() * 50);
    lum = 35 + Math.floor(Math.random() * 35);
    return ["hsl(" + hue + ", " + sat + "%, " + lum + "%)", "hsl(" + hue + ", " + sat + "%, " + (lum - 30) + "%)"];
}

// works from the question element down, to display the answer and move the title up
function openAnswer(question, index){
    // children[0] is the question text, children[1] is the answer
    children = question.children
    setTimeout(function(){
        children[0].classList.remove("straighten-right")
        question.classList.remove("rotate-slight-left")
    }, 500);
    children[0].classList.add("straighten-right")
    children[1].classList.remove("d-none");
    question.removeEventListener("click", openHandlers[index]);
    children[1].addEventListener("click", closeAnswer.bind(null, question));
}

function closeAnswer(question, index){
    children = question.children
    children[1].classList.add("d-none")
    question.removeEventListener("click", this)
}

const body = document.getElementsByTagName("body")[0];
const colors = generateColors();
body.style.backgroundColor = colors[0];
body.style.color = colors[1];
const backButtons = document.getElementsByClassName("back-button");
for (const button of backButtons) {
    button.style.backgroundColor = colors[1]
    button.style.color = colors[0]
}
let openHandlers = [];
i = 0;

// event listeners for the answers
for (const question of document.getElementsByClassName("question")){
    openHandlers[i] = (openAnswer.bind(null, question, i))
    question.addEventListener("click", openHandlers[i]);
    i++;
}


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