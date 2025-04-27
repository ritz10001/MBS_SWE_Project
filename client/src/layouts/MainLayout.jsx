import { Outlet } from "react-router";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
