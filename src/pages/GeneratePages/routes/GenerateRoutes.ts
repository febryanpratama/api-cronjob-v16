import BaseRoutes from "../../../core/routes/BaseRoutes";
import GenerateController from "../controllers/GenerateController";
// import AuthController from "../controller/AuthController";


class GenerateRoutes extends BaseRoutes {
    public routes() : void {
        this.router.get('/account', GenerateController.getInfoAccount);
        this.router.get('/list', GenerateController.index);
        this.router.post('/text', GenerateController.generateAiText);
        this.router.post('/website', GenerateController.generateAiWebsite);
        this.router.post('/text-assistant', GenerateController.generateAiTextAsisstant);
        this.router.post('/image', GenerateController.generateAiImage);
        this.router.get('/artikel/:id', GenerateController.generateArtikel);
        this.router.post('/artikel', GenerateController.storeArtikel);
        this.router.post('/dall-e', GenerateController.generateAiDallE);
        this.router.post('/generate-images-google', GenerateController.generateImagesGoogle);
        this.router.post('/text-deepseek', GenerateController.generateAiTextDeepseek);

        this.router.post('/upload-file', GenerateController.uploadFile);
        this.router.post('/file-tuning', GenerateController.fileTuning);

        this.router.post('/generate-images-deepai', GenerateController.generateImages);


        // this.router.post('/text-random', GenerateController.generateAiTextRandom);
    }
}

export default new GenerateRoutes().router;
