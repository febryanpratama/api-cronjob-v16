import OpenAI from "openai";
import { ListGenerateText } from "../../../pages/GeneratePages/models/GenerateModel";
import ResponseCode from "../../utils/ResponseCode";
import axios from "axios";
import fs from "fs";
import path from "path";
import { ChatCompletionMessageParam } from "openai/resources/chat";

interface dataInterface {
    role : string,
    content : string
}

class GenerateRepository {
    public generateText = async(res:any, data : string) => {
        const OPENAI_KEY : string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({apiKey : OPENAI_KEY});

        try {

            const respData : any = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    {
                        "role": "user",
                        "content": data
                    }
                ],
            })
    
    
            return {
                status: true,
                message: "Success",
                data: respData.choices[0].message.content
            }
        } catch (error:any) {
            return {
                status: false,
                errorCode: error.status,
                message: error.error.message
            }
        }


    }
    public generateTextDeepseek = async (
        res: any,
        prompt: ChatCompletionMessageParam[]
      ): Promise<any> => {
        const apiKey = process.env.OPENAI_KEY || '';
      
        const openai = new OpenAI({
          baseURL: 'https://api.deepseek.com',
          apiKey: "sk-6579f9abecef4f5a9ce461df472a567b"
        });
      
        try {
          const response = await openai.chat.completions.create({
            model: "deepseek-chat",
            messages: prompt, // ✅ ini sekarang dikenali dengan type yang sesuai
          });
      
          return {
            status: true,
            message: "Success",
            data: response.choices[0].message.content
          };
      
        } catch (error: any) {
          console.error(error);
          return {
            status: false,
            errorCode: error.status,
            message: error.error?.message || error.message
          };
        }
      }
    
    

    public generateTextAsisstant = async(res:any, data : any) => {
        const OPENAI_KEY : string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({apiKey : OPENAI_KEY});

        try {

            console.log("=====================")
            console.log("Get Request Data",data)
            const respData : any = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: data
            })

            console.log("Response Data",respData)
    
    
            return {
                status: true,
                message: "Success",
                data: respData.choices[0].message.content
            }
        } catch (error:any) {
            return {
                status: false,
                errorCode: error.status,
                message: error.error.message
            }
        }


    }

    public generateImage = async(res:any, data : string) => {
        const OPENAI_KEY : string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({apiKey : OPENAI_KEY});

        try {
            const respData : any = await openai.images.generate({
                model: "dall-e-3",
                prompt: data,
                n: 1,
                size: '1024x1024',
            })

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
            }


        }catch(e:any){
            return ResponseCode.error(res, {
                code : 500,
                status : false,
                message : e.message,
                result : null
            })
        }
    }

    public getAccount = async () => {
        const OPENAI_KEY: string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({ apiKey: OPENAI_KEY });
    
        try {
            const response = await axios.get('https://api.openai.com/v1/organization/audit_logs', {
              headers: {
                'Authorization': `Bearer ${OPENAI_KEY}`,
                'Content-Type': 'application/json'
              }
            });
        
            console.log(response.data); // Handle the response
            return {
              status: true,
              data: response.data
            };
          } catch (error : any) {
            console.error("Error fetching audit logs:", error.response?.data || error.message);
            return {
              status: false,
              errorCode: error.response?.status || 500,
              message: error.response?.data?.error?.message || error.message
            };
          }
    }

    public generateWebsite = async(res:any, data: string) => {
        const OPENAI_KEY: string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({ apiKey: OPENAI_KEY });
    
        try {
            // Mengirim request ke OpenAI
            const respData: any = await openai.chat.completions.create({
                model: "gpt-4-turbo-preview",
                messages: [
                    {
                        "role": "user",
                        "content": data
                    }
                ],
            });
    
            // Mendapatkan konten dari response
            let responseContent = respData.choices[0].message.content;
    
            // Menggunakan regex untuk menangkap kode di dalam backticks (```code```)
            const codeBlock = responseContent.match(/```(?:\w+)?\n([\s\S]*?)```/);
    
            let extractedCode = '';
            if (codeBlock) {
                // Menangkap hanya kode dari hasil regex
                extractedCode = codeBlock[1];
    
                // Membersihkan karakter tidak perlu seperti \n, \", dan lainnya
                extractedCode = extractedCode
                    .replace(/\\n/g, '')  // Hapus \n
                    .replace(/\\"/g, '"') // Ganti \" menjadi "
                    .replace(/\\t/g, '')  // Hapus \t (tab)
                    .replace(/\\r/g, '')  // Hapus \r (carriage return)
                    .replace(/^\s+|\s+$/g, '') // Trim spasi di awal dan akhir
                    .replace(/\s{2,}/g, ' ')  // Mengganti spasi ganda dengan spasi tunggal
                    .trim();
            } else {
                extractedCode = 'No code block found';
            }

            const response = {
                suggest: responseContent,
                code: extractedCode
            }
    
            console.log("Response", response);
            // Mengembalikan hasil dengan hanya kode yang sudah diformat
            return {
                status: true,
                message: "Success",
                data: response // Hanya mengembalikan kode yang sudah dibersihkan
            };
    
        } catch (error: any) {
            console.log("Error generate website", error);
            return {
                status: false,
                errorCode: error.status,
                message: error.error.message
            };
        }
    }

    public generateDallE = async(res:any, data: string) => {
        const OPENAI_KEY : string = process.env.OPENAI_KEY || '';
        const openai = new OpenAI({apiKey : OPENAI_KEY});

        try {
            const respData : any = await openai.images.generate({
                model: "dall-e-3",
                prompt: data,
                n: 1,
                size: '1024x1024',
                quality: "hd",
            })

            return {
                status: true,
                data: respData.data[0].url
            }


        }catch(e:any){
            return ResponseCode.error(res, {
                code : 500,
                status : false,
                message : e.message,
                result : null
            })
        }
    }

    public generateImageGoogle = async(res:any, data: string) => {

        try {
            
            const listData: any = [];
            const apiKey = process.env.APIKEY_GOOGLE || ''
            const engineId = process.env.APIKEY_ENGINE || ''
            const resp = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${engineId}&q=${data}&searchType=image&fileType=png&imgType=photo`)
   
            // add to new array

            resp.data.items.map((item:any) => {
                listData.push({
                    title: item.title,
                    link: item.link
                })
            })

    
            return listData;
        } catch (error:any) {
            throw new Error(error);
        }
    }

    public uploadFile = async (res: any, data: any) => {
        try {
            // Ensure the filename ends with .jsonl
            // if (!data.filename.endsWith('.jsonl')) {
            //     throw new Error('The file must have a .jsonl extension');
            // }
    
            // // Decode the Base64 string to a buffer
            // const fileBuffer = Buffer.from(data.file, 'base64');
    
            // // Optional: Ensure the file is a valid .jsonl format by checking the content
            // const decodedContent = fileBuffer.toString('utf-8');
            // const lines = decodedContent.split('\n');
            // lines.forEach((line, index) => {
            //     try {
            //         JSON.parse(line); // Each line should be valid JSON
            //     } catch (e) {
            //         console.error(`Invalid JSON at line ${index + 1}:`, e);
            //         throw new Error('Invalid JSONL format');
            //     }
            // });
    
            const OPENAI_KEY: string = process.env.OPENAI_KEY || '';
            const openai = new OpenAI({ apiKey: OPENAI_KEY });
    
            // const uploadDir = path.join(__dirname, '../../../../public/uploads/');
            // if (!fs.existsSync(uploadDir)) {
            //     fs.mkdirSync(uploadDir, { recursive: true });
            // }

            
    
            // const filePath = path.join(uploadDir, data.filename);
    
            // // // Save the Base64 decoded file to disk
            // fs.writeFileSync(filePath, fileBuffer);
    
            // console.log('File saved to:', filePath);
    
            // Upload the file to OpenAI for fine-tuning
            const response = await openai.files.create({
                file: fs.createReadStream("E:\\Incore\\api-cronjob-v16\\public\\uploads\\ceritain-test.jsonl"),
                purpose: 'fine-tune',
            });
    
            console.log('OpenAI Response:', response);
    
            // Optionally remove the file after upload
            // fs.unlinkSync(filePath);
    

            // console.log("FS", fs.createReadStream(filePath))
            return response;
        } catch (error: any) {
            console.error('Error during file upload:', error);
    
            return {
                status: false,
                errorCode: 500,
                message: error.message,
            };
        }
    };

    public fileTuning = async(res:any, data: string) => {

    }

    public generateImageDeepAi = async(res:any, data: string) => {
        const apiKey = process.env.APIKEY_DEEPAI || '';


        const resp = await axios.post('https://api.deepai.org/api/text2img', {
            text: data,
            image_generator_version: "genius", // "v1" or "genius"
            use_old_model: false,
            quality: true,
            genius_preference: "photography", //  classic, anime, photography, cinematic, hyper real, graphic design
        }, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            }
        })

        console.log(resp.data);

        return resp.data
    }

}

export default new GenerateRepository()