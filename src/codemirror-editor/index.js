import React, { Component } from 'react'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import cm from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/blackboard.css'
require('codemirror/mode/python/python')

const OPTIONS = {
  mode: 'python',
  theme: 'blackboard',
  lineNumbers: true
}

class Editor extends Component {
  editor = null
  editorDidMount = (editor) => {
    this.editor = editor
  }
  render() {
    const { defaultValue } = this.props
    return (
      <div style={{
        width: 800
      }}>
        <CodeMirror
          value={defaultValue}
          options={OPTIONS}
          editorDidMount={this.editorDidMount}
          onChange={(editor, data, value) => {
            console.log("debug value", {
              value,
              data
            })
          }}
        />
      </div>
    )
  }
}

export default Editor
