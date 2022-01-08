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

import CookieConsent from "react-cookie-consent";
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { AppBar, Box, Button, CssBaseline, IconButton, Link as MuiLink, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import Head from 'next/head';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

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
    appBarButton: {
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

const siteTitle = '#wtfbund';
const siteDescription = 'Digitalisierung in Deutschland';

const BundWtfApp = (props: BundWtfAppProps) => {
  const classes = useStyles();

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      <Head>
        <title>bund.wtf - Digitalisierung in Deutschland</title>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS 2.0"
          href="/api/rss"
        />

        <meta name="twitter:title" content="#wtfbund" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:src" content={heroImage.src} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:creator" content="@bund_wtf" />
        <meta name="twitter:site" content="@bund_wtf" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:image" content={heroImage.src} />
        <meta property="og:url" content="https://bund.wtf" />
        <meta property="og:description" content={siteDescription} />
      </Head>

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
                    #wtfbund
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

              <MuiLink
                href="https://twitter.com/bund_wtf"
                target="_blank"
              >
                <IconButton
                  className={classes.appBarButton}
                  component="span"
                >
                  <TwitterIcon />
                </IconButton>
              </MuiLink>

              <MuiLink
                href="https://github.com/bund-wtf"
                target="_blank"
              >
                <IconButton
                  className={classes.appBarButton}
                  component="span"
                >
                  <GitHubIcon />
                </IconButton>
              </MuiLink>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Box className={classes.hero}>
            <Box className={classes.heroTitleWrapper}>
              <Box className={classes.heroTitle}>#wtfbund</Box>
              <Box className={classes.heroSubtitle}>Digitalisierung in Deutschland</Box>
            </Box>
          </Box>
          <Component {...pageProps} />

          <CookieConsent style={{
            background: "blue",
            color: "white"
          }} buttonText={"Verstanden!"}>
            Diese Seite setzt Cookies ein.{" "}
            <Link href="/datenschutz">
              <span style={{ color: 'yellow', cursor: 'pointer' }}>Hier geht es zur Datenschutzerklärung ...</span>
            </Link>
          </CookieConsent>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default BundWtfApp;
