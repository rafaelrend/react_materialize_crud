import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle.jsx";
import Modal from "react-bootstrap-modal";
import SimpleModal from "../Rend/modal/SimpleModal";

class Footer extends React.Component {

  constructor(props){
     super(props);
     this.state = { modals: { sobre: false}  };
     this.closeModal = this.closeModal.bind(this);
     this.openModal = this.openModal.bind(this);
  }

  closeModal (event, type){

    let modals = this.state.modals;
    modals[type] = false;
     this.setState({ modals: modals });
  }

   openModal (event, type){

    let modals = this.state.modals;
    modals[type] = true;

    console.log(modals);
     this.setState({ modals: modals });
  }



  render(){
  const { classes } = this.props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#!" className={classes.block} onClick={(e) => this.openModal(e, "sobre")}>
                About
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#company" className={classes.block}>
                Company
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#portfolio" className={classes.block}>
                Portfolio
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={classes.block}>
                Blog
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a href="http://www.rendti.com.br" className={classes.a}>
              RENDTI
            </a>, working harder everyday
          </span>
        </p>
      </div>
  



     <SimpleModal id_modal="sobre" open={this.state.modals.sobre}
      handleClose={this.closeModal} title="About" 
     text="This is a Simple CRUD developed by RendTI using React JS and PHP Laravel v5.0"  ></SimpleModal>


    </footer>




  );
}
}


Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
