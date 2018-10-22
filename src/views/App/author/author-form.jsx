import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Contants from '../Constants';
import axios from 'axios';


class AuthorForm extends React.Component {


	  constructor(props){
        super(props);
        
        this.state = { title: "New Author" , item: {name: "", id: ""} }
        this.changeValue = this.changeValue.bind(this);
        this.saveData = this.saveData.bind(this);
      //  this.inputName = React.createRef();
     }
     componentDidMount(){
           // let element =  ReactDOM.findDOMNode(this);
           // element.modal('show');
           // element.on('hidden.bs.modal', this.props.handleHideModal);

            // $(this.getDOMNode()).modal('show');
            //$(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
       }

       changeValue(event, propertie){
                let novo = event.target.value;
                let item = this.state.item;

                item[propertie] = event.target.value;

                this.setState({  item: item});
       }

        serialize( obj ) {
           return Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
       }

      saveData(event, type){


               let url = Contants.URL_API+"/author"; 
               let self = this;
               var method_save = "insert";
      	       var item = this.state.item;

              if ( type == "delete"){

              	url +="/" + item.id;
                          axios({
				 			  method: "delete",
							  url: url,
							  data: this.serialize(item),
							   headers: {
								    'Content-Type': 'application/x-www-form-urlencoded'
								  }
							}).then(  
                                        
                                         function(response){
                                                  if ( response.data.code == 1){
                                                     console.log(response.data );
                                                     self.props.ModalAction("delete", response.data);
                                                     //self.props.observer.publish('author-save', response.data );
                                                  	 //Tenho que disparar um observer a partir daqui..
                                                  	 self.props.handleClose();
                                                  }

                                         }
							);
              }

              if ( type == "save"){

      	       var method = "post"; //new
               //item.name =  this.inputName.current.value;

               console.log("chamando a url: " + url );
               console.log( this.serialize(item) );  // return;

               if (item.id != null && item.id != undefined &&  item.id != "" ){
                     method = "put";
                     url += "/" +item.id; method_save = "update";
               }




                          axios({
				 			  method: method,
							  url: url,
							  data: this.serialize(item),
							   headers: {
								    'Content-Type': 'application/x-www-form-urlencoded'
								  }
							}).then(  
                                        
                                         function(response){
                                                  if ( response.data.code == 1){
                                                     console.log(response.data );
                                                     self.props.ModalAction(method_save, response.data);
                                                     //self.props.observer.publish('author-save', response.data );
                                                  	 //Tenho que disparar um observer a partir daqui..
                                                  	 self.props.handleClose();
                                                  }

                                         }
							);

					   
                  }
					          

      }

	  componentWillReceiveProps(props) {
	            
	          
	            if ( props.title != null ){

                           let newobj = {... props.item }; //cria uma nova cópia.

	            	       this.setState({ title: props.title, item: newobj, observer: props.observer });

	            	       //this.inputName.current.value = this.state.item.name;
	            	       console.log("item recebido no form autor");
	            	       console.log(props.item);
	            }
	         
	  }
	 

	  render() {

	const styles = theme => ({
		  button: {
		    margin: theme.spacing.unit,
		  },
		  input: {
		    display: 'none',
		  },
		});

   const isEnabled = this.state.item.name != null && this.state.item.name.length > 0;

           // 
		    return (
 <span>
		    	<div className="modal-content">
								            <Typography variant="title" id="modal-title" color="textPrimary">
								              {this.state.title}
								            </Typography>
                                              
								            <Typography variant="subheading" id="simple-modal-description">
								                <TextField
												        label="Name"
												        id="margin-none" fullWidth={true}
                                                         value ={this.state.item.name != null ? this.state.item.name : ""}
												         onChange={(e) => this.changeValue(e, "name")}
												        
												       
												      />
								            </Typography>
								           


                 </div> 
                     <div className="my-modal-footer">
                     <Button variant="contained" color="primary" disabled={!isEnabled} onClick={(e) => this.saveData(e, "save")} >
				        SAVE
				      </Button>
                          <span> </span>
                       {this.state.item.id > 0  ? (
                       	              <Button variant="contained" color="secondary"  onClick={(e) => this.saveData(e, "delete")}  >
								        DELETE
								      </Button>
					      ) : (
                              <span></span>
					      )}


					      <a href="#!" onClick={this.props.handleClose}
					          className="modal-close waves-effect waves-green btn-flat">Close</a>
					 </div>
				</span>
		    );
	  }

}
export default AuthorForm;
