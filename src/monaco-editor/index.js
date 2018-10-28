import React, { Component } from 'react'
import MonacoEditor from 'react-monaco-editor'
import { conf, language } from './python'
import { createDependencyProposals } from './autocompletion'
import { createHoverText } from './hover'
import { librariesKeywords } from './common'

const LANGUAGE = 'python-custom'

class Editor extends Component {
  completionProviderDisposable = null
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

  enableAutoComplete = monaco => {
    this.completionProviderDisposable = monaco.languages.registerCompletionItemProvider(LANGUAGE, {
      provideCompletionItems: (model) => createDependencyProposals(monaco, model.getValue())
    })
  }

  disableAutoComplete = () => {
    this.completionProviderDisposable && this.completionProviderDisposable.dispose()
    this.completionProviderDisposable = null
  }

  editorDidMount = (editor, monaco) => {
    this.enableAutoComplete(monaco)
    monaco.languages.registerHoverProvider(LANGUAGE, {
      provideHover: (model, position) => createHoverText(monaco, model, position)
    })

    // Customize context menu
    editor.addAction({
      // An unique identifier of the contributed action.
      id: 'enable-autocomplete',
      // A label of the action that will be presented to the user.
      label: 'Enable autocomplete',
      // An optional array of keybindings for the action.
      keybindings: [],
      // A precondition for this action.
      precondition: null,
      // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
      keybindingContext: null,
      contextMenuGroupId: 'autocomplete',
      contextMenuOrder: 1.5,
    
      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convinience
      run: () => {
        this.enableAutoComplete(monaco)
        return null;
      }
    });

    editor.addAction({
      // An unique identifier of the contributed action.
      id: 'disable-autocomplete',
      // A label of the action that will be presented to the user.
      label: 'Disable autocomplete',
      // An optional array of keybindings for the action.
      keybindings: [],
      // A precondition for this action.
      precondition: null,
      // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
      keybindingContext: null,
      contextMenuGroupId: 'autocomplete',
      contextMenuOrder: 1.5,
    
      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convinience
      run: () => {
        this.disableAutoComplete()
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
    const { defaultValue: code } = this.props
    const options = {
      selectOnLineNumbers: true,
      overviewRulerLanes: 1,
      wordBasedSuggestions: false, // we do it ourselves
      //contextmenu: false // for mobile,
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

export default Editor
