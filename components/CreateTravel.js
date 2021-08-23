import { Button, Container, Input, Stack } from "@chakra-ui/react";
import { Fragment, useRef, useState } from "react";
import { useShoppingCart } from "../hooks/useShoppingCart";

export default function Main() {
  const cart = useShoppingCart();
  const formRef = useRef();
  const [form, setForm] = useState(null);

  const handlerChange = (event) => {
    const { name, value } = event.target;

    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    cart.checkout.createTravel(form);
    setForm(null);
    formRef.current.reset();
  };

  return (
    <Fragment>
      <Container>
        <form ref={formRef} onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Input
              name="inicio"
              variant="filled"
              placeholder="Inicio"
              onChange={handlerChange}
            />
            <Input
              name="destino"
              variant="filled"
              placeholder="Destino"
              onChange={handlerChange}
            />
            <Input
              name="hora"
              variant="filled"
              placeholder="Horario"
              type="datetime-local"
              onChange={handlerChange}
            />
            <Button type="submit" colorScheme="orange">
              Crear viaje
            </Button>
          </Stack>
        </form>
      </Container>
    </Fragment>
  );
}
