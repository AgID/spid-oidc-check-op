import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import BlockUi from 'react-block-ui';
import AceEditor from '../../components/AceEditor/';
import moment from 'moment';
import "./style.css";

function view(me) { 
    return (
        <div id="OIDCReport" className="animated fadeIn">
            <p className="title h3">Authorization Code Flow Log</p>
            { me.state.report.lastlog.details && (
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row testset"> 
                                <div className="col-sm-12">
                                    <p className="h4 mb-4">Last execution log</p>
                                    <AceEditor code={me.state.report.lastlog.details} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">   
                    <div className="tools">
                        <div className="col-sm-12">
                            {/*
                            <label className="switch switch-success me-3">
                                <input type="checkbox" className="switch-input" 
                                    checked={me.state.detailview}
                                    onChange={(e)=>{me.setDetailView(e.target.checked)}}>
                                </input>
                                <span className="switch-slider"></span>
                            </label>
                            <span className="align-super">Visualizzazione dettaglio</span>
                            <hr/>
                            */}
                            <button type="button" className="btn btn-success"
                                onClick={()=>{me.print()}}>
                                <i className="fa fa-print" aria-hidden="true"></i> Stampa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default view;                        
