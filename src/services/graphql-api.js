import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client'
import { setContext } from "@apollo/client/link/context";

const endpoint = 'https://api.github.com/graphql';


export async function fetchUserData(username){
  console.log("API FETCHUSERDATA");
  try{
    const userQuery = gql`query {
      user (login: "${username}") {
        login
        bio
        location
        followers{
          totalCount
        }
        following{
          totalCount
        }
        avatarUrl
      }
    }`;
    console.log((await makeRequest(userQuery)).data)
     return (await makeRequest(userQuery)).data;
  } catch(e) {
    console.log(e);
  }
     

  

}

export async function fetchRepositories(username, selectedRepos){
  if (username){
    let repos;
    switch(selectedRepos){
      case 'pinned':
        return await pinnedRepositories(username);
      case 'all':
        repos = await repositories(username, "repositories");
        return repos.repositories;
      case 'contributed-to':
        repos = await repositories(username, "repositoriesContributedTo");
        return repos.repositoriesContributedTo;
    }
  }
  

}

async function pinnedRepositories(username){
  const query = gql`
  query {
      user (login: "${username}") {
        pinnedItems(first:6, types: REPOSITORY) {
           nodes {
            ... on Repository {
              name
              url
              description
              forkCount
              stargazerCount
              pushedAt
            }
        }
        }
      }
    }
  `;  
  return (await makeRequest(query)).data.user.pinnedItems;

}

async function repositories(username, type){ 

  const reposQuery = gql`query {
    user (login: "${username}") {
      ${type}(first:10, orderBy:{field: PUSHED_AT, direction: DESC}){
        pageInfo{
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        nodes {
          id
          name
          description
          pushedAt
          forkCount
          stargazerCount
          url
          licenseInfo{
            name
          }
        }
      }
    }
  }`;
  return (await makeRequest(reposQuery)).data.user;

};

export async function paginatedRepositories(username, type, item, direction){ 
  let processedType =  type == 'all' ? 'repositories':'repositoriesContributedTo';

  const reposQuery = gql`query {
    user (login: "${username}") {
      ${processedType}(first:10, orderBy:{field: PUSHED_AT, direction: DESC}, ${direction}:"${item}"){
        pageInfo{
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        nodes {
          id
          name
          description
          pushedAt
          forkCount
          stargazerCount
          url
          licenseInfo{
            name
          }
        }
      }
    }
  }`;
  return (await makeRequest(reposQuery)).data.user;

};


async function makeRequest(query) {
  const httpLink = createHttpLink({
    uri: endpoint,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  const data = await client.query({
    query: query
  });

  return data;
}

