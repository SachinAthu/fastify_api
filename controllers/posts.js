const { v4:uuidv4 }  = require('uuid')
let posts = require("../fake_db/posts");

const getAllPosts = (request, reply) => {
  try {
    reply.status(200).send(posts);
  } catch (error) {
    console.log("Server error!", error);
    reply.status(500).send({ error: error });
  }
};

const getSinglePost = (request, reply) => {
  const { id } = request.params;

  try {
    const post = isPostAvailable(id)
    if (!post) {
      reply.send({ message: "Post not found!" });
      return;
    }
    reply.status(200).send(post);
  } catch (error) {
    console.log("Server error!", error);
    reply.status(500).send({ error: error });
  }
};

const addPost = (request, reply) => {
    const { userId, title, body } = request.body

    try {
        const newPost = {
            userId,
            id: uuidv4(),
            title,
            body
        }
        posts = [...posts, newPost]
        reply.status(201).send(newPost)
    }catch(error) {
        console.log("Server error!", error);
        reply.status(500).send({ error: error });
    }
}

const updatePost = (request, reply) => {
    const { id } = request.params
    const { userId, title, body } = request.body

    try {
        const post = isPostAvailable(id)
        if(!post) {
            reply.send({ message: "Post not found!" });
            return;
        }
        const updatedPost = { userId, id, title, body }
        posts = [...posts].map(p => p.id == id ? updatedPost : p)
        reply.status(200).send(updatedPost)
    }catch(error) {
        console.log("Server error!", error);
        reply.status(500).send({ error: error });
    }
}

const patchPost = (request, reply) => {
    const { id } = request.params
    const body = request.body

    try {
        let post = isPostAvailable(id)
        if(!post) {
            reply.send({ message: "Post not found!" });
            return;
        }
        for(var prop in body) {
            if(prop && prop != '') {
                post[prop] = body[prop]
            }
        }
        posts = [...posts].map(p => p.id == id ? post : p)
        reply.status(200).send(post)
    }catch(error) {
        console.log("Server error!", error);
        reply.status(500).send({ error: error });
    }
}

const deletePost = (request, reply) => {
    const { id } = request.params

    try {
        const post = isPostAvailable(id)
        if(!post) {
            reply.send({ message: "Post not found!" });
            return;
        }
        posts = posts.filter(p => p.id != id)
        reply.status(201).send({ deletedPost:  post, message: `Post ${id} was deleted!`})
    }catch(error) {
        console.log("Server error!", error);
        reply.status(500).send({ error: error });
    }
}

const isPostAvailable = (id) => {
    const post = [...posts].find(p => p.id == id)
    if(!post)
        console.log("Post not found!");
    return post
}

module.exports = {
    getAllPosts,
    getSinglePost,
    addPost,
    updatePost,
    patchPost,
    deletePost
}
