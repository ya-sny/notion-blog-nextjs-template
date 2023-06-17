import {Client} from "@notionhq/client";
import {QueryDatabaseResponse} from "@notionhq/client/build/src/api-endpoints";
import type Post from '../../interfaces/post'
import {NotionToMarkdown} from "notion-to-md";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getAllPosts() {
  const posts: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    page_size: 100,
  });
  return posts.results.map((post) => getPageMetaData(post));
};

function getPageMetaData(post) {
  const tags = post.properties.Tags.multi_select;
  const allTags = tags.map((tag) => tag.name);

  return {
    id: post.id,
    title: post.properties.Name.title[0]?.plain_text,
    description: post.properties.Description.rich_text[0]?.plain_text,
    slug: post.properties.Slug.rich_text[0]?.plain_text,
    date: post.properties.Date.date?.start,
    tags: allTags,
  }
}

const n2m = new NotionToMarkdown({notionClient: notion});

export async function getSinglePost(slug: string) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });
  const page = getPageMetaData(response.results[0]);
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks);
  page["markdown"] = mdString["parent"];
  return {
    page,
  }
}
