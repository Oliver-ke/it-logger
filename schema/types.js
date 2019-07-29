const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList } = require('graphql');
// Log type
const LogType = new GraphQLObjectType({
	name: 'Log',
	fields: () => ({
		message: { type: GraphQLString },
		tech: { type: GraphQLString },
		attention: { type: GraphQLBoolean },
		date: { type: GraphQLString },
		id: { type: GraphQLString }
	})
});

// // Tech type
const TechType = new GraphQLObjectType({
	name: 'Tech',
	fields: () => ({
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		id: { type: GraphQLString }
	})
});

module.exports = {
	LogType,
	TechType
};
