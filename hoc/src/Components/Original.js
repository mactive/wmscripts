import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Original.css'

class Original extends Component {
  static defaultProps = {
    name: 'Original'
  }

  constructor(props) {
    super(props);
    this.state = {
      name: props.name
    }
  }

  componentDidMount() {
    console.log(this.props.name, 'componentDidMount')
    // const self = this;
    // setTimeout(() => {
    //   self.setState({
    //     name: `${self.state.name} - 500ms`
    //   })
    // }, 500);
  }

  componentWillReceiveProps(nextProps) {
    console.log(`${this.props.name} Current props: `, this.props);
    console.log(`${this.props.name} Next props: `, nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.name, 'componentDidUpdate')
  }

  render() {
    return (
      <div className='name'>
        {this.state.name}
      </div>
    );
  }
}

Original.propTypes = {
  name: PropTypes.string
};

export default Original;