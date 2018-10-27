import get from 'lodash/get'
import { language } from './python'

export const libraries = [{
  'label': 'numpy',
  'insertText': 'numpy', 
  'documentation': 'Hurray this is doc for \na Math lib called numpy'
}, {
  'label': 'matplotlib',
  'insertText': 'matplotlib', 
  'documentation': 'Hurray this is another doc \nfor a Math lib called matplotlib'
}]

export const librariesKeywords = libraries.map(library => library.insertText)
export const languageKeywords = get(language(), 'keywords', []).filter(keyword => !keyword.startsWith('_'))
