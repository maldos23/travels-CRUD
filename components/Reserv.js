import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import connection from "../firebase/conection";
import { useShoppingCart } from "../hooks/useShoppingCart";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from "@chakra-ui/react";

export default function Reserv(props) {
  const [list, setList] = useState([]);
  const cart = useShoppingCart();

  function getTravels() {
    connection.db.collection("viajes").onSnapshot(async (snapshot) => {
      var travels = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      for (var i = 0; i < travels.length; i++) {
        var reserve = await cart.checkout.getOcupacy(travels[i].id);
        travels[i].reserve = reserve;
      }
      setList(travels);
    });
  }

  useEffect(() => getTravels(), []);

  return (
    <Fragment>
      <Button onClick={getTravels}>Actualizar</Button>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Los horarios estan sugetos a cambios*</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Origen</Th>
            <Th>Destino</Th>
            <Th>Horarios</Th>
            <Th isNumeric>Disponibles</Th>
            <Th isNumeric>Reservados</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list?.map((travel, index) => (
            <Tr key={index}>
              <Td>{travel.id}</Td>
              <Td>{travel.inicio} </Td>
              <Td>{travel.destino}</Td>
              <Td>{travel.hora}</Td>
              <Td isNumeric>{cart.default.maxOcupacy - travel.reserve}</Td>
              <Td isNumeric>{travel.reserve || 0}</Td>
              <Td>
                <Button
                  onClick={() =>
                    cart?.checkout?.setCart((prevState) => [
                      ...prevState,
                      { ...travel },
                    ])
                  }
                  colorScheme="pink"
                >
                  Reservar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Fragment>
  );
}
