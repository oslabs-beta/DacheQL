const db = require('../models/models');

const { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLList, 
  GraphQLInt, 
  GraphQLNonNull 
} = require('graphql');


// agent name, role, ult, id 
const Valorant = new GraphQLObjectType({
  name: 'Valorant', 
  description: 'This represents Valorant agents',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt)},
    name:  { type: GraphQLNonNull(GraphQLString)},
    role:  { type: GraphQLNonNull(GraphQLString)},
    ultimate:  { type: GraphQLNonNull(GraphQLString)}
  })
});

const City = new GraphQLObjectType({
  name: 'Cities', 
  description: 'This represents City information',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt)},
    name:  { type: GraphQLNonNull(GraphQLString)},
    population:  { type: GraphQLNonNull(GraphQLInt)},
    country_id: { type: GraphQLNonNull(GraphQLInt)}
  })
});

const Pokemon = new GraphQLObjectType({
  name: 'Pokemon', 
  description: 'This represents pokemon information',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt)},
    name:  { type: GraphQLNonNull(GraphQLString)},
    type:  { type: GraphQLNonNull(GraphQLString)},
    ability:  { type: GraphQLNonNull(GraphQLString)},
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query', 
  description: 'Root Query', 
  type: 'Query',
  fields: () => ({
    valorant: {
      type: new GraphQLList(Valorant), 
      resolve: async (parentValue, args) => {
        const query = `SELECT * FROM valorant`;
        const data = await db.query(query);
        return data.rows;
      }
    },
    cities: {
      type: new GraphQLList(City), 
      resolve: async (parentValue, args) => {
        const query = `SELECT * FROM cities`;
        const data = await db.query(query);
        return data.rows;
      }
    },
    pokemon: {
      type: new GraphQLList(Pokemon), 
      resolve: async (parentValue, args) => {
        const query = `SELECT * FROM pokemon`;
        const data = await db.query(query);
        return data.rows;
      }
    }
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  type: [Valorant, City, Pokemon]
});

module.exports = schema; 