import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-neutral-100/90 backdrop-blur-sm dark:bg-neutral-900/90" />
        <Dialog.Content
          className="
            fixed
            left-[50%]
            top-[50%] 
            z-[110]
            max-h-[85vh] 
            w-[90vw]
            translate-x-[-50%] 
            translate-y-[-50%] 
            overflow-hidden 
            overflow-y-auto 
            rounded-md 
            border 
            border-neutral-700 
            bg-neutral-100
            p-[25px]
            focus:outline-none 
            dark:bg-neutral-900 
            md:h-auto 
            md:max-h-[85vh] 
            md:w-[90vw] 
            md:max-w-[650px]
            "
        >
          <Dialog.Title className="mb-4 text-center text-xl font-bold dark:text-white">
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
            mb-5
            text-center
            text-sm
            leading-normal
            dark:text-white
            "
          >
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className="
                absolute 
                right-[10px] 
                top-[10px]
                inline-flex
                h-[25px]
                w-[25px]
                appearance-none
                items-center
                justify-center
                rounded-full
                text-neutral-400
                transition
                hover:text-white
                focus:outline-none
                "
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
