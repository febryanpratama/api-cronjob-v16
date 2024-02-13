"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
class ImageConvert {
    constructor() {
        this.downloadImage = (res, url) => __awaiter(this, void 0, void 0, function* () {
            try {
                const responseImage = yield axios_1.default.get(url, { responseType: 'arraybuffer' });
                const nameImage = new Date().getTime();
                const imagePath = 'public/images/' + nameImage + '.png'; // Set the desired path
                fs_1.default.writeFileSync(imagePath, responseImage.data);
                return {
                    status: true,
                    data: imagePath
                };
            }
            catch (error) {
                return {
                    status: false,
                    messages: error.message
                };
            }
        });
    }
}
exports.default = new ImageConvert();
