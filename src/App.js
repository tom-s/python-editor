import React, { Component } from 'react'
import './App.css'
import get from 'lodash/get'
import uniq from 'lodash/uniq'
import concat from 'lodash/concat'
import difference from 'lodash/difference'
import MonacoEditor from 'react-monaco-editor'
import { conf, language } from './python'

const languageKeywords = get(language(), 'keywords', []).filter(keyword => !keyword.startsWith('_'))

const createDependencyProposals = (monaco, currentValue) => {
  const currentWords = currentValue.match(/(_|[1-9]|[a-z])+/gi)
  const words = uniq(difference(currentWords, languageKeywords))
  return concat(languageKeywords.map(keyword => ({
      label: keyword,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: '',
      insertText: keyword
    })),
    words.map(word => ({
      label: word,
      kind: monaco.languages.CompletionItemKind.Text,
      documentation: '',
      insertText: word
    }))
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: [
        'def cook(val):',
        '\tprint(val + " nut bread")',
        'fruit = "banana"',
        'cook(fruit)'
      ].join('\n')
    }
  }
  editorWillMount(monaco) {
    monaco.languages.register({ 
      id: "python-custom",
      extensions: ['.py', '.rpy', '.pyw', '.cpy', '.gyp', '.gypi'],
      aliases: ['Python', 'py'],
     })
    monaco.languages.setLanguageConfiguration('python-custom', conf(monaco))
    monaco.languages.setMonarchTokensProvider("python-custom", language(monaco))
  }

  editorDidMount = (editor, monaco) => {
    monaco.languages.registerCompletionItemProvider('python-custom', {
      provideCompletionItems: (model, position, ...rest) => {
        return createDependencyProposals(monaco, editor.getValue())
      }
    })
    editor.focus()
  }
  onChange = (newValue, e) => {
    //console.log('onChange', newValue, e)
  }
  render() {
    const code = this.state.code
    const options = {
      selectOnLineNumbers: true,
      overviewRulerLanes: 1
    }
    const requireConfig = {
      url: 'https://cdnjsfdsfds.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
      paths: {
        vs: 'https://as.alipayobjects.com/g/cicada/monaco-editor-mirror/0.6.1/min/vs'
      }
    };
    return (
      <div className="App">
        <MonacoEditor
          width="800"
          height="600"
          language="python-custom"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={this.onChange}
          /*
          requireConfig={{
            'vs/nls' : {
              availableLanguages: {
                '*': 'de'
              }
            }
          }}*/
          editorDidMount={this.editorDidMount}
          editorWillMount={this.editorWillMount}
        />
      </div>
    )
  }
}

export default App
