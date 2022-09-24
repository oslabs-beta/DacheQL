import { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLList, 
  GraphQLInt, 
  GraphQLNonNull,
  Kind,
  GraphQLScalarType,
} from'graphql';
const pokemon = import('./pokemonData.json', {
    assert: {
    type: 'json'
    }
})
const valorant = import('./valorantData.json', {
  assert: {
    type: 'json'
    }
})
const cities = import('./cityData.json', {
  assert: {
    type: 'json'
  }
})
const bigIntType = new GraphQLScalarType({
  name: 'BigInt',
  serialize: (val) => val,
});

const dateType = new GraphQLScalarType({
  name: 'Date',
  parseValue: (val) => (new Date(val)).toISOString(),
  serialize: (date) => date.toDateString(),
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) {
      return (new Date(+ast.value)).toISOString();
    }
    return null;
  },
});
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
    // entryNumber:  { type: GraphQLNonNull(GraphQLString)},
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

export default schema; 