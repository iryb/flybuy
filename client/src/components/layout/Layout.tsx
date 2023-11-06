import { Outlet, ScrollRestoration } from "react-router-dom";
import { Footer } from "@components/footer/Footer";
import { Header } from "@components/header/Header";

export const Layout = (): React.ReactElement => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
};
