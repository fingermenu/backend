// @flow

import {
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
import { PackageBundle } from '@fingermenu/parse-server-common';

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

Parse.Cloud.afterSave('DepartmentCategory', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    departmentCategoryLoaderById.clear(request.object.id);
  }
});

Parse.Cloud.afterSave('DietaryOption', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    dietaryOptionLoaderById.clear(request.object.id);
  }
});

Parse.Cloud.afterSave('DishType', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    dishTypeLoaderById.clear(request.object.id);
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

Parse.Cloud.afterSave('PackageBundle', request => {
  const packageBundle = new PackageBundle(request.object).getInfo();

  if (packageBundle.get('restaurantId')) {
    packageBundleLoaderByRestaurantId.clear(packageBundle.get('restaurantId'));
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

Parse.Cloud.afterSave('ServingTime', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    servingTimeLoaderById.clear(request.object.id);
  }
});

Parse.Cloud.afterSave('Tag', request => {
  if (request.object.createdAt !== request.object.updatedAt) {
    tagLoaderById.clear(request.object.id);
  }
});
