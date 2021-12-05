import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism"

interface PrettyPrintProps {
  data: any
  style?: object
}

const PrettyPrint = ({ data, style = {} }: PrettyPrintProps): JSX.Element => {
  if (!data) return <></>

  return (
    <SyntaxHighlighter
      customStyle={{ ...style }}
      language="json"
      style={okaidia}
    >
      {JSON.stringify(data, null, 2)}
    </SyntaxHighlighter>
  )
}

export default PrettyPrint
