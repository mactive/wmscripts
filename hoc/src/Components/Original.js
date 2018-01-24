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
      name: props.name,
      setTimeOutMS: 500,
    }
  }

  componentDidMount() {
    console.log(this.props.name, 'componentDidMount')

    const self = this;
    setTimeout(() => {
      self.setState({
        name: `${self.state.name} - ${self.state.setTimeOutMS}ms`
      })
    }, this.state.setTimeOutMS);
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
  name: PropTypes.any
};

export default Original;