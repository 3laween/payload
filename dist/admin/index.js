"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - need to do this because this file doesn't actually exist
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const Root_1 = __importDefault(require("./Root"));
const root = document.getElementById("app");
(0, react_dom_1.render)(react_1.default.createElement(Root_1.default, null), root);
//# sourceMappingURL=index.js.map