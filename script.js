document.addEventListener('DOMContentLoaded', function () {
    const gridSize = 13;
    const crosswordGrid = document.getElementById('crossword-grid');
    const acrossCluesElement = document.getElementById('across-clues');
    const downCluesElement = document.getElementById('down-clues');
    const feedbackElement = document.getElementById('feedback');
    const saveProgressElement = document.getElementById('saveProgress');
    const resetPuzzleElement = document.getElementById('resetPuzzle');
    const checkAnswersElement = document.getElementById('checkAnswers');

    // Predefine grid layout: 0 = white, 1 = black
    const gridLayout = [
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0]
    ];

    // Predefined clue numbers (across and down clues)
    const clueNumbers = [
        [1, null, 2, null, null, 3, null, 4, null, 5, null, null, 6],
        [null, null, null, null, null, null, null, 7, null, null, null, null, null],
        [null, null, 8, null, null, null, null, null, null, 9, null, 10, null],
        [11, null, null, null, null, null, null, null, 12, null, null, null, null],
        [null, null, 13, null, 14, null, 15, null, 16, null, 17, null, 18],
        [null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, 19, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null],
        [20, null, null, null, 21, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, 22, null, 23],
        [null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, 24, null, null, null, null, null, null, null, null, null],
        [25, null, null, null, null, null, null, null, null, null, null, null, null],
    ];

    // Predefined answers
    const correctAnswers = [
        ["A", "L", "A", "K", "U", "A", "", "S", "", "A", "I", "K", "A"],
        ["K", "", "I", "", "", "R", "", "A", "U", "R", "", "", "O"],
        ["U", "", "P", "A", "A", "R", "N", "A", "", "A", "Y", "U", "K"],
        ["K", "A", "A", "", "", "A", "", "", "M", "", "", "R", ""],
        ["U", "", "C", "H", "I", "P", "A", "", "A", "O", "R", "O", "O"],
        ["N", "", "H", "", "L", "", "I", "", "K", "", "R", "", "E"],
        ["Y", "", "P", "", "E", "", "R", "R", "A", "G", "A", "I", ""],
        ["", "", "A", "", "", "", "R", "", "C", "", "M", "", ""],
        ["A", "I", "C", "H", "A", "P", "I", "C", "H", "A", "P", "", ""],
        ["I", "", "H", "", "I", "", "A", "", "K", "", "A", "J", "O"],
        ["K", "", "", "", "R", "", "N", "", "A", "", "S", "", "C"],
        ["U", "", "", "A", "I", "N", "G", "O", "C", "H", "O", "C", "H"],
        ["M", "A", "A", "", "G", "", "", "", "H", "", "I", "", "I"],
    ];

    // Across clues
    const acrossClues = [
        { number: 1, clue: "To be far(6).", answer: "ALAKUA" },
        { number: 5, clue: "To be hung, suspended(4).", answer: "AIKA" },
        { number: 7, clue: "To listen carefully(3).", answer: "AUR" },
        { number: 8, clue: "Namesake, i.e. one who shares the same given name(6).", answer: "PAARNA" },
        { number: 9, clue: "To turn green, of trees just before the rains(4).", answer: "AYUK" },
        { number: 11, clue: "What?(3).", answer: "KAA" },
        { number: 13, clue: "Bird species, it sings when it rains(5).", answer: "CHIPA" },
        { number: 16, clue: "To take care of, feed, provide(5).", answer: "AOROO" },
        { number: 19, clue: "A house in bad condition, about to fall apart, hovel(6).", answer: "RRAGAI" },
        { number: 20, clue: "To continuously drink, of animals(11).", answer: "AICHAPICHAP" },
        { number: 22, clue: "(in quotations it is followed by direct reported speech) to say. (3)", answer: "AJO" },
        { number: 24, clue: "To be milk less, dry(10).", answer: "AINGOCHOCH" },
        { number: 25, clue: "Now then! Signals an answer or a statement(3).", answer: "MAA" },
    ];

    // Down clues
    const downClues = [
        { number: 1, clue: "To press the elbow or fist on sb. without releasing when fighting. (7)", answer: "AKUKUNY" },
        { number: 2, clue: "To rinse utensils. (10)", answer: "AIPACHPACH" },
        { number: 3, clue: "To gain an upper hand. (5)", answer: "ARRAP" },
        { number: 4, clue: "Hour, watch, a beaded bracelet worn by warriors (3)", answer: "SAA" },
        { number: 5, clue: "To be (3)", answer: "ARA" },
        { number: 6, clue: "To water. (3)", answer: "AOK" },
        { number: 10, clue: "An axe having a bent head used for splitting firewood. (3)", answer: "URO" },
        { number: 12, clue: "Any in between color of cows, any color that doesn't have an own name. (10)", answer: "MAKACHKACH" },
        { number: 14, clue: "Six. (3)", answer: "ILE" },
        { number: 15, clue: "To be laden with. (8)", answer: "AIRRIANG" },
        { number: 17, clue: "A plant spec., found around river beds. (9)", answer: "RRAMPASOI" },
        { number: 18, clue: "Yes? What? (used by men) (2)", answer: "OE" },
        { number: 20, clue: "To bump sb. or one's self on a stone, stump, etc. (5)", answer: "AIKUM" },
        { number: 21, clue: "To brag. (5)", answer: "AIRIG" },
        { number: 23, clue: "Usually. (4)", answer: "OCHI" },
    ];

    // Generate the crossword grid
    function generateGrid() {
        for (let i = 0; i < gridSize; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('td');
                if (gridLayout[i][j] === 1) {
                    cell.className = 'black';
                } else {
                    const input = document.createElement('input');
                    input.maxLength = 1; // Limit input to one character
                    input.id = `cell-${i}-${j}`; // Unique ID for each cell
                    input.name = `cell-${i}-${j}`; // Unique name for each cell
                    cell.appendChild(input);
                    if (clueNumbers[i][j] !== null) {
                        const number = document.createElement('span');
                        number.className = 'number';
                        number.textContent = clueNumbers[i][j];
                        cell.classList.add('numbered');
                        cell.appendChild(number);
                    }
                }
                row.appendChild(cell);
            }
            crosswordGrid.appendChild(row);
        }
    }

    // Populate clues
    function populateClues() {
        acrossClues.forEach(clue => {
            const li = document.createElement('li');
            li.textContent = `${clue.number}. ${clue.clue}`;
            li.onclick = () => highlightClue(clue.number, true); // Highlight across clue
            acrossCluesElement.appendChild(li);
        });

        downClues.forEach(clue => {
            const li = document.createElement('li');
            li.textContent = `${clue.number}. ${clue.clue}`;
            li.onclick = () => highlightClue(clue.number, false); // Highlight down clue
            downCluesElement.appendChild(li);
        });
    }

    // Highlight corresponding clue in the grid
    function highlightClue(clueNumber, isAcross) {
        const cells = crosswordGrid.getElementsByTagName('td');
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (cell.className !== 'black') {
                const input = cell.querySelector('input');
                if (isAcross) {
                    // Logic for across clues
                    if (cell.querySelector('.number') && cell.querySelector('.number').textContent == clueNumber) {
                        for (let j = 0; j < acrossClues.find(c => c.number === clueNumber).answer.length; j++) {
                            const nextCell = cells[i + j];
                            if (nextCell && nextCell.className !== 'black') {
                                nextCell.style.backgroundColor = 'lightblue';
                            }
                        }
                    }
                } else {
                    // Logic for down clues
                    if (cell.querySelector('.number') && cell.querySelector('.number').textContent == clueNumber) {
                        for (let j = 0; j < downClues.find(c => c.number === clueNumber).answer.length; j++) {
                            const nextCell = cells[i + (j * gridSize)];
                            if (nextCell && nextCell.className !== 'black') {
                                nextCell.style.backgroundColor = 'lightblue';
                            }
                        }
                    }
                }
            }
        }
    }

    // Function to check answers
    function checkAnswers() {
        let isCorrect = true;
        const inputs = document.querySelectorAll('input'); // Get all input fields

        inputs.forEach((input) => {
            const name = input.name; // Get the name attribute
            const row = parseInt(name.split('-')[1]); // Extract row from name
            const col = parseInt(name.split('-')[2]); // Extract column from name
            const answer = correctAnswers[row][col]; // Get the correct answer

            if (answer !== null && input.value.toUpperCase() !== answer) {
                isCorrect = false;
                input.style.backgroundColor = 'red'; // Highlight incorrect inputs
            } else if (answer !== null && input.value.toUpperCase() === answer) {
                input.style.backgroundColor = 'lightgreen'; // Highlight correct inputs
            } else {
                input.style.backgroundColor = ''; // Reset background color for empty cells
            }
        });

        if (isCorrect) {
            alert("Congratulations! All answers are correct.");
        } else {
            alert("Some answers are incorrect. Please try again.");
        }
    }

    window.saveProgress = function () {
        const grid = [];
        document.querySelectorAll('input').forEach(input => {
            grid.push(input.value); // Collecting cell values
        });
        localStorage.setItem('crosswordGrid', JSON.stringify(grid));
    }

    window.resetPuzzle = function () {
        const inputs = crosswordGrid.getElementsByTagName('input');
        for (let input of inputs) {
            input.value = '';
            input.style.backgroundColor = ''; // Reset background color
        }
        feedbackElement.textContent = ''; // Clear feedback
    }

    // Initialize the crossword puzzle
    generateGrid();
    populateClues();

    // Add event listeners for buttons
    document.getElementById('checkAnswers').addEventListener('click', checkAnswers);
    saveProgressElement.addEventListener('click', saveProgress);
    resetPuzzleElement.addEventListener('click', resetPuzzle);
});
``
