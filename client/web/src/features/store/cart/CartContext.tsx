import { ReactNode, createContext, useContext, useState } from "react";

type CartItem = {
  ean: string;
  name: string;
  price: number;
};

type CartContextType = {
  cart: { product: CartItem; amount: number }[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (ean: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<{ product: CartItem; amount: number }[]>([]);

  function addToCart(product: CartItem) {
    const index = cart.findIndex((item) => item.product.ean === product.ean);
    if (index === -1) {
      setCart([...cart, { product, amount: 1 }]);
    } else {
      const newCart = [...cart];
      newCart[index].amount += 1;
      setCart(newCart);
    }
  }

  function removeFromCart(ean: string) {
    const index = cart.findIndex((item) => item.product.ean === ean);
    if (index === -1) {
      return;
    } else if (cart[index].amount === 1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    } else {
      const newCart = [...cart];
      newCart[index].amount -= 1;
      setCart(newCart);
    }
  }

  function clear() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used inside CartProvider");
  }

  return context;
}
