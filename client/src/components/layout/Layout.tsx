import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';

export const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
