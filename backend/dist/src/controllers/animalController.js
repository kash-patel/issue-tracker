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
exports.AnimalController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const animalService_1 = require("../services/animalService");
// Read all
const getAllAnimals = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield animalService_1.AnimalService.getAllAnimals(req.body.speciesId);
    res.json(result);
}));
// Read specifc
const getAnimalById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the animal to GET.");
    const result = yield animalService_1.AnimalService.getAnimalById(parseInt(req.params.id));
    res.json(result);
}));
// Create
const createAnimal = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name)
        throw new Error("Please specify the name of the animal you wish to create.");
    if (!req.body.speciesId)
        throw new Error("Animals must have a species ID.");
    const result = yield animalService_1.AnimalService.createAnimal(req.body.name, req.body.speciesId);
    res.status(201).json(result);
}));
// Update
const updateAnimal = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name)
        throw new Error(`Please specify the new name of animal ${req.params.id}.`);
    const result = yield animalService_1.AnimalService.updateAnimal(parseInt(req.params.id), req.body.name);
    res.json(result);
}));
// Delete
const deleteAnimal = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the animal to DELETE.");
    const result = yield animalService_1.AnimalService.deleteAnimal(parseInt(req.params.id));
    res.json(result);
}));
exports.AnimalController = {
    createAnimal,
    getAllAnimals,
    getAnimalById,
    updateAnimal,
    deleteAnimal,
};
