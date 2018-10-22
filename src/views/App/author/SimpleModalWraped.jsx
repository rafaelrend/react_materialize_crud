import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import AuthorForm from './author-form';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {


  constructor(props){
       super(props);

      let open = false;

      if ( props.open != null ){
        open = props.open;
      }
      this.state = {
        open: open,
        item: props.item,
        title: props.title
      };
  }

  componentWillReceiveProps(props) {
          if ( props.open != null ){

                   this.setState({ open: props.open, 
                                    item: props.item,
                                    title: props.title });
          }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false }, function() {
      if ( this.props.handleClose != null ){
        this.props.handleClose(this);
      }
    });
  };

  render() {
    const { classes } = this.props;
    let display_none = { display: "none"}
    return (
      <div>
        <Typography style={display_none} gutterBottom>Click to get the full Modal experience!</Typography>
        <Button style={display_none} onClick={this.handleOpen}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div style={display_none}>
           

            <SimpleModalWrapped />
             </div>
            <AuthorForm title={this.state.title} handleClose={this.handleClose}
             ModalAction={this.props.ModalAction}
             item={this.state.item} ></AuthorForm>  
                <Button style={display_none} 
                 onClick={this.handleClose}>Close Modal</Button>
            

          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;