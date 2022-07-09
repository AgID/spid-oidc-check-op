import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'font-awesome/css/font-awesome.min.css';

import '../scss/style.scss'
import '../scss/core/_dropdown-menu-right.scss'

// Containers
import Main from './containers/Main'
import Empty from './containers/Empty'

import Login from './views/Login/';
import Worksave from './views/Worksave/';
import MetadataDownload from './views/MetadataDownload/';
import MetadataCheck from './views/MetadataCheck/';
import OIDCCheck from './views/OIDCCheck/';

const root = createRoot(document.getElementById('root'));

root.render(
  <HashRouter> 
    <Routes>
      { /*
      <Route path="/metadata-sp-check-xsd" element={<Main/>}/>
      <Route path="/metadata-sp-check-strict" element={<Main/>}/>
      <Route path="/metadata-sp-check-certs" element={<Main/>}/>
      <Route path="/metadata-sp-check-extra" element={<Main/>}/>
      <Route path="/request" element={<Main/>}/>
      <Route path="/request-check-strict" element={<Main/>}/>
      <Route path="/request-check-certs" element={<Main/>}/>
      <Route path="/request-check-extra" element={<Main/>}/>
      <Route path="/response/:suiteid/:caseid" element={<Main/>}/>
      <Route path="/response" element={<Main/>}/>
      <Route path="/response-report" element={<Main/>}/>
      */ }
      <Route path="/" element={<Empty/>}>
        <Route path="/" element={<Login/>}/>
        <Route path="/worksave" element={<Worksave/>}/>
      </Route>
      <Route path="/metadata" element={<Main/>}>
        <Route path="/metadata/download" element={<MetadataDownload/>}/>
        <Route path="/metadata/check" element={<MetadataCheck testcase="test-case-metadata-0"/>}/>
      </Route>
      <Route path="/oidc" element={<Main/>}>
        <Route path="/oidc/check" element={<OIDCCheck />}/>
        {/*<Route path="/oidc/report" element={<OIDCReport />}/>*/}
      </Route>
    </Routes>
  </HashRouter>
); 
