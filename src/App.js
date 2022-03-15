import logo from './logo.svg';
import './App.css';
import Header from './Components/Layout/Header';
import React, { useState } from 'react';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import CartProvider from './Store/CartProvider';
function App() {
  const [cartvisibilty, setcartvisibility] = useState(false);

  const showCartHandle = props => {
    setcartvisibility(true);
  };

  const hideCartHandler = props => {
    setcartvisibility(false);
  };
  return (
    <CartProvider>
     {cartvisibilty && <Cart closecart={hideCartHandler} />}
      <Header opencart={showCartHandle}/>
      <main>
        <Meals />
      </main>
      </CartProvider>
  );
}

export default App;
