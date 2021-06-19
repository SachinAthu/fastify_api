const { getAllPosts, getSinglePost, addPost, updatePost, patchPost, deletePost } =  require('../controllers/posts')

// single post options object
const singlePostObj = {
    type: 'object',
    properties: {
        userId: { type: 'string' },
        id: { type: 'string' },
        title: { type: 'string' },
        body: { type: 'string' }
    }
}

// parameter id option object
const paramterObj = {
    type: 'object',
    items: {
        id: { type: 'number' }
    }
}

// addUpdatePatchPost option object
const addUpdatePatchObj = {
    userId: { type: 'string' },
    title: { type: 'string' },
    body: { type: 'string' }
}

// options for getAllPosts
const getAllPostsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: singlePostObj
            }
        }
    },
    handler: getAllPosts
}

// options for getSinglePost
const getSinglePostOpts = {
    schema: {
        params: paramterObj,
        response: {
            200: singlePostObj
        }
    },
    handler: getSinglePost
}

// options for addPost
const addPostOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['userId', 'title', 'body'],
            properties: addUpdatePatchObj
        },
        response: {
            201: singlePostObj,
        }
    },
    handler: addPost
}

// options for updatePost
const updatePostOpts = {
    schema: {
        params: paramterObj,
        body: {
            type: 'object',
            required: ['userId', 'title', 'body'],
            properties: addUpdatePatchObj
        },
        response: {
            200: singlePostObj,
        }
    },
    handler: updatePost
}

// options for patchPost
const patchPostOpts = {
    schema: {
        params: paramterObj,
        body: {
            type: 'object',
            properties: addUpdatePatchObj
        },
        response: {
            200: singlePostObj,
        }
    },
    handler: patchPost
}

// options for deletePost
const deletePostOpts = {
    schema: {
        params: paramterObj,
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    deletedPost: singlePostObj
                }
            },
        }
    },
    handler: deletePost
}

// post routes
function postRoutes(fastify, opts, done) {
    // get all posts
    fastify.get('/', getAllPostsOpts)

    // get one specific post
    fastify.get('/:id', getSinglePostOpts)

    // add post
    fastify.post('/', addPostOpts)

    // update post
    fastify.put('/:id', updatePostOpts)

    // patch post
    fastify.patch('/:id', patchPostOpts)

    // delete post
    fastify.delete('/:id', deletePostOpts)

    done()
}

module.exports = postRoutes