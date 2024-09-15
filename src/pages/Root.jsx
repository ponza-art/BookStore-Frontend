import { Fragment } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Root() {
  const location =useLocation()
 const hideHeader =
  location.pathname === "/" ||
  location.pathname.includes("/books")||
  location.pathname.includes("/details") 
  return (
    <Fragment>
      {hideHeader && <Header />}
      <Outlet />
      {hideHeader && <Footer />}
    </Fragment>
  );
}

export default Root;
