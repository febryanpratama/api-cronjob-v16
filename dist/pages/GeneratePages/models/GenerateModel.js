"use strict";
// To parse this data:
//
//   import { Convert, ListGenerateText } from "./file";
//
//   const listGenerateText = Convert.toListGenerateText(json);
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
// Converts JSON strings to/from your types
class Convert {
    static toListGenerateText(json) {
        return JSON.parse(json);
    }
    static listGenerateTextToJson(value) {
        return JSON.stringify(value);
    }
}
exports.Convert = Convert;
