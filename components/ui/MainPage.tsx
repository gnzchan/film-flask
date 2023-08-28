import Sidebar from "./Sidebar";

interface MainPageProps {
  children: React.ReactNode;
}

const MainPage: React.FC<MainPageProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="h-screen w-full flex-1 overflow-hidden overflow-y-auto ">
        {children}
      </main>
    </div>
  );
};

export default MainPage;
