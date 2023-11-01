import { twMerge } from "tailwind-merge";

interface GenreChipsProps {
  genreProp: { id: number; name: string }[];
  className?: string;
}

const GenreChips: React.FC<GenreChipsProps> = ({ genreProp, className }) => {
  return (
    <div
      className={twMerge("flex items-center justify-center gap-1", className)}
    >
      {genreProp.map((genre, i) => (
        <div
          key={`${genre.name}-${i}`}
          className="flex items-center justify-center rounded-full border border-gray-600 px-2 py-1 text-xs font-medium text-gray-600 backdrop-blur-md dark:border-gray-400 dark:text-gray-400 "
        >
          <p>{genre.name}</p>
        </div>
      ))}
    </div>
  );
};

export default GenreChips;
