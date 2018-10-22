import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

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

class SimpleModalContainer extends React.Component {


  constructor(props){
       super(props);

      let open = false;

      if ( props.open != null  && props.open != undefined ){
        open = props.open;
      }
      this.state = {
        open: open,
        title: props.title,
        text: props.text,
        id_modal: props.id_modal
      };
  }

  componentWillReceiveProps(props) {
          if ( props.open != null && props.open != undefined ){

                   this.setState({ open: props.open, 
                                    title: props.title, text: props.text });
          }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (e, id_modal) => {
    this.setState({ open: false }, function() {
      if ( this.props.handleClose != null ){
        this.props.handleClose(this, id_modal);
      }
    });
  };

  render() {
    const { classes } = this.props;
    let display_none = { display: "none"}

    let title = this.state.title;
    let text = this.state.text;
    let open = this.state.open;
    let id_modal = this.state.id_modal;
    return (
      <div>
        
        <Typography style={display_none} gutterBottom>Click to get the full Modal experience!</Typography>
        <Button style={display_none} onClick={this.handleOpen}>Open Modal</Button>
       <Modal
                open={open}
                onClose={(e) => this.handleClose(e, id_modal)}
                aria-labelledby="ModalHeader"
              >
             <div style={getModalStyle()} className={classes.paper}>
                     <Typography variant="title" id="modal-title">
                           {title}
                    </Typography>
                    <Typography variant="subheading" id="simple-modal-description">
                          {text}
                    </Typography>
                    <Typography variant="footer" align="right"  id="simple-modal-footer">

                <Button  variant="outlined" size="small" color="primary"
                onClick={(e) => this.handleClose(e, id_modal)}>Close Modal</Button>
                    </Typography>

             </div>


        </Modal>

      </div>
    );
  }
}

/*
SimpleModalContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};
*/

// We need an intermediary variable for handling the recursive nesting.
const SimpleModal = withStyles(styles)(SimpleModalContainer);

export default SimpleModal;