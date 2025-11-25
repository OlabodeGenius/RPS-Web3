// ============ 1. SCORE + DOM SETUP ============

let userScore = 0;
let computerScore = 0;

const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const result_p = document.querySelector('.result > p');

const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');

const connectBtn = document.getElementById('connectBtn');
const walletAddress_p = document.getElementById('walletAddress');
const actionMsg_p = document.getElementById('action-msg');

const loader_div = document.getElementById('loader');
const popup_div = document.getElementById('popup');
const overlay_div = document.getElementById('overlay');
const popupTitle_h2 = document.getElementById('popup-title');
const popupText_p = document.getElementById('popup-text');
const popupClose_btn = document.getElementById('popup-close');

// ============ 2. WEB3 + CONTRACT SETUP ============

// Your deployed RPS contract on BSC Testnet
const contractAddress = "0x9c21e1Fc1910C8B31ebA9acc8012179879FeE18D";

let provider;
let signer;
let contract;
let betAmountWei = null;  // will be filled from contract

async function connectWallet() {
    try {
        if (!window.ethereum) {
            alert("MetaMask not detected. Please install MetaMask.");
            return;
        }

        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        signer = provider.getSigner();
        const address = await signer.getAddress();
        walletAddress_p.textContent = "Connected: " + address;

        const abiJson = await fetch("contractABI.json").then(r => r.json());
        contract = new ethers.Contract(contractAddress, abiJson.abi, signer);

        console.log("Contract loaded:", contractAddress);

        // === NEW: read betAmount directly from the contract ===
        betAmountWei = await contract.betAmount();
        const betAmountEth = ethers.utils.formatEther(betAmountWei);
        console.log("betAmount in contract:", betAmountEth, "BNB");

        actionMsg_p.textContent = `Bet amount: ${betAmountEth} tBNB — Make your move.`;
    } catch (err) {
        console.error(err);
        alert("Failed to connect wallet.");
    }
}

connectBtn.addEventListener("click", connectWallet);

// ============ 3. HELPER FUNCTIONS ============

function showLoader() {
    loader_div.classList.remove('hidden');
}

function hideLoader() {
    loader_div.classList.add('hidden');
}

function showPopup(title, text) {
    popupTitle_h2.textContent = title;
    popupText_p.textContent = text;
    popup_div.classList.remove('hidden');
    overlay_div.classList.remove('hidden');
}

function hidePopup() {
    popup_div.classList.add('hidden');
    overlay_div.classList.add('hidden');
}

popupClose_btn.addEventListener('click', hidePopup);
overlay_div.addEventListener('click', hidePopup);

// ============ 4. GAME LOGIC WITH CONTRACT ============

async function playMove(moveIndex) {
    try {
        if (!contract) {
            alert("Connect your wallet first.");
            return;
        }
        if (!betAmountWei) {
            // in case something went wrong in connectWallet
            betAmountWei = await contract.betAmount();
        }

        result_p.innerHTML = "Sending transaction...";
        actionMsg_p.innerHTML = "Waiting for blockchain confirmation...";
        showLoader();

        const tx = await contract.play(moveIndex, {
            value: betAmountWei  // <-- use exact value from contract
        });

        console.log("Transaction sent:", tx.hash);

        const receipt = await tx.wait();
        console.log("Transaction confirmed:", receipt.transactionHash);

        hideLoader();

        if (receipt.status === 0) {
            // still reverted for some reason
            result_p.innerHTML = "Transaction failed (reverted on-chain).";
            actionMsg_p.innerHTML = "Make your move.";
            return;
        }

        const event = receipt.events.find(e => e.event === "GameResult");
        if (!event) {
            result_p.innerHTML = "No GameResult event found.";
            actionMsg_p.innerHTML = "Make your move.";
            return;
        }

        let userMove = event.args.userMove;
        let computerMove = event.args.computerMove;
        const outcome = event.args.result; // "win" | "lose" | "draw"

        if (userMove.toNumber) userMove = userMove.toNumber();
        if (computerMove.toNumber) computerMove = computerMove.toNumber();

        updateUI(userMove, computerMove, outcome);
    } catch (err) {
        console.error(err);
        hideLoader();
        result_p.innerHTML = "Transaction failed or rejected.";
        actionMsg_p.innerHTML = "Make your move.";
    }
}

// ============ 5. UI UPDATE ============

function updateUI(userMoveIndex, computerMoveIndex, result) {
    const moves = ["Rock", "Paper", "Scissors"];

    const userMoveName = moves[userMoveIndex] || "?";
    const computerMoveName = moves[computerMoveIndex] || "?";

    let popupTitle = "";
    let popupMessage = "";

    if (result === "win") {
        userScore++;
        result_p.innerHTML = `${userMoveName} beats ${computerMoveName}. You win! 🎉`;
        popupTitle = "You win! 🎉";
        popupMessage = `${userMoveName} beats ${computerMoveName}. Your balance may have increased.`;
    } else if (result === "lose") {
        computerScore++;
        result_p.innerHTML = `${userMoveName} loses to ${computerMoveName}. You lost... 😢`;
        popupTitle = "You lost 😢";
        popupMessage = `${userMoveName} loses to ${computerMoveName}. Your bet was taken.`;
    } else {
        result_p.innerHTML = `${userMoveName} equals ${computerMoveName}. It's a draw. 🤝`;
        popupTitle = "Draw 🤝";
        popupMessage = `${userMoveName} equals ${computerMoveName}. Your bet was refunded.`;
    }

    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    actionMsg_p.innerHTML = "Make your move.";

    showPopup(popupTitle, popupMessage);
}

// ============ 6. CLICK HANDLERS ============

rock_div.addEventListener('click', () => playMove(0)); // 0 = Rock
paper_div.addEventListener('click', () => playMove(1)); // 1 = Paper
scissors_div.addEventListener('click', () => playMove(2)); // 2 = Scissors
