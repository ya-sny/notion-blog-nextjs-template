import type Author from './author'

type PostType = {
  id: string
  title: string
  description: string
  date: string
  slug: string
  tags: string[]
  text: string
  markdown: string
}

export default PostType
