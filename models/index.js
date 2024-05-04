const { Sequelize, DataTypes} = require("sequelize");  // imports Sequelize
const configJson = require('../config.json')  // initializes configJson variable that links config.json file in path listed
const createStudentModel = require('./student.js')  // initializes createStudentModel variable that imports path of student.js file

// look for an environment variable will be called NODE_ENV and read it's value
// environment variables are set for your whole computer (or for a server)
// any application running on this computer (or server) can read these environment variables
// At Azure, we'll create an environment variable for your server called NODE_ENV and set it to "production"
// if there is no NODE_ENV set, like on your computer, we'll use the value 'development'

const env = process.env.NODE_ENV || 'development'  // initializes env variable that is set on computer.  Azure will set value to development value in config.json production object

const dbPassword = process.env.DB_PASSWORD  // initializes dbPassword variable that reads Azure environment variable in Azure application settings

const config = configJson[env]  // read the configuration object for 'development' or 'production'
config.password = dbPassword // adds database password to the config.  Environment variable and password defined in Azure

const sequelize = new Sequelize(config)  // initialize new variable sequelize that sets database configuration

const database = {  // initializes database variable that sets sequelize object and Sequelize library
    sequelize: sequelize,
    Sequelize: Sequelize,
}

const studentModel = createStudentModel(sequelize, DataTypes)  // new variable studentModel that calls createStudentModel function with sequelize and DataTypes parameters
const studentModelName = studentModel.name // 'Student'
database[studentModelName] = studentModel // database is an object that takes studentModelName property that is equal to new createStudentModel object that is created

module.exports = database  // exports database object once created and setup


