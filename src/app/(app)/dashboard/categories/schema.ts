import z from "zod";

export const categorySchema = z.object({
  id: z.string().optional(), // ✅ optional ID
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  slug: z.string().optional(),
  description: z
    .string()
    .max(500, { message: "Description must be under 500 characters." })
    .optional(),
  active: z.boolean().default(false),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
