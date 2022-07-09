import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import BlockUi from 'react-block-ui';
import AceEditor from '../../components/AceEditor/';
import "./style.css";

function view(me) { 
    return (
        <div className="animated fadeIn">
            <p className="title h3">Metadata OIDC Provider</p>
            <div className="row">
                <div className="col-sm-12">
                    <b>URL .well-known/openid-configuration</b>
                </div>                                      
                <div className="col-sm-12">  
                    <input type="text"
                        ref="inputMetadata"
                        className="metadata me-3"
                        placeholder={me.state.url} />
                    <button type="button" 
                        className="btn btn-sm btn-primary" 
                        onClick={(e)=>{me.downloadMetadata(me.refs.inputMetadata.value)}}
                    ><i className="fa fa-arrow-down" aria-hidden="true"></i> Download</button>
                    <button type="button" 
                        className="btn btn-sm btn-primary" 
                        onClick={(e)=>{me.downloadMetadata(me.state.url)}}
                    ><i className="fa fa-refresh" aria-hidden="true"></i> Update</button>
                </div>
            </div>
            { me.state.configuration!=null && me.state.configuration!="" && 
                <div className="row mb-5">
                    <div className="col-sm-12 code">
                        <AceEditor code={me.state.configuration} />
                    </div>
                </div>
            }
        </div>
    );
}

export default view;                        
