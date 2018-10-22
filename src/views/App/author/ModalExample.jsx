import React from 'react';
import ReactDOM from "react-dom";
import Modal from "react-bootstrap-modal";

//var Modal = require('react-bootstrap-modal')



class ModalExample extends React.Component {
   constructor(props){
     super(props);
     this.state = {open: true}
 }

  render(){


    let closeModal = () => this.setState({ open: false })
 
    let saveAndClose = () => {
                      this.setState({ open: false } )
    }
 
    return (
      <div>
        <button type='button'>Launch modal</button>
 
        <Modal
          show={this.state.open}
          onHide={closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Some Content here</p>
          </Modal.Body>
          <Modal.Footer>
            // If you don't have anything fancy to do you can use
            // the convenient `Dismiss` component, it will
            // trigger `onHide` when clicked
            <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
 
            // Or you can create your own dismiss buttons
            <button className='btn btn-primary' onClick={saveAndClose}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
 


export default ModalExample;