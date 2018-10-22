import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Contants from '../Constants';
import axios from 'axios';
import BookModel from './BookModel';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';


class BookForm extends React.Component {


	  constructor(props){
        super(props);
        
        this.state = { title: "New Book" ,
                           item: {...BookModel}, lists: props.lists != null ? props.lists : [] ,
                           validation_msg: "" , valid: false, open: props.open != null ? props.open : false}

                  this.changeValue = this.changeValue.bind(this);
                  this.saveData = this.saveData.bind(this);
                  console.log("book form construct ");
                  console.log( this.state.lists );
                  //this.callButton = this.callButton.bind(this);
      //  this.inputName = React.createRef();
     }
     componentDidMount(){
     }

     changeValue(event, propertie){
                let novo = event.target.value;
                let item = this.state.item;

                item[propertie] = novo;

                console.log("editando ");
                console.log(item);

                this.setState({  item: item});
     }


     serialize( obj ) {
           return Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
     }

     get_validate_input(){ //call this function before save
           
           let self = this;

           var p1 = new Promise(

               function(resolve, reject) { 
                      var item = self.state.item;
                      var valid = true;

                      console.log("tentando validar");
                      console.log( item );

                      if (valid && (item.title == null || item.title == "" ) ){
                            self.setState({  validation_msg: "Title is required", valid : false }, function () {

                                             resolve( false ); 

                            });
                            valid = false;
                      }
                      if (valid && (  item.isbn == null || item.isbn == "" ) ){
                            self.setState({  validation_msg: "ISBN is required", valid : false }, function () {

                                             resolve( false ); 

                            });
                            valid = false;
                      }
                      if (valid && ( item.author_id == null || item.author_id == "" ) ){
                            self.setState({  validation_msg: "Author is required", valid : false }, function () {

                                             resolve( false ); 

                            });
                            valid = false;
                      }
                 
                      if ( valid ){
                                self.setState({  validation_msg: "", valid : valid }, function () {

                                             resolve( valid ); 

                                });
                      }
                     }
                 );

           return p1;

     }
     saveData(event, type){

       //console.log(event);
       //console.log(type); return false;
               let url = Contants.URL_API+"/book"; 
               let self = this;
               var method_save = "insert";
      	       var item = self.state.item;


               if ( type == "cancel"){
                    self.props.FormClose(event, "cancel");

               }

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
                                                                           self.props.FormAction("delete", response.data);
                                                                        	 //Tenho que disparar um observer a partir daqui..
                                                                        	
                                                                        }

                                                               }
                      							);
              }

              if ( type == "save"){

      	       var method = "post"; //new
               //item.name =  this.inputName.current.value;

               console.log("call url: " + url );
               console.log( this.serialize(item) );  // return;

               if (item.id != null && item.id != undefined &&  item.id != "" ){
                     method = "put";
                     url += "/" +item.id; method_save = "update";
               }

               this.get_validate_input().then(

                        function (valid ){

 
                            if ( valid ){
                             axios({
                                      method: method,
                                      url: url,
                                      data: self.serialize(item),
                                       headers: {
                                          'Content-Type': 'application/x-www-form-urlencoded'
                                        }
                                    }).then(  
                                                              
                                                               function(response){
                                                                        if ( response.data.code == 1){
                                                                           console.log(response.data );
                                                                           self.props.FormAction(method_save, response.data);
                                                                           
                                                                        }

                                                               }
                                    );
                            }
   
                        });



					   
                  }
					          

      }

	  componentWillReceiveProps(props) {
	            
	          
	            if ( props.title != null ){

                   
	            	       this.setState({ title: props.title });  //item: 

	            	       //this.inputName.current.value = this.state.item.name;
	            	       console.log("item recebido no form book");
	            	       console.log(props.item);
	            }


              if ( props.item != null ){

                   
                       this.setState({ item: props.item });  //item: props.item

              }


              if ( props.lists != null ){

                       this.setState({ lists: props.lists });  
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
          cardCategoryWhite: {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
          },
          cardTitleWhite: {
            color: "#FFFFFF",
            marginTop: "0px",
            minHeight: "auto",
            fontWeight: "300",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            marginBottom: "3px",
            textDecoration: "none"
          },
          hide: {
              display: "none"
          },
          formControl: {
              margin: theme.spacing.unit,
              minWidth: 120,
              margin: "27px 0 0 0"
           },
          
    		});

      let marginStyle = {
             margin: "27px 0 0 0"
      }
      let divButtonStyle = {
             textAlign: "right", width: "99%"
      }
      let selectStyle = {
        minWidth: "180px"
      }
      let dateStyle = {
        minWidth: "200px"
      }

           let str_list_id_author = []; let self = this;

              if ( this.state.lists != null && this.state.lists.id_author != null ){

                  this.state.lists.id_author.map(function(item, index){
                       if ( self.state.id_author != undefined && self.state.id_author != null && self.state.id_author == item.id ){

                            str_list_id_author.push(<option selected key={item.id} value={item.id}> {item.name} </option>);
                       }else{

                            str_list_id_author.push(<option key={item.id} value={item.id}> {item.name} </option>);
                       }
                  });
              }
              //{str_list_id_author}  */

              let style_div = {};

              if (! this.props.open ){
                     style_div = {display: "none"} //Não exibo o formulário de edição.
              }


		    return (


           <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader color="info" >
                        <h4 className="cardTitleWhite">{this.state.title}</h4>
                      </CardHeader>
                      <CardBody>
                      <div className="msgObrigatorio" >{this.state.validation_msg}</div>
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6} style={marginStyle}  >
                                 
                                         <TextField
                                              label="Title"
                                              id="margin-none" fullWidth={true}
                                                                       value ={this.state.item.title != null ? this.state.item.title : ""}
                                               onChange={(e) => this.changeValue(e, "title")}
                                            />
                                  

                              </GridItem>
                               <GridItem xs={12} sm={12} md={6} style={marginStyle} >


                                             <TextField
                                                      id="date"
                                                      label="Release Data"
                                                      type="datetime-local"
                                                      value ={this.state.item.date_release != null ? this.state.item.date_release.replace(" ","T") : ""}
                                                        onChange={(e) => this.changeValue(e, "date_release")}
                                                      InputLabelProps={{
                                                        shrink: true,
                                                      }}
                                                      onChange={(e) => this.changeValue(e, "date_release")}
                                                      style={dateStyle}
                                                    />
                                            </GridItem>
                              </GridContainer>

                              <GridContainer>
                                        <GridItem xs={12} sm={12} md={4} style={marginStyle}>
                                               <FormControl className={styles.formControl}>
                                                       <InputLabel htmlFor="sel_author_id">Author</InputLabel>
                                                     {/*value={this.state.id_author != undefined && this.state.id_author != null   ? this.state.id_author : "" } */}
                                                       <Select
                                                                        native
                                                                        style={selectStyle}
                                                                        fullWidth={true}
                                                                        onChange={(e) => this.changeValue(e, "author_id")}
                                                                        value={this.state.item.author_id != null ? this.state.item.author_id : ""}
                                                                        inputProps={{
                                                                          name: 'author_id',
                                                                          id: 'sel_author_id',
                                                                        }}
                                                                      >
                                                                        <option value="" disabled>  </option>
                                                                        {str_list_id_author}
                                                         </Select>

                                                   </FormControl>
                                        </GridItem>
                                         <GridItem xs={6} sm={6} md={4} style={marginStyle}>

                                                   <TextField
                                                        label="ISBN"
                                                        id="margin-none" fullWidth={true}
                                                                                 value ={this.state.item.isbn != null ? this.state.item.isbn : ""}
                                                         onChange={(e) => this.changeValue(e, "isbn")}
                                                      />

                                                      
                                          </GridItem>

                                         <GridItem xs={6} sm={6} md={4} style={marginStyle}>

                                                  <TextField
                                                          id="stock"
                                                          label="Stock"
                                                          value={this.state.item.stock != null ?  this.state.item.stock : 0 }
                                                           onChange={(e) => this.changeValue(e, "stock")}
                                                          type="number"
                                                     
                                                         
                                                          
                                                        /> {/*  InputLabelProps={{
                                                            shrink: true,
                                                          }     }  margin="normal" variant="outlined" */ }
 
                                                      
                                          </GridItem>
                              </GridContainer>


                              <GridContainer>
                                        <GridItem xs={12} sm={12} md={4} style={marginStyle}>

                                                       <TextField
                                                        label="Price"
                                                        id="margin-none" fullWidth={false}
                                                                                 value ={this.state.item.price != null ? this.state.item.price : 0}
                                                         onChange={(e) => this.changeValue(e, "price")}
                                                      />


                                        </GridItem>
                                         <GridItem xs={6} sm={6} md={8} style={marginStyle}>

                                                   <TextField
                                                        label="Editor"
                                                        id="margin-none" fullWidth={true}
                                                                                 value ={this.state.item.editor != null ? this.state.item.editor : ""}
                                                         onChange={(e) => this.changeValue(e, "editor")}
                                                      />

                                                      
                                          </GridItem>

                              </GridContainer>


                              <GridContainer>
                                        <GridItem xs={12} sm={12} md={12} style={marginStyle}>

                                                     <TextField
                                                              id="outlined-multiline-static"
                                                              label="Description"
                                                              multiline
                                                              rows="8"
                                                                fullWidth={true}
                                                              
                                                              value ={this.state.item.description != null ? this.state.item.description : ""}
                                                              onChange={(e) => this.changeValue(e, "description")}
                                                            />
                                                     {/*  variant="outlined"  margin="normal"
                                                              */ }
                                                      
                                          </GridItem>

                              </GridContainer>

                          </CardBody>


                          <CardFooter>
                          <div style={divButtonStyle}>
                                           <Button variant="contained" color="primary"  onClick={(e) => this.saveData(e, "save")} > SAVE </Button>

                                           <span> </span>
                                             {this.state.item.id > 0  ? (
                                                   <Button variant="contained" color="secondary"  onClick={(e) => this.saveData(e, "delete")}  >
                                                            DELETE
                                                          </Button>
                                                ) : (
                                                              <span></span>
                                                )}

                                                  <span> </span>
                                                 <Button variant="contained" onClick={(e) => this.saveData(e, "cancel")} >
                                                            CLOSE
                                                 </Button>
                                     </div>
                          </CardFooter>

                          </Card>
                          </GridItem>
                </GridContainer>
                </div>


		    );
	  }

}
export default BookForm;
