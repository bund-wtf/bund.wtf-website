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

// import styles from '../styles/Home.module.scss';
import dayJS from 'dayjs';
import { Avatar, Box, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import type { NextPage } from 'next';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import useSWR from 'swr';
import type { INewsEntry } from '../types';

const NEWS_API_URL = '/api/news';

const useStyles = makeStyles((theme: any) => {
  return {
    blogsContainer: {
      paddingTop: theme.spacing(3)
    },
    blogTitle: {
      fontWeight: 800,
      paddingBottom: theme.spacing(3)
    },
    card: {
      maxWidth: "100%"
    },
    media: {
      height: 240
    },
    cardActions: {
      display: "flex",
      margin: "0 10px",
      justifyContent: "space-between"
    },
    author: {
      display: "flex"
    },
  };
});

const newsFetcher = () => fetch(NEWS_API_URL)
  .then(response => response.json());

const IndexPage: NextPage = () => {
  const classes = useStyles();

  const { data, error } = useSWR<INewsEntry[]>(NEWS_API_URL, newsFetcher);

  if (error) {
    return <div>Fehler beim Laden: ${error}</div>
  }

  if (!data) {
    return <div>News werden geladen ...</div>;
  }

  return (
    <Container maxWidth="lg" className={classes.blogsContainer}>
      <Typography variant="h4" className={classes.blogTitle}>
        News
      </Typography>
      <Grid container spacing={3}>
        {data.map(n => {
          return (
            <Grid
              key={String(n.id)}
              item xs={12} sm={6} md={4}
            >
              <Card className={classes.card}>
                {n.image && <CardMedia
                  className={classes.media}
                  image={n.image.url}
                  title={n.link}
                />}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {n.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {n.summary}
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Box className={classes.author}>
                    {n.author?.avatar && <Avatar src={n.author.avatar} />}
                    <Box ml={2}>
                      <Typography variant="subtitle2" component="p">
                        {n.author.name}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary" component="p">
                        {dayJS(n.time).format('DD.MM.YYYY HH:mm')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Link
                      target="_blank"
                      href={n.link}
                      title={`In neuem Fenster öffnen: ${n.link}`}
                    >
                      <IconButton
                        color="primary"
                        component="span"
                      >
                        <OpenInNewIcon />
                      </IconButton>
                    </Link>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default IndexPage;
