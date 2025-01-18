"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostInput = exports.CreatePostInput = exports.SignInBody = exports.SignUpBody = void 0;
const zod_1 = require("zod");
exports.SignUpBody = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().optional(),
    password: zod_1.z.string(),
});
exports.SignInBody = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.CreatePostInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.UpdatePostInput = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
});
