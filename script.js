//select 
const holes = document.querySelectorAll('.hole');
//scores 
const scoreBoard = document.querySelector('.score');
//mole 
const moles = document.querySelectorAll('.mole');
let lastHole = 0;
let timeUp = false;
let score = 0;


//create a function to make a random time for mole to pop from the hole
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const index = ~~(Math.random() * holes.length);
    const hole = holes[index];

    //prevent same hole from getting the same number
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    //get a random time to determine how long mole should peep up
    const time = randomTime(500, 1000);
    //get the random hole from the randomHole function
    const hole = randomHole(holes);
    //add the CSS class so selected mole can "pop up"
    hole.classList.add('up');
    //make the selected mole "pop down" after a random time
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) {
            peep();
        }
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    //show random moles for 15 seconds
    setTimeout(() => timeUp = true, 15000);
}

function wack(e) {
    //** new thing I learned  and  find hard to get  more study required */
    if (!e.isTrusted) return;
    score++;
    //this refers to item clicked
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = `you wacked bert ${score}`;
}
// For each to loop 
moles.forEach(mole => mole.addEventListener('click', wack));