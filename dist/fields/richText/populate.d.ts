import { Collection } from '../../collections/config/types';
import { Field, RichTextField } from '../config/types';
import { PayloadRequest } from '../../express/types';
type Arguments = {
    data: unknown;
    overrideAccess?: boolean;
    key: string | number;
    depth: number;
    currentDepth?: number;
    field: RichTextField;
    req: PayloadRequest;
    showHiddenFields: boolean;
};
export declare const populate: ({ id, collection, data, key, overrideAccess, depth, currentDepth, req, showHiddenFields, field, }: Omit<Arguments, "field"> & {
    id: string;
    field: Field;
    collection: Collection;
}) => Promise<void>;
export {};
