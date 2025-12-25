import z from "zod";

function doesBodyExists(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Request body is missing or empty",
    });
  }
  next();
}

function validateBody(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        error: "Validation failed",
        details: error.issues.map((e) => e.message),
      });
    }
  };
}

const registerSchema = z.object({
  firstName: z.string({ error: "First name is required" }),
  lastName: z.string({ error: "Last name is required" }),
  email: z.email({ error: "Invalid Email" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters long" }),
});

const loginSchema = z.object({
  email: z.email({ error: "Invalid Email Format" }),
  password: z.string({ error: "Password is required" }),
});

const addToCartSchema = z.object({
  productId: z.string({ error: "productId is required" }),
  quantity: z
    .int({ error: "quantity is required" })
    .min(1, { error: "quantity must be at least 1" }),
});

const updateCartSchema = z.object({
  quantity: z
    .int({ error: "quantity is required" })
    .min(1, { error: "quantity must be at least 1" }),
});

export const validateRegisterBody = [
  doesBodyExists,
  validateBody(registerSchema),
];

export const validateLoginBody = [doesBodyExists, validateBody(loginSchema)];

export const validateAddToCartBody = [
  doesBodyExists,
  validateBody(addToCartSchema),
];

export const validateUpdateCartBody = [
  doesBodyExists,
  validateBody(updateCartSchema),
];
