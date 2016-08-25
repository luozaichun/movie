var express = require('express');
var router = express.Router();//路由
var Movie=require('../models/movie');//数据库中movie表模块
var _=require('underscore');//停止循环，更加方便的写代码

//首页
router.get('/',function (req,res) {
  //调动movie的模型
  Movie.fetch(function (error,movies) {
    if(error){
      console.log(error);
    }
    res.render('index',{
      title:'电影首页',
      movies: movies
    
      // [
      //   {
      //   title:'最后的巫师猎人',
      //   poster:'http://r1.ykimg.com/05160000568231DE67BC3C3A0203D5A2',
      //   _id:1,
      //   actor:"范·迪塞尔、伊利亚·伍德",
      //   play_num:"222.0万"
      // },
      //   {
      //     title:'极限挑战',
      //     poster:'http://r1.ykimg.com/05160000569DD94A67BC3C1A3C07E838',
      //     _id:2,
      //     actor:"黄渤、王迅",
      //     play_num:"158.5万"
      //   },
      //   {
      //     title:'唐人街探案',
      //     poster:'http://r1.ykimg.com/051600005672582F67BC3C67550470C2',
      //     _id:3,
      //     actor:"王宝强、刘昊然",
      //     play_num:"146.7万"
      //   },
      //   {
      //     title:'陆垚知马俐',
      //     poster:'http://r1.ykimg.com/0516000057B13B7667BC3C0EA70A4ED6',
      //     _id:4,
      //     actor:"包贝尔、宋佳",
      //     play_num:"121.2万"
      //   },
      //   {
      //     title:'冰川时代4',
      //     poster:'http://r1.ykimg.com/0516000051B2E5BC6758391F6B05BFC4',
      //     _id:5,
      //     actor:"雷·罗马诺、约翰·雷吉扎莫",
      //     play_num:"68.4万"
      //   },
      //   {
      //     title:'致青春:原来你还在这里',
      //     poster:'http://r1.ykimg.com/0516000057A43F6167BC3C45190E4A8D',
      //     _id:6,
      //     actor:"吴亦凡、刘亦菲",
      //     play_num:"61.9万"
      //   },
      //   {
      //     title:'暴走看啥片儿 第三季',
      //     poster:'http://r1.ykimg.com/0516000055E69EE967BC3C14020324DE',
      //     _id:7,
      //     actor:"王尼玛",
      //     play_num:"52.7万"
      //   }
      // ]
    });
   
  });

});

//列表页
router.get('/movie/list',function (req,res) {

  var id=req.query.id;
  console.log(id);
  if (id==undefined){
    Movie.fetch(function (err,movies) {
      if(err){
        console.log(err);
      }
      res.render('list',{
        title:'电影列表页',
        movies: movies
        //     [{
        //   _id:1,
        //   title:'最后的巫师猎人',
        //   doctor:'布瑞克·埃斯纳尔',
        //   country:'美国',
        //   year:'2016'
        // }]
      })
    });
  }else{
    //list delete
    Movie.remove({_id:id},function (err,movies) {
      if (err){
        console.log(err);
      }else{
        res.json({
          success:1
        })
      }
    })
  }


});



//电影详细页
router.get('/movie/:id',function (req,res) {
  var id=req.params.id;
  //获取参数,（get方法），其中param是express里面对body，query,和路由三种方式的封装；但是要注意弄清楚她拿到的是哪个里面的数据，一般优先级,它会先去查看路由里面的的数据，再查看body里面的，最后再去拿query的。
  Movie.findById(id,function (err,movie) {
    if(err){
      console.log(err);
    }
    res.render('detail',{
      title:'电影详情页',
      movie: movie
    })
  });

      // title:'最后的巫师猎人',
      // doctor:'布瑞克·埃斯纳尔',
      // country:'美国',
      // language:'英语',
      // year:'2016',
      // summary:'考尔德（范·迪塞尔 Vin Diesel 饰）是一名女巫猎人，在黒巫后的诅咒之下，他得到了不灭的灵魂和不朽的躯体。永生带来的痛苦远远大于欢愉，在孤独和绝望之中，考尔德度过了漫长的时光，然而，他却从未放弃过身为一名巫师猎人所应尽的职责，他知道，女巫并没有绝迹，一个巨大的阴谋正在阴影里缓慢酝酿。果不其然，黒巫后得到了能够使自己复活的秘术，与此同时，各地的女巫们亦按耐不住，纷纷蠢蠢欲动，妄图实现消灭人类统治世界的野心。考尔德和助手多兰（伊利亚·伍德 Elijah Wood 饰）想要面对繁杂而又强大的对手，必须得到善良女巫克洛伊（萝斯·莱斯利 Rose Leslie 饰）的帮助。一场恶战即将拉开序幕。',
      // flash:'http://static.youku.com/v1.0.0647/v/swf/player_yknpsv.swf',
      // poster:'http://r1.ykimg.com/05160000568231DE67BC3C3A0203D5A2'
});


//更新页面
router.get('/admin/update/:id',function (req,res) {
  var id=req.params.id;
  if (id){
    Movie.findById(id,function (err,movie) {
      if(err){
        console.log(err)
      }
      res.render('admin',{
        title:'后台录入页',
        movies:movie
      })
    })
  }
});


//拿到前台过来的数据
router.post('/admin/movie/new',function (req,res) {

  var id=req.body._id;//判断是否已经存在改影片
  var movieObj=req.body;//获取表单请求，解析数据。

  var _movie;

  if (id!=undefined){//前台提交的时候,如果id不是undefined,切在mongo中不存在这条数据,就会出这问题~直接nodejs服务崩溃了

    _movie=new Movie({
      title:movieObj.title,
      doctor:movieObj.doctor,
      country:movieObj.country,
      language:movieObj.language,
      year:movieObj.year,
      summary:movieObj.summary,
      flash:movieObj.flash,
      poster:movieObj.poster
    });

    _movie.save(function (err,movie) {
      if (err){
        console.log(err)
      }
      res.redirect('/movie/'+movie._id)

    })
  }
  else{
    Movie.findById(id,function (err,movie) {//回调方法，拿到数据库中找的movie。
      if (err){
        console.log(err)
      }
      _movie=_.extend(movie,movieObj);//将数据合并，因为id式自动生成的，不会存在合并之后id有变化,
      _movie.save(function (err,movie) {
        if (err){
          console.log(err)
        }
        res.redirect('/movie/'+movie._id)

      })
    })
  }
  
});



//后台录入页
router.get('/admin/movie',function (req,res) {
  res.render('admin',{
    title:'后台录入页'
    // movies:{
    //   title:'',
    //   doctor:'',
    //   country:'',
    //   language:'',
    //   flash:'',
    //   poster:'',
    //   year:'',
    //   summary:''
    // }
  })
});



module.exports = router;
