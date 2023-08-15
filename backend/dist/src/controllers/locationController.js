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
exports.LocationController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const locationService_1 = require("../services/locationService");
// Read all
const getAllLocations = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield locationService_1.LocationService.getAllLocations();
    res.send(result);
}));
// Read specifc
const getLocationById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the location to GET.");
    const result = yield locationService_1.LocationService.getLocationById(req.params.id);
    res.send(result);
}));
// Create
const createLocation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name)
        throw new Error("Please specify the name of the location you wish to create.");
    const result = yield locationService_1.LocationService.createLocation(req.body.name);
    res.status(201).send(result);
}));
// Update
const updateLocation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name)
        throw new Error(`Please specify the new name of location ${req.params.id}.`);
    const result = yield locationService_1.LocationService.updateLocation(req.params.id, req.body.name);
    res.send(result);
}));
// Delete
const deleteLocation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the location to DELETE.");
    const result = yield locationService_1.LocationService.deleteLocation(req.params.id);
    res.send(result);
}));
exports.LocationController = {
    createLocation,
    getAllLocations,
    getLocationById,
    updateLocation,
    deleteLocation,
};
