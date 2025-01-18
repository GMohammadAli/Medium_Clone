import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { CreatePostInput, UpdatePostInput } from "@gulammohammadali/common-app";

export const blogRouter = new Hono<{
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

blogRouter.use("*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set("userId", String(payload.id));
  await next();
});
blogRouter.post("/", async (c) => {
  const prisma = c.get("prisma");
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = CreatePostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }

  try {
    const newBlog = await prisma.post.create({
      data: {
        authorId: userId,
        title: body?.title,
        content: body?.content,
      },
    });
    return c.json({
      message: `Successfully created a blog with blog Id : ${newBlog.id}`,
      data: { ...newBlog },
    });
  } catch (error) {
    console.error("Error while creating a blog user with Id : ", error);
    return c.json({
      messsage: "Error while creating blogs for user",
      error: error,
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = c.get("prisma");

  try {
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            email: true,
          },
        },
      },
    });
    return c.json({
      message: `Successfully fetched a all blogs`,
      data: [...blogs],
    });
  } catch (error) {
    console.error("Error while fetching multiple blogs", error);
    return c.json({
      messsage: "Error while fetching multiple blogs",
      error: error,
    });
  }
});

blogRouter.put("/:id", async (c) => {
  const prisma = c.get("prisma");
  const postId = c.req.param("id");

  const body = await c.req.json();
  const { success } = UpdatePostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }

  try {
    const updatedBlog = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...(body?.title ? { title: body?.title } : {}),
        ...(body?.content ? { content: body?.content } : {}),
        ...(body?.published ? { published: body?.published } : {}),
      },
    });
    return c.json({
      message: `Successfully updated a blog with blog title : ${updatedBlog.title}`,
      data: { ...updatedBlog },
    });
  } catch (error) {
    console.error("Error while updating a blog user with Id : ", error);
    return c.json({
      messsage: "Error while updating blogs for user",
      error: error,
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = c.get("prisma");
  const postId = c.req.param("id");

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            email: true,
          },
        },
      },
    });
    return c.json({
      message: `Successfully fetched a blog with blog title : ${blog.title}`,
      data: { ...blog },
    });
  } catch (error) {
    console.error("Error while fetching a blog user with Id : ", error);
    return c.json({
      messsage: "Error while fetching blogs for user",
      error: error,
    });
  }
});
