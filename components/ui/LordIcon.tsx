import React from "react";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";

import { LordIconColors, LordIconTrigger } from "@/types";

// register lottie and define custom element
defineElement(lottie.loadAnimation);

interface LordIconProps {
  id: string;
  src?: string;
  trigger?: LordIconTrigger;
  colors?: LordIconColors;
  delay?: number;
  size?: number;
}

export const LordIcon: React.FC<LordIconProps> = ({
  id,
  colors,
  src,
  size,
  trigger,
  delay,
}) => {
  return (
    <lord-icon
      id={id}
      colors={`primary:${colors?.primary},secondary:${colors?.secondary}`}
      src={src}
      trigger={trigger}
      delay={delay}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};
