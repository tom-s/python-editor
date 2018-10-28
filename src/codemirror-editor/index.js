import React, { Component } from 'react'
import {UnControlled as CodeMirror} from 'react-codemirror2'
//import cm from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/blackboard.css'
import './style.css'
import 'codemirror/mode/python/python'

class Editor extends Component {
  editor = null
  editorDidMount = (editor) => {
    this.editor = editor
  }

  componentDidUpdate = (prevProps) => {
    const { error: prevError } = prevProps
    const { error } = this.props
    if(error !== prevError) {
      // Update error
      error && this.editor.addLineClass(error.lineNumber - 1, 'background', 'Line_error')
      prevError && this.editor.removeLineClass(prevError.lineNumber - 1, 'background', 'Line_error')
    }
  }
  
  render() {
    const { defaultValue } = this.props
    const options = {
      mode: 'python',
      theme: 'blackboard',
      lineNumbers: true,
      lineHighlight: {
        from: 10,
        to: 10
      }
    }
    return (
      <div style={{
        width: 800
      }}>
        <CodeMirror
          value={defaultValue}
          options={options}
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
