import React from 'react'
import debounce from './debounce'

class Story extends React.Component {
  state = {
    count: 0
  }

  @debounce(250, {leading: true})
  handleClick (e) {
    this.setState((state) => {
      state.count++
      return state
    })
  }

  render () {
    return (
      <div>
        <p>
          The click handler on the button will only fire after 250ms of no clicks.
        </p>
        <p>
          Clicked <strong>{this.state.count}</strong> time(s)
        </p>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    )
  }
}

export default function ({storiesOf, action}) {
  storiesOf('Decorators', module).addWithInfo(
    'debounce-decorator',
    `
      An example that uses @debounce on a click handler.

          class Story extends React.Component {
            state = {
              count: 0
            }

            @debounce(250, {leading: true})
            handleClick (e) {
              this.setState((state) => {
                state.count++
                return state
              })
            }

            render () {
              return (
                <div>
                  <p>
                    The click handler on the button will only fire after 250ms of no clicks.
                  </p>
                  <p>
                    Clicked <strong>{this.state.count}</strong> time(s)
                  </p>
                  <button onClick={this.handleClick}>Click Me</button>
                </div>
              )
            }
          }
    `,
    () => (
      <Story />
    )
  )
}
