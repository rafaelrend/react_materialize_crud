import React from 'react';
import Constants from '../Constants';
import axios from 'axios';
import Grid from '../../../components/Rend/grid/grid';
//import SimpleModal from '../../../components/Modal/SimpleModal';
import BuscaAuthor from './busca-author';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
//import FormAuthorWrapped from "./form-author.jsx";
import Slide from '@material-ui/core/Slide';
import AuthorModel from './AuthorModel';
import AuthorForm from './author-form';
import $ from 'jquery';
import ModalExample from './ModalExample';
import SimpleModalWrapped from './SimpleModalWraped';
//import ReactObserver from 'react-event-observer';
import SnackMessage from "../../../components/Rend/snack/SnackMessage";

class Author extends React.Component {

  getModalStart(){
     return (  {
                 open: false,
                 item: AuthorModel,
                 title: "New Author"
           } );
  }



  constructor(props){
     super(props);
           //this.observer  = ReactObserver();

          let columns = [
                    {id: "id","text":"ID", "style" : {width: "100px"}},
                    {id: "name","text":"Nome", "style": {} },
           ];


           let buttons = [
                    {id: "bt-editar","icon":"edit", "style": {width: '40px'} }
           ];


           this.ClickButtonGrid = this.ClickButtonGrid.bind(this);
           this.ChangeBuscaFiltroText = this.ChangeBuscaFiltroText.bind(this);
           this.callSearch = this.callSearch.bind(this);


   
           this.handleOpen = this.handleOpen.bind(this);
           this.ModalClose = this.ModalClose.bind(this);
           this.ModalAction = this.ModalAction.bind(this);
           this.handleCloseSnack = this.handleCloseSnack.bind(this);

           let modal_start = this.getModalStart();

           this.state = {dados: [], filtro: "", columns: columns, buttons: buttons, total_itens: 0, pagesize: Constants.PAGESIZE, grid_page: 1,
                           grid_order: "id", grid_order_type: "asc", modal: modal_start, 
                            snack_message: "Author Saved", snack_variant: "success", snack_open: false }

           this.loadData(); //Vou chamar a primeira vez.
           console.log("constructor author ");  console.log( modal_start );
  }
  handleOpen(obj){
          this.setState({ form_show: true });
  }
  handleCloseSnack(ev, obj){

          this.setState({ snack_open: false });
  }
  ModalClose(obj){
                               let modal = this.state.modal;
                               modal.open = false;

                                this.setState({
                                        modal: modal
                                }, function() {

                                });
  }
  ModalAction(tipo, obj){

       console.log(tipo);
           if ( tipo != ""){

                let msg_tmp = "Author created";

                if ( tipo == "update")
                    msg_tmp = "Author has been updated";

                if ( tipo == "delete")
                    msg_tmp = "Author deleted";


                this.setState({ snack_open: true, snack_message: "Success - " + msg_tmp });
                this.loadData();  //alert("sucesso!");
           }
  }

  ClickButtonGrid(event, id_button , item){


             this.setState({snack_open: false}); //Forçar que o snack feche.
                     if ( id_button == "order"){
                                    this.setState({
                                        grid_order: item.column_id,
                                        grid_order_type: item.order_type
                                      }, function(){

                                                              // console.log("novo campo de ordenação é: " + this.state.grid_order +" -- " + item.column_id);
                                                               this.loadData();
                                    
                                      }

                                 

                                     );

                            

                     }

                     if ( id_button == "pagging"){
                                      this.setState({
                                        grid_page: item.page
                                      }, function() {
                                                
                                             this.loadData();

                                      });


                     }

                     if ( id_button == "bt-editar"){ //Botão de edição no grid..
                               let modal = this.state.modal;
                               modal.open = true;
                               modal.item = item;
                               modal.title = "Edit Author";
                              console.log( modal );
                                this.setState({
                                        modal: modal
                                      }, function() {

                                      });

                     }

                      if ( id_button == "new"){ //NOVO!
                               let modal = this.state.modal;
                               modal.open = true;
                               modal.item = AuthorModel;
                               modal.title = "New Author";
                                this.setState({
                                        modal: modal
                                      }, function() {

                                      });

                     }


                    console.log("o botão " + id_button +" foi clicado! " + (id_button == "order")) ;
                    console.log(item);

  }
  ChangeBuscaFiltroText(event){
                                     this.setState({
                                                  filtro: event.target.value
                                      }, function() {
                                                
                                            // this.loadData();

                                      });
  }

  callSearch(event){
                                 this.setState({
                                                   grid_page: 1
                                      }, function() {
                                                
                                                  this.loadData();

                                      });
 
  }


  getConfigGrid(){
    let data = {
          pagesize: this.state.pagesize,
          page: this.state.grid_page,
          filtro: this.state.filtro,
          order: this.state.grid_order,
          order_type: this.state.grid_order_type
        }

        return data;
  }
  loadData(){

         
           console.log("método de load data: ");

            let self = this;
            let url = Constants.URL_API;

            let data = this.getConfigGrid();

            console.log(data);

             axios.get(url + '/author/grid' + this.serialize(data)).then(

              function(response){

                      self.setState({
                        dados: response.data.itens

                      }, function() { 

                                            self.setState({
                       
                                                   total_itens: response.data.total,
                                                   pagesize: response.data.pagesize,
                                                   grid_page: response.data.page,
                                                   grid_order: response.data.order,
                                                   grid_order_type: response.data.order_type
                                            });
                      });
             // self.forceUpdate();
            });

  }
  serialize( obj ) {
           return '?'+Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
  }

  //refreshList = res => this.setState({ dados: res.data })

  componentDidMount(){
    
  }

  render(){

             let self = this;
             let columns = this.state.columns;
             let buttons = this.state.buttons;
             let itens = this.state.dados;
             let total_itens = this.state.total_itens;
             let pagesize = this.state.pagesize;
             let order = this.state.grid_order;
             let order_type = this.state.grid_order_type;
             let page = this.state.grid_page;

             //console.log("render author");
             // console.log(itens); //  <FormAuthorWrapped></FormAuthorWrapped>
 
           //   let author_form =  <AuthorForm open={this.state.modal.open} 
             //                         title={this.state.modal.title} item={this.state.item} 
               //                       div_id="div_author_modal"></AuthorForm> ;

               let var_false = false;
                   return (
                               <div > 

                                <SnackMessage variant={this.state.snack_variant}
                                    message={this.state.snack_message}
                                    open={this.state.snack_open}
                                    handleClose={this.handleCloseSnack}
                                  />

                                 <BuscaAuthor changeTxt={this.ChangeBuscaFiltroText}
                                   callSearch={this.callSearch}  callButton={this.ClickButtonGrid}></BuscaAuthor>
                              
                                <div className="row" className="col-xs-12" >
                                    <Grid pagesize={pagesize} 
                                          columns={columns} buttons={buttons}
                                          itens={itens}  ClickButton={this.ClickButtonGrid}
                                          total_itens={total_itens} order={order} order_type={order_type} 
                                          page={page}></Grid>
                                
                                 </div>

                                  <SimpleModalWrapped open={this.state.modal.open}
                                  title={this.state.modal.title} item={this.state.modal.item}
                                  handleClose={this.ModalClose} ModalAction={this.ModalAction}>
                                    
                                  </SimpleModalWrapped>
                             
                                  
                               </div>
                           );
  }


}

export default Author;
