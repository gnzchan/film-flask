import { FilmCategory } from "@/types";

interface CategoryButtonProps {
  id: FilmCategory;
  checked: boolean;
  handleCategoryChange: (cat: FilmCategory) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  id,
  checked,
  handleCategoryChange,
}) => {
  return (
    <div
      className={`mx-1 w-full rounded-full px-3 transition hover:bg-white hover:text-black ${
        checked ? "bg-white text-black" : "bg-transparent text-gray-400"
      }`}
    >
      <input
        type="radio"
        id={id}
        name="film_category"
        value={id}
        checked={checked}
        className="absolute hidden"
        onChange={(e) =>
          handleCategoryChange(e.currentTarget.value as FilmCategory)
        }
      />
      <label
        className="flex h-full w-full cursor-pointer items-center justify-center uppercase"
        htmlFor={id}
      >
        {id}
      </label>
    </div>
  );
};

export default CategoryButton;
