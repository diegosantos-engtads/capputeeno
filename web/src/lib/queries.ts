import { gql } from 'graphql-request';

export const GET_PRODUCTS = gql`
  query GetProducts($page: Int!, $perPage: Int!) {
    allProducts(page: $page, perPage: $perPage) {
      id
      name
      price_in_cents
      image_url
    }
    _allProductsMeta {
      count
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    Product(id: $id) {
      id
      name
      description
      price_in_cents
      image_url
    }
  }
`;
