const logger = require("../loaders/loggerLoader");
const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('mongoose');
class DatabaseLoader {
    constructor() {
        this.loaded = null;
    }

    load() {
        if (!this.loaded) {

            mongoose.connect('mongodb://localhost:27017/test', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
                .then(() => {
                    logger.info("Connected to the databaseModels!");
                })
                .catch(err => {
                    logger.error("Cannot connect to the databaseModels!", err);
                    process.exit();
                });
        }
        return this.loaded;
    }
}

let databaseLoader = new DatabaseLoader();
module.exports = databaseLoader;

