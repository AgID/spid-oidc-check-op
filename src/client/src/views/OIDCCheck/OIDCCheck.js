import React, { Component } from 'react';
import view from "./view.js";
import Utility from '../../utility';
import Services from '../../services';
import config_test from '../../../../config/test.json';
import ReduxStore from "../../redux/store";
import Actions from "../../redux/main/actions";


class OIDCCheck extends Component {

  constructor(props) {
    super(props);

    this.state = {
      testsuite: "oidc-core",
      description: "",
      cases: [],

      selected: {
        label: null,
        value: {
          description: null
        }
      }
    }
  }	

  componentDidMount() { 
    this.getTestCases();
  }

  getTestCases() {
    let service = Services.getMainService(); 
    Utility.blockUI(true);
    service.getTestSuite(
      this.state.testsuite,
      (testsuite) => {
        Utility.blockUI(false);   
        let cases = [];
        for(let t in testsuite.cases) {
          cases.push({
            id: t,
            label: testsuite.cases[t].name,
            value: testsuite.cases[t]
          });
        }
  
        this.setState({
          description: testsuite.description,
          cases: cases,
          selected: cases[0]
        });
      }, 
      (error) => { 
        Utility.blockUI(false);
        this.setState({
          testsuite: "oidc-core",
          description: "",
          cases: []
        });
        Utility.showModal({
            title: "Errore",
            body: error,
            isOpen: true
        });
      }
    );
  }

  selectCase(val) {
    Utility.log("Selected Case", val);
    this.setState({ selected: val });
  }
 
  sendAuthorizationRequest() {    
    let service = Services.getMainService(); 
    Utility.blockUI(true);
    service.getAuthorizationRequest(
      this.state.selected.id,
      (authrequest) => {
        Utility.blockUI(false);   
        this.state.authrequest = authrequest;
        window.open(authrequest.url, '_blank');
      }, 
      (error) => { 
        Utility.blockUI(false);
        Utility.showModal({
            title: "Errore",
            body: error,
            isOpen: true
        });
      }
    );
  }


  render() { 
	  return view(this);
  }
  
}

export default OIDCCheck;
