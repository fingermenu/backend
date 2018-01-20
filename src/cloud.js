// @flow

import {
  choiceItemLoaderById,
  languageLoaderByKey,
  languageLoaderById,
  menuLoaderById,
  menuItemLoaderById,
  sizeLoaderById,
  tableStateLoaderByKey,
  tableStateLoaderById,
  tagLoaderById,
} from '@fingermenu/backend-graphql';

Parse.Cloud.afterSave('ChoiceItem', async () => {
  choiceItemLoaderById.clearAll();
});

Parse.Cloud.afterSave('Language', async () => {
  languageLoaderById.clearAll();
  languageLoaderByKey.clearAll();
});

Parse.Cloud.afterSave('Menu', async () => {
  menuLoaderById.clearAll();
});

Parse.Cloud.afterSave('MenuItem', async () => {
  menuItemLoaderById.clearAll();
});

Parse.Cloud.afterSave('Size', async () => {
  sizeLoaderById.clearAll();
});

Parse.Cloud.afterSave('TableState', async () => {
  tableStateLoaderByKey.clearAll();
  tableStateLoaderById.clearAll();
});

Parse.Cloud.afterSave('Tag', async () => {
  tagLoaderById.clearAll();
});
