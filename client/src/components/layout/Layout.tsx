import { Outlet } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";

export const Layout = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
