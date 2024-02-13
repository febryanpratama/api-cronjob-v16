"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("../../../core/routes/BaseRoutes"));
const ApplicationController_1 = __importDefault(require("../controllers/ApplicationController"));
// import AuthController from "../controller/AuthController";
class ApplicationRoutes extends BaseRoutes_1.default {
    routes() {
        this.router.get('/', ApplicationController_1.default.indexApp);
        this.router.post('/store', ApplicationController_1.default.storeApp);
    }
}
exports.default = new ApplicationRoutes().router;
