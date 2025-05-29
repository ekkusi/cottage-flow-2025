"use client";

import { useEffect, useRef, useState } from "react";

interface DecorativeElementsProps {
  count: number;
}

type ShapeType = 'circle' | 'triangle' | 'star' | 'square' | 'layeredCircle' | 'layeredSquare' | 'layeredStar';

interface ElementState {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  secondaryColor: string;
  opacity: number;
  shape: ShapeType;
}

const getRandomSpeed = () => {
  return (Math.random() * 0.2 + 0.3) * (Math.random() > 0.5 ? 1 : -1); // 0.3 to 0.5, random direction
};

const getRandomRotationSpeed = () => {
  return (Math.random() * 0.3 + 0.2) * (Math.random() > 0.5 ? 1 : -1); // 0.2 to 0.5 degrees per frame
};

const getRandomSize = () => {
  return Math.floor(Math.random() * 60 + 35); // 15px to 75px
};

const getRandomRotation = () => {
  return Math.floor(Math.random() * 360);
};

const getRandomColor = () => {
  const colors = ['bg-flow-pink', 'bg-flow-cyan', 'bg-flow-green'] as const;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  console.log("Got random color", randomColor);

  return randomColor;
};

const getRandomShape = (): ShapeType => {
  const shapes: ShapeType[] = [
    'circle', 'triangle', 'star', 'square',
    'layeredCircle', 'layeredSquare', 'layeredStar'
  ];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

const getRandomOpacity = () => {
  return Math.random() * 0.5 + 0.3; // 0.3 to 0.8
};

const getRandomPosition = (containerSize: { width: number; height: number }, elementSize: number) => {
  return {
    x: Math.random() * (containerSize.width - elementSize),
    y: Math.random() * (containerSize.height - elementSize),
  };
};

const ShapeElement = ({
  shape,
  color,
  secondaryColor,
  size,
  opacity
}: {
  shape: ShapeType;
  color: string;
  secondaryColor: string;
  size: number;
  opacity: number;
}) => {
  const layerOffset = Math.floor(size * 0.08); // Reduced from 0.15 to 0.08 (8% offset)

  switch (shape) {
    case 'circle':
      return <div className={`${color} w-full h-full rounded-full`} style={{ opacity }} />;

    case 'layeredCircle':
      return (
        <>
          <div
            className={`${secondaryColor} absolute w-full h-full rounded-full`}
            style={{
              transform: `translate(${layerOffset}px, ${layerOffset}px)`,
              opacity: opacity * 0.7
            }}
          />
          <div className={`${color} w-full h-full rounded-full`} style={{ opacity }} />
        </>
      );

    case 'triangle':
      return (
        <div
          className={`${color} w-0 h-0`}
          style={{
            borderLeft: `${size / 2}px solid var(--color-background)`,
            borderRight: `${size / 2}px solid var(--color-background)`,
            borderBottom: `${size}px solid transparent`,
            opacity
          }}
        />
      );

    case 'star':
      return (
        <div
          className={`${color} w-full h-full`}
          style={{
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            opacity
          }}
        />
      );

    case 'layeredStar':
      return (
        <>
          <div
            className={`${secondaryColor} absolute w-full h-full`}
            style={{
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              transform: `translate(${layerOffset}px, ${layerOffset}px)`,
              opacity: opacity * 0.7
            }}
          />
          <div
            className={`${color} w-full h-full`}
            style={{
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              opacity: opacity
            }}
          />
        </>
      );

    case 'layeredSquare':
      return (
        <>
          <div
            className={`${secondaryColor} absolute w-full h-full`}
            style={{
              transform: `translate(${layerOffset}px, ${layerOffset}px)`,
              opacity: opacity * 0.7
            }}
          />
          <div className={`${color} w-full h-full`} style={{ opacity }} />
        </>
      );

    case 'square':
    default:
      return <div className={`${color} w-full h-full`} style={{ opacity }} />;
  }
};

export function DecorativeElements({ count }: DecorativeElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<ElementState[]>([]);
  const animationFrameRef = useRef<number>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    // Initialize elements
    const initialElements: ElementState[] = Array.from({ length: count }).map(() => {
      const size = getRandomSize();
      const { x, y } = getRandomPosition(
        { width: containerRect.width, height: containerRect.height },
        size
      );

      return {
        x,
        y,
        speedX: getRandomSpeed(),
        speedY: getRandomSpeed(),
        size,
        rotation: getRandomRotation(),
        rotationSpeed: getRandomRotationSpeed(),
        color: getRandomColor(),
        secondaryColor: getRandomColor(),
        opacity: getRandomOpacity(),
        shape: getRandomShape(),
      };
    });

    setElements(initialElements);

    // Animation function
    const animate = () => {
      setElements((prevElements) => {
        return prevElements.map((element) => {
          let { x, y, speedX, speedY, rotation, rotationSpeed } = element;
          const { size } = element;

          // Update position
          x += speedX;
          y += speedY;
          rotation = (rotation + rotationSpeed) % 360;

          // Check for collisions with container boundaries
          if (x <= 0 || x + size >= containerRect.width) {
            speedX = -speedX;
            x = x <= 0 ? 0 : containerRect.width - size;
            // Change rotation direction and speed on collision
            rotationSpeed = getRandomRotationSpeed();
          }
          if (y <= 0 || y + size >= containerRect.height) {
            speedY = -speedY;
            y = y <= 0 ? 0 : containerRect.height - size;
            // Change rotation direction and speed on collision
            rotationSpeed = getRandomRotationSpeed();
          }

          return {
            ...element,
            x,
            y,
            speedX,
            speedY,
            rotation,
            rotationSpeed,
          };
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [count]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-[-1]">
      {elements.map((element, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            transform: `translate(${element.x}px, ${element.y}px) rotate(${element.rotation}deg)`,
          }}
        >
          <ShapeElement
            shape={element.shape}
            color={element.color}
            secondaryColor={element.secondaryColor}
            size={element.size}
            opacity={element.opacity}
          />
        </div>
      ))}
    </div>
  );
} 