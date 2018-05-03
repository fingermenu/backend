// @flow

import 'newrelic';
import parseServerBackend from '@microbusiness/parse-server-backend';
import { createConfigLoaderByKey, createUserLoaderBySessionToken } from '@microbusiness/parse-server-common';
import {
  getRootSchema,
  choiceItemLoaderById,
  choiceItemPriceLoaderById,
  departmentCategoryLoaderById,
  dietaryOptionLoaderById,
  dishTypeLoaderById,
  languageLoaderByKey,
  languageLoaderById,
  menuLoaderById,
  menuItemLoaderById,
  menuItemPriceLoaderById,
  packageBundleLoaderByRestaurantId,
  restaurantLoaderById,
  sizeLoaderById,
  tableLoaderById,
  tableStateLoaderByKey,
  tableStateLoaderById,
  servingTimeLoaderById,
  tagLoaderById,
} from '@fingermenu/backend-graphql';
import express from 'express';
import GraphQLHTTP from 'express-graphql';
import cors from 'cors';
import path from 'path';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import ParseJS from 'parse/node';
import Raven from 'raven';
import expressStatusMonitor from 'express-status-monitor';

let parseServerBackendInfo = null;

if (process.env.ENABLE_HOSTING_PARSE_SERVER) {
  parseServerBackendInfo = parseServerBackend({
    serverHost: process.env.HOST,
    serverPort: process.env.PORT,
    parseServerApplicationId: process.env.PARSE_SERVER_APPLICATION_ID,
    parseServerMasterKey: process.env.PARSE_SERVER_MASTER_KEY,
    parseServerClientKey: process.env.PARSE_SERVER_CLIENT_KEY,
    parseServerJavascriptKey: process.env.PARSE_SERVER_JAVASCRIPT_KEY,
    parseServerFileKey: process.env.PARSE_SERVER_FILE_KEY,
    parseServerDatabaseUri: process.env.PARSE_SERVER_DATABASE_URI,
    startParseDashboard: process.env.START_PARSE_DASHBOARD,
    parseDashboardAuthentication: process.env.PARSE_DASHBOARD_AUTHENTICATION,
    parseServerDashboardApplicationName: process.env.PARSE_SERVER_DASHBOARD_APPLICATION_NAME,
    parseServerDashboardAllowInsecureHTTP: process.env.PARSE_SERVER_DASHBOARD_ALLOW_INSECURE_HTTP,
    facebookAppIds: process.env.FACEBOOK_APP_IDS,
    androidCloudMessagingSenderId: process.env.ANDROID_CLOUD_MESSAGING_SENDER_ID,
    androidCloudMessagingServerKey: process.env.ANDROID_CLOUD_MESSAGING_SERVER_KEY,
    parseServerCloudFilePath: path.resolve(__dirname, 'cloud.js'),
    parseServerAllowClientClassCreation: process.env.PARSE_SERVER_ALLOW_CLIENT_CLASS_CREATION,
    initializeParseSdk: true,
  });
} else {
  ParseJS.initialize(
    process.env.PARSE_SERVER_APPLICATION_ID,
    process.env.PARSE_SERVER_JAVASCRIPT_KEY || 'unused',
    process.env.PARSE_SERVER_MASTER_KEY,
  );
  ParseJS.serverURL = process.env.PARSE_SERVER_URL;
}

const app = express();

app.use(expressStatusMonitor());

const ravenDSN = process.env.RAVEN_DSN;

if (ravenDSN) {
  Raven.config(ravenDSN).install();

  // The request handler must be the first middleware on the app
  app.use(Raven.requestHandler());
}

if (parseServerBackendInfo) {
  app.use('/parse', parseServerBackendInfo.get('parseServer'));

  if (parseServerBackendInfo.has('parseDashboard') && parseServerBackendInfo.get('parseDashboard')) {
    app.use('/dashboard', parseServerBackendInfo.get('parseDashboard'));
  }
}

const schema = getRootSchema();

app.use(cors());
app.use('/graphql', async (request, response) => {
  const configLoaderByKey = createConfigLoaderByKey();
  const userLoaderBySessionToken = createUserLoaderBySessionToken();

  return GraphQLHTTP({
    schema,
    formatError: error => {
      if (ravenDSN) {
        Raven.captureException(error);
      }

      return error;
    },
    graphiql: true,
    context: {
      request,
      sessionToken: request.headers.authorization,
      language: request.headers['accept-language'] ? request.headers['accept-language'].split(',')[0] : null,
      fingerMenuContext: request.headers['finger-menu-context'] ? JSON.parse(request.headers['finger-menu-context']) : {},
      dataLoaders: {
        configLoaderByKey,
        userLoaderBySessionToken,
        choiceItemLoaderById,
        choiceItemPriceLoaderById,
        departmentCategoryLoaderById,
        dietaryOptionLoaderById,
        dishTypeLoaderById,
        languageLoaderByKey,
        languageLoaderById,
        menuLoaderById,
        menuItemLoaderById,
        menuItemPriceLoaderById,
        packageBundleLoaderByRestaurantId,
        restaurantLoaderById,
        sizeLoaderById,
        tableLoaderById,
        tableStateLoaderByKey,
        tableStateLoaderById,
        servingTimeLoaderById,
        tagLoaderById,
      },
    },
  })(request, response);
});

app.get('/graphql-schema', (request, response) => {
  graphql(schema, introspectionQuery)
    .then(json => {
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify(json, null, 2));
    })
    .catch(error => response.status(500).send(error));
});

if (ravenDSN) {
  // The error handler must be before any other error middleware
  app.use(Raven.errorHandler());
}

process.on('SIGINT', () => process.exit());

app.listen(process.env.PORT, () => {
  console.log('Finger Menu backend started. Listening port: ' + process.env.PORT);

  if (parseServerBackendInfo) {
    console.log(JSON.stringify(parseServerBackendInfo.get('config').toJS(), null, 2));
  }
});
