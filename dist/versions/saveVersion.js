"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveVersion = void 0;
const enforceMaxVersions_1 = require("./enforceMaxVersions");
const sanitizeInternalFields_1 = __importDefault(require("../utilities/sanitizeInternalFields"));
const saveVersion = async ({ payload, collection, global, id, docWithLocales: doc, autosave, draft, }) => {
    let result;
    let entityConfig;
    let entityType;
    if (collection) {
        entityConfig = collection;
        entityType = 'collection';
    }
    if (global) {
        entityConfig = global;
        entityType = 'global';
    }
    const VersionModel = payload.versions[entityConfig.slug];
    const versionData = { ...doc };
    if (draft)
        versionData._status = 'draft';
    if (versionData._id)
        delete versionData._id;
    try {
        let createNewVersion = true;
        const now = new Date().toISOString();
        if (autosave) {
            const query = {};
            if (collection)
                query.parent = id;
            const latestVersion = await VersionModel.findOne(query, {}, { sort: { updatedAt: 'desc' } });
            // overwrite the latest version if it's set to autosave
            if ((latestVersion === null || latestVersion === void 0 ? void 0 : latestVersion.autosave) === true) {
                createNewVersion = false;
                const data = {
                    version: versionData,
                    createdAt: new Date(latestVersion.createdAt).toISOString(),
                    updatedAt: draft ? now : new Date(doc.updatedAt).toISOString(),
                };
                result = await VersionModel.findByIdAndUpdate({
                    _id: latestVersion._id,
                }, data, { new: true, lean: true });
            }
        }
        if (createNewVersion) {
            const data = {
                autosave: Boolean(autosave),
                version: versionData,
                createdAt: (doc === null || doc === void 0 ? void 0 : doc.createdAt) ? new Date(doc.createdAt).toISOString() : now,
                updatedAt: draft ? now : new Date(doc.updatedAt).toISOString(),
            };
            if (collection)
                data.parent = id;
            result = await VersionModel.create(data);
        }
    }
    catch (err) {
        let errorMessage;
        if (collection)
            errorMessage = `There was an error while saving a version for the ${collection.labels.singular} with ID ${id}.`;
        if (global)
            errorMessage = `There was an error while saving a version for the global ${global.label}.`;
        payload.logger.error(errorMessage);
        payload.logger.error(err);
    }
    let max = 100;
    if (collection && typeof collection.versions.maxPerDoc === 'number')
        max = collection.versions.maxPerDoc;
    if (global && typeof global.versions.max === 'number')
        max = global.versions.max;
    if (max > 0) {
        await (0, enforceMaxVersions_1.enforceMaxVersions)({
            id,
            payload,
            Model: VersionModel,
            slug: entityConfig.slug,
            entityType,
            max,
        });
    }
    result = JSON.parse(JSON.stringify(result));
    let createdVersion = result.version;
    createdVersion.createdAt = result.createdAt;
    createdVersion.updatedAt = result.updatedAt;
    createdVersion = (0, sanitizeInternalFields_1.default)(createdVersion);
    createdVersion.id = id;
    return createdVersion;
};
exports.saveVersion = saveVersion;
//# sourceMappingURL=saveVersion.js.map