import React from 'react';

class Paginator extends React.Component {
  constructor(props){
    super(props);
    this.ChangePagina = this.ChangePagina.bind(this);

    let page = this.props.page != null ? this.props.page : 1;

    this.state = {page: page, total_itens: this.props.total_itens, pagesize: this.props.pagesize};

  }
  ChangePagina(event, page ){

  	//this.setState({page: page});

    if ( this.props.ClickButton != null ){

             this.props.ClickButton(event, "pagging" , {page: page});
    }
    //this.props.ChangePagina(event, page);
  }


  componentWillReceiveProps(props) {
                if ( props.page != null ){

                        this.setState({page: props.page, total_itens: props.total_itens });
                }
  }
  
  render(){
                    var total_pages = parseFloat(this.state.total_itens) /  parseFloat(this.state.pagesize);
                    var int_total_pages = parseInt(this.state.total_itens) /  parseInt(this.state.pagesize);

                    int_total_pages = parseInt(int_total_pages);

                    if ( total_pages > int_total_pages ){
                    	int_total_pages++;
                    }

                    var paginas = [];

                    for ( var i = 1; i <= int_total_pages; i++){
                    	paginas[paginas.length] = i;
                    }

                    var self = this;
                    var show_paginas = paginas.map(function(tmp_pag, index){

                    	let key = "lipag_"+index.toString();

                             return(
                                    <li key={key} className={self.state.page == tmp_pag ?"active blue":"waves-effect"}>
                                            <a href="#!" onClick={self.ChangePagina.bind(null, self, tmp_pag)}>{tmp_pag}</a></li>
                             	)
                    });

                    let pagina_anterior = parseInt(self.state.page) -1;
                    let proxima_pagina = parseInt(self.state.page) + 1;
                    let style_anterior = {};
                    let style_proximo = {};

                    if ( pagina_anterior <= 0  ){
                        style_anterior = {display: "none"};
                    }
                    if ( parseInt(proxima_pagina) > parseInt(int_total_pages) ){
                        style_proximo = {display: "none"};
                    }
    
           //{total_pages} - {int_total_pages}
    return (    
              <ul className="pagination">
						    <li className="waves-effect" style={style_anterior} ><a
                 onClick={self.ChangePagina.bind(null, self, pagina_anterior)}
                 href="#!"><i className="material-icons">chevron_left</i></a></li>
						    {show_paginas}
						    <li className="waves-effect" style={style_proximo} ><a href="#!"
                    onClick={self.ChangePagina.bind(null, self, proxima_pagina)}
                ><i className="material-icons">chevron_right</i></a>  </li>
						  </ul>


               
    );
  }
}

export default Paginator;


