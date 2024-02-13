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
const client_1 = require("@prisma/client");
const ResponseCode_1 = __importDefault(require("../../../core/utils/ResponseCode"));
const prisma = new client_1.PrismaClient();
class MetaController {
    constructor() {
        this.indexMeta = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const navigation = req.params.id;
                console.log(navigation);
                const data = yield prisma.metaAi.findMany({
                    where: {
                        applicationId: parseInt(navigation)
                    }
                });
                return ResponseCode_1.default.successGet(res, data);
            }
            catch (error) {
                return ResponseCode_1.default.error(res, {
                    code: 500,
                    status: false,
                    message: error.message,
                    result: null
                });
            }
        });
        this.storeMeta = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { application_id, type, keyword } = req.body;
            try {
                if (!application_id || !type || !keyword)
                    return ResponseCode_1.default.error(res, {
                        code: 400,
                        status: false,
                        message: 'Required Parameter',
                        result: null
                    });
                const checkApp = yield prisma.application.findFirst({
                    where: {
                        id: application_id,
                    }
                });
                if (!checkApp)
                    return ResponseCode_1.default.error(res, {
                        code: 400,
                        status: false,
                        message: 'Application already exist',
                        result: null
                    });
                const data = yield prisma.metaAi.create({
                    data: {
                        applicationId: application_id,
                        type: type,
                        keyword: keyword
                    }
                });
                return ResponseCode_1.default.successPost(res, 'Success create application');
            }
            catch (error) {
                return ResponseCode_1.default.error(res, {
                    code: 500,
                    status: false,
                    message: error.message,
                    result: null
                });
            }
        });
    }
}
exports.default = new MetaController();
