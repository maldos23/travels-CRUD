import React from "react";
import { createContext, useContext, useState } from "react";
import connection from "../firebase/conection";
import { v4 as uuid } from "uuid";

const defaultValues = {
  price: 25.7,
  maxOcupacy: 400,
};

const ContextShoppingCart = createContext(null);

export function ProviderShopingCart(props = { children: "" }) {
  const [cart, setCart] = useState([]);

  const createTravel = ({ destino = null, hora = null, inicio = null }) => {
    if (destino && hora && inicio) {
      connection.db.collection("viajes").add({ destino, hora, inicio });
      alert("Viaje creado");
    } else alert("Valores incompletos favor de llenar todo el formulario");
  };

  const payTravel = () => {
    if (cart.length > 0) {
      cart.map((item) => {
        connection.db
          .collection("viajes")
          .doc(item.id)
          .collection("pasajeros")
          .add({
            ticket: `A-${uuid()}`,
            created: Date.now(),
          });
      });

      setCart([]);
      alert("Reservacion pagada");
    } else alert("No hay elementos en el carrito");
  };

  const getOcupacy = async (id = null) => {
    const res = new Promise((resolve) => {
      connection.db
        .collection("viajes")
        .doc(id)
        .collection("pasajeros")
        .get()
        .then((response) => resolve(response.size));
    });

    return res;
  };

  return (
    <ContextShoppingCart.Provider
      value={{
        default: defaultValues,
        checkout: { cart, setCart, payTravel, getOcupacy, createTravel },
      }}
    >
      {props.children}
    </ContextShoppingCart.Provider>
  );
}

export const useShoppingCart = () => useContext(ContextShoppingCart);
