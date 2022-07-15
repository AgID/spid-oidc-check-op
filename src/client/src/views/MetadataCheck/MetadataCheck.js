import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
import view from './view.js';
import Utility from '../../utility';
import Services from '../../services';
import ReduxStore from '../../redux/store';
import Actions from '../../redux/main/actions';
import moment from 'moment';


class MetadataCheck extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
        testcase: props.testcase,
        description: null,
        referements: null,
        report: null,
        datetime: null,
        detailview: false
    };  
  }	

  componentDidMount() { 
    this.getLastCheck();
  }
  
  getLastCheck() {
    let service = Services.getMainService(); 
    Utility.blockUI(true);
    service.getLastCheck(
      this.state.testcase,
      (check) => { 
        Utility.blockUI(false); 
        this.setState({
          testcase: check.testcase,
          description: check.description,
          referements: check.referements,
          report: check.report,
          datetime: moment(check.datetime).format('DD/MM/YYYY HH:mm:ss')
        });
      }, 
      () => {
        this.checkMetadata();
      },
      (error) => { 
        Utility.blockUI(false); 
        this.setState({
          description: null,
          referements: null,
          report: null,
          datetime: null
        });
        Utility.showModal({
            title: "Error",
            body: error,
            isOpen: true
        });
      }
    );
  }


  checkMetadata() {
    let service = Services.getMainService();
    let store = ReduxStore.getMain();

    Utility.blockUI(true);
    service.checkMetadata(
      this.state.testcase,
      (check) => { 
        Utility.blockUI(false); 
        this.setState({
          testcase: check.testcase,
          description: check.description,
          referements: check.referements,
          report: check.report,
          datetime: moment(check.datetime).format('DD/MM/YYYY HH:mm:ss')
        });
      }, 
      (error) => { 
        Utility.blockUI(false);
        this.setState({
          description: null,
          referements: null,
          report: null,
          datetime: null
        });
        Utility.showModal({
            title: "Error",
            body: error,
            isOpen: true
        });
        this.props.navigate('/metadata/download');
      }
    );
  }

  
  setDetailView(detailed) {
      this.setState({
          detailview: detailed
      });
  }

  print() {
      Utility.print("metadata-" + this.state.testcase);
  }
  

  render() {    
	  return view(this);
  }
}

export default withRouter(MetadataCheck);
