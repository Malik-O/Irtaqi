import {
	split,
	HttpLink,
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
	// uri: "http://13.49.225.12/graphql",
	uri: "http://192.168.1.2:800/graphql",
});

const wsLink = new GraphQLWsLink(
	createClient({
		// url: "ws://13.49.225.12/graphql",
		url: "ws://192.168.1.2:800/graphql",
	}),
);

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink,
);

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});

export default function ({ children }) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
