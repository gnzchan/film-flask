import Side from "./Sidebar";

interface MainPageProps {
  children: React.ReactNode;
}

const MainPage: React.FC<MainPageProps> = ({ children }) => {
  return (
    <div className="flex">
      <Side />
      <main>{children}</main>
    </div>
  );
};

export default MainPage;
