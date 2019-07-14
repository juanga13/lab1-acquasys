class DataVerifier {
    constructor() {
        this.isError = false;
    };

    // helper method that returns errorMessage if there is 
    // an error, empty string if not.  
    static _verify(type, value) {
        return '';
    };
}

export default DataVerifier;
