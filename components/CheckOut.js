import React, { useState } from "react";
import { Fragment } from "react";
import { useShoppingCart } from "../hooks/useShoppingCart";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Container,
} from "@chakra-ui/react";
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

export default function Checkout() {
  const cart = useShoppingCart();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <Button
        onClick={handleOpen}
        rightIcon={<Text>{cart?.checkout?.cart?.length || 0}</Text>}
      >
        Carrito
      </Button>
      <Modal isOpen={open} onClose={handleOpen} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Carrito de compras</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              <Table variant="striped" colorScheme="teal">
                <TableCaption>
                  Los horarios estan sugetos a cambios*
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Nombre</Th>
                    <Th>Origen</Th>
                    <Th>Destino</Th>
                    <Th isNumeric>Precio</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cart?.checkout?.cart?.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.id}</Td>
                      <Td>{item.inicio} </Td>
                      <Td>{item.destino}</Td>
                      <Td isNumeric>${cart.default.price} MXN</Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th>Total</Th>
                    <Th isNumeric>
                      $
                      {Number(
                        cart.default.price * cart?.checkout?.cart?.length
                      ).toFixed(2)}{" "}
                      MXN
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={cart.checkout.payTravel}>
              Pagar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
