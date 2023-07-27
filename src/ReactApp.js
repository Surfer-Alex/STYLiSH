import Header from "./Header";
import Footer from "./Footer";
import Product from "./Product";
import Cart from "./Cart";
import Login from "./Login";
import Thankyou from "./Thankyou";
import GlobalStyle from "./constants/globalStyle";
import { ContentWraper } from "./constants/globalStyle";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useFacebookLogin from "./useFacebookLogin";

function ReactApp() {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState(cartFromLocalStorage);
  const [prime, setPrime] = useState(null);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const [data, response, handleFBLogin, handleFBLogout] = useFacebookLogin({
    appId: process.env.REACT_APP_FB_APP_ID,
    cookie: true,
    xfbml: true,
    version: process.env.REACT_APP_FB_APP_VERSION,
  });

  useEffect(() => {
    // console.log("fb app id", process.env.REACT_APP_FB_APP_ID);
    // console.log("fb app version", process.env.REACT_APP_FB_APP_VERSION);
  }, []);

  // console.log("這裡"+totalQuantity)
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ContentWraper>
        <Header totalQuantity={totalQuantity} />
        <Routes>
          <Route
            path="/"
            element={
              response?.status === "connected" ? (
                <Cart cart={cart} setCart={setCart} setPrime={setPrime} />
              ) : (
                <Login
                  handleFBLogin={handleFBLogin}
                  handleFBLogout={handleFBLogout}
                  data={data}
                  status={response?.status}
                />
              )
            }
          />
          <Route
            path="/login"
            element={
              <Login
                handleFBLogin={handleFBLogin}
                handleFBLogout={handleFBLogout}
                data={data}
                status={response?.status}
              />
            }
          />
          <Route
            path="/cart"
            element={
              response?.status === "connected" ? (
                <Cart cart={cart} setCart={setCart} setPrime={setPrime} />
              ) : (
                <Login
                  handleFBLogin={handleFBLogin}
                  handleFBLogout={handleFBLogout}
                  data={data}
                  status={response?.status}
                />
              )
            }
          />
          <Route
            path="/thankyou"
            element={<Thankyou prime={prime} dataFB={data} cart={cart} />}
          />
          <Route
            path="/product"
            element={<Product cart={cart} setCart={setCart} />}
          />
        </Routes>
      </ContentWraper>
      <Footer />
    </BrowserRouter>
  );
}
export default ReactApp;
