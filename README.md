# spid-oidc-check-op
SPID OIDC Conformance Test Tool for OP

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
compile and build the client
```
cd client
npm i
npm run build
```
compile the server
```
cd ../server
npm i
```

## Run
```
node server/spid-oidc-check-op
```
