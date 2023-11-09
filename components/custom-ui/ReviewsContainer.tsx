import UploadImage from "./UploadImage";
import { Review } from "@/types";
import { getFormattedTime } from "@/lib/helpers";

interface ReviewsContainerProps {
  reviews: Review[];
}

const ReviewsContainer = ({ reviews }: ReviewsContainerProps) => {
  return (
    <div className="flex h-full flex-col gap-3 bg-white px-5 py-3 dark:bg-black">
      <h1 className="text-2xl font-bold">Reviews</h1>
      <p className="text-center text-sm italic text-gray-400">
        Add film to add a review
      </p>
      <div className="flex flex-col gap-2 divide-y">
        {reviews.map((review, i) => (
          <div key={i} className="flex flex-col">
            <p className="text-md font-medium">{review.user.full_name}</p>
            <p className="text-sm">{review.review}</p>
            <div className="flex gap-1">
              {review.image_path.map((image) => (
                <UploadImage key={image.name} image={image} />
              ))}
            </div>
            <p className="text-right text-xs text-gray-600">
              {getFormattedTime(
                review.updated_at ? review.updated_at : review.created_at,
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsContainer;
