import { Outlet } from "react-router-dom";
import { Footer } from "@components/footer/Footer";
import { Header } from "@components/header/Header";

export const Layout = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
