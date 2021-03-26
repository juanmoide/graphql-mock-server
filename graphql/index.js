import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
interface AwardData {
    id: ID!
    name: String!
}

type Award implements AwardData {
    id: ID!
    name: String!
}

type AwardWon implements AwardData {
    id: ID!
    name: String!
    year: Int!
    winner: Actor!
}

interface BasicData {
    id: ID!
    name: String!
    age: Int!
}

type People implements BasicData {
    id: ID!
    name: String!
    age: Int!
}

type Actor implements BasicData {
    id: ID!
    name: String!
    age: Int!
    films: [Film!]!
    awards: [AwardWon!]!
}


type Film {
    id: ID!
    name: String!
    director: People!
    actors: [Actor!]!
    recommended: Boolean
}

type Query {
  allFilms: [Film!]!
  allActors: [Actor!]!
  allAwards: [Award!]!
  allPeople: [People]
}
`