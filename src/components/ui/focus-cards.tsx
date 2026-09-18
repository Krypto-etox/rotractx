"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 overflow-hidden h-[200px] w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={`/assets/${card.img}`}
        alt={card.text}
        fill
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-green-900/60 via-green-800/30 to-transparent flex items-end p-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <Button
          variant="secondary"
          className="w-full backdrop-blur-sm bg-emerald-50/80 hover:bg-emerald-100/80 text-green-800 transition-colors"
          onClick={() => (window.location.href = card.link)}
        >
          {card.text}
        </Button>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type FeatureCard = {
  img: string;
  text: string;
  link: string;
};

export function FocusCards({ cards }: { cards: FeatureCard[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.text}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
