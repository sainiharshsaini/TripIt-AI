"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const generate_1 = __importDefault(require("./routes/generate"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [
    'http://localhost:5173',
    'https://tripit-ai-fe.vercel.app',
    'https://tripit-ai-4n99q0f8d-harsh-sainis-projects-87c6ad77.vercel.app',
];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api', generate_1.default);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});
