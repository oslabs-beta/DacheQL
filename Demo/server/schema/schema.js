const pokemon =require('./pokemonData');
const valorant = require('./valorantData');
const cities = require('./cityData');

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
    countryID: { type: GraphQLNonNull(GraphQLInt)}
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
    entryNumber:  { type: GraphQLNonNull(GraphQLString)},
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query', 
  description: 'Root Query', 
  fields: () => ({
    valorant: {
      type: new GraphQLList(Valorant), 
      resolve: () => valorant
    },
    cities: {
      type: new GraphQLList(City), 
      resolve: () => cities
    },
    pokemon: {
      type: new GraphQLList(Pokemon), 
      resolve: () => pokemon
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  type: [Valorant, City, Pokemon]
});

module.exports = schema; 