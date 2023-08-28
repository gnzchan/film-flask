import Sidebar from "./Sidebar";

interface MainPageProps {
  children: React.ReactNode;
}

const MainPage: React.FC<MainPageProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="h-screen w-full flex-1 overflow-hidden overflow-y-auto px-4 py-2 ">
        {children}
      </main>
    </div>
  );
};

export default MainPage;
