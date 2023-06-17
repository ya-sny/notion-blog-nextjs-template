import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import {getAllPosts} from '../../lib/notionAPI'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import {CMS_NAME} from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import type Post from '../../interfaces/post'
import React from 'react'
import {getSinglePost} from '../../lib/notionAPI'
import PostPreview from '../../components/post-preview'
import DateFormatter from '../../components/date-formatter'
import PostType from '../../interfaces/post'
import {ReactMarkdown} from 'react-markdown/lib/react-markdown'

type Props = {
  post: PostType
  morePosts: PostType[]
}
// type Props = {
//   posts: Post[]
// }

export default function Post({post}: Props) {
  // console.log(post)
  // export default function Post() {
  // const router = useRouter()
  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />
  // }
  // console.log(post.markdown);
  return (
    <Container>
      <article className="mb-32">
        <Head>
          <title>{post.title}</title>
        </Head>
        <h3 className="text-3xl mb-3 leading-snug">
          {post.title}
        </h3>
        <div className="text-sm mb-4">
          {post.tags.map((tag: string) => (
            <span className="mr-3 p-1 text-white bg-blue-500 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="text-lg mb-4">
          <DateFormatter dateString={post.date} />
        </div>
        <PostBody content={post.markdown}></PostBody>
      </article>
    </Container>
  )
}
// <ReactMarkdown children={post.markdown}></ReactMarkdown>

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({params}: Params) {
  const page = await getSinglePost(params.slug);

  // console.log(page);
  return {
    props: {
      post: page["page"],
    },
    // ISR
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({slug}) => ({params: {slug}}));

  return {
    paths,
    fallback: "blocking",
  };
}
