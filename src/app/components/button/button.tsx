"use client";

import React, { useRef } from "react";
import { Button } from "@nextui-org/react";
import confetti from "canvas-confetti";

const CustomButton = ({ onClick, className, disabled, children }) => {
  const buttonRef = useRef(null); // Initialize buttonRef

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }, // Adjusts where the confetti originates
    });
  };

  return (
    <Button
      ref={buttonRef}
      onPress={handleConfetti}
      className={`inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
