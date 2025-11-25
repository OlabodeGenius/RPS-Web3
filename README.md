# 🎮 Rock Paper Scissors Web3

A decentralized Rock Paper Scissors game built on the **Binance Smart Chain (BSC)** blockchain. Play against a smart contract, place bets in tBNB, and win crypto prizes!

---

## 🌟 Features

- **Blockchain-Powered Gameplay** – Smart contract integration for transparent, tamper-proof results
- **Wallet Connection** – Connect MetaMask to play
- **Real Betting** – Place wagers in tBNB (Testnet BNB)
- **Live Score Tracking** – Keep track of your wins, losses, and draws
- **Transaction Transparency** – Every game result is recorded on-chain
- **Modern UI/UX** – Beautiful glassmorphism design with smooth animations
- **Real-time Notifications** – Popup notifications for game outcomes

---

## 🚀 Getting Started

### Prerequisites

1. **MetaMask Wallet** – [Install MetaMask](https://metamask.io/)
2. **BSC Testnet Access** – [Add BSC Testnet to MetaMask](https://docs.binance.org/smart-chain/wallet/metamask.html)
3. **Testnet BNB** – Get free tBNB from the [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/rps-web3.git
   cd rps-web3
   ```

2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge, etc.)

3. Click **"Connect Wallet"** and approve the connection in MetaMask

4. Select **Rock**, **Paper**, or **Scissors** to play

---

## 📋 Project Structure

```
rps/
├── index.html          # Main HTML structure
├── app.js              # Game logic & blockchain interaction
├── style.css           # Styling & animations
├── contractABI.json    # Smart contract ABI
├── images/             # Game choice images
│   ├── rock.png
│   ├── paper.png
│   └── scissors.png
└── README.md           # This file
```

### File Descriptions

- **[index.html](index.html)** – HTML markup with game UI and popup modals
- **[app.js](app.js)** – JavaScript logic handling wallet connection, game moves, and contract calls
- **[style.css](style.css)** – Modern CSS with glassmorphism effects and responsive design
- **[contractABI.json](contractABI.json)** – Smart contract interface for Web3 calls

---

## 🎯 How to Play

1. **Connect Your Wallet** – Click "Connect Wallet" and approve in MetaMask
2. **View Bet Amount** – The required bet in tBNB is displayed in the action message
3. **Make Your Move** – Click Rock, Paper, or Scissors
4. **Confirm Transaction** – Approve the transaction in MetaMask
5. **See Results** – The outcome appears with your updated score
6. **Repeat** – Play as many rounds as you want!

---

## 🔗 Blockchain Details

### Smart Contract

- **Network:** Binance Smart Chain (BSC) Testnet
- **Contract Address:** `0x9c21e1Fc1910C8B31ebA9acc8012179879FeE18D`
- **Functions:**
  - `play(moveIndex)` – Submit your move (0=Rock, 1=Paper, 2=Scissors) with tBNB bet
  - `betAmount()` – View the required bet amount

### Game Outcomes

- **Win** ✅ – Your balance increases by the bet amount
- **Lose** ❌ – Your bet is deducted
- **Draw** 🤝 – Your bet is refunded

---

## 🛠️ Technologies Used

- **Web3.js / Ethers.js** – Blockchain interaction
- **MetaMask** – Wallet connection
- **Solidity** – Smart contract (backend)
- **HTML5 / CSS3 / JavaScript** – Frontend
- **BSC Testnet** – Blockchain network

---

## 📦 Dependencies

- Ethers.js 5.7.2 (loaded via CDN)
- Modern web browser with MetaMask extension

---

## ⚠️ Important Notes

- **Testnet Only** – This project uses BSC Testnet. Do not use real mainnet tokens.
- **Test BNB Required** – Get free tBNB from the faucet before playing
- **Gas Fees** – Small gas fees apply per transaction
- **Security** – Never share your private keys; always use MetaMask

---

## 🐛 Troubleshooting

### "MetaMask not detected"
- Install [MetaMask extension](https://metamask.io/)
- Refresh the page after installation

### "Connect wallet first"
- Click the "Connect Wallet" button at the top right

### "Network not supported"
- Add BSC Testnet to MetaMask
- Switch to the BSC Testnet network

### Transaction fails
- Ensure you have enough tBNB for gas fees
- Check contract bet amount matches your wallet balance

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

---

## 📄 License

This project is licensed under the MIT License – see LICENSE file for details.

---

## 👨‍💻 Author

**Olabode Emmanuel Ebiniyi**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🔗 Useful Links

- [Ethers.js Documentation](https://docs.ethers.io/)
- [BSC Documentation](https://docs.binance.org/smart-chain/developer/rpc-endpoint.html)
- [MetaMask Docs](https://docs.metamask.io/)
- [Solidity Docs](https://docs.soliditylang.org/)

---

**Enjoy playing Rock Paper Scissors on the blockchain! 🚀**
