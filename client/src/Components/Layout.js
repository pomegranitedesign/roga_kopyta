import React, { Fragment } from "react";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <div style={{ marginBottom: "120px" }}>{children}</div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
