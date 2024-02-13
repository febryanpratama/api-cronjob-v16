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
class ApplcationController {
    constructor() {
        this.indexApp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield prisma.application.findMany();
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
        this.storeApp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            try {
                if (!name)
                    return ResponseCode_1.default.error(res, {
                        code: 400,
                        status: false,
                        message: 'Required Parameter',
                        result: null
                    });
                const data = yield prisma.application.create({
                    data: {
                        name: name
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
exports.default = new ApplcationController();
