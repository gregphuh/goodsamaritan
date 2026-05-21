import type { MDXComponents } from "mdx/types";
import { Heading } from "@/components/primitives/Heading";

/**
 * Component map for MDX prose content. Maps native markdown elements to
 * our primitives so /projects/[slug] and /stories/[slug] inherit the same
 * type scale, spacing, and color tokens as the rest of the site.
 */
export function getMdxComponents(): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <Heading as="h2" size="h1" className="mt-12 first:mt-0" {...props}>
        {children}
      </Heading>
    ),
    h2: ({ children, ...props }) => (
      <Heading as="h2" size="h2" className="mt-12 first:mt-0" {...props}>
        {children}
      </Heading>
    ),
    h3: ({ children, ...props }) => (
      <Heading as="h3" size="h3" className="mt-10 first:mt-0" {...props}>
        {children}
      </Heading>
    ),
    h4: ({ children, ...props }) => (
      <Heading as="h4" size="h4" className="mt-8 first:mt-0" {...props}>
        {children}
      </Heading>
    ),
    p: ({ children, ...props }) => (
      <p className="text-body-lg leading-relaxed text-ink-soft mt-5 first:mt-0" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="text-body-lg leading-relaxed text-ink-soft mt-5 ml-6 list-disc space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="text-body-lg leading-relaxed text-ink-soft mt-5 ml-6 list-decimal space-y-2" {...props}>
        {children}
      </ol>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-accent-strong underline underline-offset-4 hover:no-underline"
        {...props}
      >
        {children}
      </a>
    ),
    strong: ({ children, ...props }) => (
      <strong className="text-ink-strong font-semibold" {...props}>
        {children}
      </strong>
    ),
    blockquote: ({ children, ...props }) => (
      // No side-stripe border (impeccable ban): italic + indent does the work.
      <blockquote
        className="my-8 pl-6 text-body-lg italic text-ink-soft"
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-10 border-rule" />,
  };
}
