import React, { Component } from 'react'
import './App.css'
import MonacoEditor from 'react-monaco-editor'
import { conf, language } from './python'

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
    monaco.languages.setLanguageConfiguration('python-custom', conf)
    monaco.languages.setMonarchTokensProvider("python-custom", language)
  }

  editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor)
    editor.focus()
  }
  onChange = (newValue, e) => {
    console.log('onChange', newValue, e)
  }
  render() {
    const code = this.state.code
    const options = {
      selectOnLineNumbers: true,
      overviewRulerLanes: 1
    }
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
