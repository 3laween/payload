/* eslint-disable @typescript-eslint/no-use-before-define */
import {Collection} from '../../collections/config/types';
import {Field, RichTextField} from '../config/types';
import {PayloadRequest} from '../../express/types';
import {deepPick} from '../deepPick';

type Arguments = {
  data: unknown
  overrideAccess?: boolean
  key: string | number
  depth: number
  currentDepth?: number
  field: RichTextField
  req: PayloadRequest
  showHiddenFields: boolean
}


export const populate = async ({
                                 id,
                                 collection,
                                 data,
                                 key,
                                 overrideAccess,
                                 depth,
                                 currentDepth,
                                 req,
                                 showHiddenFields,
                                 field,
                               }: Omit<Arguments, 'field'> & {
  id: string,
  field: Field
  collection: Collection
}): Promise<void> => {
  const dataRef = data as Record<string, unknown>;
  const doc = await req.payload.findByID({
    req,
    collection: collection.config.slug,
    id,
    currentDepth: currentDepth + 1,
    overrideAccess: typeof overrideAccess === 'undefined' ? false : overrideAccess,
    disableErrors: true,
    depth,
    showHiddenFields,
  });

  if (doc) {
    if (field.type === 'richText' && field.select && req.payloadAPI !== 'graphQL') {
      const fieldsOrTrue: any = field.select({
        data: doc,
        collection: collection.config,
        siblingData: dataRef,
        req,
      });
      if (fieldsOrTrue !== true) {
        dataRef[key] = deepPick(doc, ['id', ...fieldsOrTrue]);
      } else {
        dataRef[key] = doc;
      }
    } else {
      dataRef[key] = doc;
    }
  } else {
    dataRef[key] = null;
  }
};
