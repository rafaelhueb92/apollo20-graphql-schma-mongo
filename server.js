const { ApolloServer } = require("apollo-server");

const schema = require("./graphql/schema.js");

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀 Servidor rodando em ${url}`);
});