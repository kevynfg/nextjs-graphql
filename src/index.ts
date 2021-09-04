import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { Query, Resolver, buildSchema } from "type-graphql";

@Resolver()
class HelloResolver {
    @Query(() => String)
    async hello() {
        return "Hello World!";
    }
}



const main = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver]
    });

    const apolloServer = new ApolloServer({schema});
    
    const app = Express();

    await apolloServer.start();
    apolloServer.applyMiddleware({app});

    app.listen(4000, async() => {
        console.log("Listening on port 4000 - http://localhost:4000");
    })
}

main();