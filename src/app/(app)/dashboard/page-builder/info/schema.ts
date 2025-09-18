import z from "zod";

export const infoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  leftImage: z.string().url().optional(),
  rightImage: z.string().url().optional(),
  backgroundColor: z.string().default("#ffffff"),
});

export type InfoData = z.infer<typeof infoSchema>;
