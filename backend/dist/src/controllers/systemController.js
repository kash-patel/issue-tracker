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
exports.SystemController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const systemService_1 = require("../services/systemService");
// Read all
const getAllSystems = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield systemService_1.SystemService.getAllSystems(req.body.locationId);
    res.send(result);
}));
// Read specifc
const getSystemById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the system to GET.");
    const result = yield systemService_1.SystemService.getSystemById(req.params.id);
    res.send(result);
}));
// Create
const createSystem = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name)
        throw new Error("Please specify the name of the system you wish to create.");
    if (!req.body.locationId)
        throw new Error("Systems must have a location ID.");
    const result = yield systemService_1.SystemService.createSystem(req.body.name, req.body.locationId);
    res.status(201).send(result);
}));
// Update
const updateSystem = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name)
        throw new Error(`Please specify the new name of system ${req.params.id}.`);
    const result = yield systemService_1.SystemService.updateSystem(req.params.id, req.body.name);
    res.send(result);
}));
// Delete
const deleteSystem = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the system to DELETE.");
    const result = yield systemService_1.SystemService.deleteSystem(req.params.id);
    res.send(result);
}));
exports.SystemController = {
    createSystem,
    getAllSystems,
    getSystemById,
    updateSystem,
    deleteSystem,
};
