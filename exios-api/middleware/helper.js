const { orderLabels } = require("../constants/orderLabels");

exports.generateString = (length, characters) => {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

exports.addChangedField = (fieldName, newData, oldData, labels) => {
    switch (fieldName) {
        case 'debt':
            return {
                label: labels[fieldName],
                value: fieldName,
                changedFrom: `${oldData?.total || '0'} ${oldData?.currency || ''}`,
                changedTo: `${newData?.total || '0'} ${newData?.currency || ''}`
              }
        case 'cost':
        return {
            label: labels[fieldName],
            value: fieldName,
            changedFrom: `${oldData?.total || '0'} ${oldData?.currency || ''}`,
            changedTo: `${newData?.total || '0'} ${newData?.currency || ''}`
            }
        case 'paymentList':
            return {
                label: labels[fieldName],
                value: fieldName,
                changedFrom: String(oldData?.length) || '0',
                changedTo: String(newData?.length) || '0',
            }
    
        default:
            return {
                label: labels[fieldName],
                value: fieldName,
                changedFrom: oldData,
                changedTo: newData,
            }
    }
}