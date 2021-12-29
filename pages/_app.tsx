/*******************************************************************************
  The MIT License (MIT)

  Copyright (c) 2021-present Marcel Joachim Kloubert

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*******************************************************************************/

import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { AppBar, Box, Button, CssBaseline, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';

import heroImage from '../assets/images/computer-monkey.png';


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface BundWtfAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const useStyles = makeStyles((theme) => {
  return {
    appBar: {
      backgroundColor: '#000',
      color: '#fff'
    },
    hero: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${heroImage.src}')`,
      height: "384px",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff"
    },
    heroTitleWrapper: {
      textAlign: "center"
    },
    heroTitle: {
      fontSize: "4rem"
    },
    heroSubtitle: {
      fontSize: "2rem",
      width: "100%"
    }
  };
});

const BundWtfApp = (props: BundWtfAppProps) => {
  const classes = useStyles();

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const handleGithubClick = () => {
    window.location.href = 'https://github.com/bund-wtf';
  };

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'flex' } }}
            >
              <Link href="/">
                <Button
                  key="home-page"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  WTF Bund!
                </Button>
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
              <Link href="/datenschutz">
                <Button
                  key="privacy-page"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Datenschutz
                </Button>
              </Link>

              <Link href="/impressum">
                <Button
                  key="imprint-page"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Impressum
                </Button>
              </Link>
            </Box>

            <Button color="inherit" onClick={handleGithubClick}>GitHub</Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box className={classes.hero}>
          <Box className={classes.heroTitleWrapper}>
            <Box className={classes.heroTitle}>WTF Bund!</Box>
            <Box className={classes.heroSubtitle}>Digitalisierung in Deutschland</Box>
          </Box>
        </Box>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default BundWtfApp;
