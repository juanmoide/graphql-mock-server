import { gql } from 'apollo-server-micro';
import faker from 'faker';

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

export const mocks = {
    Address: () => ({
        streetAddress: faker.address.streetAddress(),
        secondaryAddress: faker.address.secondaryAddress(),
        city: faker.address.city(),
        country: faker.address.country(),
        zipCode: faker.address.zipCode(),
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
    }),
    Finance: () => ({
        account: faker.finance.account(),
        amount: faker.finance.amount(),
        currencyCode: faker.finance.currencyCode(),
        cardNumber: faker.finance.creditCardNumber(),
        cardCVV: faker.finance.creditCardCVV(),
        transactionType: faker.finance.transactionType(),
        transactionDescription: faker.finance.transactionDescription()
    }),
    Company: () => ({
        name: faker.fake("{{company.companyName}}, {{company.companySuffix}}"),
        year: () => faker.random.number({min: 1920, max: 2021})
    }),
    Employee: () => {
        const firstName = faker.name.firstName();
        const lastName = faker.name.firstName();
        return {
            firstName,
            lastName,
            fullName: `${lastName}, ${firstName}`,
            imageUrl: faker.image.imageUrl(),
            gender: faker.name.gender(),
            email: faker.internet.email(),
            jobTitle: faker.name.jobTitle(),
            jobArea: faker.name.jobArea(),
            jobType: faker.name.jobType(),
            jobDescriptor: faker.name.jobDescriptor()
        }
    },
    Int: () => faker.random.number({min: 1})
}
