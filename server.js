require('dotenv').config();

const express = require('express');
const cors = require('cors')
const path = require('path');
const app = express();

const routes = require('./server/riotapi');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

// Server API Route
app.get('/api/stats/:region/:summoner', cors(), async (req, res) => {

  // Check summoner and region input
  if (!req.params.summoner) {
    return res.status(403).json({ error: 'Please provide a name.' });
  } else if (!req.params.region) {
    return res.status(403).json({ error: 'Please select a region.' });
  }

  // Declare sumoner and region
  const summoner = req.params.summoner;
  const region = req.params.region;

  try {

    // Get Account Details to search match history
    const account = await routes.getAccount(summoner, region);

    // Get Match History
    const matches = await routes.getMatches(account.data.accountId, region);

    return res.json({ 
      matches : matches
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'There was an error. Please try again.' });
  }

});

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
});