
var mongoose=require('mongoose');
var db=mongoose.connect("mongodb://localhost:27017/201602blog",{ useNewUrlParser: true });
// var db=mongoose.connect("mongodb://shouone.top:27017/201602blog");
db.connection.on("error",function(error){
    console.log("数据库连接失败:"+error);
});
db.connection.on("open",function(){
    console.log("数据库连接成功");
})
