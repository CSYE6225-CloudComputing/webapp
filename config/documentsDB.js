

module.exports = (sequelize, Sequelize) => {
    const document = sequelize.define("documentDetails", {
        doc_id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        s3_bucket_path: {
            type: Sequelize.STRING
        }
    });


    
    return document;
};