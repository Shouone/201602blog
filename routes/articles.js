var express = require('express');
var models=require('../models');
var router = express.Router();
var auth=require('../middlware/auth');
var multer=require('multer');
//指定存储的目录和文件名
var storage = multer.diskStorage({
    //目录路径
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    //文件名
    filename: function (req, file, cb) {
        console.log(file);
        cb(null,Date.now()+'.'+(file.mimetype.slice(file.mimetype.indexOf('/')+1)));
    }
})
var upload=multer({storage:storage});
/* GET users listing. */

router.get('/add',auth.checkLogin,function(req,res,next){
    res.render('article/add',{title:'发表文章'});
})
router.post('/add',auth.checkLogin,upload.single('poster'),function(req,res,next){
    console.log(req.file);
    var article=req.body;
    if(req.file)
    article.poster='/uploads'+'/'+req.file.filename;
   //把当前登录用户的ID赋给user;
   article.user=req.session.user._id;
   models.Article.create(article,function(err,doc){
       if(err){
         req.flash('error','文章发表失败');
       }else{
         req.flash('success','文章发表成功');
         res.redirect('/');
       }
   });
});
module.exports = router;
