var Global = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
            
        }
    },

    // use this for initialization
    onLoad: function () {
        var score = Global.score;
        cc.log("zong fen shu ===" + score);
        this.label.string = '' + score;
        
        if(score < 100) {
            setTimeout(function() {
                cc.director.loadScene("scene_play");    
            }, 5000);
            
        }
    },

});
