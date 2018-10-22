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
         itens: [], total_itens: total_itens, pagesize: pagesize, table_class: table_class, page: page};


      console.log("constructor grid - props ");
      console.log(props);

  }
  Ordena(event, column_id, order_type){


   //this.setState({CurrentColumnOrder: column_id.toString(), CurrentColumnOrderType: order_type.toString() });

    if (this.props.ClickButton != null ){
           this.props.ClickButton(event, "order" , {order_type: order_type, column_id: column_id });
    }
    //console.log("ordenacao"); console.log(event); console.log(column_id); console.log(order_type);

  }
  ClickButton(event, id_button , item){

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
         


  }

  componentDidMount(){
      console.log("did mount grid ");
    /*

    let columns = [
              {id: "id","text":"ID", "style" : {width: "100px"}},
              {id: "name","text":"Nome", "style": {} },
     ];


     let buttons = [
              {id: "bt-editar","icon":"edit", "style": {width: '40px'} }
     ];

     let itens = [
               {id: 1, name: "Fulano de Tal"},
               {id: 2, name: "Robalo"}
     ]
                //<i class="material-icons">edit</i>
     this.setState({columns: columns, buttons: buttons, itens: itens});  */
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
