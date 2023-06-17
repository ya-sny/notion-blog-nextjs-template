import markdownStyles from './markdown-styles.module.css'
import {ReactMarkdown} from 'react-markdown/lib/react-markdown'

type Props = {
  content: string
}

const PostBody = ({content}: Props) => {
  console.log(content);
  return (
    <div className="max-w-2xl mx-auto">
      <ReactMarkdown children={content}></ReactMarkdown>
    </div>
  )
}

export default PostBody
