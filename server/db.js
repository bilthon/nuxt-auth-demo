const MongoClient = require("mongodb").MongoClient;
const userName = encodeURI('oleg_upwork');
const password = encodeURI('pgdev21');
const dbConnectionUrl = "mongodb+srv://" + userName + ":" + password + "@coinbase-cluster-x2csy.mongodb.net/test?retryWrites=true&w=majority";

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl, {
        useUnifiedTopology: true
    }, function (err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err);
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbCollection, dbObject);
        }
    });

}

module.exports = {
    initialize
};
