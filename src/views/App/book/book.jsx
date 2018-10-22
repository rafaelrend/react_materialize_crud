import React from 'react';
import Constants from '../Constants';
import axios from 'axios';
import Grid from '../../../components/Rend/grid/grid';
//import SimpleModal from '../../../components/Modal/SimpleModal';
import BuscaBook from './busca-book';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
//import FormAuthorWrapped from "./form-author.jsx";
import Slide from '@material-ui/core/Slide';
import BookModel from './BookModel';
import BookForm from './book-form';

import SnackMessage from "../../../components/Rend/snack/SnackMessage";

class Book extends React.Component {

  getFormStart(){
     return (  {
                 open: false,
                 item: {...BookModel},
                 title: "New Book"
           } );
  }



  constructor(props){
     super(props);
           //this.observer  = ReactObserver();

          let columns = [
                    {id: "id","text":"ID", "style" : {width: "100px"}},
                    {id: "title","text":"Title", "style": {} },
                    {id: "isbn","text":"ISBN", "style": {} },
                    {id: "author_name","text":"Author", "style": {} },
                    {id: "price","text":"Price", "style": {} },
                    {id: "stock","text":"Stock", "style": {} },
           ];


           let buttons = [
                    {id: "bt-editar","icon":"edit", "style": {width: '40px'} }
           ];


           this.ClickButtonGrid = this.ClickButtonGrid.bind(this);

           this.callSearch = this.callSearch.bind(this);

           this.FormAction = this.FormAction.bind(this);
           this.FormClose = this.FormClose.bind(this);

           this.handleCloseSnack = this.handleCloseSnack.bind(this);

           var form_start = this.getFormStart();

           this.state = {data: [], filter: null, columns: columns, buttons: buttons, total_itens: 0, pagesize: Constants.PAGESIZE, grid_page: 1,
                           grid_order: "id", grid_order_type: "asc", form: form_start, 
                           snack_message: "Book Saved", snack_variant: "success", snack_open: false , lists: {id_author: []}
                         }

           this.loadData(); //Vou chamar a primeira vez.
           console.log("constructor book "); console.log( form_start.item.title );
  }
  handleOpen(obj){
         // this.setState({ form_show: true });
  }
  handleCloseSnack(ev, obj){

          this.setState({ snack_open: false });
  }
  FormClose(event, tipo){
                               let form = this.state.form;
                               form.open = false;

                                this.setState({
                                        form: form
                                }, function() {

                                });
  }

  FormAction(tipo, obj){

       console.log(tipo);
           if ( tipo != ""){

                let msg_tmp = "Book created";

                if ( tipo == "update")
                    msg_tmp = "Book has been updated";

                if ( tipo == "delete")
                    msg_tmp = "Book deleted";


                let form = this.state.form;  form.open = false;

                this.setState({ snack_open: true, snack_message: "Success - " + msg_tmp, form: form });
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
                                    
                                      });

                     }

                     if ( id_button == "pagging"){
                                      this.setState({
                                        grid_page: item.page
                                      }, function() {
                                                
                                             this.loadData();

                                      });


                     }

                     if ( id_button == "bt-editar"){ //Botão de edição no grid..
                               let form = this.state.form;
                               form.open = true;
                               form.item = {... item};
                               form.title = "Edit Book";
                            
                                this.setState({
                                        form: form
                                      }, function() {

                                      });

                     }

                      if ( id_button == "new"){ //NOVO!
                               let form = this.state.form;
                               form.open = true;
                               form.item = {...BookModel};
                               form.title = "New Book";
                                this.setState({
                                        form: form
                                      }, function() {

                                      });

                     }



  }
  ChangeSearchFilter(event, name, filter){


                                     this.setState({
                                                  filter: filter
                                      }, function() {
                                                

                                      });
  }

  callSearch(event, filter ){
                                 this.setState({
                                                  filter: filter,
                                                   grid_page: 1
                                      }, function() {
                                                
                                                  this.loadData();

                                      });
 
  }


  getConfigGrid(){
    let data = {
          pagesize: this.state.pagesize,
          page: this.state.grid_page,
          order: this.state.grid_order,
          order_type: this.state.grid_order_type
        }
        if ( this.state.filter != null ){

               return {... data, ...this.state.filter};
        }

        return data;

  }
  loadData(){

         

            let self = this;
            let url = Constants.URL_API;

            let data = this.getConfigGrid();

           console.log("método de load data: ");
            console.log(data); console.log( this.state.filter );
        
          let url_run =  url + '/book/grid' + this.serialize(data);
          console.log("carregando url: " + url_run);


          axios.get(url_run).then(


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

            let url = Constants.URL_API;

            let lists = {id_author: []}
            let self = this;
            //lists

             axios.get(url + '/author' ).then(

              function(response){

                    lists.id_author = response.data;
                         
                      self.setState({
                        lists: lists

                      }, function() { 

                      });
                      console.log( lists );
             // self.forceUpdate();
            });
    
    
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

             let style_search = {};

             if ( this.state.form.open ){
              style_search = {display : "none"}
             }


             console.log("show env");
           console.log( process.env );
           console.log( Constants );
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

                                <div id="div_busca" style={style_search} >

                                           <BuscaBook changeTxt={this.ChangeSearchFilter}
                                             callSearch={this.callSearch} lists={this.state.lists} callButton={this.ClickButtonGrid}></BuscaBook>
                                       
                                          <div className="row" className="col-xs-12" >
                                              <Grid pagesize={pagesize} 
                                                    columns={columns} buttons={buttons}
                                                    itens={itens}  ClickButton={this.ClickButtonGrid}
                                                    total_itens={total_itens} order={order} order_type={order_type} 
                                                    page={page}></Grid>
                                          
                                           </div>
                                 </div>
                                  
                                  {this.state.form.open ? ( 
                                              <BookForm open={this.state.form.open}
                                              title={this.state.form.title} item={this.state.form.item}
                                              FormAction={this.FormAction} FormClose={this.FormClose} lists={this.state.lists}>
                                  </BookForm>
                                    ): (
                                                              <span></span>
                                    )}

                             
                                  
                               </div>
                           );
  }


}

export default Book;
