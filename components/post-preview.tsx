import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'

type Props = {
  id: string,
  title: string,
  description: string,
  date: string
  slug: string
  tags: string[];
}

const PostPreview = ({
  id,
  title,
  description,
  date,
  slug,
  tags,
}: Props) => {
  return (
    <div>
      {/*<div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>*/}
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="text-sm mb-4">
        {tags.map((tag) => (
          <span className="mr-3 p-1 text-white bg-blue-500 rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
}

export default PostPreview
