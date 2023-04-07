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
const baseClass = 'select-diff';
const getOptionsToRender = (value, options, hasMany) => {
    if (hasMany && Array.isArray(value)) {
        return value.map((val) => options.find((option) => (typeof option === 'string' ? option : option.value) === val) || String(val));
    }
    return options.find((option) => (typeof option === 'string' ? option : option.value) === value) || String(value);
};
const getTranslatedOptions = (options, i18n) => {
    if (Array.isArray(options)) {
        return options.map((option) => (typeof option === 'string' ? option : (0, getTranslation_1.getTranslation)(option.label, i18n))).join(', ');
    }
    return typeof options === 'string' ? options : (0, getTranslation_1.getTranslation)(options.label, i18n);
};
const Select = ({ field, locale, version, comparison }) => {
    let placeholder = '';
    const { t, i18n } = (0, react_i18next_1.useTranslation)('general');
    if (version === comparison)
        placeholder = `[${t('noValue')}]`;
    const comparisonToRender = typeof comparison !== 'undefined' ? getTranslatedOptions(getOptionsToRender(comparison, field.options, field.hasMany), i18n) : placeholder;
    const versionToRender = typeof version !== 'undefined' ? getTranslatedOptions(getOptionsToRender(version, field.options, field.hasMany), i18n) : placeholder;
    return (react_1.default.createElement("div", { className: baseClass },
        react_1.default.createElement(Label_1.default, null,
            locale && (react_1.default.createElement("span", { className: `${baseClass}__locale-label` }, locale)),
            (0, getTranslation_1.getTranslation)(field.label, i18n))));
};
exports.default = Select;
//# sourceMappingURL=index.js.map