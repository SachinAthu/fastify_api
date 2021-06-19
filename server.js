const fastify = require('fastify')({
    logger: true,
    connectionTimeout: 3600000,
    maxParamLength: 10
})
const PORT = 5000

// register all plugins, routes
fastify.register(require('./routes/posts'), { prefix: 'posts' })
fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routerPrefix: '/docs',
    swagger: {
        info: {
            title: 'Fastify API',
          },
          externalDocs: {
            url: 'https://swagger.io',
            description: 'more info...'
          },
          host: 'localhost',
    }
})

fastify.get('/', (request, reply) => {
    reply.send({ message: 'API is working!' })
})


const start = async () => {
    try{
        await fastify.listen(PORT)
    }catch (error){
        fastify.log.error(error)
        process.exit(1)
    }
}

start()