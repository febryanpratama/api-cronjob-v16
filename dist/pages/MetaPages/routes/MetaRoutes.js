"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("../../../core/routes/BaseRoutes"));
const MetaController_1 = __importDefault(require("../controllers/MetaController"));
class MetaRoutes extends BaseRoutes_1.default {
    routes() {
        this.router.get('/:id', MetaController_1.default.indexMeta);
        this.router.post('/store', MetaController_1.default.storeMeta);
    }
}
exports.default = new MetaRoutes().router;
