interface CenterContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const CenterContentWrapper = ({ children }: CenterContentWrapperProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-full w-full max-w-[1700px]">{children}</div>
    </div>
  );
};

export default CenterContentWrapper;
