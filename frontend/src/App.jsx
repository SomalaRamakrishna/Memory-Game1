import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emojiList = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉', '🍒', '🥝'];

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(
    parseInt(localStorage.getItem('bestScore')) || null
  );

  useEffect(() => {
    startGame();
  }, []);

  // Check if game is over and update best score
  useEffect(() => {
    if (matched.length === emojiList.length) {
      toast.success(`Congratulations! You matched all emojis in ${moves} moves!`, {
        position: 'top-center',
        autoClose: 5000,
      });
      if (bestScore === null || moves < bestScore) {
        setBestScore(moves);
        toast.info(`New best score: ${moves} moves!`, {
          position: 'top-center',
          autoClose: 3000,
        });
        localStorage.setItem('bestScore', moves);
      }
    }
  }, [matched]);

  const startGame = () => {
    const shuffled = shuffle([...emojiList, ...emojiList]);
    const formatted = shuffled.map((emoji, i) => ({
      id: i,
      emoji,
    }));
    setCards(formatted);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleClick = (index) => {
    if (flipped.includes(index) || matched.includes(cards[index].emoji)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      setMoves((prev) => prev + 1);
      if (cards[first].emoji === cards[second].emoji) {
        setMatched((prev) => [...prev, cards[first].emoji]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="main-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <h2>Scoreboard 💯 </h2>
        <p>✅ Matches: {matched.length}/{emojiList.length}</p>
        <p>✅ Moves: {moves}</p>
        {matched.length === emojiList.length && (
          <p>✅ Final Score: {moves} moves</p>
        )}
        <button onClick={startGame}>🔄 Restart</button>
      </div>

      {/* Center Game Grid */}
      <div className="game-container">
        <h1> Memory Game</h1>
        <p>Match the emojis! Click on two cards to flip them.</p>
        <div className="grid">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              emoji={card.emoji}
              isFlipped={flipped.includes(index) || matched.includes(card.emoji)}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="sidebar right-sidebar">
        <h2>🏆 Best Score</h2>
        {bestScore !== null ? (
          <p>🥇 Fewest Moves: {bestScore}</p>
        ) : (
          <p>No score yet</p>
        )}
      </div>
    </div>
  );
}

export default App;
