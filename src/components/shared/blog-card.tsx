import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt?: string;
  categories: string[];
  tags: string[];
  featuredImage?: string;
  slug?: string;
  createdAt: Date;
}

export function BlogCard({
  title,
  excerpt,
  categories,
  tags,
  featuredImage,
  slug,
  createdAt,
}: BlogCardProps) {
  return (
    <Card className="h-full flex flex-col">
      {featuredImage && (
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <img src={featuredImage} alt={title} className="object-cover" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <Link
            href={`/blogs/${slug || ""}`}
            className="hover:text-primary transition-colors"
          >
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {excerpt && (
          <p className="text-muted-foreground line-clamp-3 mb-4">{excerpt}</p>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
