"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userResolvers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const generate = __importStar(require("../helpers/generate"));
exports.userResolvers = {
    Mutation: {
        registerUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const existEmail = yield user_model_1.default.findOne({
                email: user.email,
                deleted: false
            });
            if (existEmail) {
                return {
                    code: 400,
                    message: "Email đã tồn tại!"
                };
            }
            else {
                user.token = generate.generateRandomString(30);
                const newUser = new user_model_1.default(user);
                const data = newUser.save();
                return {
                    code: 200,
                    message: "Đăng ký tài khoản thành công!",
                    fullName: newUser.fullName,
                    email: newUser.email,
                    token: newUser.token
                };
            }
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const infoUser = yield user_model_1.default.findOne({
                email: user.email,
                deleted: false
            });
            if (!infoUser) {
                return {
                    code: 400,
                    message: "Email không tìm thấy!"
                };
            }
            else {
                if (infoUser.password !== user.password) {
                    return {
                        code: 400,
                        message: "Mat khau khong chinh xac!"
                    };
                }
                else {
                    return {
                        code: 200,
                        message: "Thành công!",
                        id: infoUser.id,
                        fullName: infoUser.fullName,
                        email: infoUser.email,
                        token: infoUser.token
                    };
                }
            }
        }),
    },
    Query: {
        getUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const tokenVerify = context.tokenVerify;
            const infoUser = yield user_model_1.default.findOne({
                token: tokenVerify,
                deleted: false
            });
            if (infoUser) {
                return {
                    code: 200,
                    message: "Thành công!",
                    id: infoUser.id,
                    fullName: infoUser.fullName,
                    email: infoUser.email,
                    token: infoUser.token
                };
            }
            else {
                return {
                    code: 400,
                    message: "Thất bại!",
                };
            }
        })
    }
};
