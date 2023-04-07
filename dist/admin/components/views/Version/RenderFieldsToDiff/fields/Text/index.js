"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const Label_1 = __importDefault(require("../../Label"));
const getTranslation_1 = require("../../../../../../../utilities/getTranslation");
require("./index.scss");
const baseClass = 'text-diff';
const Text = ({ field, locale, version, comparison, isRichText = false }) => {
    let placeholder = '';
    const { t, i18n } = (0, react_i18next_1.useTranslation)('general');
    if (version === comparison)
        placeholder = `[${t('noValue')}]`;
    let versionToRender = version;
    let comparisonToRender = comparison;
    if (isRichText) {
        if (typeof version === 'object')
            versionToRender = JSON.stringify(version, null, 2);
        if (typeof comparison === 'object')
            comparisonToRender = JSON.stringify(comparison, null, 2);
    }
    return (react_1.default.createElement("div", { className: baseClass },
        react_1.default.createElement(Label_1.default, null,
            locale && (react_1.default.createElement("span", { className: `${baseClass}__locale-label` }, locale)),
            (0, getTranslation_1.getTranslation)(field.label, i18n))));
};
exports.default = Text;
//# sourceMappingURL=index.js.map