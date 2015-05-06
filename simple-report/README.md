Simple Report Generator
==========================

This is a simple example app that generates a report using data from the SPIDA DB API. This is intended to just give an idea of the type of things that can be done.

# Requirements

1. You'll need [NodeJS](http://nodejs.org/) and NPM (comes with all recent versions of node) both installed and on the path.
2. Install [Git](http://git-scm.com/).
3. from the simple-report/ directory, run `npm install --save` to install the required dependencies.
4. you may need to change the spidadb url and apiToken variables in 'spidadb-api.js'

**To start the app, run `npm start`. Open up a browser and go to "localhost:3000"**

### Notes

- The app will download every project in spidadb and create a table showing each user email and how many poles they have in SPIDA DB
- This is obviously *very* simplistic. For a production environment, we would definitely want to persist required data and only query for what we need. 
- SPIDA DB always returns results ordered by dateModified, with the most recent first. This make a 'poll and update' pretty easy for generating reports.


