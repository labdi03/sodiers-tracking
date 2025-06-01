"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SoldierSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true }, // Matches ESP32 ID
    name: String,
    age: Number,
    unit:String,
    grade: String,
    bloodGroup: String,
});
exports.default = mongoose_1.default.model("Soldier", SoldierSchema);
