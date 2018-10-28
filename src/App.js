import React, { Component } from 'react'
import random from 'lodash/random'
import { defaultActivity } from './activities'
import './App.css'

class App extends Component {
  state = {
    module: null,
    isTouch: !matchMedia('(pointer:fine)').matches,
    error: null
  }
  run = () => {
    const errorLineNumber = random(0, 20)
    const error = errorLineNumber < 5
      ? null
      : {
        msg: `An error occured at line ${errorLineNumber} -> Undefined random error`,
        lineNumber: errorLineNumber
      }
    this.setState({
      error
    })
  }

  componentDidMount() {
    const { isTouch } = this.state
    const path = isTouch
      ? './codemirror-editor'
      : './monaco-editor'
    import(`${path}`)
      .then(module => this.setState({ module: module.default }))
  }
  render() {
    const { module: Component, error } = this.state
    return(
      <div>
        <button onClick={this.run}>Run</button>
        {Component && <Component defaultValue={defaultActivity} error={error} />}
      </div>
    )
  }
}

export default App
