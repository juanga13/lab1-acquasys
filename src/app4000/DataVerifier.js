class DataVerifier {
    constructor() {
        this.isError = false;
    };

    // helper method that returns errorMessage if there is 
    // an error, empty string if not.  
    static _verify(type, value) {
        if (type === 'name' && value.length === 0) {
            return 'El nombre no puede estar vacio.';
        } else if (type === 'surname'  && value.length === 0) {
            return 'El apellido no puede estar vacio.';
        } else if (type === 'address' && value.length === 0) {
            return 'La direccion no puede estar vacia.';
        } else if (type === 'avatarUrl') {
            // puede ser vacio
        } else if (type === 'socialPlan' && value.length === 0) {
            return 'La obra social no puede estar vacia.';
        } else if (type === 'fatherName' && value.length === 0) {
            return 'El nombre no puede estar vacio.';
        } else if ('fatherSurname' && value.length === 0) {
            return 'El nombre no puede estar vacio.';
        } else if (type === 'motherName' && value.length === 0) {
            return 'El nombre no puede estar vacio.';
        } else if (type === 'motherSurname' && value.length === 0) {
            return 'El nombre no puede estar vacio.';
        } else if (type === 'password' && value.length === 0) {
            return 'El nombre no puede estar vacio.';
        } else if (type === 'email' && value.length === 0) {
            return 'El nombre no puede estar vacio.';
        } else if (type === 'fatherEmail' && value.length === 0) {
            return 'El nombre no puede estar vacio.';
        } else if (type === 'motherEmail' && value.length === 0) {
            return 'El nombre no puede estar vacio.';
        } else if (type === 'dni') {
            return 'El nombre no puede estar vacio.';
        } else if (type === 'cuil') {
            return 'El nombre no puede estar vacio.';
        } else if (type === 'phone') {
            return 'El nombre no puede estar vacio.';
        } else if (type === 'fatherPhone') {
            return 'El nombre no puede estar vacio.';
        } else if (type === 'motherPhone') {
            return 'El nombre no puede estar vacio.';
        } else if (type === 'affiliateNumber') {
            return 'El nombre no puede estar vacio.';
        } return '';
    };
}

export default DataVerifier;