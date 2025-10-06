
"use client";

import React from "react";
import { type Option } from "@/components/wheel-page-client";
import { WHEEL_COLORS } from "@/lib/colors";
import { cn } from "@/lib/utils";

interface RouletteWheelProps {
  options: Option[];
  rotation: number;
  spinDuration: number;
  isSpinning: boolean;
  colors?: string[];
  segmentFontSize?: number;
  textRadiusRatio?: number;
  visualsClassName?: string;
  textColor?: string | string[];
  textStrokeColor?: string;
}

const Pointer = () => (
    <div
      className="absolute right-[-0.5rem] top-1/2 z-20 h-20 w-10 -translate-y-1/2"
      style={{
        filter: "drop-shadow(2px 0px 2px rgba(0,0,0,0.2))"
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
         <polygon points="0,50 100,30 100,70" fill="#000000" />
      </svg>
    </div>
  );

const splitTextAndEmoji = (input: string) => {
    // Safety check to prevent crash on undefined input
    if (typeof input !== 'string') {
        return { textPart: '', emojiPart: '' };
    }
    const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
    let textPart = input;
    let emojiPart = '';
    const match = input.match(emojiRegex);
    if (match) {
        emojiPart = match.join('');
        textPart = input.replace(emojiRegex, '').trim();
    }
    return { textPart, emojiPart };
}

const Segment = ({ option, index, totalOptions, colorPalette, fontSize, textRadiusRatio, textColor, textStrokeColor }: { option: Option, index: number, totalOptions: number, colorPalette: string[], fontSize: number, textRadiusRatio: number, textColor: string | string[], textStrokeColor: string }) => {
  const segmentAngle = 360 / totalOptions;
  const startAngle = index * segmentAngle;
  const radius = 100;

  const getCoordinatesForPath = (angle: number, r: number) => {
    const radians = (angle - 90) * (Math.PI / 180);
    return [r * Math.cos(radians), r * Math.sin(radians)];
  };

  const [startX, startY] = getCoordinatesForPath(startAngle, radius);
  const [endX, endY] = getCoordinatesForPath(startAngle + segmentAngle, radius);

  const largeArcFlag = segmentAngle > 180 ? 1 : 0;
  
  const pathData = `M 0 0 L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

  const color = colorPalette[index % colorPalette.length];
  
  const textAngle = startAngle + segmentAngle / 2;
  const textRadius = radius * textRadiusRatio;
  
  const textX = textRadius * Math.cos((textAngle - 90) * Math.PI / 180);
  const textY = textRadius * Math.sin((textAngle - 90) * Math.PI / 180);
  
  const displayAngle = textAngle + 90;

  const { textPart, emojiPart } = splitTextAndEmoji(option.name);

  const letterColor = Array.isArray(textColor) ? textColor[index % textColor.length] : textColor;
  
  return (
    <g>
      <path d={pathData} fill={color} stroke="black" strokeWidth={0.5} />
       <text
        x={textX}
        y={textY}
        dy="0.35em"
        textAnchor="middle"
        transform={`rotate(${displayAngle}, ${textX}, ${textY})`}
        className="font-bold pointer-events-none"
        style={{ fontSize: `${fontSize}px`, fill: letterColor, stroke: textStrokeColor, strokeWidth: '0.5px', paintOrder: 'stroke' }}
      >
        <tspan>{textPart} </tspan>
        {emojiPart && <tspan style={{ fontSize: '8px' }}>{emojiPart}</tspan>}
      </text>
    </g>
  );
};

export default function RouletteWheel({ options, rotation, spinDuration, isSpinning, colors = WHEEL_COLORS, segmentFontSize, textRadiusRatio = 0.6, visualsClassName, textColor = 'white', textStrokeColor = 'rgba(0,0,0,0.2)' }: RouletteWheelProps) {
  const hasOptions = options && options.length > 0;
  
  let finalFontSize = segmentFontSize;
  if (!finalFontSize) {
    if (options.length > 20) finalFontSize = 8;
    else if (options.length > 10) finalFontSize = 10;
    else finalFontSize = 12;
  }

  return (
    <div className="relative w-full aspect-square sm:h-[520px] sm:w-[520px] lg:h-[620px] lg:w-[620px] select-none mx-auto">
       <Pointer />
       <div
          className="spinning-container relative h-full w-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? `transform ${spinDuration}ms cubic-bezier(0.22, 1, 0.36, 1)` : 'none',
          }}
        >
        <div
            className={cn(
              "wheel-visuals relative h-full w-full rounded-full border-[6px] border-white shadow-2xl overflow-hidden",
              visualsClassName
            )}
          >
            <svg
              className="h-full w-full"
              viewBox="-102 -102 204 204"
              preserveAspectRatio="xMidYMid meet"
            >
              {hasOptions ? (
                <g>
                  {options.map((option, index) => (
                      <Segment key={option.id} option={option} index={index} totalOptions={options.length} colorPalette={colors} fontSize={finalFontSize} textRadiusRatio={textRadiusRatio} textColor={textColor} textStrokeColor={textStrokeColor}/>
                  ))}
                </g>
              ) : (
                <circle cx="0" cy="0" r="100" fill="hsl(var(--muted))" />
              )}
            </svg>
        </div>
      </div>
    </div>
  );
}
