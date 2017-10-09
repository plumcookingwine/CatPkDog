var Global = require('Global');
var scores = '0';
cc.Class({
    extends: cc.Component,

    properties: {
        acount : 60,
        timer: {
            default: null,
            type: cc.Label
        },
        score: {
            default: null,
            type: cc.Label
        }
     
    },
    
    update : function (dt) {
        this.acount -= dt;
        this.timer.string = this.acount.toFixed(2) + ' s';
        scores = this.score.string;
        if(this.acount < 0) {
            Global.score = scores;
            this.timer.string = "0.00 s";
             this.unschedule(this.callback);
             //切换场景 
             cc.director.loadScene("scene_over");
        }
    },

    onLoad: function () {

    },
});
