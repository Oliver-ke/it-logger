const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList } = require('graphql');
const { LogType, TechType } = require('./types');
const Tech = require('../models/Tech');
const Log = require('../models/Log');

// RootQuery
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		logs: {
			type: new GraphQLList(LogType),
			resolve() {
				// get logs from db
				return Log.find({});
			}
		},
		log: {
			type: LogType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				// get a single log
				return Log.findById(args.id);
			}
		},
		techs: {
			type: new GraphQLList(TechType),
			resolve() {
				// get all techs
				return Tech.find({});
			}
		},
		tech: {
			type: TechType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				// get single tech
				return Tech.findById(args.id);
			}
		}
	}
});

module.exports = RootQuery;
