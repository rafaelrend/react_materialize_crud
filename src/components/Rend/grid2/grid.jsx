import React from 'react';
import Column from './grid-column';
import Item from './grid-item';
import Paginator from './grid-paginator';

class Grid extends React.Component {
  constructor(props){
    super(props);
    this.Ordena = this.Ordena.bind(this);
    this.ClickButton = this.ClickButton.bind(this);

    let pagesize = 10;
    let total_itens = 0;
    let table_class = "striped";
    let columns = [];
    let buttons = [];
    let page = 1;

    if (props.total_itens != null ){
         total_itens = props.total_itens;
    }

    if (props.pagesize != null ){
         pagesize = props.pagesize;
    }

    if (props.table_class != null ){
         table_class = props.table_class;
    }


    if (props.columns != null ){
         columns = props.columns;
    }
 
    if (props.buttons != null ){
         buttons = props.buttons;
    }
    if (props.page != null ){
         page = props.page;
    }
   this.state = {CurrentColumnOrder: "id", CurrentColumnOrderType: 'asc', columns: columns, buttons: buttons, 
         itens: [], total_itens: total_itens, pagesize: pagesize, table_class: table_class, 
         page: page, url: '', parameters: null, method: 'post', first_load: false};


      console.log("constructor grid - props ");
      console.log(props);

  }
  Ordena(event, column_id, order_type){

    var data = this.getConfigGrid();
    data.order = column_id;
    data.order_type = order_type;

    if (this.props.ClickButton != null ){
           this.props.ClickButton(event, "order" , {order_type: order_type, column_id: column_id });
    }

    this.loadData(data);

  }
  ClickButton(event, id_button , item){

    if ( id_button == "pagging"){

            var data = this.getConfigGrid();
                data.page = item.page;

                this.loadData(data);
    }
    if (this.props.ClickButton != null ){
           this.props.ClickButton(event, id_button , item);
    }

  }

  componentWillReceiveProps(props) {
          /*
          const { refresh, id } = this.props;
          if (props.refresh !== refresh) {
            this.fetchShoes(id)
              .then(this.refreshShoeList)
          }
          */

       // console.log("will receive props ");
         
         const { refresh, id } = this.props;

          let itens = [];
          if (props.itens != null ){
            //   this.setState({itens: props.itens});
          }

          if (props.order != null && props.page != null &&  props.itens != null  ){
                this.setState({
                  itens: props.itens,
                  CurrentColumnOrder:props.order, CurrentColumnOrderType:props.order_type , page:props.page , total_itens: props.total_itens }); 
          }

          if ( props.parameters != null ){
                this.setState({
                  parameters: props.parameters } );
          }
          if ( props.url != null ){
                this.setState({
                  url: props.url, method: props.method } );
          }


  }

  componentDidMount(){
      console.log("did mount grid ");
      //&& !this.state.first_load
      if ( this.state.url != "" ){
           this.loadData();
            this.setState({
                  first_load: true
           } );
      }
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
  loadData(data){

         
           console.log("método de load data: ");

            let self = this;
            let url = Contants.URL_API + this.props.url;
            //let data = this.getConfigGrid();

            if ( this.state.parameters != null ){
              data = {...data, ...this.state.parameters};
            }
            let method = this.state.method;

           
            axios({
                        method: method,
                        url: url,
                        data: this.serialize(data)
                      }).then(  
                                                
                                                 function(response){

                                                   self.setState({
                                                     dados: response.data.itens

                                                    }), 

                                                      function() {

                                                          self.setState({
                                                            total_itens: response.data.total,
                                                            pagesize: response.data.pagesize,
                                                            grid_page: response.data.page,
                                                            grid_order: response.data.order,
                                                            grid_order_type: response.data.order_type
                                                          });
                                                        }

                                                 }
                      );
///


  }
  serialize( obj ) {
           return ''+Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
  }




  render(){

     let self = this;
     let colunas = this.state.columns;
     let buttons = this.state.buttons;
     let itens = this.state.itens;
     let total_itens = this.state.total_itens;
     let pagesize = this.state.pagesize;
     //console.log( colunas );
     //console.log(this.state.CurrentColumnOrder );
     //console.log(this.state.CurrentColumnOrderType );

     let colunaItem = colunas.map(function(item,index){
      return (
        <th key={index} style={item.style}>
             <Column column={item} Ordena={self.Ordena}  CurrentColumnOrder={self.state.CurrentColumnOrder} 
                   CurrentColumnOrderType={self.state.CurrentColumnOrderType}/>
        </th>
      );
    });

     let colunaBotaoHeader = buttons.map(function(item,index){
      return (
        <th key={index} style={item.style}>
        </th>
      );
    });

  

    let total_columns = colunas.length + buttons.length;
    let show_itens = itens.map(function(tmp_item, index){

      var key = "tmp_item"+index;

                   return (
                               <Item key={key} columns={colunas} item={tmp_item}
                                ClickButton={self.ClickButton}
                                buttons={buttons} ></Item>
                           
                    );
    });

    let styleFoot = { };
    let stylePaginator = { textAlign: "center"};
    //let teste = "inicial";

    if ( parseInt(total_itens) <= parseInt(pagesize) ){
            stylePaginator = {  display: "none" };  
            //teste = " RRRR "; {total_itens} - {pagesize} {teste}  className="grey darken-4"
    }
 

    return (
     <div>
            <table className={this.state.table_class}>
                    <thead >
                           <tr>
                                {colunaItem}
                                {colunaBotaoHeader}
                           </tr>
                    </thead>
                    <tbody>
                                {show_itens}
                    </tbody>
                    <tfoot>
                         <tr >
                              <td colSpan={total_columns} style={stylePaginator} >
                                      <Paginator pagesize={pagesize} total_itens={total_itens}
                                                 ClickButton={this.ClickButton} page={this.state.page}
                                       ></Paginator>

                                      
                              </td>
                         </tr>
                    </tfoot>
            </table>
     </div>
    );
  }
}

export default Grid;
