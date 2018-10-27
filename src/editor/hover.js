import get from 'lodash/get'
import memoize from 'fast-memoize'
import { libraries } from './common'

const getContent = memoize(word => get(
    libraries.find(library => library.insertText === word),
    'documentation'
  )
)

export const createHoverText = (monaco, model, position) => {
  const word = model.getWordAtPosition(position)
  const contents = getContent(get(word, 'word'))
  return contents
    ? ({
      //range: new monaco.Range(1, 1, model.getLineCount(), model.getLineMaxColumn(model.getLineCount())),
			contents: contents.split('\n').map(content => ({
        value: content
      }))
    })
    : null
}
