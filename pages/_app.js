import { ThemeProvider, theme, CSSReset } from "@chakra-ui/react";
import { ProviderShopingCart } from "../hooks/useShoppingCart";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ProviderShopingCart>
        <CSSReset />
        <Component {...pageProps} />
      </ProviderShopingCart>
    </ThemeProvider>
  );
}

export default MyApp;
