import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { projectId, dataset } from './env';
import { schema } from './schemaTypes';
import { structure } from './structure';

export default defineConfig({
  name: 'default',
  title: 'AyurVeda Care Hospital',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({ structure }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schema.types,
  },
});
