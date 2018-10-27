import React, { Component } from 'react'
import './App.css'
import MonacoEditor from 'react-monaco-editor'
import { conf, language } from './editor/python'
import { createDependencyProposals } from './editor/autocompletion'
import { createHoverText } from './editor/hover'

const LANGUAGE = 'python-custom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: `import numpy as np
import matplotlib.pyplot as plt

def f(t):
  return np.exp(-t) * np.cos(2*np.pi*t)

t1 = np.arange(0.0, 5.0, 0.1)
t2 = np.arange(0.0, 5.0, 0.02)

plt.figure(1)
plt.subplot(211)
plt.plot(t1, f(t1), 'bo', t2, f(t2), 'k')

plt.subplot(212)
plt.plot(t2, np.cos(2*np.pi*t2), 'r--')
plt.show()`
    }
  }
  editorWillMount(monaco) {
    monaco.languages.register({ 
      id: "python-custom",
      extensions: ['.py', '.rpy', '.pyw', '.cpy', '.gyp', '.gypi'],
      aliases: ['Python', 'py'],
     })
    monaco.languages.setLanguageConfiguration(LANGUAGE, conf(monaco))
    monaco.languages.setMonarchTokensProvider("python-custom", language(monaco))
  }

  editorDidMount = (editor, monaco) => {
    monaco.languages.registerCompletionItemProvider(LANGUAGE, {
      provideCompletionItems: (model) => createDependencyProposals(monaco, model.getValue())
    })
    monaco.languages.registerHoverProvider(LANGUAGE, {
      provideHover: (model, position) => createHoverText(monaco, model, position)
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
