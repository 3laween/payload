"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populate = void 0;
const deepPick_1 = require("../deepPick");
const populate = async ({ id, collection, data, key, overrideAccess, depth, currentDepth, req, showHiddenFields, field, }) => {
    const dataRef = data;
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
            const fieldsOrTrue = field.select({
                data: doc,
                collection: collection.config,
                siblingData: dataRef,
                req,
            });
            if (fieldsOrTrue !== true) {
                dataRef[key] = (0, deepPick_1.deepPick)(doc, ['id', ...fieldsOrTrue]);
            }
            else {
                dataRef[key] = doc;
            }
        }
        else {
            dataRef[key] = doc;
        }
    }
    else {
        dataRef[key] = null;
    }
};
exports.populate = populate;
//# sourceMappingURL=populate.js.map