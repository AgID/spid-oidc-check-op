import React, { Component } from 'react';
import view from "./view.js";
import Utility from '../../utility';
import Services from '../../services';
import ReduxStore from "../../redux/store";
import Actions from "../../redux/main/actions";
import config_test from '../../../../config/test.json';


class OIDCReport extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
        report: {},
        detailview: false
    };  
  }	

  componentDidMount() { 
      this.getReport();
  }

  getReport() {
    let service = Services.getMainService(); 
    Utility.blockUI(true);
    service.getReport(
      (report) => { 
        Utility.blockUI(false); 
        this.setState({
          report: report
        });
      }, 
      () => {
        Utility.blockUI(false); 
        Utility.showModal({
            title: "Attenzione",
            body: "Non è possibile consultare il report perchè ancora non è stato eseguito alcun caso di test di flusso. \
                    Eseguire prima un caso di test selezionandolo dalla lista e inviando la richiesta di autenticazione.",
            isOpen: true
        });
        window.location = "#/oidc/check";
      }, 
      (error) => { 
        Utility.blockUI(false); 
        this.setState({
            report: {},
            detailview: false
        });
        Utility.showModal({
            title: "Errore",
            body: error,
            isOpen: true
        });
      }
    );
  }

    setDetailView(detailed) {
        this.setState({
            detailview: detailed
        });
    }

    print() {
        Utility.print("response");
    }

  render() {    
	return view(this);
  }
}

export default OIDCReport;
