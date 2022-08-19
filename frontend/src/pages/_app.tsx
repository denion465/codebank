/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import {
  Box,
  Container,
  CssBaseline,
  MuiThemeProvider
} from '@material-ui/core';

import Navbar from '../components/Navbar';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Container>
          <Box marginTop={1}>
            <Component {...pageProps} />
          </Box>
        </Container>
      </MuiThemeProvider>
    </>
  );
}

export default MyApp;
