var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var nodemailer = require("nodemailer");
require("dotenv").config();
var post = require("../model/post");
const user = require("../model/user");
var upload = require("../middleware/upload");
var conversation = require("../model/conversation")
var message = require("../model/message")


mongoose
  .connect(process.env.URL)
  .then(() => console.log("db connected successfully"));
const {
  hashing,
  hashCompare,
  createjwt,
  auth,
  resetauth,
  resetjwt,
} = require("../library/auth");



/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/register",upload.single("profilepicture"), async (req, res) => {
  try {

    let step = await user.findOne({ username: req.body.username });
    if (!step) {
      const hash = await hashing(req.body.password);
      req.body.password = hash;
      let token = await createjwt({ username: req.body.username });
      let result = await user(req.body);
      if(req.file){
        result.profilepicture = req.file.location
      }
      result.save((err, data) => {
        if (err) {
          console.log(err);
          res.json({
            statuscode: 400,
            message: "Email Already Exist",
          });
        } else {
         
          let { username } = data;

          var sender = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "stackdeveloper112@gmail.com",
              pass: process.env.pass,
            },
          });
          var composeMail = {
            from: "stackdeveloper112@gmail.com",
            to: req.body.email,
            subject: `Account-verification`,
            text: "",
            html: `<h2>Hello ${username}</h2>
    <p>We've recieved a request to verify your account associated with your email.
    You can register your account by clicking the link below</p>
    <a href=http://localhost:3000/register-confirm/${token}>Register verification</a>
    <p><b>Note:</b>The link expires 5 minutes from now</p>
    </div>`,
          };

          sender.sendMail(composeMail, (error) => {
            if (error) {
              console.log(error);
            }else{
              res.json({
                statuscode: 200
              });
            }
          });
        }
      });
    } else {
      res.json({
        message: "Username Already Exist",
      });
    }
  } catch (error) {
    console.log('94',error);
  }
});
router.post("/confirm/:token", async (req, res) => {
  try {
    let mail = await auth(req.params.token);

    if (mail) {
      await user.updateOne(
        { username: mail },
        { $set: { ValidityStatus: "Active" } }
      );
      res.json({
        statuscode: 200,
      });
    } else {
      res.json({ statuscode: 400, message: "Token Expired" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const login = await user.findOne({ username: req.body.username });
    let token1 = await createjwt({ username: req.body.username });
    if (login) {
      if (login.ValidityStatus == "Active") {
        const compare = await hashCompare(req.body.password, login.password);

        if (compare) {
          res.json({
            statuscode: 200,
            messsage: "Login successfully",
            username: req.body.username,
            userId: login._id,
          });
        } else {
          res.json({
            message: "wrong password",
          });
        }
      } else {
       
        let { username } = login;

        var sender = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "stackdeveloper112@gmail.com",
            pass: process.env.pass,
          },
        });
        var composeMail = {
          from: "stackdeveloper112@gmail.com",
          to: login.email,
          subject: `Account-verification`,
          text: "",
          html: `<h2>Hello ${username}</h2>
        <p>We've recieved a request to verify your account associated with your email.
        You can register your account by clicking the link below</p>
        <a href=http://localhost:3000/register-confirm/${token1}>Register verification</a>
        <p><b>Note:</b>The link expires 5 minutes from now</p>
        </div>`,
        };

        sender.sendMail(composeMail, (error) => {
          if (error) {
            console.log(error);
          }else{
            res.json({
              message: "Account is InActive , Check Your Mail For Activaton Link",
            });
          }
        });
      }
    } else {
      res.json({
        message: "user does not exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
//forgot password

router.post("/forgot-password", async (req, res) => {
  try {
   
    let step = await user.findOne({ email: req.body.email });
    
    if (step) {
      const { username } = step;
      let token = await resetjwt({ email: req.body.email });
     
      var sender = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "stackdeveloper112@gmail.com",
          pass: process.env.pass,
        },
      });
      var composeMail = {
        from: "stackdeveloper112@gmail.com",
        to: req.body.email,
        subject: `Reset-password-verification`,
        text: "",
        html: `<h2>Hello ${username}</h2>
      <p>We've recieved a request to reset the password for your account associated with your email.
      You can reset your password by clicking the link below</p>
      <a href=http://localhost:3000/forgot-confirm/${token}> Reset Password</a>
      <p><b>Note:</b>The link expires 5 minutes from now</p>
      </div>`,
      };

      sender.sendMail(composeMail, (error) => {
        if (error) {
          console.log(error);
        }else{
          res.json({ statuscode: 200});
        }

      });

      
    
    } else {
      res.json({ statuscode: 400, message: "Email does not exist" });
    }
  } catch (error) {
    console.log(error);
    
  }
});
router.post("/verify/:token", async (req, res) => {
  try {
    let mail = await resetauth(req.params.token);
    
    if (mail) {
       let pass = await hashing(req.body.password);
      await user.updateOne({ email: mail }, { $set: { password: pass } });
      
      res.json({
        statuscode: 200,
        message: "password changed successfullly",
      });
    } else {
      res.json({
        message: "token expired",
      });
    }
  } catch (error) {
    console.log(error);
    
  }
});
//update user
router.put("/update/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        const hash = await hashing(req.body.password);
        req.body.password = hash;
      }
      let result = await user.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (result) {
        res.json({
          statuscode: 200,
          message: "Account updated successfully",
        });
      } else {
        res.json({
          message: "updation failed",
        });
      }
    } else {
      res.json({
        statuscode: 400,
        message: "you can update only your account!",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//delete user
router.delete("/delete/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      let result = await user.findByIdAndDelete(req.params.id);
      if (result) {
        res.json({
          statuscode: 200,
          message: "Account Deleted Successfully",
        });
      } else {
        res.json({
          message: "deletion failed",
        });
      }
    } else {
      res.json({
        statuscode: 400,
        message: "you can Delete only your account!",
      });
    }
  } catch (err) {
    console.log(err);
  }
});
//get user
router.get('/getpic/:id',async(req,res)=>{
  try{

  let result = await user.findById(req.params.id)
  if(result){
    const {profilepicture}=result._doc
    res.json({
      statuscode:200,
      data:profilepicture
    })
  }else{
    res.json({
      message:'user does not exist '
    })
  }}catch(err){
    console.log(err)
  }
})
router.get("/getauser/:currentUser", async (req, res) => {
  try {
    const result = await user.findOne({ username: req.params.currentUser });
    if (result) {
      let { profilepicture} = result;

      res.json({
        statuscode: 200,
        data: profilepicture
           });
    } else {
      res.json({
        statuscode: 400,
        message: "username not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/getuser", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    let user1 = userId
      ? await user.findById(userId)
      : await user.findOne({ username: username });
    if (user1) {
      const { password, updatedAt, ...other } = user1._doc;
      res.json({
        statuscode: 200,
        data: other,
      });
    } else {
      res.json({
        message: "user does not exist ",
      });
    }
  } catch (err) {
    console.log(err);
  }
});
//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user1 = await user.findById(req.params.id);
      const currentUser = await user.findById(req.body.userId);

      if (!currentUser.followers.includes(req.params.id)) {
        let step = await user1.updateOne({
          $push: { followings: req.body.userId },
        });
        let step2 = await currentUser.updateOne({
          $push: { followers: req.params.id },
        });
        if (step && step2) {
          res.json({
            statuscode: 200,
            message:'user has been followed'
          });
        } else {
          res.send("request failed");
        }
      } else {
        res.json({
          statuscode: 400,
          message: "you already follows this user",
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({ statuscode: 400, message: "you cannot follow yourself" });
  }
});
//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user1 = await user.findById(req.params.id);
      const currentUser = await user.findById(req.body.userId);

      if (currentUser.followers.includes(req.params.id)) {
        let step = await user1.updateOne({
          $pull: { followings: req.body.userId },
        });
        let step2 = await currentUser.updateOne({
          $pull: { followers: req.params.id },
        });
        if (step && step2) {
          res.json({
            statuscode: 200,
            message: "user has been unfollowed",
          });
        } else {
          res.send("unfollow failed");
        }
      } else {
        res.json({
          statuscode: 400,
          message: "you did not follow the user",
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({ statuscode: 400, message: "you cannot unfollow yourself" });
  }
});
//create a post
router.post("/post", upload.single("Image"), async (req, res) => {
  try {
    console.log(req.body);
    const newpost = new post(req.body);
    if (req.file) {
      newpost.Image = req.file.location;
    }
    newpost.save((err, data) => {
      if (err) {
        console.log(err);
        res.status(400);
      } else {
        res.json({
          statuscode: 200,
          data: data,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//update a post
router.put("/updatepost/:id", async (req, res) => {
  try {
    const post1 = await post.findById(req.params.id);

    if (post1.userId === req.body.userId) {
      let step = await post.updateOne({ $set: req.body });
      if (step) {
        res.json({
          statuscode: 200,
          message: "updated successfully",
        });
      } else {
        res.json({
          statuscode: 400,
          message: "updation failed",
        });
      }
    } else {
      res.json({
        statuscode: 400,
        message: "you can update only your post",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Id not found" });
  }
});
//delete a post
router.delete("/deletepost/:id/:userId", async (req, res) => {
  try {
    const post1 = await post.findById(req.params.id);
    if (post1.userId === req.params.userId) {
      let step = await post.findByIdAndDelete(req.params.id);
      if (step) {
        res.json({
          statuscode: 200,
          message: "deleted successfully",
        });
      } else {
        res.json({
          statuscode: 400,
          message: "deletion failed",
        });
      }
    } else {
      res.json({
        statuscode: 400,
        message: "you can delete only your post",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
//likes / dislikes a post
router.put("/:id/likes", async (req, res) => {
  try {
    const post1 = await post.findById(req.params.id);
    if (!post1.likes.includes(req.body.userId)) {
      let step1 = await post.findByIdAndUpdate(req.params.id, {
        $push: { likes: req.body.userId },
      });
      if (step1) {
        res.json({
          statuscode: 200,
          message: "liked successfully",
        });
      } else {
        res.json({
          message: "likes failed",
        });
      }
    } else {
      let step2 = await post.findByIdAndUpdate(req.params.id, {
        $pull: { likes: req.body.userId },
      });
      if (step2) {
        res.json({
          statuscode: 200,
          message: "disliked successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ statuscode: 500 });
  }
});
//find all user
router.get('/allusers',async(req,res)=>{
  try{
  let result = await user.find()
  res.json(result)
  }catch(err){
    console.log(err)
  }
})


//get a post

router.get("/getpost/:id", async (req, res) => {
  try {
    const post1 = await post.findById(req.params.id);
    if (post1) {
      res.json({
        statuscode: 200,
        data: post1,
      });
    } else {
      res.json({ statuscode: 400, message: "Fetching failed" });
    }
  } catch (error) {
    console.log(error);
  }
});
//get timeline post

router.get("/timeline/:username", async (req, res) => {
  try {
    const currentUser = await user.findOne({ username: req.params.username });
    const userposts = await post.find({ userId: currentUser._id });
    // const friendposts = await Promise.all(
    //   currentUser.followings.map((friendId)=>{
    //     return post.find({userId:friendId})
    //   })
    // )
    const friendposts = await post.find({ userId: currentUser.followings });

    const data = friendposts.concat(...userposts);

    res.json({
      statuscode: 200,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// get users friends

router.get("/friends/:userId", async (req, res) => {
  try {  

    const user1 = await user.findById(req.params.userId);
    const friends = await Promise.all(
      user1.followings.map((friendId) => {
        return user.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const {_id, username, profilepicture } = friend;
      friendList.push({_id, username, profilepicture });
    });
    res.json({ statuscode: 200, data: friendList });

  } catch (error) {
    console.log('nothing')

  }
});

//get all user's post
router.get("/profile/:username", async (req, res) => {
  try {
    const user1 = await user.findOne({ username: req.params.username });
    const post1 = await post.find({ userId: user1._id });
    res.json({
      statuscode: 200,
      data: post1,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// new conversation
router.post("/newconv",async(req,res)=>{
 try{
  const check = await conversation.findOne({
    members:{$all :[req.body.senderId, req.body.receiverId]}})

    if(check){
      res.json({data:check,message:'the already have a conv'})
    }else{
  const newConversation = new conversation({
    members:[req.body.senderId, req.body.receiverId]
  })
  const savedConv = await newConversation.save((err,data)=>{
    if (err) {
      res.status(400)
    } else {
      res.json({
        statuscode:200,
        data:data
      })
    }
  })
}
 }catch(err){
  console.log(err)
 }
})
// get user conversation

router.get('/getConv/:userId',async(req,res)=>{
  try {
    
    const conversation1 = await conversation.find({
      members:{$in :[req.params.userId]},
    })
    if(conversation1){
      res.json({statuscode:200,data:conversation1})
    }
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }

})
// new msg
router.post("/newMsg",async(req,res)=>{

  const newMessage = new message(req.body)

  try{
       const savedMessage = await newMessage.save((err,data)=>{
         if(err){
            res.status(400)
         }else{
           res.json({statuscode:200,data:data})
           
         }
       })
  } catch(err){
    res.status(500).json(err)
  } 
})

// get msg

router.get("/getmsg/:conversationId",async(req,res)=>{
  try{
    const messages = await message.find({
      conversationId:req.params.conversationId
    }) 
    res.json({statuscode:200,
    data:messages})
  }catch(err){
    console.log(err)
  }
})

//get conv for two user id
router.get("/find/:findUserId/:secondUserId", async(req,res)=>{
  try {
    const conversation1 = await conversation.find({
      members:{$all :[req.params.firstUserId, req.params.secondUserId]}})
      res.status(200).json(conversation1)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
