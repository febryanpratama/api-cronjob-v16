"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("../../../core/routes/BaseRoutes"));
const ExportController_1 = __importDefault(require("../controllers/ExportController"));
class ExportRoutes extends BaseRoutes_1.default {
    routes() {
        this.router.get('/:id', ExportController_1.default.indexExport);
        this.router.get('/show/:id', ExportController_1.default.showExport);
    }
}
exports.default = new ExportRoutes().router;
