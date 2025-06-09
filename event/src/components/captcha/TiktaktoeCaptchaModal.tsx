"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  // DialogClose, // Not used yet, but kept for potential future use
} from "@/components/ui/dialog"; // Assuming this is the correct path based on previous exploration
import { Button } from "@/components/ui/button"; // For "Try Again" button

// Helper function to determine the winner
const calculateWinnerLogic = (squares: Array<'X' | 'O' | null>): 'X' | 'O' | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],       // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

interface TiktaktoeCaptchaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TiktaktoeCaptchaModal: React.FC<TiktaktoeCaptchaModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [board, setBoard] = React.useState<Array<'X' | 'O' | null>>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = React.useState<boolean>(true); // Player is 'X'
  const [winner, setWinner] = React.useState<'X' | 'O' | 'draw' | null>(null);
  const [gameStatusMessage, setGameStatusMessage] = React.useState<string>("Your turn (X)");

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setGameStatusMessage("Your turn (X)");
  };

  React.useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!isPlayerTurn && !winner) {
      // AI's turn logic
      const aiMoveTimeout = setTimeout(() => {
        let bestMove = -1;

        // 1. Check if AI can win
        for (let i = 0; i < board.length; i++) {
          if (!board[i]) {
            const tempBoard = [...board];
            tempBoard[i] = 'O';
            if (calculateWinnerLogic(tempBoard) === 'O') {
              bestMove = i;
              break;
            }
          }
        }

        // 2. Check if Player can win (and block)
        if (bestMove === -1) {
          for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
              const tempBoard = [...board];
              tempBoard[i] = 'X';
              if (calculateWinnerLogic(tempBoard) === 'X') {
                bestMove = i;
                break;
              }
            }
          }
        }

        // 3. Pick a random available spot
        if (bestMove === -1) {
          const availableMoves: number[] = [];
          board.forEach((cell, index) => {
            if (!cell) {
              availableMoves.push(index);
            }
          });
          if (availableMoves.length > 0) {
            bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
          }
        }

        if (bestMove !== -1) {
          const newBoard = [...board];
          newBoard[bestMove] = 'O';
          setBoard(newBoard);

          const currentWinner = calculateWinnerLogic(newBoard);
          if (currentWinner) {
            setWinner(currentWinner);
            // Message for AI win is handled here
            setGameStatusMessage(`AI (${currentWinner}) wins!`);
          } else if (newBoard.every(cell => cell !== null)) {
            setWinner('draw');
            setGameStatusMessage("It's a draw!");
          } else {
            setIsPlayerTurn(true);
            setGameStatusMessage("Your turn (X)");
          }
        } else {
          // Should not happen if there are available moves, but as a fallback:
          setIsPlayerTurn(true);
          setGameStatusMessage("Your turn (X) - AI could not move");
        }
      }, 500); // 500ms delay for AI move

      return () => clearTimeout(aiMoveTimeout); // Cleanup timeout
    }
  }, [isPlayerTurn, board, winner]); // Dependencies for the AI turn effect

  const handleCellClick = (index: number) => {
    if (winner || board[index] || !isPlayerTurn) {
      return; // Cell already taken, game over, or not player's turn
    }

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const currentWinner = calculateWinnerLogic(newBoard);
    if (currentWinner === 'X') {
      setWinner('X'); // Ensure winner state is set
      setGameStatusMessage("You won! Well done!");
      onSuccess(); // Call the success callback
    } else if (currentWinner) { // AI ('O') wins
      setWinner(currentWinner);
      setGameStatusMessage(`AI (${currentWinner}) wins!`);
    } else if (newBoard.every(cell => cell !== null)) { // Draw
      setWinner('draw');
      setGameStatusMessage("It's a draw!");
    } else { // Continue game
      setIsPlayerTurn(false); // Switch to AI's turn
      setGameStatusMessage("AI's turn (O)...");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Prove you're human: Win Tic-Tac-Toe</DialogTitle>
          <DialogDescription>
            Place your 'X' to win against the AI.
          </DialogDescription>
        </DialogHeader>

        {/* Tic-Tac-Toe game board UI */}
        <div className="my-4 flex justify-center">
          <div className="grid grid-cols-3 gap-1 bg-border p-1 rounded font-vt323">
            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                className="flex h-20 w-20 items-center justify-center rounded-sm border border-muted bg-background text-4xl font-bold transition-colors hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                disabled={!!winner || !!board[index] || !isPlayerTurn}
                aria-label={`Cell ${index + 1}${cell ? `: ${cell}` : ' (empty)'}`}
              >
                {cell}
              </button>
            ))}
          </div>
        </div>

        {/* Game status message */}
        <div className="my-2 text-center min-h-[2em]"> {/* min-h to prevent layout shift */}
          <p className="text-lg font-vt323">{gameStatusMessage}</p>
        </div>

        <DialogFooter className="sm:justify-start gap-2">
          {winner && winner !== 'X' && ( // Show "Try Again" if AI won or it's a draw
            <Button type="button" variant="outline" onClick={resetGame}>
              Try Again
            </Button>
          )}
          {/* Default Radix close button (X icon) is already present in DialogContent.
              If an additional explicit text "Close" button is desired:
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TiktaktoeCaptchaModal;
