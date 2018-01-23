import React, { Component } from 'react';

/**
 * Composition hoc的之中
 * 如果必须要执行的生命周期. 先执行 WrappedComponent 的,再执行包裹容器的
 * 如果不是必要执行的, 根据情况判断
 */


const Composition = function(WrappedComponent) {
  return class extends Component {
    static defaultProps = {
      name: 'Composition'
    }

    componentDidMount() {
      console.log(this.props.name, 'Composition componentDidMount');
    }

    // componentDidUpdate 不会执行, 
    // 因为包裹层没有 setState 的操作
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