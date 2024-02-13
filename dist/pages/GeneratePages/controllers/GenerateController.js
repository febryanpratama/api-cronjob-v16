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
const openai_1 = __importDefault(require("openai"));
const ResponseCode_1 = __importDefault(require("../../../core/utils/ResponseCode"));
const GenerateRepository_1 = __importDefault(require("../../../core/repositories/Generate/GenerateRepository"));
const ImageConvert_1 = __importDefault(require("../../../core/repositories/Convert/ImageConvert"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class GenerateController {
    constructor() {
        this.generateAiText = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const OPENAI_KEY = process.env.OPENAI_KEY || '';
            const openai = new openai_1.default({ apiKey: OPENAI_KEY });
            try {
                const { prompt } = req.body;
                if (!prompt)
                    return ResponseCode_1.default.error(res, {
                        code: 400,
                        status: false,
                        message: 'Prompt is required',
                        result: null
                    });
                const respText = yield GenerateRepository_1.default.generateText(res, prompt);
                if (respText === false)
                    return ResponseCode_1.default.error(res, respText.message);
                return ResponseCode_1.default.successGet(res, respText.data);
            }
            catch (e) {
                return ResponseCode_1.default.error(res, {
                    code: 500,
                    status: false,
                    message: e.message,
                    result: null
                });
            }
        });
        this.generateAiImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const OPENAI_KEY = process.env.OPENAI_KEY || '';
            const openai = new openai_1.default({ apiKey: OPENAI_KEY });
            try {
                const { prompt } = req.body;
                if (!prompt)
                    return ResponseCode_1.default.error(res, {
                        code: 400,
                        status: false,
                        message: 'Prompt is required',
                        result: null
                    });
                const respImage = yield GenerateRepository_1.default.generateImage(res, prompt);
                if (respImage === false)
                    return ResponseCode_1.default.error(res, respImage.message);
                const respConvert = yield ImageConvert_1.default.downloadImage(res, respImage.data);
                if (respConvert === false)
                    return ResponseCode_1.default.error(res, respConvert.message);
                const respData = {
                    urlimage: respConvert.data,
                };
                return ResponseCode_1.default.successGet(res, respData);
            }
            catch (err) {
                return ResponseCode_1.default.error(res, {
                    code: 500,
                    status: false,
                    message: err.message,
                    result: null
                });
            }
        });
        this.generateArtikel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const application_id = Number(req.params.id);
            try {
                if (!application_id)
                    return ResponseCode_1.default.error(res, {
                        code: 400,
                        status: false,
                        message: 'Application ID is required',
                        result: null
                    });
                const respMeta = yield prisma.metaAi.findMany({
                    where: {
                        applicationId: application_id,
                    }
                });
                if (!respMeta)
                    return ResponseCode_1.default.error(res, {
                        code: 400,
                        status: false,
                        message: 'Application not found',
                        result: null
                    });
                let getRandMeta = respMeta[Math.floor(Math.random() * respMeta.length)];
                if (!getRandMeta)
                    return ResponseCode_1.default.error(res, {
                        code: 400,
                        status: false,
                        message: 'Meta not found',
                        result: null
                    });
                let prompt = "sebagai seorang profesional pembuat konten web, tolong buatkan suatu artikel dan sajikan dalam maksimal 500 kata dan dibagi menjadi tiga paragraf serta sajikan dalam bentuk code html code untuk tampil di halaman pertama mesin pencarian berdasarkan deskripsi berikut ini: " + getRandMeta.keyword;
                const respText = yield GenerateRepository_1.default.generateText(res, prompt);
                let promptTitle = "Buatkan Title Konten dari artikel berikut : " + respText.data;
                const respTitle = yield GenerateRepository_1.default.generateText(res, promptTitle);
                const ketImage = [
                    {
                        "title": "Kantor Pusat",
                    },
                    {
                        "title": "Berikat",
                    },
                    {
                        "title": "Ekonomi",
                    },
                    {
                        "title": "Kegiatan Kantor",
                    },
                ];
                let promptImage = "Sebagai seorang graphic designer profesional, buatkan gambar tanpa huruf, tanpa angka, tanpa tanda baca, dengan size maksimal 100kb dengan deskripsi aktivitas " + ketImage[Math.floor(Math.random() * ketImage.length)].title;
                const responseImage = yield GenerateRepository_1.default.generateImage(res, promptImage);
                const respConvert = yield ImageConvert_1.default.downloadImage(res, responseImage.data);
                let responseData = {
                    title: respTitle.data,
                    content: respText.data,
                    image: respConvert.data
                };
                const storeData = yield prisma.artikel.create({
                    data: {
                        applicationId: application_id,
                        title: respTitle.data.substring(0, 200),
                        content: respText.data,
                        image: respConvert.data,
                        isDownloaded: 'no'
                    }
                });
                return ResponseCode_1.default.successGet(res, storeData);
                // return ResponseCode.successGet(res, getRandMeta);
            }
            catch (err) {
                return ResponseCode_1.default.error(res, {
                    code: 500,
                    status: false,
                    message: err.message,
                    result: null
                });
            }
        });
        this.storeArtikel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let { application_id, title, content, image } = req.body;
            try {
                if (!application_id)
                    return ResponseCode_1.default.error(res, {
                        code: 400,
                        status: false,
                        message: 'Application ID is required',
                        result: null
                    });
                if (!title)
                    return ResponseCode_1.default.error(res, {
                        code: 400,
                        status: false,
                        message: 'Title is required',
                        result: null
                    });
                if (!content)
                    return ResponseCode_1.default.error(res, {
                        code: 400,
                        status: false,
                        message: 'Content is required',
                        result: null
                    });
                if (!image)
                    return ResponseCode_1.default.error(res, {
                        code: 400,
                        status: false,
                        message: 'Image is required',
                        result: null
                    });
                const storeData = yield prisma.artikel.create({
                    data: {
                        applicationId: application_id,
                        title: title,
                        content: content,
                        image: image,
                        isDownloaded: 'no'
                    }
                });
                return ResponseCode_1.default.successGet(res, storeData);
            }
            catch (err) {
                return ResponseCode_1.default.error(res, {
                    code: 500,
                    status: false,
                    message: err.message,
                    result: null
                });
            }
        });
    }
}
exports.default = new GenerateController();
