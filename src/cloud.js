// @flow

import { tagLoaderById } from 'finger-menu-backend-graphql';

Parse.Cloud.afterSave('Tag', async () => {
  tagLoaderById.clearAll();
});
