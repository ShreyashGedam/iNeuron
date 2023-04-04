"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const swagger_1 = __importDefault(require("./swagger"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", user_controller_1.default);
(0, config_1.default)();
exports.default = app.listen(8080, () => {
    console.log("Server is listening on port 8080");
    (0, swagger_1.default)(app, 8080);
});
