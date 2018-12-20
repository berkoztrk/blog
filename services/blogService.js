const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const blogSchema = Schema({
    title : String,
    content: String
});

var Blog = mongoose.model("Blog",blogSchema);

var blogService =  {
    
    insert : async (blog) => {
        const _blog = new Blog(blog);
        let result = await _blog.save();
        return result
    },

    getById : async (id) => {
        const blog = await Blog.findById(id).exec();
        return blog;
    }

}

module.exports = blogService;