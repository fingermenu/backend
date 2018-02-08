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

Parse.Cloud.afterSave('ChoiceItem', async (request) => {
  if (request.object.createdAt !== request.object.updatedAt) {
    choiceItemLoaderById.clear(request.object.id);
  }
});

Parse.Cloud.afterSave('ChoiceItemPrice', async (request) => {
  if (request.object.createdAt !== request.object.updatedAt) {
    choiceItemPriceLoaderById.clear(request.object.id);
  }
});

Parse.Cloud.afterSave('Language', async (request) => {
  if (request.object.createdAt !== request.object.updatedAt) {
    languageLoaderById.clear(request.object.id);
    languageLoaderByKey.clear(request.object.get('key'));
  }
});

Parse.Cloud.afterSave('Menu', async (request) => {
  if (request.objeect.createdAt !== request.objeect.updatedAt) {
    menuLoaderById.clear(request.objeect.id);
  }
});

Parse.Cloud.afterSave('MenuItem', async (request) => {
  if (request.objeect.createdAt !== request.objeect.updatedAt) {
    menuItemLoaderById.clear(request.objeect.id);
  }
});

Parse.Cloud.afterSave('MenuItemPrice', async (request) => {
  if (request.objeect.createdAt !== request.objeect.updatedAt) {
    menuItemPriceLoaderById.clear(request.objeect.id);
  }
});

Parse.Cloud.afterSave('Restaurant', async (request) => {
  if (request.objeect.createdAt !== request.objeect.updatedAt) {
    restaurantLoaderById.clear(request.objeect.id);
  }
});

Parse.Cloud.afterSave('Size', async (request) => {
  if (request.objeect.createdAt !== request.objeect.updatedAt) {
    sizeLoaderById.clear(request.objeect.id);
  }
});

Parse.Cloud.afterSave('Table', async (request) => {
  if (request.objeect.createdAt !== request.objeect.updatedAt) {
    tableLoaderById.clear(request.objeect.id);
  }
});

Parse.Cloud.afterSave('TableState', async (request) => {
  if (request.object.createdAt !== request.object.updatedAt) {
    tableStateLoaderByKey.clear(request.object.id);
    tableStateLoaderById.clear(request.object.get('key'));
  }
});

Parse.Cloud.afterSave('Tag', async (request) => {
  if (request.objeect.createdAt !== request.objeect.updatedAt) {
    tagLoaderById.clear(request.objeect.id);
  }
});
