import Sidebar from "./Sidebar";

interface MainPageProps {
  children: React.ReactNode;
}

const MainPage: React.FC<MainPageProps> = ({ children }) => {
  return (
    <div className="flex overflow-scroll">
      <Sidebar />
      <main className="h-screen w-full flex-1 overflow-hidden overflow-y-auto transition duration-500 ease-in-out dark:bg-zinc-900">
        {children}
      </main>
    </div>
  );
};

export default MainPage;
