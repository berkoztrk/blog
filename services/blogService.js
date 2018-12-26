const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const blogSchema = Schema({
    title : String,
    content: String,
    summary: {
        type: String,
        maxlength: 200
    }
});
blogSchema.index({title: 'text',summary: 'text', description: 'text'})

var Blog = mongoose.model("Blog",blogSchema);

var blogService =  {
    
    insert : async (blog) => {
        const _blog = new Blog(blog);
        let result = await _blog.save();
        return result
    },

    delete : async (id) => {
        const _blog = await Blog.findByIdAndDelete(id);
        return _blog;
    },

    update : async (blog) => {
        const _blog = await Blog.findOneAndUpdate({ _id : blog.id},blog,{upsert : true});
        return _blog;
    },

    getById : async (id) => {
        const blog = await Blog.findById(id).exec();
        return blog;
    },

    getAll : async () => {
        const blogs = await Blog.find();
        return blogs;
    },

    search : async(searchString) => {
        const blogs = await Blog.find({$text : {$search :searchString }});
        return blogs;
    }

}

module.exports = blogService;