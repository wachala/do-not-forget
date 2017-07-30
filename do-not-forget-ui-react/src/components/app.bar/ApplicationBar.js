import * as React from 'react';
import PropsTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import {AppBar, Toolbar, IconButton, Typography, Button} from 'material-ui/index';
import {Menu} from 'material-ui-icons/index';

const styleSheet = createStyleSheet({
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  }
});

class ApplicationBarComponent extends React.Component {

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu">
              <Menu/>
            </IconButton>

            <Typography type="title" color="inherit" className={classes.flex}>
              Do not forget
            </Typography>
            <Button color="contrast">Login</Button>
            <Button color="contrast">Sign up</Button>
          </Toolbar>

        </AppBar>
      </div>
    )
  }
}

ApplicationBarComponent.propsTypes = {
  classes: PropsTypes.object.isRequired
};

export default withStyles(styleSheet)(ApplicationBarComponent);
