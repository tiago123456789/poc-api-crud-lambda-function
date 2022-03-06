'use strict';

require("../config/database")
const BlogPostModel = require("../models/post")

module.exports.getAll = async (event) => {
    const posts = await BlogPostModel.find({})
    return {
        statusCode: 200,
        body: JSON.stringify(posts)
    };
};


module.exports.getById = async (event) => {
    const id = event.pathParameters.id;
    const post = await BlogPostModel.findById(id)
    if (!post) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: "Post not found!"
            })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(post)
    };
};


module.exports.create = async (event) => {
    const body = JSON.parse(event.body);
    body.createdAt = Date.now();
    const blogPost = await new BlogPostModel(body)
    let error = blogPost.validateSync();

    if (error) {
        const errors = []
        Object.keys(error.errors).map(key => {
            errors.push(error.errors[key].message)
        });
        return {
            statusCode: 400,
            body: JSON.stringify({
                errors
            })
        };
    }
    
    const postCreated = await blogPost.save()
    return {
        statusCode: 201,
        body: JSON.stringify(postCreated)
    };
};


module.exports.update = async (event) => {
    const body = JSON.parse(event.body);
    const id = event.pathParameters.id;
    const post = await BlogPostModel.findById(id)
    if (!post) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: "Post not found!"
            })
        };
    }
    await BlogPostModel.findByIdAndUpdate(id, { $set: {...body} })
    return {
        statusCode: 200,
        body: JSON.stringify({})
    };
};


module.exports.delete = async (event) => {
    const id = event.pathParameters.id;
    const post = await BlogPostModel.findById(id)
    if (!post) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: "Post not found!"
            })
        };
    }

    await BlogPostModel.deleteOne({ _id: id })
    return {
        statusCode: 204,
        body: JSON.stringify({})
    };
};