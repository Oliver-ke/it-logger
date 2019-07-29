// this file contains the project mutation
const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');
const Tech = require('../models/Tech');
const Log = require('../models/Log');
const { LogType, TechType } = require('./types');

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		// mutatation to add a log
		addLog: {
			type: LogType,
			args: {
				message: { type: new GraphQLNonNull(GraphQLString) },
				attention: { type: GraphQLBoolean },
				tech: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let log = new Log({
					message: args.message,
					tech: args.tech,
					attention: args.attention
				});
				return log.save();
			}
		},
		updateLog: {
			type: LogType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				message: { type: new GraphQLNonNull(GraphQLString) },
				attention: { type: GraphQLBoolean },
				tech: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				const update = {
					message: args.message,
					tech: args.tech,
					attention: args.attention
				};
				return Log.findByIdAndUpdate(args.id, { $set: update }, { new: true });
			}
		},
		deleteLog: {
			type: LogType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(_, args) {
				return Log.findByIdAndRemove(args.id);
			}
		},
		addTech: {
			type: TechType,
			args: {
				firstName: { type: new GraphQLNonNull(GraphQLString) },
				lastName: { type: GraphQLString }
			},
			resolve(parent, args) {
				let tech = new Tech({
					firstName: args.firstName,
					lastName: args.lastName
				});
				return tech.save();
			}
		},
		deleteTech: {
			type: TechType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(_, args) {
				return Tech.findByIdAndRemove(args.id);
			}
		}
	}
});

module.exports = Mutation;
