import { gql, MockList } from 'apollo-server-micro';
import faker from 'faker';

const addressFn = () => (replaceDataObj = {}) => ({
    streetAddress: faker.address.streetAddress(),
    secondaryAddress: faker.address.secondaryAddress(),
    city: faker.address.city(),
    country: faker.address.country(),
    zipCode: faker.address.zipCode(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    ...replaceDataObj
})

const financeFn = () => (replaceDataObj = {}) => ({
    account: faker.finance.account(),
    amount: faker.finance.amount(),
    currencyCode: faker.finance.currencyCode(),
    cardNumber: faker.finance.creditCardNumber(),
    cardCVV: faker.finance.creditCardCVV(),
    transactionType: faker.finance.transactionType(),
    transactionDescription: faker.finance.transactionDescription(),
    ...replaceDataObj
})

const companyFn = () => (replaceDataObj = {}) => ({
    name: faker.fake("{{company.companyName}}, {{company.companySuffix}}"),
    year: () => faker.random.number({min: 1920, max: 2021}),
    ...replaceDataObj
})

const employeeFn = () => (replaceDataObj = {}) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
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
        jobDescriptor: faker.name.jobDescriptor(),
        ...replaceDataObj
    }
}

const checkItemsToShow = (_, { min: minimun, max: maximun }) => {
    let min = 2;
    let max = 2;

    if(maximun && minimun) {
        min = minimun > 0 && minimun <= 20 ?
            minimun : min;
        max = maximun > 0 && maximun <= 20 ?
            maximun : max;
    } else if (maximun || minimun) {
        if (maximun) {
            max = maximun;
            min = maximun;
        } else if (minimun) {
            max = minimun;
            min = minimun;
        }
    }

    console.log("MIN", min, "MAX", max)
    return new MockList([min, max]);
}

export const typeDefs = gql`
    input AddressInput {
        streetAddress: String
        secondaryAddress: String
        city: String
        country: String
        zipCode: String
        latitude: String
        longitude: String
    }

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

    input FinanceInput {
        account: String
        currencyCode: String
        cardNumber: String
        transactionType: String
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

    input EmployeeInput {
        firstName: String
        lastName: String
        gender: String
        email: String
        jobTitle: String
        jobArea: String
        jobType: String
        jobDescriptor: String
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
        AllAddresses(min: Int, max: Int): [Address!]!
        address(data: AddressInput): Address
        AllCompanies(min: Int, max: Int): [Company!]!
        company(name: String): Company
        AllFinance(min: Int, max: Int): [Finance!]!
        finance(data: FinanceInput): Finance
        AllEmployees(min: Int, max: Int): [Employee!]!
        employee(data: EmployeeInput): Employee
        hello(name: String): String!
    }
`;

export const resolvers = {
    Query: {
      hello: (_, { name }) => `Hello ${name || 'World'}`,
      address: (_, args) => {
        if(!(args && args.data)) return null;

        const {
            streetAddress = faker.address.streetAddress(),
            secondaryAddress = faker.address.secondaryAddress(),
            city = faker.address.city(),
            country = faker.address.country(),
            zipCode = faker.address.zipCode(),
            latitude = faker.address.latitude(),
            longitude = faker.address.longitude(),
        } = args.data;

        return addressFn()({
            streetAddress,
            secondaryAddress,
            city,
            country,
            zipCode,
            latitude,
            longitude,
        });
      },
      company: (_, args) => {
        if(!(args && args.data)) return null;

        return addressFn()(args);
      },
      finance: (_, args) => {
        if(!(args && args.data)) return null;

        const {
            account = faker.finance.account(),
            currencyCode = faker.finance.currencyCode(),
            cardNumber = faker.finance.creditCardNumber(),
            transactionType = faker.finance.transactionType()
        } = args.data;

        return financeFn()({
            account,
            currencyCode,
            cardNumber,
            transactionType
        })
      },
      employee: (_, args) => {
        if(!(args && args.data)) return null;

        const {
            firstName = faker.name.firstName(),
            lastName = faker.name.lastName(),
            gender = faker.name.gender(),
            email = faker.internet.email(),
            jobTitle = faker.name.jobTitle(),
            jobArea = faker.name.jobArea(),
            jobType = faker.name.jobType(),
            jobDescriptor = faker.name.jobDescriptor()
        } = args.data;

        const fullName = `${lastName}, ${firstName}`

        return employeeFn()({
            firstName,
            lastName,
            fullName,
            gender,
            email,
            jobTitle,
            jobArea,
            jobType,
            jobDescriptor
        })
      }
    },
  }

export const mocks = {
    Query: () => ({
        AllAddresses: checkItemsToShow,
        AllCompanies: checkItemsToShow,
        AllFinance: checkItemsToShow,
        AllEmployees: checkItemsToShow
    }),
    Address: addressFn,
    Finance: financeFn,
    Company: companyFn,
    Employee: employeeFn,
    Int: () => faker.random.number({min: 1})
}
