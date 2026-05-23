import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { Locale } from "@/i18n/routing";

// ─────────────────────────────────────────────────────────────────────────────
// Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const PROJECT_CATEGORIES = [
  "word",
  "housing",
  "groceries",
  "medical",
  "firewood",
  "mission",
  "school",
  "general",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

const ProjectFrontmatter = z.object({
  title: z.string().min(3).max(120),
  category: z.enum(PROJECT_CATEGORIES),
  summary: z.string().min(20).max(240),
  year: z.number().int().min(1994).max(2030),
  featured: z.boolean().default(false),
  // Optional manual ordering for the /ministries listing. Lower numbers
  // render first; ties fall through to year-desc then slug-asc. Lets us
  // match the home page's canonical order (word, housing, groceries,
  // medical, firewood) without inferring it from category names.
  order: z.number().int().default(999),
  families: z.array(z.string()).default([]),
  villages: z.array(z.string()).default([]),
  heroImage: z.string().optional(),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatter>;

export type Project = ProjectFrontmatter & {
  slug: string;
  locale: Locale;
  content: string;
  localeFellBack: boolean; // true when the requested locale didn't have this file
};

// Stories: same loading pattern, but with mandatory consent:true literal so
// no story can render without explicit family permission baked into the file.
const StoryFrontmatter = z.object({
  title: z.string().min(3).max(120),
  family: z.string().min(1),
  village: z.string().min(1),
  category: z.enum(PROJECT_CATEGORIES),
  year: z.number().int().min(1994).max(2030),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Story frontmatter MUST have consent: true. No story renders without explicit family permission.",
    }),
  }),
  excerpt: z.string().min(20).max(280),
  heroImage: z.string().optional(),
});

export type StoryFrontmatter = z.infer<typeof StoryFrontmatter>;

export type Story = StoryFrontmatter & {
  slug: string;
  locale: Locale;
  content: string;
  localeFellBack: boolean;
};

async function listStorySlugs(locale: Locale): Promise<string[]> {
  const dir = path.join(CONTENT_ROOT, locale, "stories");
  try {
    const entries = await fs.readdir(dir);
    return entries.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

async function readStoryFile(
  locale: Locale,
  slug: string,
): Promise<{ raw: string; fellBack: boolean } | null> {
  const primary = path.join(CONTENT_ROOT, locale, "stories", `${slug}.mdx`);
  try {
    return { raw: await fs.readFile(primary, "utf8"), fellBack: false };
  } catch {
    if (locale === "en") return null;
    const fallback = path.join(CONTENT_ROOT, "en", "stories", `${slug}.mdx`);
    try {
      return { raw: await fs.readFile(fallback, "utf8"), fellBack: true };
    } catch {
      return null;
    }
  }
}

export async function getStoryBySlug(locale: Locale, slug: string): Promise<Story | null> {
  const file = await readStoryFile(locale, slug);
  if (!file) return null;
  const { data, content } = matter(file.raw);
  const parsed = StoryFrontmatter.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in stories/${slug}.mdx: ${parsed.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join(", ")}`,
    );
  }
  return { ...parsed.data, slug, locale, content, localeFellBack: file.fellBack };
}

export async function getAllStories(locale: Locale): Promise<Story[]> {
  const slugs = await listStorySlugs("en");
  const stories = await Promise.all(slugs.map((slug) => getStoryBySlug(locale, slug)));
  return stories
    .filter((s): s is Story => s !== null)
    .sort((a, b) => (a.year !== b.year ? b.year - a.year : a.slug.localeCompare(b.slug)));
}

export async function getAllStorySlugs(): Promise<string[]> {
  return listStorySlugs("en");
}

// ─────────────────────────────────────────────────────────────────────────────
// File-system loader
// ─────────────────────────────────────────────────────────────────────────────

const CONTENT_ROOT = path.join(process.cwd(), "content");

async function readMdxFile(
  locale: Locale,
  type: "projects",
  slug: string,
): Promise<{ raw: string; fellBack: boolean } | null> {
  const primary = path.join(CONTENT_ROOT, locale, type, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(primary, "utf8");
    return { raw, fellBack: false };
  } catch {
    if (locale === "en") return null;
    // Fall back to EN if the requested locale file is missing.
    const fallback = path.join(CONTENT_ROOT, "en", type, `${slug}.mdx`);
    try {
      const raw = await fs.readFile(fallback, "utf8");
      return { raw, fellBack: true };
    } catch {
      return null;
    }
  }
}

async function listSlugs(locale: Locale, type: "projects"): Promise<string[]> {
  const dir = path.join(CONTENT_ROOT, locale, type);
  try {
    const entries = await fs.readdir(dir);
    return entries.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export async function getProjectBySlug(
  locale: Locale,
  slug: string,
): Promise<Project | null> {
  const file = await readMdxFile(locale, "projects", slug);
  if (!file) return null;
  const { data, content } = matter(file.raw);
  const parsed = ProjectFrontmatter.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in projects/${slug}.mdx: ${parsed.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join(", ")}`,
    );
  }
  return {
    ...parsed.data,
    slug,
    locale,
    content,
    localeFellBack: file.fellBack,
  };
}

export async function getAllProjects(locale: Locale): Promise<Project[]> {
  // Read EN slugs as the canonical list — translations may lag.
  const slugs = await listSlugs("en", "projects");
  const projects = await Promise.all(slugs.map((slug) => getProjectBySlug(locale, slug)));
  return projects
    .filter((p): p is Project => p !== null)
    .sort((a, b) => {
      // Explicit order first (lower = earlier), then featured, then newer
      // year, then slug alpha. The order field lets us match the home
      // page's canonical sequence on the listing page.
      if (a.order !== b.order) return a.order - b.order;
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (a.year !== b.year) return b.year - a.year;
      return a.slug.localeCompare(b.slug);
    });
}

export async function getAllProjectSlugs(): Promise<string[]> {
  return listSlugs("en", "projects");
}
