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
exports.categoryResolvers = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
exports.categoryResolvers = {
    Query: {
        getListCategory: () => __awaiter(void 0, void 0, void 0, function* () {
            const categories = yield category_model_1.default.find({
                deleted: false
            });
            return categories;
        }),
        getCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const category = yield category_model_1.default.findOne({
                deleted: false,
                _id: id,
            });
            return category;
        }),
    },
    Mutation: {
        createCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { category } = args;
            const newCategory = new category_model_1.default(category);
            yield newCategory.save();
            return newCategory;
        }),
        deleteCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            yield category_model_1.default.updateOne({
                _id: id
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            return "Đã xóa";
        }),
        updateCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, category } = args;
            yield category_model_1.default.updateOne({
                _id: id,
                deleted: false
            }, category);
            const data = yield category_model_1.default.findOne({
                _id: id,
                deleted: false
            });
            return data;
        }),
    },
};
