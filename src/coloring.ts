export type LetterGuess = {
  letter: string;
  color: "gray" | "yellow" | "green" | "black";
};

export function rowColoring(guess: string, target: string) {
  // Store the color alongside each guess letter
  let guessLetters: LetterGuess[] = guess.split("").map((letter) => ({
    letter,
    color: "gray",
  }));

  // Store the target in an array of nullables
  let targetLetters: (string | null)[] = [...target];

  // First pass: match green letters
  guessLetters = guessLetters.map(({ letter, color }, index) => {
    // green letters are matched by the specific index in the target
    if (letter === targetLetters[index]) {
      // remove matching green letters from the pool
      // so that they aren't also matched as yellows
      targetLetters[index] = null;
      return { letter, color: "green" };
    } else {
      return { letter, color };
    }
  });

  // Second pass: greedily match yellow letters
  guessLetters = guessLetters.map(({ letter, color }) => {
    if (color === "green") {
      // don't modify existing green letters
      return { letter, color };
    }
    // yellow letters are matched by searching the entire target word
    else if (color === "gray" && targetLetters.includes(letter)) {
      // remove yellow letters once matched,
      // each letter only matches once
      targetLetters[targetLetters.indexOf(letter)] = null;
      return { letter, color: "yellow" };
    } else {
      return { letter, color };
    }
  });

  return guessLetters;
}

export function keyboardColoring(guesses: string[], target: string) {
  const letters: Record<string, LetterGuess> = {};

  for (const letter of "abcdefghijklmnopqrstuvwxyz") {
    letters[letter] = { letter, color: "gray" };
  }

  for (const guess of guesses) {
    const coloring = rowColoring(guess, target);

    for (const { letter, color } of coloring) {
      if (letters[letter].color === "gray" && color === "gray") {
        letters[letter].color = "black";
      }
      if (letters[letter].color === "gray" || color === "green") {
        letters[letter].color = color;
      }
    }
  }

  return letters;
}
