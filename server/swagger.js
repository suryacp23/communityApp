const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Community App API",
    version: "1.0.0",
    description: "API documentation for the Community App",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
  paths: {
    "/auth/signup": {
      post: {
        summary: "Register a new user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userName: {
                    type: "string",
                    example: "johnDoe",
                  },
                  email: {
                    type: "string",
                    example: "johndoe@example.com",
                  },
                  password: {
                    type: "string",
                    example: "Password123!",
                  },
                },
                required: ["userName", "email", "password"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    _id: { type: "string" },
                    userName: { type: "string" },
                    email: { type: "string" },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation errors",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/auth/login": {
      post: {
        summary: "Log in a user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userName: {
                    type: "string",
                    example: "johnDoe",
                  },
                  password: {
                    type: "string",
                    example: "Password123!",
                  },
                },
                required: ["userName", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    _id: { type: "string" },
                    userName: { type: "string" },
                    email: { type: "string" },
                  },
                },
              },
            },
          },
          401: {
            description: "Invalid username or password",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/auth/logout": {
      get: {
        summary: "Log out a user",
        tags: ["Auth"],
        responses: {
          200: {
            description: "Logged out successfully",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/blog": {
      post: {
        summary: "Create a new blog",
        tags: ["Blog"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "My First Blog" },
                  description: {
                    type: "string",
                    example: "This is a blog about coding.",
                  },
                  user: { type: "string", example: "64b7d39e8347e77f12345678" },
                  imageUrl: {
                    type: "string",
                    example: "https://example.com/image.jpg",
                  },
                },
                required: ["title", "description", "user"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Blog created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    _id: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                    user: { type: "string" },
                    imageUrl: { type: "string" },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation or request error",
          },
        },
      },
    },
    "/blog/{id}": {
      put: {
        summary: "Update a blog by ID",
        tags: ["Blog"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the blog to update",
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Updated Blog Title" },
                  description: {
                    type: "string",
                    example: "Updated description.",
                  },
                  imageUrl: {
                    type: "string",
                    example: "https://example.com/updated-image.jpg",
                  },
                  user: {
                    type: "string",
                    example: "12345678",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Blog updated successfully" },
          404: { description: "Blog not found" },
          400: { description: "Validation or request error" },
        },
      },
      delete: {
        summary: "Delete a blog by ID",
        tags: ["Blog"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the blog to delete",
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: { type: "string", example: "64b7d39e8347e77f87654321" },
                },
                required: ["user"],
              },
            },
          },
        },
        responses: {
          200: { description: "Blog deleted successfully" },
          404: { description: "Blog not found" },
          400: { description: "Request error" },
        },
      },
    },
    "/blog/blogs": {
      get: {
        summary: "Retrieve all blogs",
        tags: ["Blog"],
        responses: {
          200: {
            description: "A list of blogs",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    blogs: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          _id: { type: "string" },
                          title: { type: "string" },
                          description: { type: "string" },
                          user: { type: "string" },
                          imageUrl: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: { description: "Request error" },
        },
      },
    },
    "/blog/{blogid}": {
      get: {
        summary: "Retrieve a blog by ID",
        tags: ["Blog"],
        parameters: [
          {
            name: "blogid",
            in: "path",
            required: true,
            description: "ID of the blog to retrieve",
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "A single blog",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    _id: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                    user: { type: "string" },
                    imageUrl: { type: "string" },
                  },
                },
              },
            },
          },
          404: { description: "Blog not found" },
          400: { description: "Request error" },
        },
      },
    },
    "/comment/create": {
      post: {
        summary: "Create a new comment",
        tags: ["Comment"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  comment: { type: "string", example: "Great post!" },
                  blog: { type: "string", example: "64b7d39e8347e77f12345678" },
                  user: { type: "string", example: "64b7d39e8347e77f87654321" },
                },
                required: ["comment", "blog", "user"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Comment created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    _id: { type: "string" },
                    comment: { type: "string" },
                    blog: { type: "string" },
                    user: { type: "string" },
                    createdAt: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation or request error",
          },
        },
      },
    },
    "/comment/getPostComments/{blogId}": {
      get: {
        summary: "Retrieve comments for a specific blog",
        tags: ["Comment"],
        parameters: [
          {
            name: "blogId",
            in: "path",
            required: true,
            description: "ID of the blog to retrieve comments for",
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "List of comments for the blog",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      _id: { type: "string" },
                      comment: { type: "string" },
                      user: { type: "string" },
                      createdAt: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Request error",
          },
        },
      },
    },
  },
};

export default swaggerDocument;
