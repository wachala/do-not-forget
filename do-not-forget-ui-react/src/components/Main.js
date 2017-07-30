import React from 'react';
import Text from './text/Text';
import Login from './login/Login';
import SignUp from './sing.up/SignUp';
import ApplicationBar from './app.bar/ApplicationBar';
import {BrowserRouter as Router, Route} from 'react-router-dom';

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
      <Router>
        <div className="main">
          <ApplicationBar > </ApplicationBar>

          <Route exact path="/" component={Text} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </div>
      </Router>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
