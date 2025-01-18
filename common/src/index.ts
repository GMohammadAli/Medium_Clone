import { z } from "zod";

export const SignUpBody = z.object({
  username: z.string(),
  email: z.string().optional(),
  password: z.string(),
});

export type signUpBody = z.infer<typeof SignUpBody>;

export const SignInBody = z.object({
  username: z.string(),
  password: z.string(),
});

export type signInBody = z.infer<typeof SignInBody>;

export const CreatePostInput = z.object({
  title: z.string(),
  content: z.string(),
});

export type createPostInput = z.infer<typeof CreatePostInput>;

export const UpdatePostInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export type updatePostInput = z.infer<typeof UpdatePostInput>;
