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
exports.VehicleController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const vehicleService_1 = require("../services/vehicleService");
// Read all
const getAllVehicles = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { make, model, licensePlate } = req.body;
    const result = yield vehicleService_1.VehicleService.getAllVehicles({
        make: make,
        model: model,
        licensePlate: licensePlate,
    });
    res.send(result);
}));
// Read specifc
const getVehicleById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the vehicle to GET.");
    const result = yield vehicleService_1.VehicleService.getVehicleById(req.params.id);
    res.send(result);
}));
// Create
const createVehicle = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.make || !req.body.model || !req.body.licensePlate)
        throw new Error("Please specify the make, model, and license plate of the vehicle you would like to add.");
    const result = yield vehicleService_1.VehicleService.createVehicle(req.body.make, req.body.model, req.body.licensePlate);
    res.status(201).json(result);
}));
// Delete
const deleteVehicle = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the vehicle to DELETE.");
    const result = yield vehicleService_1.VehicleService.deleteVehicle(req.params.id);
    res.json(result);
}));
exports.VehicleController = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    deleteVehicle,
};
