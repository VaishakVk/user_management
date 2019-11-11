const JaySchema = require('jayschema');
const js = new JaySchema();
const q = require('q')

module.exports = (instance, schema) => {
    const deferred = q.defer();
    js.validate(instance, schema, function (errs) {
        if (errs) deferred.reject({ message: errs, statusCode: 406 });
        else deferred.resolve(true);
    })

    return deferred.promise;
};