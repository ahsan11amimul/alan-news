import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import logo from './images/logo.png';
import { NewsCards, Modal } from './components';
import useStyles from './styles';

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: 'please insert your alan key',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="data:image/jpeg;base64,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" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="#"> Amimul Ahsan</a> -

          </Typography>

        </div>
      ) : null}
    </div>
  );
};

export default App;
