// @flow

import parseServerBackend from '@microbusiness/parse-server-backend';
import { createConfigLoader, createUserLoaderBySessionToken } from '@microbusiness/parse-server-common';
import {
  getRootSchema,
  choiceItemLoaderById,
  choiceItemPriceLoaderById,
  languageLoaderByKey,
  languageLoaderById,
  menuLoaderById,
  menuItemLoaderById,
  menuItemPriceLoaderById,
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
  });
} else {
  ParseJS.initialize(
    process.env.PARSE_SERVER_APPLICATION_ID,
    process.env.PARSE_SERVER_JAVASCRIPT_KEY || 'unused',
    process.env.PARSE_SERVER_MASTER_KEY,
  );
  ParseJS.serverURL = process.env.PARSE_SERVER_URL;
}

const expressServer = express();

if (parseServerBackendInfo) {
  expressServer.use('/parse', parseServerBackendInfo.get('parseServer'));

  if (parseServerBackendInfo.has('parseDashboard') && parseServerBackendInfo.get('parseDashboard')) {
    expressServer.use('/dashboard', parseServerBackendInfo.get('parseDashboard'));
  }
}

const schema = getRootSchema();

expressServer.use(cors());
expressServer.use('/graphql', async (request, response) => {
  const configLoader = createConfigLoader();
  const userLoaderBySessionToken = createUserLoaderBySessionToken();

  return GraphQLHTTP({
    schema,
    graphiql: true,
    context: {
      request,
      sessionToken: request.headers.authorization,
      language: request.headers['accept-language'] ? request.headers['accept-language'].split(',')[0] : null,
      dataLoaders: {
        configLoader,
        userLoaderBySessionToken,
        choiceItemLoaderById,
        choiceItemPriceLoaderById,
        languageLoaderByKey,
        languageLoaderById,
        menuLoaderById,
        menuItemLoaderById,
        menuItemPriceLoaderById,
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

expressServer.get('/graphql-schema', (request, response) => {
  graphql(schema, introspectionQuery)
    .then(json => {
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify(json, null, 2));
    })
    .catch(error => response.status(500).send(error));
});

process.on('SIGINT', () => process.exit());

expressServer.listen(process.env.PORT, () => {
  console.log('Finger Menu backend started. Listening port: ' + process.env.PORT);

  if (parseServerBackendInfo) {
    console.log(JSON.stringify(parseServerBackendInfo.get('config').toJS(), null, 2));
  }
});
