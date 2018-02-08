// @flow

import {
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
  tagLoaderById,
} from '@fingermenu/backend-graphql';

Parse.Cloud.afterSave('ChoiceItem', async () => {
  choiceItemLoaderById.clearAll();
});

Parse.Cloud.afterSave('ChoiceItemPrice', async () => {
  choiceItemPriceLoaderById.clearAll();
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

Parse.Cloud.afterSave('MenuItemPrice', async () => {
  menuItemPriceLoaderById.clearAll();
});

Parse.Cloud.afterSave('Restaurant', async () => {
  restaurantLoaderById.clearAll();
});

Parse.Cloud.afterSave('Size', async () => {
  sizeLoaderById.clearAll();
});

Parse.Cloud.afterSave('Table', async () => {
  tableLoaderById.clearAll();
});

Parse.Cloud.afterSave('TableState', async () => {
  tableStateLoaderByKey.clearAll();
  tableStateLoaderById.clearAll();
});

Parse.Cloud.afterSave('Tag', async () => {
  tagLoaderById.clearAll();
});
