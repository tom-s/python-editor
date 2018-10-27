import get from 'lodash/get'
import uniq from 'lodash/uniq'
import concat from 'lodash/concat'
import difference from 'lodash/difference'
import memoize from 'fast-memoize'
import { libraries, librariesKeywords, languageKeywords } from './common'

const generateKeywords = memoize((keywords, kind) => keywords.map(keyword => ({
    label: get(keyword, 'label', keyword),
    documentation: get(keyword, 'documentation', ''),
    insertText: get(keyword, 'insertText', keyword),
    kind: kind
  }))
)

export const createDependencyProposals = (monaco, currentValue) => {
  // if we wanted to get rid of values between quotes we could try to filter on this regex: ("|'|_|[1-9]|[a-z]|"|')+
  const currentWords = uniq(currentValue.match(/(_|[1-9]|[a-z])+/gi))
  const words = uniq(difference(currentWords, languageKeywords, librariesKeywords))
  return concat(
    generateKeywords(languageKeywords, monaco.languages.CompletionItemKind.Function),
    generateKeywords(libraries, monaco.languages.CompletionItemKind.Class),
    generateKeywords(words, monaco.languages.CompletionItemKind.Text),
  )
}