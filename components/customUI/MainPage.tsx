import Sidebar from "./Sidebar";

interface MainPageProps {
  children: React.ReactNode;
}

const MainPage: React.FC<MainPageProps> = ({ children }) => {
  return (
    <div className="h-full">
      <div className="z-[10] hidden h-full lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <Sidebar />
      </div>
      <main className="h-full w-full bg-neutral-100 transition duration-500 ease-in-out dark:bg-zinc-900 lg:pl-72">
        {children}
      </main>
    </div>
  );
};

export default MainPage;
