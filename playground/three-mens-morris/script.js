const cells = document.querySelectorAll('#game-board .cell');
const playerText = document.querySelector('#player-text');
const statusText = document.querySelector('#status-text');
const resetButton = document.querySelector('#reset-button');

let cellValues = [2, 2, 2, null, null, null, 1, 1, 1];
let currentPlayer = 1; // 1 for white, 2 for black
let selectedIndex = null;
let gameOver = false;

function updateCell() {
    cells.forEach(cell => {
        cell.innerHTML = ''; // Clear existing content
        cell.classList.remove('bg-violet-400', 'bg-violet-700');
    });

    cellValues.forEach((value, index) => {
        if (value !== null) {
            const pawn = document.createElement("div");
            if (value === 1) {
                pawn.classList.add('w-[30%]', 'h-[30%]', 'rounded-full', 'border-2', 'bg-white'); // White Pawn
            } else {
                pawn.classList.add('w-[30%]', 'h-[30%]', 'rounded-full', 'border-2', 'bg-black'); // Black Pawn
            }
            cells[index].appendChild(pawn);
        }
    });

}

function selectPawn(index) {
    if (cellValues[index] === null) {
        statusText.innerText = 'Choose your pawn first!';
        return null;
    } else if (cellValues[index] !== currentPlayer) {
        statusText.innerText = 'This not your pawn!';
        return null;
    }

    statusText.innerText = 'Move your pawn!';
    return index;
}

function getValidMoves(index) {
    let validMoves = [];
    let possibleOffsets = [-1, 1, -3, 3]; // Left, Right, Up, Down

    // If selected pawn in center
    if (index === 4) {
        cellValues.forEach((value, i) => {
            if (value === null) {
                validMoves.push(i);
            }
        });
        return validMoves;
    }

    // Prevent moving outside the 3x3 board
    if (index % 3 === 0) {
        possibleOffsets = possibleOffsets.filter(offset => offset !== -1); // Can't move left
    }
    if (index % 3 === 2) {
        possibleOffsets = possibleOffsets.filter(offset => offset !== 1); // Can't move right
    }

    // If selected pawn in corner and center is empty
    if ((index === 0 || index === 2 || index === 6 || index === 8) && cellValues[4] === null) {
        validMoves.push(4);
    }

    possibleOffsets.forEach(offset => {
        let newIndex = index + offset;
        if (newIndex >= 0 && newIndex < cellValues.length && cellValues[newIndex] === null) {
            validMoves.push(newIndex);
        }
    });

    return validMoves;
}

function showValidMoves(index) {
    index.forEach(i => {
        cells[i].classList.add('bg-violet-400');
    });
}

function isValidMove(selectedPawn, selectedStep) {
    return getValidMoves(selectedPawn).includes(selectedStep);
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    if (currentPlayer === 1) {
        playerText.innerHTML = "White Pawn Player's Turn";
    } else {
        playerText.innerHTML = "Black Pawn Player's Turn";
    }

    statusText.innerText = "Choose your pawn!";
}

function checkStuckOpponent() {
    const opponent = currentPlayer === 1 ? 2 : 1;

    // Find all opponent's pawns
    const opponentPawns = cellValues
        .map((val, idx) => val === opponent ? idx : null)
        .filter(idx => idx !== null);

    // Check if any of the opponent's pawns can still move
    return opponentPawns.every(index => getValidMoves(index).length === 0);
}

function checkWin() {
    const winPatterns = [
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPatterns.some(pattern =>
        pattern.every(i => cellValues[i] === currentPlayer)
    );
}

function highlightTheWinner() {
    cellValues.forEach((value, index) => {
        if (value === currentPlayer) {
            cells[index].classList.add('bg-violet-700');
        }
    });
}

updateCell();

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = Number(cell.dataset.index);
        console.log('cell:', index);
        console.log('cell value: ', cellValues[index]);

        if (gameOver === true) return;

        if (selectedIndex === null) {

            selectedIndex = selectPawn(index);

            console.log('selected index: ', selectedIndex);

            if (selectedIndex === null) return;

            let possibleMoves = getValidMoves(selectedIndex);

            console.log('possible moves: ', possibleMoves);

            if (possibleMoves.length === 0) {
                statusText.innerText = 'No valid moves, please select another pawn!';
                selectedIndex = null;
                return;
            }

            cells[index].classList.add('bg-violet-700');

            showValidMoves(possibleMoves);
        } else {
            // Cancel selected pawn
            if (index === selectedIndex) {
                statusText.innerText = 'Reselect your pawn!';
                selectedIndex = null;
                updateCell();
                return;
            }

            // invalid move
            if (!isValidMove(selectedIndex, index)) {
                statusText.innerText = 'Invalid move!';
                return;
            }

            // Move pawn
            cellValues[index] = currentPlayer;
            cellValues[selectedIndex] = null;
            selectedIndex = null;

            updateCell();

            if (checkStuckOpponent()) {
                playerText.innerText = currentPlayer === 1
                    ? 'White Pawn Wins! (Black Pawn Has No moves)'
                    : 'Black Pawn Wins! (White Pawn Has No moves)';

                statusText.innerText = 'Game Over';
                gameOver = true;
            }

            if (checkWin()) {
                playerText.innerText = currentPlayer === 1 ? 'White Pawn Wins!' : 'Black Pawn Wins!';
                statusText.innerText = 'Game Over';
                gameOver = true;
            }

            if (gameOver === true) {
                highlightTheWinner();
                return;
            }

            switchPlayer();

        }

    });
});

resetButton.addEventListener('click', () => {
    cellValues = [2, 2, 2, null, null, null, 1, 1, 1];
    currentPlayer = 1;
    selectedIndex = null;
    gameOver = false;

    playerText.innerText = "White Pawn Player's Turn";
    statusText.innerText = "Choose your pawn!";
    updateCell();
});