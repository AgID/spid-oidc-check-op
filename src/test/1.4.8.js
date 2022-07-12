const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_4_8 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.4.8";
        this.description = "If present, the value of claims_supported MUST be all the SPID attributes (see table of SPID attributes for OIDC)";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.claims_supported==null) {
            this.notes = "the claim claims_supported is not present, it's recommended but not mandatory";
            return true;
        } 

        if(!(this.metadata.configuration.claims_supported.length==2
            && this.metadata.configuration.claims_supported.includes('https://attributes.eid.gov.it/spid_code')
            && this.metadata.configuration.claims_supported.includes('given_name')
            && this.metadata.configuration.claims_supported.includes('family_name')
            && this.metadata.configuration.claims_supported.includes('place_of_birth')
            && this.metadata.configuration.claims_supported.includes('birthdate')
            && this.metadata.configuration.claims_supported.includes('gender')
            && this.metadata.configuration.claims_supported.includes('https://attributes.eid.gov.it/company_name')
            && this.metadata.configuration.claims_supported.includes('https://attributes.eid.gov.it/registeredoffice')
            && this.metadata.configuration.claims_supported.includes('https://attributes.eid.gov.it/fiscal_number')
            && this.metadata.configuration.claims_supported.includes('https://attributes.eid.gov.it/company_fiscal_number')
            && this.metadata.configuration.claims_supported.includes('https://attributes.eid.gov.it/vat_number')
            && this.metadata.configuration.claims_supported.includes('document_details')
            && this.metadata.configuration.claims_supported.includes('phone_number')
            && this.metadata.configuration.claims_supported.includes('email')
            && this.metadata.configuration.claims_supported.includes('https://attributes.eid.gov.it/e_delivery_service')
            && this.metadata.configuration.claims_supported.includes('https://attributes.eid.gov.it/eid_exp_date')
            && this.metadata.configuration.claims_supported.includes('address')
        )) {
            this.notes = this.metadata.configuration.claims_supported;
            throw("the claims_supported is not all the SPID attributes");
        }

        this.notes = this.metadata.configuration.claims_supported;
        return true;

    }

}

module.exports = Test_1_4_8