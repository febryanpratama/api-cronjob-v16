"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("../../../core/routes/BaseRoutes"));
const GenerateController_1 = __importDefault(require("../controllers/GenerateController"));
// import AuthController from "../controller/AuthController";
class GenerateRoutes extends BaseRoutes_1.default {
    routes() {
        this.router.post('/text', GenerateController_1.default.generateAiText);
        this.router.post('/image', GenerateController_1.default.generateAiImage);
        this.router.get('/artikel/:id', GenerateController_1.default.generateArtikel);
        this.router.post('/artikel', GenerateController_1.default.storeArtikel);
    }
}
exports.default = new GenerateRoutes().router;
