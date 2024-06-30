import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";
import { loadBlogPost } from "@/helpers/file-helpers";

import styles from "./postSlug.module.css";

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}

const customComponents = {
  pre: (props) => <CodeSnippet {...props} />,
};

async function BlogPost({ params }) {
  const { frontmatter, content } = await loadBlogPost(params.postSlug);

  const { title, publishedOn } = frontmatter;

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} components={customComponents} />
      </div>
    </article>
  );
}

export default BlogPost;
