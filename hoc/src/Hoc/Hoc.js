import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Composition hoc
 * 如果必须要执行的生命周期. 先执行 WrappedComponent 的,再执行包裹容器的声明周期
 * 如果不是必要执行的, 根据情况判断
 * 包裹容器 的 setState会影响被包裹的, 因为render 是交给 WrappedComponent的
 */


const Composition = function(WrappedComponent) {
  return class HOCComposition extends Component {
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


/**
 * Extend hoc
 * 只执行一边生命周期, 如果子类对象实现了某一步生命周期, 那么执行子类的
 * 如果想先执行父类的方法, 可以调用 super.方法() 声明周期或自己声明的方法
 * 但是不能 super.state 的方式直接取 super 的, 哪怕是自定义的值也不行
 * render() 方法需要执行 super.render()
 */

const Extend = function(WrappedComponent) {
  return class HOCExtend extends WrappedComponent {
    static propTypes = {
      name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    }

    componentDidMount(){
      super.componentDidMount();
      console.log(super.stringMax(this.props.name, 6))
      console.log(this.props.name, 'Extend-componentDidMount');
    }
  
    render() {
      const elements = super.render();
      const newStyle = {
        color: typeof this.props.name === 'number'? 'lightseagreen': 'lightcoral'
      }
      const newProps = { ...this.props, style: newStyle}
      return React.cloneElement(elements, newProps, elements.props.children)
    }
  }
}
export {
  Composition,
  Extend,
}