import React from 'react';

class Item extends React.Component {
  constructor(props){
    super(props);

    this.ClickButton = this.ClickButton.bind(this);
  }
  ClickButton(event, id_button , item){
        if ( this.props.ClickButton != null ){

             console.log(this.props.ClickButton );

             this.props.ClickButton(event, id_button , item);
        }
  }


  
  render(){

    let columns = this.props.columns;
    let buttons = this.props.buttons;
    let item = this.props.item;
    let self = this;

    let show_item = columns.map(function(column, index){
           
    let tmp_val = item[ column.id];
    let key= "td_" + index;

           return (
                  <td key={key}>
                           {tmp_val}
                  </td>
            )
    });

   let colunaBotaoItem = buttons.map(function(botao,index){
      return (
        <td key={index}>
             <a href="#!" onClick={self.ClickButton.bind(null, self, botao.id, item )} >
                     <i className="material-icons">{botao.icon}</i>
             </a>
        </td>
      );
    });


    return (    
                    <tr>
                          {show_item}
                          {colunaBotaoItem}

                    </tr>


               
    );
  }
}

export default Item;
