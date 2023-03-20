# spid-oidc-check-op
SPID OIDC Conformance Test Tool for OP

<img src="doc/spid-oidc-check-op.gif" />

## Requirements
- Node.js v.14

## Setup
clone the repository
```
git clone https://github.com/AgID/spid-oidc-check-op.git
cd spid-oidc-check-op/src
```
copy and edit configurations
```
cp -R config_sample config
```
create Relaying Party signing and encryption certificates
```
cd config && sh make_cert.sh && cd .. 
```
create directory for database
```
mkdir data
```
configure same base path on
 - src/client/src/config.json
 - src/config/server.json
 - src/config/rp.json
 - src/config/aa.json

compile and build the client
```
cd client && npm i && npm run build && cd ..
```
compile the server
```
cd server && npm i && cd ..
```

## Run
```
node server/spid-oidc-check-op
```

## Use Docker
clone the repository
```
git clone https://github.com/AgID/spid-oidc-check-op.git
cd spid-oidc-check-op
```
build
```
docker build -t spid-oidc-check-op .
```
run
```
docker run -t -i -p 8084:8084 spid-oidc-check-op
```
