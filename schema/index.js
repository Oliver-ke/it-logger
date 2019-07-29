const mutation = require('./mutation');
const query = require('./query');
const { GraphQLSchema } = require('graphql');

module.exports = new GraphQLSchema({
	query,
	mutation
});
