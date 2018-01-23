import React, { Component } from 'react';

const Composition = function(WrappedComponent) {
  return class extends Component {
    static defaultProps = {
      name: 'Composition'
    }

    componentDidMount() {
      console.log(this.props.name, 'Composition componentDidMount');
      const self = this;
      setTimeout(() => {
        self.setState({
          name: `${self.props.name} - 500ms`
        })
      }, 500);
    }

    // componentWillReceiveProps(nextProps) {
    //   console.log('Composition Current props: ', this.props);
    //   console.log('Composition Next props: ', nextProps);
    // }

    componentDidUpdate(prevProps, prevState) {
      console.log(this.state.name, 'Composition componentDidUpdate');
    }

    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}
export {
  Composition
}