import { cn } from "@/lib/utils";

type WoodenPlankProps = React.PropsWithChildren<{
  rows: number;
  linesPerRow?: number;
  className: string;
}>;

const startPositions: Record<number, number> = {
  0: 20,
  1: 100,
  2: 40,
  3: 130,
};

const WoodenPlank = ({
  rows,
  linesPerRow = 10,
  children,
  className,
}: WoodenPlankProps) => {
  const rowIndexes = Array.from(Array(rows).keys());
  const lineIndexes = Array.from(Array(linesPerRow).keys());

  const heightPerRowPercent = Math.round((1 / rows) * 100 * 100) / 100;

  return (
    <div className={cn("relative w-full bg-wood-primary ", className)}>
      {/* Wooden planks background pattern */}
      {rowIndexes.map((rowIndex) => (
        <div
          key={rowIndex}
          className={`absolute w-full border-b border-wood-secondary/30 overflow-hidden`}
          style={{
            height: `${heightPerRowPercent}%`,
            top: `${heightPerRowPercent * rowIndex}%`,
          }}
        >
          {/* Vertical lines for each row */}
          {lineIndexes.map((lineIndex) => (
            <div
              key={`${rowIndex}-${lineIndex}`}
              className="absolute h-full w-px bg-wood-secondary/20"
              style={{
                left: `${startPositions[rowIndex % 4] + lineIndex * 150}px`,
              }}
            />
          ))}
        </div>
      ))}
      {/* Decorative borders */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-wood-secondary" />
      <div className="absolute inset-x-0 bottom-0 h-2 bg-wood-secondary" />
      <div className="absolute inset-y-0 left-0 w-0.5 bg-wood-secondary" />
      <div
        className="absolute inset-y-0 right-0 w-2 bg-wood-secondary"
      />

      {children}
    </div>
  );
};

export default WoodenPlank;
