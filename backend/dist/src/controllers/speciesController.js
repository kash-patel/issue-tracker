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
exports.SpeciesController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const speciesService_1 = require("../services/speciesService");
const animalService_1 = require("../services/animalService");
// Read all
const getAllSpecies = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield speciesService_1.SpeciesService.getAllSpecies();
    res.json(result);
}));
// Read specifc
const getSpeciesById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the species to GET.");
    const result = yield speciesService_1.SpeciesService.getSpeciesById(req.params.id);
    res.json(result);
}));
const getSpeciesIndividuals = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the species to list members of.");
    const result = yield animalService_1.AnimalService.getAllAnimals(parseInt(req.params.id));
    res.json(result);
}));
// Create
const createSpecies = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.genus || !req.body.species)
        throw new Error("Please specify the genus and species names of the species you wish to create.");
    const result = yield speciesService_1.SpeciesService.createSpecies(req.body.genus, req.body.species);
    res.status(201).json(result);
}));
// Delete
const deleteSpecies = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the species to DELETE.");
    const result = yield speciesService_1.SpeciesService.deleteSpecies(req.params.id);
    res.json(result);
}));
exports.SpeciesController = {
    createSpecies,
    getAllSpecies,
    getSpeciesIndividuals,
    getSpeciesById,
    deleteSpecies,
};
