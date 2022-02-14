import React from "react";
import { keyboardColoring } from "./coloring";
import Square from "./Square";

const keys = [
  "qwertyuiop".split(""),
  "asdfghjkl".split(""),
  ["Enter", ..."zxcvbnm".split(""), "Backspace"],
];

export default function Keyboard({
  guesses,
  target,
  onKey,
}: {
  guesses: string[];
  target: string;
  onKey: (letter: { key: string }) => void;
}) {
  const coloring = keyboardColoring(guesses, target);

  return (
    <div className="flex flex-col gap-2 mt-8">
      {keys.map((row, index) => (
        <div className="flex flex-row gap-2 justify-center" key={index}>
          {row.map((letter, index) =>
            letter.length === 1 ? (
              <Square
                letter={letter}
                key={index}
                color={coloring[letter].color}
                size="small"
                onClick={() => onKey({ key: letter })}
              />
            ) : (
              <Square
                letter={letter === "Backspace" ? "⌫" : "⏎"}
                key={index}
                color="black"
                size="wide"
                onClick={() => onKey({ key: letter })}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
}
