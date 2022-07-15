import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
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
        report: {
          description: null,
          cases: {},
          lastlog: {}
        },
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
        }, ()=> {
          console.log(this.state);
          Object.keys(this.state.report.cases).map((c)=> {
            console.log(c);
          });
        });
      }, 
      () => {
        Utility.blockUI(false); 
        Utility.showModal({
            title: "Warning",
            body: "It's not possible to show the report because a flow test has not been yet executed. \
                  Please first select a test case from the list and send the authentication request.",
            isOpen: true
        });
        this.props.navigate("/oidc/check");
      }, 
      (error) => { 
        Utility.blockUI(false); 
        this.setState({
            report: {},
            detailview: false
        });
        Utility.showModal({
            title: "Error",
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

export default withRouter(OIDCReport);
