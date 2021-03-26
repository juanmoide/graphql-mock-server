import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Address {
        id: ID!
        streetAddress: String!
        secondaryAddress: String
        city: String!
        country: String!
        zipCode: String!
        latitude: String!
        longitude: String!
    }

    type Finance {
        id: ID!
        company: Company!
        account: String!
        amount: String!
        currencyCode: String!
        cardNumber: String!
        cardCVV: String!
        transactionType: String!
        transactionDescription: String!
    }

    type Company {
        id: ID!
        name: String!
        year: Int!
        address: Address!
        financeData: Finance!
    }

    type Employee {
        firstName: String!
        lastName: String!
        fullName: String!
        imageUrl: String
        gender: String
        email: String!
        company: Company!
        jobTitle: String!
        jobArea: String!
        jobType: String!
        jobDescriptor: String
    }

    type Query{
        AllAddresses: [Address!]!
        AllCompanies: [Company!]!
        AllFinance: [Finance!]!
        AllEmployees: [Employee!]!
    }
`;
