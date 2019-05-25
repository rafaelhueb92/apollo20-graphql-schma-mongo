const graphql = require("graphql");
const {
  GraphQLSchema,
  GraphQLFloat,
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLInt
} = graphql;

const { Car } = require("../core/db/models/car");

const db = require("../core/db/db");
db.abrirConexao();

const CarType = new GraphQLObjectType({
  name: "Car",
  description: "Entidade com as informações do Carro",
  fields: () => ({
    id: { type: GraphQLID },
    model: { type: GraphQLString },
    board: { type: GraphQLString },
    year: { type: GraphQLInt },
    value: { type: GraphQLFloat }
  })
});

const query = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    car: {
      type: CarType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Car.findById(id);
      }
    },
    cars: {
      type: new GraphQLList(CarType),
      resolve(parent, args) {
        return Car.find({});
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCar: {
      type: CarType,
      args: {
        model: { type: GraphQLString },
        board: { type: GraphQLString },
        year: { type: GraphQLInt },
        value: { type: GraphQLFloat }
      },
      resolve(parent, args) {
        let car = new Car({ ...args });
        return car.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({ query, mutation });
