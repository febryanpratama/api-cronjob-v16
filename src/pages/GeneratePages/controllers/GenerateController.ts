import { Request, Response } from "express";
import OpenAI from "openai";
import { config as dotenv } from 'dotenv';
import ResponseCode from "../../../core/utils/ResponseCode";
import { ListGenerateText } from "../models/GenerateModel";
import GenerateRepository from "../../../core/repositories/Generate/GenerateRepository";
import ImageConvert from "../../../core/repositories/Convert/ImageConvert";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


interface InterfacePrompt {
    prompt: string,
}




class GenerateController {

    public index = async(req: Request, res: Response) : Promise<Response> => {
        const resp = await prisma.responseAi.findMany();

        return ResponseCode.successGet(res, resp);
    }

    public generateAiText = async(req: Request, res: Response) : Promise<Response> => {
        const OPENAI_KEY: string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({ apiKey: OPENAI_KEY });
    
        try {
            const { prompt }: InterfacePrompt = req.body;
    
            if (!prompt) {
                return ResponseCode.error(res, {
                    code: 400,
                    status: false,
                    message: 'Prompt is required',
                    result: null
                });
            }
    
            const respText: any = await GenerateRepository.generateText(res, prompt);
    
            if (respText === false) {
                return ResponseCode.error(res, {
                    code: 500,
                    status: false,
                    message: 'Failed to generate text',
                    result: null
                });
            }
    
            // Log the raw response for debugging
            // console.log('Raw Response:', respText.data);
    
            // let jsonResponse;
            // try {
            //     // Remove code block markers and unnecessary characters
            //     const cleanedData = respText.data.replace(/```json\n|```/g, '').trim();


                
            //     // Attempt to parse the cleaned response text as JSON
            //     jsonResponse = JSON.parse(cleanedData);

            //     // Optionally store the response in your database
            //     const respStore = await prisma.responseAi.create({
            //         data: {
            //             prompt: prompt,
            //             response: respText.data,
            //         }
            //     });
            // } catch (parseError: unknown) {
            //     const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown error occurred';
    
            //     return ResponseCode.error(res, {
            //         code: 500,
            //         status: false,
            //         message: 'Error parsing JSON response: ' + errorMessage,
            //         result: null
            //     });
            // }

            const respStore = await prisma.responseAi.create({
                data: {
                    prompt: prompt,
                    response: respText.data,
                    jsonResponse: undefined
                }
            });

            console.log('Raw Response:', respStore);
    
    
            return ResponseCode.successGet(res, respStore);
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
    
            return ResponseCode.error(res, {
                code: 500,
                status: false,
                message: errorMessage,
                result: null
            });
        }
    }

    public generateAiDeepseek = async(req: Request, res: Response) : Promise<Response> => {
        const OPENAI_KEY: string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({ apiKey: OPENAI_KEY });
    
        try {
            const { prompt }: InterfacePrompt = req.body;
    
            if (!prompt) {
                return ResponseCode.error(res, {
                    code: 400,
                    status: false,
                    message: 'Prompt is required',
                    result: null
                });
            }
    
            const respText: any = await GenerateRepository.generateDeepseek(res, prompt);
    
            if (respText === false) {
                return ResponseCode.error(res, {
                    code: 500,
                    status: false,
                    message: 'Failed to generate text',
                    result: null
                });
            }
    
            // Log the raw response for debugging
            // console.log('Raw Response:', respText.data);
    
            // let jsonResponse;
            // try {
            //     // Remove code block markers and unnecessary characters
            //     const cleanedData = respText.data.replace(/```json\n|```/g, '').trim();


                
            //     // Attempt to parse the cleaned response text as JSON
            //     jsonResponse = JSON.parse(cleanedData);

            //     // Optionally store the response in your database
            //     const respStore = await prisma.responseAi.create({
            //         data: {
            //             prompt: prompt,
            //             response: respText.data,
            //         }
            //     });
            // } catch (parseError: unknown) {
            //     const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown error occurred';
    
            //     return ResponseCode.error(res, {
            //         code: 500,
            //         status: false,
            //         message: 'Error parsing JSON response: ' + errorMessage,
            //         result: null
            //     });
            // }

            // const respStore = await prisma.responseAi.create({
            //     data: {
            //         prompt: prompt,
            //         response: respText.data,
            //         jsonResponse: undefined
            //     }
            // });

            console.log('Raw Response:', respText);

            const respStatis = {
                prompt : prompt,
                response: respText.data,
                jsonResponse: undefined
            }
    
    
            return ResponseCode.successGet(res, respStatis);
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
    
            return ResponseCode.error(res, {
                code: 500,
                status: false,
                message: errorMessage,
                result: null
            });
        }
    }


    public generateAiTextDeepseek = async(req: Request, res: Response) : Promise<Response> => {
        // const OPENAI_KEY: string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({
            baseURL: 'https://api.deepseek.com',
            apiKey: 'sk-6579f9abecef4f5a9ce461df472a567b'
    });
    
        try {
            const { prompt }: InterfacePrompt = req.body;
    
            if (!prompt) {
                return ResponseCode.error(res, {
                    code: 400,
                    status: false,
                    message: 'Prompt is required',
                    result: null
                });
            }
    
            const respText: any = await GenerateRepository.generateTextDeepseek(res, req.body.prompt); // ✅ OK

    
            if (respText.status === false) {
                return ResponseCode.error(res, {
                    code: respText.errorCode,
                    status: false,
                    message: respText.message,
                    result: null
                });
            }

            const respResult = {
                status: true,
                message: "Success",
                response: respText.data
            }
            
    
    
            return ResponseCode.successGet(res, respResult);
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
    
            return ResponseCode.error(res, {
                code: 500,
                status: false,
                message: errorMessage,
                result: null
            });
        }
    }


    public generateAiTextAsisstant = async(req: Request, res: Response) : Promise<Response> => {
        const OPENAI_KEY: string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({ apiKey: OPENAI_KEY });
    
        try {
            const { prompt }: InterfacePrompt = req.body;
    
            if (!prompt) {
                return ResponseCode.error(res, {
                    code: 400,
                    status: false,
                    message: 'Prompt is required',
                    result: null
                });
            }
    
            const respText: any = await GenerateRepository.generateTextAsisstant(res, prompt);
    
            if (respText.status === false) {
                return ResponseCode.error(res, {
                    code: respText.errorCode,
                    status: false,
                    message: respText.message,
                    result: null
                });
            }

            const respResult = {
                status: true,
                message: "Success",
                response: respText.data
            }
            
    
    
            return ResponseCode.successGet(res, respResult);
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
    
            return ResponseCode.error(res, {
                code: 500,
                status: false,
                message: errorMessage,
                result: null
            });
        }
    }

    public generateAiImage = async(req: Request, res: Response) : Promise<Response> => {
        const OPENAI_KEY : string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({apiKey : OPENAI_KEY});

        try {

            const {prompt} : InterfacePrompt = req.body;

            if(!prompt) return ResponseCode.error(res, {
                code : 400,
                status : false,
                message : 'Prompt is required',
                result : null
            })

            const respImage : any = await GenerateRepository.generateImage(res, prompt);

            if(respImage === false) return ResponseCode.error(res, respImage.message);

            const respConvert :any = await ImageConvert.downloadImage(res, respImage.data);

            if(respConvert === false) return ResponseCode.error(res, respConvert.message);

            const respData : any = {
                urlimage : respConvert.data,
            }
            return ResponseCode.successGet(res, respData);

        }catch(err: any){
            return ResponseCode.error(res, {
                code : 500,
                status : false,
                message : err.message,
                result : null
            })
        }
    }

    public generateArtikel = async(req: Request, res: Response) : Promise<Response> => {
        const application_id : number = Number(req.params.id);
        try{

            if(!application_id) return ResponseCode.error(res, {
                code : 400,
                status : false,
                message : 'Application ID is required',
                result : null
            })
            const respMeta = await prisma.metaAi.findMany({
                where: {
                    applicationId: application_id,
                }
            })

            if(!respMeta) return ResponseCode.error(res, {
                code : 400,
                status : false,
                message : 'Application not found',
                result : null
            })

            let getRandMeta = respMeta[Math.floor(Math.random() * respMeta.length)];

            if(!getRandMeta) return ResponseCode.error(res, {
                code : 400,
                status : false,
                message : 'Meta not found',
                result : null
            })

            const checkApplicationStatus = await prisma.application.findFirst({
                where: {
                    id: application_id
                }
            })

            if(checkApplicationStatus?.status === false) {
                return ResponseCode.error(res, {
                    code : 400,
                    status : false,
                    message : 'Application not active',
                    result : null
                })
            }

            let prompt :string = "sebagai seorang profesional pembuat konten web, tolong buatkan suatu artikel dan sajikan dalam maksimal 500 kata dan dibagi menjadi tiga paragraf serta sajikan dalam bentuk code html code untuk tampil di halaman pertama mesin pencarian berdasarkan deskripsi berikut ini: " + getRandMeta.keyword;


            const respText : any = await GenerateRepository.generateText(res, prompt);

            let promptTitle : string  = "Buatkan Title Konten dari artikel berikut : "+respText.data;

            const respTitle : any = await GenerateRepository.generateText(res, promptTitle);

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
            ]
            
            let promptImage = "Sebagai seorang graphic designer profesional, buatkan gambar tanpa huruf, tanpa angka, tanpa tanda baca, dengan size maksimal 100kb dengan deskripsi aktivitas "+ketImage[Math.floor(Math.random() * ketImage.length)].title;

            const responseImage : any = await GenerateRepository.generateImageDeepAi(res, promptImage);

            const respConvert :any = await ImageConvert.downloadImage(res, responseImage.data);

            let responseData : any = {
                title: respTitle.data,
                content: respText.data,
                image: respConvert.data
            }

            const storeData : any = await prisma.artikel.create({
                data: {
                    applicationId: application_id,
                    title: respTitle.data.substring(0, 200),
                    content: respText.data,
                    image: respConvert.data,
                    isDownloaded: 'no'
                }
            })

            return ResponseCode.successGet(res, storeData);
            // return ResponseCode.successGet(res, getRandMeta);
        }catch(err: any){
            return ResponseCode.error(res, {
                code : 500,
                status : false,
                message : err.message,
                result : null
            })
        }
    }

    public storeArtikel = async(req: Request, res: Response) : Promise<Response> => {
        let {application_id, title, content, image} = req.body;

        try{
            if(!application_id) return ResponseCode.error(res, {
                code : 400,
                status : false,
                message : 'Application ID is required',
                result : null
            })

            if(!title) return ResponseCode.error(res, {
                code : 400,
                status : false,
                message : 'Title is required',
                result : null
            })

            if(!content) return ResponseCode.error(res, {
                code : 400,
                status : false,
                message : 'Content is required',
                result : null
            })

            if(!image) return ResponseCode.error(res, {
                code : 400,
                status : false,
                message : 'Image is required',
                result : null
            })

            const storeData : any = await prisma.artikel.create({
                data: {
                    applicationId: application_id,
                    title: title,
                    content: content,
                    image: image,
                    isDownloaded: 'no'
                }
            })

            return ResponseCode.successGet(res, storeData);
        }catch(err: any){
            return ResponseCode.error(res, {
                code : 500,
                status : false,
                message : err.message,
                result : null
            })
        }
    }

    public getInfoAccount = async(req: Request, res: Response) : Promise<Response> => {
        const respAccount : any = await GenerateRepository.getAccount();

        return respAccount

    }

    public generateAiWebsite = async(req: Request, res: Response) : Promise<Response> => {
        const OPENAI_KEY: string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({ apiKey: OPENAI_KEY });
    
        try {
            const { prompt }: InterfacePrompt = req.body;
    
            if (!prompt) {
                return ResponseCode.error(res, {
                    code: 400,
                    status: false,
                    message: 'Prompt is required',
                    result: null
                });
            }
    
            const respText: any = await GenerateRepository.generateWebsite(res, prompt);
    
            if (respText === false) {
                return ResponseCode.error(res, {
                    code: 500,
                    status: false,
                    message: 'Failed to generate text',
                    result: null
                });
            }

            // const respStore = await prisma.responseAi.create({
            //     data: {
            //         prompt: prompt,
            //         response: respText.data,
            //         jsonResponse: undefined
            //     }
            // });

            // console.log('Raw Response:', respStore);
    
    
            return ResponseCode.successGet(res, respText.data);
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
    
            return ResponseCode.error(res, {
                code: 500,
                status: false,
                message: errorMessage,
                result: null
            });
        }
    }

    public generateAiDallE = async(req: Request, res: Response) : Promise<Response> => {
        const OPENAI_KEY: string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({ apiKey: OPENAI_KEY });
    
        try {
            const { prompt }: InterfacePrompt = req.body;
    
            if (!prompt) {
                return ResponseCode.error(res, {
                    code: 400,
                    status: false,
                    message: 'Prompt is required',
                    result: null
                });
            }
    
            const respDallE: any = await GenerateRepository.generateDallE(res, prompt);
    
            if (respDallE === false) {
                return ResponseCode.error(res, {
                    code: 500,
                    status: false,
                    message: 'Failed to generate text',
                    result: null
                });
            }

            console.log('Raw Response:', respDallE);
    
    
            return ResponseCode.successGet(res, respDallE);
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
    
            return ResponseCode.error(res, {
                code: 500,
                status: false,
                message: errorMessage,
                result: null
            });
        }
    }

    public generateImagesGoogle = async(req: Request, res: Response) : Promise<Response> => {

        const { prompt }: InterfacePrompt = req.body;
        const resp = await GenerateRepository.generateImageGoogle(res, prompt);

        return ResponseCode.successGet(res, resp);
    }

    public uploadFile = async(req: Request, res: Response) : Promise<Response> => {
        const body = req.body;

        const resp = await GenerateRepository.uploadFile(res, body);

        return ResponseCode.successGet(res, resp);
    }

    public fileTuning = async(req: Request, res: Response) : Promise<Response> => {
        const { prompt }: InterfacePrompt = req.body;
        const resp = await GenerateRepository.fileTuning(res, prompt);

        return ResponseCode.successGet(res, resp);
    }

    public generateImages = async(req: Request, res: Response) : Promise<Response> => {
        const { prompt }: InterfacePrompt = req.body;

        const resp = await GenerateRepository.generateImageDeepAi(res, prompt);

        return ResponseCode.successGet(res, resp);
    }
}

export default new GenerateController();