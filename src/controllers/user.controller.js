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
const express_1 = require("express");
const user_model_1 = __importDefault(require("../models/user.model"));
const Route = (0, express_1.Router)();
/**
 * @openapi
 * '/users':
 *  get:
 *     tags:
 *     - ADD
 *     summary: Get all users
 *     requestBody:
 *     responses:
 *      200:
 *        description: Get All users
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 */
Route.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
/**
 * @openapi
 * '/createUser':
 *  post:
 *     tags:
 *     - GET
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      201:
 *        description: User Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
Route.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _user = yield user_model_1.default.findOne({ name: req.body.name });
        const _email = yield user_model_1.default.findOne({ email: req.body.email });
        if (_user || _email) {
            res
                .status(409)
                .send({ message: "email or password is already presnet" });
            return;
        }
        const user = new user_model_1.default({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        yield user.save();
        res.status(201).json({ user });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
/**
 * @openapi
 * '/updateUser/:id':
 *  patch:
 *     tags:
 *     - UPDATE
 *     summary: Update a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: User updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      404:
 *        description: User Not found
 */
Route.patch("/updateUser/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        yield user.save();
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
/**
 * @openapi
 * '/deleteUser/:id':
 *  patch:
 *     tags:
 *     - DELETE
 *     summary: Delete a user
 *     requestBody:
 *     responses:
 *      200:
 *        description: User deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      404:
 *        description: User Not found
 */
Route.delete("/deleteUser/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_model_1.default.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
        }
        else {
            res.status(200).json({ message: "User deleted successfully" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = Route;
