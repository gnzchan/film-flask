import Image from "next/image";
import { MouseEvent } from "react";
import { IoMdClose } from "react-icons/io";

interface UploadImageProps {
  image: File;
  uploaded?: boolean;
  removeImageHandler?: (
    e: MouseEvent<HTMLButtonElement>,
    imageToRemove: File,
    uploaded: boolean,
  ) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({
  image,
  uploaded,
  removeImageHandler,
}) => {
  return (
    <div className="relative h-[100px] w-[100px]">
      {uploaded && removeImageHandler && (
        <button
          onClick={(e) => removeImageHandler(e, image, uploaded)}
          className="absolute right-0 m-[2px] rounded-full bg-neutral-500/75 text-neutral-300 transition hover:scale-125"
        >
          <IoMdClose />
        </button>
      )}
      <Image
        src={URL.createObjectURL(image)}
        alt={image.name}
        priority={true}
        className="h-[100px] w-[100px] rounded-lg border object-contain"
        width={100}
        height={100}
      />
    </div>
  );
};

export default UploadImage;
