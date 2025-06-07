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
const express_1 = __importDefault(require("express"));
const gemini_1 = require("../utils/gemini");
const router = express_1.default.Router();
router.post('/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    console.log("backend " + prompt);
    if (!prompt) {
        res.status(400).json({ error: "Prompt is required" });
        return;
    }
    try {
        const trip = yield (0, gemini_1.generateTripPlan)(prompt);
        res.status(200).json({ trip });
    }
    catch (error) {
        console.error('Error generating trip:', error);
        res.status(500).json({ error: 'Failed to generate trip' });
    }
}));
exports.default = router;
