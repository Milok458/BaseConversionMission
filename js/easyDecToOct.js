let start, correct, wrong1, wrong2;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function shuffle(array) {

    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

}

function decimalToOctString(entry) {
    let listChars = [];
    let num = entry;
    if(num === 0){
        listChars.push("0");
    }
    else{
        while(num !== 0){
            let res = num%8;
            num = (num-res)/8;
            listChars.push(String(res));
        }
    }

    let endString = "";
    let i;
    for(i=listChars.length-1; i>=0; i--){
        endString += listChars[i];
    }

    return endString;
}

function generateLevel(){
    correct = getRndInteger(0, 63);
    start = correct;
    wrong1 = correct;
    while(wrong1 === correct || wrong1<0){
        wrong1 = getRndInteger(correct+3, correct-3);
    }
    wrong2 = correct;
    while(wrong2 === correct || wrong2 === wrong1 || wrong2<0){
        wrong2 = getRndInteger(correct+3, correct-3);
    }

    wrong1 = decimalToOctString(wrong1);
    wrong2 = decimalToOctString(wrong2);

    correct = decimalToOctString(correct);
}

function addElement(){
    let container = document.querySelector( '.flexBox' );

    generateLevel();

    let buttons = [];

    let winBtn = document.createElement("BUTTON");
    winBtn.classList.add('winBtn');
    winBtn.classList.add('btn-success');
    winBtn.innerText = String(correct);
    buttons.push(winBtn);

    let loseBtn1 = document.createElement("BUTTON");
    loseBtn1.classList.add('loseBtn');
    loseBtn1.classList.add('btn-success');
    loseBtn1.innerText = String(wrong1);
    buttons.push(loseBtn1);

    let loseBtn2 = document.createElement("BUTTON");
    loseBtn2.classList.add('loseBtn');
    loseBtn2.classList.add('btn-success');
    loseBtn2.innerText = String(wrong2);
    buttons.push(loseBtn2);

    shuffle(buttons);

    container.innerHTML += `<h1>`+ start +`</h1>`;
    container.appendChild(buttons[0]);
    container.appendChild(buttons[1]);
    container.appendChild(buttons[2]);
    container.innerHTML += `<img src="https://pbs.twimg.com/media/EJHPFOLUYAAcqVg?format=jpg&name=medium" alt="GGEZ" width="400">`;

    container.addEventListener('click', (event) =>{
        if(event.target.matches('.winBtn')){
            document.location = 'oct3.html';
        }
        else{
            if(event.target.matches('.loseBtn')){
                document.location = 'wrong.html'
            }
        }
    });
}

function init(){
    addElement();
}

init();