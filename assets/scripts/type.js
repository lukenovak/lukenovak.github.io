let currentFocus = 0;
let currentPhraseLength = -1;
let currPhrase =  "";
let currPhraseIdx = 0;
let incorrects = [];
let totalCount = 0;
let totalWrong = 0;
let scores = [];
let startTime = undefined;
let playedIntro = false;
let playingIntro = false;

const phrases = [
    "The quick brown fox jumps over the lazy dog.",
    "I can really make you type whatever I want here, huh?",
    "A quixotic zygote skillfully outmaneuvers its forebearers.",
    "My favorite color is taupe and my favoite meal raw eggshells.",
    "wow, strange picks.",
    "ANYWAY, I sent you this webpage to invite you to my birthday party.",
    "\"That sounds fun, when is it?\" I'm glad you asked, completely of your own volition!",
    "The party will be on April 18, starting at 8pm, at a bar yet to be confirmed",
    "(the bar will probably be Antler on the Lower East Side).",
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
        totalCount += 1;

        if (currentFocus === currentPhraseLength) { // end of phrase
            endTime = Date.now()

            // calulate speed in WPM
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
                // game all done in this case
                document.getElementById('question').innerHTML = `thanks for playing ¯\\_(ツ)_/¯`;
                document.getElementById('disclaimer').classList.remove("d-none");
                document.getElementById('typingContainer').classList.remove('blurred-nonfocus');
                document.getElementById('beginBox').classList.add('d-none');
                const speedAverage = scores.reduce((acc, n) => acc + parseFloat(n.wpm), 0) / scores.length
                const overallAccuracy = (1 - (totalWrong / totalCount)) * 100
                const scoreboard = document.getElementById('scoreboard');
                scoreboard.innerHTML = `<div><h4>Your Overall Score:</h4></div>`;
                scoreboard.innerHTML += (`
                    <div class="row text-center">
                        <div class="col d-flex">
                            <h4>Average Speed:</h4>
                            <h4 id="speedVal" class="px-2">${speedAverage.toFixed(2)}</h4>
                            <h4>WPM</h4>
                        </div>
                        <div class="col d-flex">                    
                            <h4>Total Accuracy:</h4>
                            <h4 id="accuracyVal" class="px-2">${overallAccuracy.toFixed(2)}</h4>
                            <h4>%</h4>
                        </div>
                    </div>`)
            }
        } else {
            applyFocus(currentFocus)
        }
    } else if (!incorrects.includes(currentFocus)) {
        incorrects.push(currentFocus);
        totalWrong += 1;
        document.getElementsByClassName('focused').item(0).classList.add("wrongggg");
    }
}

document.getElementById('typingContainer').addEventListener('click', (e) => {
    document.getElementById('textarea').focus();
    const q = document.getElementById('question');
    if (!playedIntro) {
        playingIntro = true;
        q.innerText = "hello...";
        setTimeout(() => q.innerText = "I begin every weekday with a few rounds of typing practice", 3000);
        setTimeout(() => q.innerText = "so I figured that I would whip up a quick game to see", 8000);
        setTimeout(() => q.innerText = "who else among my friends can really fly on the keys", 13000);
        setTimeout(() => q.innerText = "Let's begin in... 3", 18000);
        setTimeout(() => q.innerText = "Let's begin in... 2", 19000);
        setTimeout(() => q.innerText = "Let's begin in... 1", 20000);
        setTimeout(() => playingIntro = false)
        setTimeout(() => setUpNewPhrase(q, currPhraseIdx), 21000);
        playedIntro = true;
    } else if (!playingIntro) {
        setUpNewPhrase(q, currPhraseIdx)
    }

});

document.getElementById('textarea').addEventListener('input', (e) => {
    let char = e.data[0];
    e.target.value = '';
    handleNewCharacter(char)
});
