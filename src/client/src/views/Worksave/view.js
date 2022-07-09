import React from 'react';
import BlockUi from 'react-block-ui';
import './style.css';


function view(me) { 
    return (
		<div id="Worksave" className="container container-login animated fadeIn">
			<img className="img-fluid img-logo" src="img/logo.png" />
			{ me.state.available_stores && me.state.available_stores.length>0 && (
				<div className="justify-content-center row mb-5 section-selector">
					{ me.state.available_stores && me.state.available_stores.length==1 && (
					<div className="title mb-3">È stato selezionato il...</div>
					) }
					{ me.state.available_stores && me.state.available_stores.length>1 && (
					<div className="title mb-3">Seleziona il metadata da utilizzare...</div>
					) }
					{ me.isTypeAvailable('test') && (
						<div className="col col-12 col-md-12 col-lg-4">
							<div className={`btn ${me.state.selected_type=='test'? "btn-selector btn-selector-active" : "btn-selector"}`}
								onClick={()=>{me.setType('test')}}>

								<img src="/img/metadata-test.svg" />
								<span className="d-sm-inline">Metadata di Test</span>
							</div>
						</div>
					)}
					{ me.isTypeAvailable('prod') && (
						<div className="col col-12 col-md-12 col-lg-4">
							<div className={`btn ${me.state.selected_type=='prod'? "btn-selector btn-selector-active" : "btn-selector"}`}
								onClick={()=>{me.setType('prod')}}>

								<img src="/img/metadata-prod.svg" />
								<span className="d-sm-inline">Metadata di Produzione</span>
							</div>
						</div>
					)}
				</div>
			)}
			<div className="justify-content-center row">
				<div className="title mb-3">Seleziona se continuare dal report precedente o iniziare un nuovo report...</div>
				<div className="col col-12 col-md-12 col-lg-4">
					<div className="card worksave-card" 
						onClick={()=>{me.startContinue()}}>

						<div className="card-body">
							<h1><img className="img-fluid worksave-img-continue" src="/img/continue.png" />Continua</h1>
							<p className="worksave-text-muted">Continua report precedente.<br/>Continua a lavorare dallo stato precedente conservando le impostazioni e l'esito dei test già effettuati.</p>
						</div>
					</div>
				</div>
				<div className="col col-12 col-md-12 col-lg-4">
					<div className="card worksave-card"
						onClick={(e)=>{me.startNew()}}>

						<div className="card-body">
							<h1><img className="img-fluid worksave-img-new" src="/img/new.png" />Nuovo</h1>
							<p className="worksave-text-muted">Inizia nuovo report.<br/>Inizia una nuova sessione di validazione annullando tutte le impostazioni e gli eventuali test effettuati in precedenza.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
}

export default view;                        
