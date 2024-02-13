"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const GenerateRoutes_1 = __importDefault(require("./pages/GeneratePages/routes/GenerateRoutes"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const ApplicationRoutes_1 = __importDefault(require("./pages/ApplicationPages/routes/ApplicationRoutes"));
const MetaRoutes_1 = __importDefault(require("./pages/MetaPages/routes/MetaRoutes"));
const ExportRoutes_1 = __importDefault(require("./pages/ExportPages/routes/ExportRoutes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
        this.routes();
        (0, dotenv_1.config)();
    }
    plugins() {
        this.app.use(express_1.default.urlencoded());
        this.app.use(express_1.default.json());
        this.app.use((express_1.default.static(path_1.default.join(__dirname, '../public'))));
        // this.app.use( compression() );
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        }));
    }
    routes() {
        this.app.route('/').get((req, res) => {
            return res.json({
                status: true,
                message: 'Server is running'
            });
        });
        this.app.use('/api/generate', GenerateRoutes_1.default);
        this.app.use('/api/application', ApplicationRoutes_1.default);
        this.app.use('/api/meta-ai', MetaRoutes_1.default);
        this.app.use('/api/export-artikel', ExportRoutes_1.default);
    }
}
const port = 8080;
const app = new App().app;
app.listen(port, () => {
    // console.log( process.env.NODE_ENV );
    console.log(`Server is running on port ${port}`);
});
