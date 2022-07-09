import React from 'react';
import BlockUi from 'react-block-ui';
import AceEditor from '../../components/AceEditor/';
import Select from 'react-select'
import './switches.css';
import './style.css';

function view(me) { 
    return (
        <div className="animated fadeIn">
            <p className="title h3">Authorization Code Flow Check</p>
            <div className="row">
                <div className="col-md-8 main">

                    <b>Seleziona il caso di test da verificare e invia la richiesta di autenticazione...</b>

                    <Select
                        name="testcase-selector"
                        options={me.state.cases}
                        value={me.state.selected}
                        onChange={(val)=> {me.selectCase(val)}}
                    />

                </div>
                <div className="col-md-4">
                    <div className="row alert alert-warning">
                        <b>Descrizione</b><br/>
                        <p className="test-description">{me.state.selected.value.description}</p>
                        <div>
                            <button className="btn btn-send btn-success"
                                onClick={()=> {me.sendAuthorizationRequest()}}> 
                                <i className="fa fa-paper-plane-o me-2" aria-hidden="true"></i>
                                Invia Authorization Request
                            </button>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    );
}

export default view;                        
