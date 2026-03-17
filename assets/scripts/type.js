let currentFocus = 0;
let currentPhraseLength = -1;
let currPhrase =  "";
let currPhraseIdx = 0;
let incorrects = [];
let scores = [];
let startTime = undefined;
let playedIntro = false;

const phrases = [
    "The quick brown fox jumps over the lazy dog.",
    "I would like to invite you to join my twenty-eigth birthday celebration!",
    "The party will be on April 18, ten days after my birthday actually occurs,",
    "starting at 8pm at a bar yet to be confirmed (but probably Antler).",
    "More details and RSVP can be found at the partiful link below :)"
]

const applyFocus = (idx) => {
    const q = document.getElementById('question')
    q.childNodes[idx].classList.add('focused');
    if (idx > 0) {
        q.childNodes[idx-1].classList.remove('focused')
    }
}

const setUpNewPhrase = (phraseElement, phraseIdx) => {
    currentFocus = 0;
    const newPhraseText = phrases[phraseIdx];
    if (newPhraseText) {
        let newInnerHTML = '';
        for (const char of newPhraseText) {
            newInnerHTML += `<span>${char}</span>`

        }
        phraseElement.innerHTML = newInnerHTML;
        applyFocus(0);
        incorrects = [];
        currPhrase = newPhraseText;
        currentPhraseLength = newPhraseText.length;
        wrongCount = 0;
    } else {
        console.error("EMPTY PHRASE ELEMENT");
    }
}

const handleNewCharacter = (c) => {
    if (currentFocus === 0) {
        startTime = Date.now();
    }

    if (c === currPhrase[currentFocus]) {
        // advance to next element
        currentFocus += 1;

        if (currentFocus === currentPhraseLength) { // end of phrase
            endTime = Date.now()
            // calulate speed
            
            // Words per minute
            // apparently i'm a wierdo and did Words times 1 / minutes. WHY DID I DO IT THAT WAY
            // stoichiometry still fresh on the mind apparently
            const wpm = (currentPhraseLength / 5) * (60 / ((endTime - startTime) / 1000))
            document.getElementById("speedVal").innerText = wpm.toFixed(2);

            // calculate accuracy
            const accuracy = (1 - (incorrects.length / currentPhraseLength)) * 100;
            document.getElementById("accuracyVal").innerText = accuracy.toFixed(2);

            scores.push({"wpm": wpm.toFixed(2), "accuracy": accuracy.toFixed(2)})
            
            // set up new phrases
            currPhraseIdx += 1
            if (currPhraseIdx < phrases.length) {
                setUpNewPhrase(document.getElementById('question'), currPhraseIdx);
            } else {
                document.getElementById('question').innerHTML = `thanks for playing ¯\\_(ツ)_/¯`
                document.getElementById('disclaimer').classList.remove("d-none")
                document.getElementById('typingContainer').classList.remove('blurred-nonfocus')
                const scoreboard = document.getElementById('scoreboard')
                scoreboard.innerHTML = `<div><h4>Your scores:</h4></div>`;
                for (let i = 0; i < scores.length; i++) {
                    scoreboard.innerHTML += (`
                        <div class="row text-center">
                            <div class="col d-flex">
                                <h4>Speed:</h4>
                                <h4 id="speedVal" class="px-2">${scores[i].wpm}</h4>
                                <h4>WPM</h4>
                            </div>
                            <div class="col d-flex">                    
                                <h4>Accuracy:</h4>
                                <h4 id="accuracyVal" class="px-2">${scores[i].accuracy}</h4>
                                <h4>%</h4>
                            </div>
                        </div>`)
                }
            }
        } else {
            applyFocus(currentFocus)
        }
    } else if (!incorrects.includes(currentFocus)) {
        incorrects.push(currentFocus);
        document.getElementsByClassName('focused').item(0).classList.add("wrongggg");
    }
}

document.getElementById('typingContainer').addEventListener('click', (e) => {
    document.getElementById('textarea').focus();
    const q = document.getElementById('question');
    if (!playedIntro) {
        q.innerText = "hello...";
        setTimeout(() => q.innerText = "I begin every weekday with a few rounds of typing practice", 3000);
        setTimeout(() => q.innerText = "so I figured that I would whip up a quick game to see", 8000);
        setTimeout(() => q.innerText = "who else among my friends can really fly on the keys", 13000);
        setTimeout(() => q.innerText = "Let's begin in... 3", 18000);
        setTimeout(() => q.innerText = "Let's begin in... 2", 19000);
        setTimeout(() => q.innerText = "Let's begin in... 1", 20000);
        setTimeout(() => setUpNewPhrase(q, currPhraseIdx), 21000);
        playedIntro = true
    } else {
        setUpNewPhrase(q, currPhraseIdx)
    }

});

document.getElementById('textarea').addEventListener('input', (e) => {
    let char = e.data[0];
    e.target.value = '';
    handleNewCharacter(char)
});
