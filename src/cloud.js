// @flow

import { languageLoaderByKey, languageLoaderById, tableStateLoaderById, tagLoaderById } from '@fingermenu/backend-graphql';

Parse.Cloud.afterSave('Language', async () => {
  languageLoaderById.clearAll();
  languageLoaderByKey.clearAll();
});

Parse.Cloud.afterSave('TableState', async () => {
  tableStateLoaderById.clearAll();
});

Parse.Cloud.afterSave('Tag', async () => {
  tagLoaderById.clearAll();
});
