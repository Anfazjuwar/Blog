const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
    },
    photo:{
      type : String,
      required:false
    },
    username: {
      type: String,
      required: true,
    },
    userID:{
       type: String,
       required:true,
    },
    Categories:{
      type:Array
     
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
