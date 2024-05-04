module.exports = (sequelize, DataTypes) => {  // exports the function below
    const Student = sequelize.define('Student', { // define student model
        name: {  // define the columns in the database - give them a name, and a type
            type: DataTypes.STRING,
            allowNull: false,  // server side validation
            unique: true,
            validate: {
                notEmpty: false
            }
        },
        starID: {
            type: DataTypes.STRING,  // server side validation
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: false
            }  // todo future = check for aa1234aa

        },
        present: {  // server side validation
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    })

    Student.sync( {force: false} ).then( () => {  // create or update table in database  false when server restarts it doesn't delete existing table data
        console.log('Synced student table')
    })

    return Student  // returns student model

}