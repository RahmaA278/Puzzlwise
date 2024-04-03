const home = document.getElementById('home');

/* Logic Grid */
const logicPuzzle = document.getElementById('logic-puzzle')
const logicQuestion = document.getElementById('logic-question')
const cleaned_grid = document.getElementsByClassName('grid-item');
const header1a = document.getElementById('h1a');
const header1b = document.getElementById('h1b');
const header1c = document.getElementById('h1c');
const header2a = document.getElementById('h2a');
const header2b = document.getElementById('h2b');
const header2c = document.getElementById('h2c');
const header3a = document.getElementById('h3a');
const header3b = document.getElementById('h3b');
const header3c = document.getElementById('h3c');
const header4a = document.getElementById('h4a');
const header4b = document.getElementById('h4b');
const header4c = document.getElementById('h4c');

/* Clue box */
const cluesBox = document.getElementById('clues-box')
const clue1 = document.getElementById('clue1')
const clue2 = document.getElementById('clue2')
const clue3 = document.getElementById('clue3')
const clue4 = document.getElementById('clue4')
const clue5 = document.getElementById('clue5')
const clue6 = document.getElementById('clue6')

/* Popup */
const wholePage = document.getElementById("container")
const reasDiv = document.getElementById("correct-reasons");
const sortableList = document.getElementById("sortable-list");
const submitBtn = document.getElementById("submit");
const tryAgainBtn = document.getElementById("tryAgainButton");
const revealAnsBtn = document.getElementById("revealAnswerButton");
const modal = document.getElementById('modal');
const modalQuestion = document.getElementById('modal-title')
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const choice3 = document.getElementById('choice3');
const choice4 = document.getElementById('choice4');
const message = document.getElementById('reason-message');
const reason1 = document.getElementById('reason1');
const reason2 = document.getElementById('reason2');
const reason3 = document.getElementById('reason3');
const reason4 = document.getElementById('reason4');

home.addEventListener('click', () => {
    window.location.href = "../index.html";
})

let question = "";
let headers = [];
let excerpts = [];
let clues = [];
let questions = [];
let answers = [];
let reasons = [];
let fillCount = 0;

updateAll();

function openModal(modal) {
    shuffleSortableList();
    modal.classList.add('active')
    logicPuzzle.classList.add('inactive')
    logicQuestion.classList.add('inactive')
    cluesBox.classList.add('inactive')
    clue1.classList.add('inactive')
    clue2.classList.add('inactive')
    clue3.classList.add('inactive')
}

/* Call dragDrop function after opening the modal */
dragDrop();

/* removes the modal and overlay and brings back all other elements */
function closeModal(modal) {
    modal.classList.remove('inactive')
    logicPuzzle.classList.remove('active')
    logicQuestion.classList.remove('active')
    cluesBox.classList.remove('active')
    clue1.classList.remove('active')
    clue2.classList.remove('active')
    clue3.classList.remove('active')
}

function shuffleSortableList() {
    const items = Array.from(sortableList.children);

    /* Fisher-Yates algorithm */
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }

    items.forEach(item => sortableList.appendChild(item));
}

function dragDrop() {
    Array.from(sortableList.children).forEach(item => {
        item.draggable = true;
    });

    let draggedItem = null;
    sortableList.addEventListener("dragstart", function (event) {
        draggedItem = event.target;
        event.dataTransfer.effectAllowed = "move";
    });

    sortableList.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    sortableList.addEventListener("drop", function (event) {
        event.preventDefault();
        const target = event.target;

        if (target.classList.contains("multi-choice-answers")) {
            const targetIndex = Array.from(sortableList.children).indexOf(target);
            const draggedIndex = Array.from(sortableList.children).indexOf(draggedItem);

            if (draggedIndex !== targetIndex) {
                sortableList.insertBefore(draggedItem, targetIndex > draggedIndex ? target.nextSibling : target);
            }
        }
    });

    submitBtn.addEventListener("click", function () {
        checkOrder();
    });
    
};

function checkOrder() {
    const correctOrder = [answers[0][0], answers[0][1], answers[0][2], answers[0][3]]
    const currentOrder = Array.from(sortableList.children).map(item => item.textContent.trim());

    if (arraysAreEqual(currentOrder, correctOrder)) {
        openPopup("Congrats! You're 100% correct");
    } else {
        const correctCount = correctOrder.filter((value, index) => value === currentOrder[index]).length;

        if (correctCount === 0) {
            openPopupHalf("Oops! None of your answers are correct");
        } else {
            openPopupHalf(`Nice try, You got ${correctCount} out of 3 correct`);
        }
    }
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

function openPopup(message) {
    const popup = document.getElementById("popup");
    popup.querySelector('p').textContent = message;
    popup.showModal();

    popup.querySelector('button').addEventListener('click', function () {
        popup.close();
        closeGameDiv();
        closeModal(modal);
        location.reload();
    });
}

function closeGameDiv() {
    modal.style.display = 'none';
    reasDiv.style.display = 'none';
    wholePage.style.display = 'block';
}

function openGameDiv() {
    modal.style.display = 'block';
    reasDiv.style.display = 'none';
    wholePage.style.display = 'none';
}

function openPopupHalf(message) {
    const popup = document.getElementById("popup-half");
    popup.querySelector('p').textContent = message;
    popup.showModal();

    tryAgainBtn.addEventListener("click", function () {
        popup.close();
    });
    revealAnsBtn.addEventListener("click", function () {
        const reasDiv = document.getElementById("correct-reasons");
        revealAnswerFunction();
        popup.close();
        reasDiv.style.display = 'block'
    });
}

function revealAnswerFunction() {
    const correctOrder = [answers[0][0], answers[0][1], answers[0][2], answers[0][3]];

    correctOrder.forEach((value, index) => {
        const item = Array.from(sortableList.children).find(item => item.textContent.trim() === value);
        sortableList.appendChild(item);
    });

    message.textContent = "Below are the reasons for the correct order above:"
    reason1.textContent = reasons[0][0]
    reason2.textContent = reasons[0][1]
    reason3.textContent = reasons[0][2]
    reason4.textContent = reasons[0][3]
}

async function getAllData() {
    const response = await fetch("https://puzzlwise-server.onrender.com/clues/1")
    const information = await response.json();
    question = information.question
    clues.push(information.clue1, information.clue2, information.clue3, information.clue4, information.clue5, information.clue6);
    questions.push(information.question1, information.question2, information.question3);
    answers.push([information.answer1a, information.answer1b, information.answer1c, information.answer1d], [information.answer2a, information.answer2b, information.answer2c, information.answer2d], [information.answer3a, information.answer3b, information.answer3c, information.answer3d]);
    reasons.push([information.reason1a, information.reason1b, information.reason1c, information.reason1d], [information.reason2a, information.reason2b, information.reason2c, information.reason2d], [information.reason3a, information.reason3b, information.reason3c, information.reason3d]);
    headers.push(information.h1a, information.h1b, information.h1c, information.h2a, information.h2b, information.h2c, information.h3a, information.h3b, information.h3c, information.h4a, information.h4b, information.h4c);
}

async function updateAll() {
    await getAllData();
    header1a.textContent = headers[0];
    header1b.textContent = headers[1];
    header1c.textContent = headers[2];
    header2a.textContent = headers[3];
    header2b.textContent = headers[4];
    header2c.textContent = headers[5];
    header3a.textContent = headers[6];
    header3b.textContent = headers[7];
    header3c.textContent = headers[8];
    header4a.textContent = headers[9];
    header4b.textContent = headers[10];
    header4c.textContent = headers[11];
    
    clue1.textContent = clues[0];
    clue2.textContent = clues[1];
    clue3.textContent = clues[2];
    clue4.textContent = clues[3];
    clue5.textContent = clues[4];
    clue6.textContent = clues[5];

    choice1.textContent = answers[0][0]
    choice2.textContent = answers[0][1]
    choice3.textContent = answers[0][2]
    choice4.textContent = answers[0][3]

    logicQuestion.textContent = question;
    modalQuestion.textContent = questions[0];
}

for (let i of cleaned_grid) {
    i.addEventListener('click', () => {
        if (i.innerHTML  == '') {
            i.innerHTML  = '<img src="../assets/Yellow_x.png" width="54px" height="54px">';
            fillCount++;
        } else if (i.innerHTML == '<img src="../assets/Yellow_x.png" width="54px" height="54px">') {
            i.innerHTML  = '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">';
        } else {
            i.innerHTML = '';
            fillCount--;
        }
        if (fillCount >= 27) {
            checkGrid();
        }
    })
    i.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (i.innerHTML == '') {
            i.innerHTML = '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">';
            fillCount++;
        } else if (i.innerHTML == '<img src="../assets/Yellow_x.png" width="54px" height="54px">') {
            i.innerHTML = '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">';
        } else {
            i.innerHTML = '';
            fillCount--;
        }
        if (fillCount >= 27) {
            checkGrid();
        }
    })
}

function checkGrid() {
    if(cleaned_grid[0].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && cleaned_grid[3].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && 
    cleaned_grid[7].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && cleaned_grid[11].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && 
    cleaned_grid[14].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && cleaned_grid[16].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && 
    cleaned_grid[20].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && cleaned_grid[22].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && 
    cleaned_grid[24].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">') {
        console.log("Correct!");
        openGameDiv();
        openModal(modal);
    } else {
        console.log("Incorrect!");
        alert("Incorrect.")
    }
}