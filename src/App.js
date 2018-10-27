import React, { Component } from 'react'
import './App.css'
import { defaultActivity } from './activities'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      module: null,
      isTouch: !matchMedia('(pointer:fine)').matches
    };
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
    const { module: Component } = this.state
    return(
      <div>
        {Component && <Component defaultValue={defaultActivity} />}
      </div>
    )
  }
}

export default App
