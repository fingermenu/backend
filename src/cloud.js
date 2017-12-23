// @flow

import { tagLoaderById } from '@fingermenu/backend-graphql';

Parse.Cloud.afterSave('Tag', async () => {
  tagLoaderById.clearAll();
});
