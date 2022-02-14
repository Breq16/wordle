import React from "react";
import DraftRow from "./DraftRow";
import Row from "./Row";
import wordlist from "./wordlist.json";
import allowlist from "./allowlist.json";
import NewGame from "./NewGame";
import Keyboard from "./Keyboard";

const randomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordlist.length);
  return wordlist[randomIndex];
};

export default function App() {
  const [target, setTarget] = React.useState(randomWord);

  const [guesses, setGuesses] = React.useState<string[]>([]);
  const [guessing, setGuessing] = React.useState(true);

  const [draft, setDraft] = React.useState("");

  const handleKey = React.useCallback(
    (event: { key: string }) => {
      if (event.key === "Enter") {
        if (allowlist.includes(draft)) {
          setGuesses([...guesses, draft]);
          if (draft === target) {
            setGuessing(false);
          }
          setDraft("");
        }
      } else if (event.key === "Backspace") {
        setDraft(draft.slice(0, -1));
      } else if (event.key.match(/^[a-z]$/i) && draft.length < 5) {
        setDraft(draft + event.key);
      }
    },
    [draft, guesses, target, allowlist]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  });

  return (
    <div className="flex flex-col m-4 gap-4 items-center dark:text-white">
      {guesses.map((guess, index) => (
        <Row guess={guess} target={target} key={index} />
      ))}
      {guessing && (
        <>
          <DraftRow draft={draft} />
          <Keyboard guesses={guesses} target={target} onKey={handleKey} />
        </>
      )}
      {!guessing && (
        <NewGame
          onClick={() => {
            setTarget(randomWord);
            setGuessing(true);
            setGuesses([]);
          }}
        />
      )}
    </div>
  );
}
