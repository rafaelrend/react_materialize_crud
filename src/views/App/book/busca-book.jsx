import React from 'react';
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";
import IconSearch  from "@material-ui/icons/Search";
import Button from '@material-ui/core/Button';
import IconAdd  from "@material-ui/icons/Add";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


class BuscaBook extends React.Component {
  constructor(props){
    super(props);
           this.changeSearch = this.changeSearch.bind(this);
           this.callSearch = this.callSearch.bind(this);
  
           this.handleKeyPress = this.handleKeyPress.bind(this);
           this.callButton = this.callButton.bind(this);
           this.state = {item: { filtro: "", author_id: ""}, 
                 lists: props.lists == null ? [] : props.lists  };

  }
  callButton(event, type){
      if ( this.props.callButton != null ){
        this.props.callButton(event, type);
      }
  }

  componentWillReceiveProps(props) {
              
              if ( props.lists != null ){

                       this.setState({ lists: props.lists });  
              }
           

  }
   

  changeSearch(event, nome){


           let item = this.state.item;

           item[nome] = event.target.value; 
           let self = this;
           console.log( item );


           
            this.setState(item: item , function () {

                  if ( self.props.ChangeSearchFilter != null ){
                                   self.props.ChangeSearchFilter( event , nome, item);
                  }

            });


  }

  callSearch(event){

          if ( this.props.callSearch != null ){
                 this.props.callSearch( event, this.state.item );
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

              let str_list_id_author = [];

              if ( this.state.lists != null && this.state.lists.id_author != null ){

                  str_list_id_author = this.state.lists.id_author.map(function(item, index){
                    return (<option key={item.id} value={item.id}>{item.name}</option>)
                  });
              }
                return (    

                              <div className="row" style={style}>




                                               <div className="col s5">
                                                      


                                                  <TextField
                                                      label="Search Book"
                                                      id="margin-none" fullWidth={true}
                                                                               
                                                       onChange={(e) => this.changeSearch(e, "filtro")}
                                                       onKeyPress={(e) => this.handleKeyPress(e, "filtro")}
                                                      value={this.state.item.filtro}
                                                     
                                                    />

                                                       {/*onChange={(e) => this.changeSearch(e, "text")}
                                                       onKeyPress={(e) => this.handleKeyPress(e, "text")}
                                                      value={this.state.item.text}*/}
                                                              

                                               </div>


                                               <div className="col s4">

                                               <FormControl>
                                                   <InputLabel htmlFor="search_author_id">Author</InputLabel>
                                                            <Select
                                                              native
                                                              
                                                              onChange={(e) => this.changeSearch(e, "author_id")}
                                                              inputProps={{
                                                                name: 'search_author_id',
                                                                id: 'search_author_id',
                                                              }}
                                                            >
                                                              <option value="" ></option>
                                                              {str_list_id_author}
                                                            </Select>
                                                    </FormControl>        
                                                          {/*value={this.state.item.id_author}*/}
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

export default BuscaBook;


