const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');
const { graphqlHTTP } = require('express-graphql');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accecpt, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

//swagger config
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Library API Docs",
            description: "Description for Library Management System APIs",
            contact: {
                name: "Library "
            },
            servers: "http://localhost:4001/",
        }
    },
    apis: ["./routes/userRoutes.js"]
}
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocs));

//end of swagger config

/**
 * @swagger
 */
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}))

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred !' });
});

mongoose.connect('mongodb+srv://root:root@cluster0-uaacm.mongodb.net/library?')
    .then(() => { app.listen(4001); })
    .catch((err) => console.log(err))


