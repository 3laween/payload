// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - need to do this because this file doesn't actually exist
import React from "react";
import { render } from "react-dom";
import Root from "./Root";

const root = document.getElementById("app");
render(<Root />, root);