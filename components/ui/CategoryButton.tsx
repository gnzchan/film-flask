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
      className={`mx-1 h-full w-full rounded-md bg-white px-3 py-2 text-black transition ${
        checked ? "scale-105" : "scale-95"
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
