const bcrypt = require('bycrypt');

const hashValue = (value, salt) => {
    return bcrypt.hash(value, salt);
}

const doHashValidation = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

module.exports = {
    hashValue,
    doHashValidation
}

