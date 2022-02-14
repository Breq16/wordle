import React from "react";
import { rowColoring } from "./coloring";
import Square from "./Square";

export default function Row({
  guess,
  target,
}: {
  guess: string;
  target: string;
}) {
  const colors = rowColoring(guess, target);

  return (
    <div className="flex flex-row gap-2 justify-center">
      {colors.map(({ letter, color }, index) => (
        <Square letter={letter} color={color} key={index} size="large" />
      ))}
    </div>
  );
}
