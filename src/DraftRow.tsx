import React from "react";
import Square from "./Square";

export default function DraftRow({ draft }: { draft: string }) {
  const squares = draft.split("").slice(0, 5);
  while (squares.length < 5) {
    squares.push("");
  }

  return (
    <div className="flex flex-row gap-2 justify-center">
      {squares.map((letter, index) => (
        <Square letter={letter} key={index} color="gray" size="large" />
      ))}
    </div>
  );
}
