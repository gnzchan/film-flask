import Sidebar from "./Sidebar";

interface MainPageProps {
  children: React.ReactNode;
}

const MainPage: React.FC<MainPageProps> = ({ children }) => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="h-full w-full flex-1 overflow-y-auto bg-neutral-100 transition duration-500 ease-in-out dark:bg-zinc-900">
        {children}
      </main>
    </div>
  );
};

export default MainPage;
