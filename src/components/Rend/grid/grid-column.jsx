import React from 'react';

class Column extends React.Component {
  constructor(props){
    super(props);
    this.Ordena = this.Ordena.bind(this);
    this.state = {CurrentColumnOrder: props.CurrentColumnOrder, CurrentColumnOrderType: props.CurrentColumnOrderType }

  }
  Ordena(event, column_id, order_type ){
    this.props.Ordena(event, column_id , order_type);
  }


  componentWillReceiveProps(props) {
            this.setState({
                  CurrentColumnOrder: props.CurrentColumnOrder,
                  CurrentColumnOrderType:props.CurrentColumnOrderType}); 
  }
  
  render(){


    let column = this.props.column;
    let order_type = "asc";
    let str_icon_visible = "none";
    let key_icon = column.id + '_icon';
    if ( this.state.CurrentColumnOrder == column.id){
      
      str_icon_visible = "default";

      if ( this.state.CurrentColumnOrderType == "asc"){

               order_type = "desc"; //próximo order type  className="teal-text text-lighten-5"
      }
    }

    return (    
                    <a href="#!"
                       
                     onClick={this.Ordena.bind(null,this, column.id, order_type)}>  {column.text}  
                        
                        <span className={str_icon_visible =="default" ? "":"hidden"}>
                         <i className="material-icons" key={key_icon}>{this.state.CurrentColumnOrderType == "asc" ? "arrow_drop_up" :"arrow_drop_down" }</i>
                           </span>
                    </a>


               
    );
  }
}

export default Column;
