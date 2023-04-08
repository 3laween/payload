"use strict";
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-param-reassign */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepPick = void 0;
function deepPick(obj, paths) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = {};
    paths.forEach((path) => {
        // not sure why this is necessary, but it is
        const pathParts = path.split('.');
        deepPickTo(obj, pathParts, result);
    });
    return result;
}
exports.deepPick = deepPick;
function deepPickTo(obj, path, result) {
    var _a;
    if (typeof result !== 'object' || typeof obj !== 'object') {
        return false;
    }
    const pathPart = path[0];
    if (!(pathPart in obj)) {
        return false;
    }
    const value = obj[pathPart];
    if (path.length === 1) {
        result[pathPart] = obj[pathPart];
        return true;
    }
    if (Array.isArray(value)) {
        let someFound = false;
        const newArray = value.map((subObj, idx) => {
            var _a, _b, _c, _d;
            const subResult = (_b = (_a = result[pathPart]) === null || _a === void 0 ? void 0 : _a[idx]) !== null && _b !== void 0 ? _b : {};
            if (deepPickTo(subObj, path.slice(1), subResult)) {
                someFound = true;
                return subResult;
            }
            return (_d = (_c = result[pathPart]) === null || _c === void 0 ? void 0 : _c[idx]) !== null && _d !== void 0 ? _d : {};
        });
        if (someFound) {
            result[pathPart] = newArray;
            return true;
        }
        return false;
    }
    const subResult = (_a = result[pathPart]) !== null && _a !== void 0 ? _a : {};
    if (deepPickTo(value, path.slice(1), subResult)) {
        result[pathPart] = subResult;
        return true;
    }
    return false;
}
//# sourceMappingURL=deepPick.js.map