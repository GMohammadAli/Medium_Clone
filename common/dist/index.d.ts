import { z } from "zod";
export declare const SignUpBody: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    email?: string | undefined;
}, {
    username: string;
    password: string;
    email?: string | undefined;
}>;
export type signUpBody = z.infer<typeof SignUpBody>;
export declare const SignInBody: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type signInBody = z.infer<typeof SignInBody>;
export declare const CreatePostInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type createPostInput = z.infer<typeof CreatePostInput>;
export declare const UpdatePostInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    content?: string | undefined;
}, {
    title?: string | undefined;
    content?: string | undefined;
}>;
export type updatePostInput = z.infer<typeof UpdatePostInput>;
