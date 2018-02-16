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

Parse.Cloud.afterSave('ChoiceItem', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    choiceItemLoaderById.clear(request.object.id);
  }
});

Parse.Cloud.afterSave('ChoiceItemPrice', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    choiceItemPriceLoaderById.clear(request.object.id);
  }
});

Parse.Cloud.afterSave('Language', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    languageLoaderById.clear(request.object.id);
    languageLoaderByKey.clear(request.object.get('key'));
  }
});

Parse.Cloud.afterSave('Menu', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    menuLoaderById.clear(request.object.id);
  }
});

Parse.Cloud.afterSave('MenuItem', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    menuItemLoaderById.clear(request.object.id);
  }
});

Parse.Cloud.afterSave('MenuItemPrice', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    menuItemPriceLoaderById.clear(request.object.id);
  }
});

Parse.Cloud.afterSave('Restaurant', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    restaurantLoaderById.clear(request.object.id);
  }
});

Parse.Cloud.afterSave('Size', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    sizeLoaderById.clear(request.object.id);
  }
});

Parse.Cloud.afterSave('Table', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    tableLoaderById.clear(request.object.id);
  }
});

Parse.Cloud.afterSave('TableState', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    tableStateLoaderByKey.clear(request.object.id);
    tableStateLoaderById.clear(request.object.get('key'));
  }
});

Parse.Cloud.afterSave('Tag', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    tagLoaderById.clear(request.object.id);
  }
});
