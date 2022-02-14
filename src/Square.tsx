import React from "react";

const classNames = {
  black: "bg-gray-500 dark:bg-black",
  gray: "bg-gray-200 dark:bg-gray-500",
  yellow: "bg-yellow-400 dark:bg-yellow-600",
  green: "bg-green-400 dark:bg-green-600",
  large: "p-2 w-12 h-12 text-xl",
  small: "p-1 w-6 sm:w-8 h-8 text-base",
  wide: "p-1 h-8 sm:w-12 w-8 text-base",
};

export default function Square({
  letter,
  color,
  size,
  onClick,
}: {
  letter: string;
  color: "gray" | "yellow" | "green" | "black";
  size: "large" | "small" | "wide";
  onClick?: () => void;
}) {
  const className = `${classNames[color]} ${classNames[size]} flex justify-center items-center border-2 border-black dark:border-white uppercase rounded-lg`;

  if (onClick) {
    return (
      <button className={className} onClick={onClick}>
        {letter}
      </button>
    );
  } else {
    return <div className={className}>{letter}</div>;
  }
}
