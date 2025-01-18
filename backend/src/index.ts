import { Hono } from "hono";
import { userRouter } from "./users";
import { blogRouter } from "./blogs";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    //this binding is specifically required by ts to understand the type of the DATABASE_URL
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: any;
  };
}>();

app.use("*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
