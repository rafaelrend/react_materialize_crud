import React from 'react';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import IconSearch  from "@material-ui/icons/Search";
import Button from '@material-ui/core/Button';
import IconAdd  from "@material-ui/icons/Add";
import TextField from '@material-ui/core/TextField';


class BuscaAuthor extends React.Component {
  constructor(props){
    super(props);
           this.changeTxt = this.changeTxt.bind(this);
           this.callSearch = this.callSearch.bind(this);
  
           this.handleKeyPress = this.handleKeyPress.bind(this);
           this.callButton = this.callButton.bind(this);
           this.state = {text: ""};

  }
  callButton(event, type){
      if ( this.props.callButton != null ){
        this.props.callButton(event, type);
      }
  }
  changeTxt(event){

           if ( this.props.changeTxt != null ){
                 this.props.changeTxt( event );
            }
  }

  callSearch(event){

          if ( this.props.callSearch != null ){
                 this.props.callSearch( event );
           }
  }
  handleKeyPress(e){
           if (e.key === 'Enter') {
            this.callSearch(e);
           }
  }
 
  render(){
              let style= {  }  
              let style_hidden = { display: "none"}     
              let style_busca = { width: "90%"}   
                
                       //{total_pages} - {int_total_pages}   justIcon round 
                return (    

                              <div className="row" style={style}>




                                               <div className="col s9">
                                                      <input type="text" placeholder="Pesquisar por nome"
                                                                     maxLength="300"
                                                                   className="form-control"  
                                                                   onChange={this.changeTxt}  onKeyPress={this.handleKeyPress}
                                                                   style={style_hidden}
                                                      ></input>



                            <TextField
                                label="Search Author"
                                id="margin-none" fullWidth={true}
                                                         
                                 onChange={(e) => this.changeTxt(e, "name")}
                                 onKeyPress={(e) => this.handleKeyPress(e, "name")}
                                
                               
                              />

                                                      
                                                              

                                               </div>
                                                  <div className="col s3">
                                            
                                                     <Button color="primary" aria-label="edit" onClick={this.callSearch}>
                                                                  <IconSearch />
                                                                </Button>

                                                                 <Button color="primary" variant="outlined" 
                                                                   aria-label="new" onClick={(e) => this.callButton(e, "new")}>
                                                                  <IconAdd /> NEW
                                                                </Button>
                                               </div>
                                               <div className="col s2" style={style_hidden}>
                                                 <button className="waves-effect waves-light btn blue" type="button"  onClick={this.callSearch} > 
                                                          <i className="material-icons">search</i>Filtrar</button>

                                               </div>
                                </div>


                           
                );
  }
}

export default BuscaAuthor;


