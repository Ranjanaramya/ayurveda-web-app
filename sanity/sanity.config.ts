import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
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
    visionTool({ name: 'vision' }),
  ],

  schema: {
    types: schema.types,
  },
});
