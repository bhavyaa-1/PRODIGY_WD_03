const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal wins
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical wins
    [0, 4, 8], [2, 4, 6]              // Diagonal wins
];

// Update the status text
function updateStatus() {
    statusText.textContent = gameActive
        ? `Player ${currentPlayer}'s turn`
        : `Player ${currentPlayer} wins!`;
}

// Check for a winner
function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return true;
        }
    }
    return false;
}

// Handle cell click
function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (gameBoard[index] || !gameActive) return; // Prevent click if cell is taken or game is over

    // Mark the cell
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer);

    // Check for winner
    if (checkWinner()) {
        updateStatus();
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

// Reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    updateStatus();
}

// Add event listeners to cells
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Add event listener for reset button
resetBtn.addEventListener('click', resetGame);

// Initialize the status
updateStatus();
