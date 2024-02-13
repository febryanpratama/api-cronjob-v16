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
const ResponseCode_1 = __importDefault(require("../../utils/ResponseCode"));
class GenerateRepository {
    constructor() {
        this.generateText = (res, data) => __awaiter(this, void 0, void 0, function* () {
            const OPENAI_KEY = process.env.OPENAI_KEY || '';
            const openai = new openai_1.default({ apiKey: OPENAI_KEY });
            try {
                const respData = yield openai.chat.completions.create({
                    model: "gpt-4-turbo-preview",
                    messages: [
                        {
                            "role": "user",
                            "content": data
                        }
                    ],
                    max_tokens: 600
                });
                return {
                    status: true,
                    message: "Success",
                    data: respData.choices[0].message.content
                };
            }
            catch (error) {
                return {
                    status: true,
                    message: error.message
                };
            }
        });
        this.generateImage = (res, data) => __awaiter(this, void 0, void 0, function* () {
            const OPENAI_KEY = process.env.OPENAI_KEY || '';
            const openai = new openai_1.default({ apiKey: OPENAI_KEY });
            try {
                const respData = yield openai.images.generate({
                    model: "dall-e-3",
                    prompt: data,
                    n: 1,
                    size: '1024x1024',
                });
                // const respData : any = {
                //     created: 1706805505,
                //     data: [
                //       {
                //         url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-AfLrfsWk5j9TUNhcVthVMKJW/user-jT6AhrXZkinmnwhMgDaM4ne5/img-bO8y46vi4hlGkGTKBKmtPWGb.png?st=2024-02-01T15%3A38%3A25Z&se=2024-02-01T17%3A38%3A25Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-02-01T08%3A50%3A10Z&ske=2024-02-02T08%3A50%3A10Z&sks=b&skv=2021-08-06&sig=gtFo0W9zDgMr%2BkL0P%2B6z5fxGODtp/ipucH7aCSpagQM%3D'
                //       }
                //     ]
                //   }
                return {
                    status: true,
                    data: respData.data[0].url
                };
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
    }
}
exports.default = new GenerateRepository();
