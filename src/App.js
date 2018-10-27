import React, { Component } from 'react'
import './App.css'
import MonacoEditor from 'react-monaco-editor'
import { conf, language } from './editor/python'
import { createDependencyProposals } from './editor/autocompletion'
import { createHoverText } from './editor/hover'
import { librariesKeywords } from './editor/common'
import { defaultActivity } from './activities'
import test from '../node_modules/monaco-editor/dev/vs/editor/editor.main.nls.fr'

console.log("debug test", test)

const LANGUAGE = 'python-custom'

class App extends Component {
  state = {
    code: defaultActivity
  }
  editorWillMount(monaco) {
    monaco.languages.register({ 
      id: "python-custom",
      extensions: ['.py', '.rpy', '.pyw', '.cpy', '.gyp', '.gypi'],
      aliases: ['Python', 'py'],
     })
    monaco.languages.setLanguageConfiguration(LANGUAGE, conf(monaco))
    monaco.languages.setMonarchTokensProvider("python-custom", language(librariesKeywords))
    monaco.editor.defineTheme('python-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'library-import', foreground: '3CB371', fontStyle: 'underline' }
      ]
  });
  }

  editorDidMount = (editor, monaco) => {
    monaco.languages.registerCompletionItemProvider(LANGUAGE, {
      provideCompletionItems: (model) => createDependencyProposals(monaco, model.getValue())
    })
    monaco.languages.registerHoverProvider(LANGUAGE, {
      provideHover: (model, position) => createHoverText(monaco, model, position)
    })

    // Customize context menu
    editor.addAction({
      // An unique identifier of the contributed action.
      id: 'lls',
    
      // A label of the action that will be presented to the user.
      label: 'Vive lelivrescolaire.fr !',
    
      // An optional array of keybindings for the action.
      keybindings: [],
    
      // A precondition for this action.
      precondition: null,
    
      // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
      keybindingContext: null,
    
      contextMenuGroupId: 'navigation',
    
      contextMenuOrder: 1.5,
    
      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convinience
      run: () => {
        window.open('https://www.lelivrescolaire.fr')
        return null;
      }
    });
    
    // Focus
    editor.focus()
    
  }
  onChange = (newValue, e) => {
    //console.log('onChange', newValue, e)
  }
  render() {
    const code = this.state.code
    const options = {
      selectOnLineNumbers: true,
      overviewRulerLanes: 1,
      wordBasedSuggestions: false, // we do it ourselves
      contextmenu: false // for mobile,
    }

    return (
      <div className="App">
        <MonacoEditor
          width="800"
          height="600"
          language="python-custom"
          theme="python-theme"
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
