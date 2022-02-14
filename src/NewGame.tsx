import React from "react";

export default function NewGame({ onClick }: { onClick: () => void }) {
  React.useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        onClick();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  });

  return (
    <>
      <button
        className="bg-gray-200 dark:bg-gray-600 px-4 py-2 rounded-xl mt-8"
        onClick={onClick}
      >
        New Game
      </button>
      <p className="mt-4 text-gray-500 text-sm">
        breqdle. made with &lt;3 by{" "}
        <a
          className="underline"
          href="https://breq.dev/"
          target="_blank"
          rel="noopener"
        >
          breq
        </a>
        .
      </p>
    </>
  );
}
