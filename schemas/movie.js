
var mongoose = require('mongoose');
var mongodb=require('mongodb');
var MovieSchema=new mongoose.Schema({
    title:String,
    doctor:String,
    country:String,
    language:String,
    flash:String,
    poster:String,
    year:Number,
    summary:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }

});

// MovieSchema.pre("save",function (next) {//每次存数据之前都会调用该方法
//     if(this.isNew){//数据是否新加
//         this.meta.createAt=this.meta.updateAt=Date.now();
//     }else{
//         this.meta.updateAt=Date.now();
//     }
//     next();//调用next，将存储流程走下去，直到你运行下一次next()，内部处于暂停状态，但不影响外部运行。
// });
// MovieSchema.static={
//     fetch:function (cb) {
//         return this.find({}).sort('meta.updateAt').exec(cb);//由于MovieSchema已经定义了meta.updateAt,exec(cb)执行完后回调函数。
//         //exec(cb)意思是，执行查询并将查询结果传入回调函数cb。cb是回调函数，exec是发出调用回调函数的命令。
//     },
//     findById:function (id,cb) {
//         return this.findOne({_id:id}).exec(cb);
//     }
// };


module.exports = MovieSchema;//原型定义方法
