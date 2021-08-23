import { Text } from "@chakra-ui/react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import Reserv from "../components/Reserv";
import Checkout from "../components/Checkout";
import CreateTravel from "../components/CreateTravel";

import style from "../styles/Home.module.css";

export default function Main() {
  return (
    <div>
      {/* App bar */}
      <div className={style.appbar}>
        <div className={style.contentWrapper}>
          <Text fontSize="3xl">Trenes</Text>
          <Checkout />
        </div>
      </div>
      <div>
        <Tabs>
          <TabList>
            <Tab>Reservar</Tab>
            <Tab>Crear viajes</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Reserv />
            </TabPanel>
            <TabPanel>
              <CreateTravel />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
