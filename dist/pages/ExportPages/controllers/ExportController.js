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
class ExporController {
    constructor() {
        this.indexExport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const navigation = req.params.id;
                const data = yield prisma.artikel.findMany({
                    where: {
                        applicationId: parseInt(navigation),
                        isDownloaded: 'no'
                    },
                });
                if (data.length === 0)
                    return ResponseCode_1.default.error(res, {
                        code: 404,
                        status: false,
                        message: 'Data not found',
                        result: null
                    });
                for (let index = 0; index < data.length; index++) {
                    yield prisma.artikel.update({
                        where: {
                            id: data[index].id
                        },
                        data: {
                            isDownloaded: 'yes'
                        }
                    });
                }
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
        this.showExport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const navigation = req.params.id;
                const data = yield prisma.artikel.findMany({
                    where: {
                        applicationId: parseInt(navigation),
                        // isDownloaded: 'yes'
                    },
                });
                if (data.length === 0)
                    return ResponseCode_1.default.error(res, {
                        code: 404,
                        status: false,
                        message: 'Data not found',
                        result: null
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
    }
}
exports.default = new ExporController();
