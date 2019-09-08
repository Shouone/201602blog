var express = require('express');
var markdown=require('markdown').markdown;
var models=require('../models');
var router = express.Router();
var idOlder='';
/* GET home page. */
router.get('/', function(req, res, next) {
    var keyword=req.query.keyword;//取出查询关键字
    var search=req.query.search;//取出查询按钮
    var pageNum=req.query.pageNum||1;//当前页码
    var pageSize=req.query.pageSize||10;//一页有多少条数据
    var id=req.query.id;
    var flag=[ ];
    var queryObj={};


    if(search){
        req.session.keyword=keyword;
    }else{
        search=req.session.keyword;
    }
        var reg=new RegExp(keyword,'i');
        queryObj={$or:[{title:reg},{content:reg}]};
        req.session.keyword=keyword;
        // queryObj.title=new RegExp(keyword,'i');

    //先查找，然后把user字符串转成user对象
  models.Article.find(queryObj).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec
  (function(err,articles){
      articles.forEach(function(article){
          article.content=markdown.toHTML(article.content);
      });

      if(id==idOlder){
         var index= flag.indexOf(1);
          flag[index]!=flag[index];
          idOlder='';
      }else{
          articles.forEach(function(article){
              // console.log(article._id);
              // console.log(id);
              // console.log(article._id==id);
              if(article._id==id){
                  flag.push(1);
                  idOlder=id;
              }else{
                  flag.push(0);
              }
          });
      }

      //取得这个条件有多少条符合的数据
      models.Article.count(queryObj,function(err,count){
          res.render('index', {
              articles: articles,
              totalPage:Math.ceil(count/pageSize),
              keyword:keyword,
              pageNum:pageNum,
              pageSize:pageSize,
              flag:flag
          });
      })
  })

});
module.exports = router;
