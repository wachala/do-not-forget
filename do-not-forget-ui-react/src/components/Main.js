import React from 'react';
import Text from './text/Text';
import ApplicationBar from './app.bar/ApplicationBar';
import {Button} from '../../node_modules/material-ui/index';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {clicked: true};
  }

  onButtonClick() {
    this.setState({clicked: !this.state.clicked});
  }

  render() {
    return (
      <div className="main">
        <ApplicationBar > </ApplicationBar>
        <Text staticText="Text from child component"
              clicked={this.state.clicked}/>
        <Button raised={true} onClick={this.onButtonClick.bind(this)}>Click</Button>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
