exports.isValidSiret = (siret) =>{
    let isValid;
    if ( (siret.length !== 14) || (isNaN(siret)) )
        isValid = false;
    else {
        let sum = 0;
        let tmp;
        for (let cpt = 0; cpt<siret.length; cpt++) {
            if ((cpt % 2) === 0) {
                tmp = siret.charAt(cpt) * 2;
                if (tmp > 9) {
                    tmp -= 9;
                }
            } else {
                tmp = siret.charAt(cpt);
            }
            sum += parseInt(tmp);
        }
        isValid = (sum % 10) === 0;
    }

    return isValid;
};
