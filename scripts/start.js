const getProcessForPort = require('react-dev-utils/getProcessForPort');
const clearConsole = require('react-dev-utils/clearConsole');
const prompt = require('react-dev-utils/prompt');
const detect = require('detect-port');
const chalk = require('chalk');
const path = require('path');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3001;
const isInteractive = process.stdout.isTTY;

require('dotenv').config({silent: true});

if (process.env.NODE_ENV === 'production') {

  const express = require('express');
  const app = express();

  app.use(express.static(path.join(__dirname, '../public')));
  app.get('*', (req,res) => res.sendFile(path.join(__dirname, '../public/index.html')));
  app.listen(DEFAULT_PORT);

  console.log(`Listening at http://localhost:${DEFAULT_PORT}`);

} else  {

  detect(DEFAULT_PORT).then(port => {
    if (port === DEFAULT_PORT) {
      var protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
      var host = process.env.HOST || 'localhost';
      require('./start-dev')(host, port, protocol);
      return;
    }

    if (isInteractive) {
      clearConsole();
      var existingProcess = getProcessForPort(DEFAULT_PORT);
      var question =
        chalk.yellow('Something is already running on port ' + DEFAULT_PORT + '.' +
          ((existingProcess) ? ' Probably:\n  ' + existingProcess : '')) +
          '\n\nWould you like to run the app on another port instead?';

      prompt(question, true).then(shouldChangePort => {
        if (shouldChangePort) {
          require('./start-dev')(host, port, protocol);
        }
      });
    } else {
      console.log(chalk.red('Something is already running on port ' + DEFAULT_PORT + '.'));
    }
  });

}
