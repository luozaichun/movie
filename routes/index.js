var express = require('express');
var router = express.Router();


//首页
router.get('/',function (req,res) {
  res.render('index',{
    title:'电影首页',
    movies:[{
      title:'最后的巫师猎人',
      poster:'http://r1.ykimg.com/05160000568231DE67BC3C3A0203D5A2',
      _id:1,
      actor:"范·迪塞尔、伊利亚·伍德",
      play_num:"222.0万"
    },
      {
        title:'极限挑战',
        poster:'http://r1.ykimg.com/05160000569DD94A67BC3C1A3C07E838',
        _id:2,
        actor:"黄渤、王迅",
        play_num:"158.5万"
      },
      {
        title:'唐人街探案',
        poster:'http://r1.ykimg.com/051600005672582F67BC3C67550470C2',
        _id:3,
        actor:"王宝强、刘昊然",
        play_num:"146.7万"
      },
      {
        title:'陆垚知马俐',
        poster:'http://r1.ykimg.com/0516000057B13B7667BC3C0EA70A4ED6',
        _id:4,
        actor:"包贝尔、宋佳",
        play_num:"121.2万"
      },
      {
        title:'冰川时代4',
        poster:'http://r1.ykimg.com/0516000051B2E5BC6758391F6B05BFC4',
        _id:5,
        actor:"雷·罗马诺、约翰·雷吉扎莫",
        play_num:"68.4万"
      },
      {
        title:'致青春:原来你还在这里',
        poster:'http://r1.ykimg.com/0516000057A43F6167BC3C45190E4A8D',
        _id:6,
        actor:"吴亦凡、刘亦菲",
        play_num:"61.9万"
      },
      {
        title:'暴走看啥片儿 第三季',
        poster:'http://r1.ykimg.com/0516000055E69EE967BC3C14020324DE',
        _id:7,
        actor:"王尼玛",
        play_num:"52.7万"
      }

    ]
  })
});

//列表页
router.get('/movie/list',function (req,res) {
  res.render('list',{
    title:'电影列表页'
  })
});

//电影详细页
router.get('/movie/:id',function (req,res) {
  res.render('detail',{
    title:'电影详细页'
  })
});

//后台录入页
router.get('/admin/movie',function (req,res) {
  res.render('admin',{
    title:'后台录入页'
  })
});


module.exports = router;
