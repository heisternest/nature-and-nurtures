import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getBlogBySlug(slug: string) {
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        slug: slug,
        status: "published",
        visibility: "public",
      },
    });
    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} | Nature & Nurtures`,
    description:
      blog.metaDescription ||
      blog.excerpt ||
      `Read ${blog.title} on Nature & Nurtures`,
    openGraph: {
      title: blog.title,
      description: blog.metaDescription || blog.excerpt || "",
      images: blog.featuredImage ? [{ url: blog.featuredImage }] : [],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/blogs">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {blog.featuredImage && (
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="object-cover"
              />
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

            {blog.excerpt && (
              <p className="text-xl text-muted-foreground mb-6">
                {blog.excerpt}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {blog.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              Published on{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>
      <Footer />
    </div>
  );
}
