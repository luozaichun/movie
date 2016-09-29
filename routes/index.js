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
      //
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
});


//更新页面
router.get('/admin/update/:id',function (req,res) {
  var id=req.params.id;

  if (id){
    Movie.findById(id,function (err,movie) {
      if(err){
        console.log(err)
      }
      console.log(id);
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

  if (id==undefined){//前台提交的时候,如果id不是undefined,切在mongo中不存在这条数据,就会出这问题~直接nodejs服务崩溃了
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
  else{
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
