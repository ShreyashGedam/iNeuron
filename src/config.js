"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function connection() {
    mongoose_1.default
        .connect("mongodb+srv://Shreyash:shreyash1234@cluster0.eyxgk.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
        console.log("Connected to database");
    })
        .catch((error) => {
        console.log("Connecton to database failed");
    });
}
exports.default = connection;
