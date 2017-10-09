
var state = null;
var clickable = true;
cc.Class({
    extends: cc.Component,
    
    properties: {
        
        score: {
            default: null,
            type: cc.Label,
        },
        
        preScore: {
            default: null,
            type: cc.Prefab,
        },
        
        preCat: {
            default: null,
            type: cc.Node,
        },
        
        anim: {
            default: null,
            type: cc.Animation,
        },
        
        acount: 1,
        
    },
    
    onFinished: function (isFinished) {
        cc.log("isFinished");
    },
    
    onLoad: function () {
        var self = this;
        var cat = this.preCat;
        var anim = this.anim;
        var addScore = this.preScore;
        var score = this.score;
        clickable = true;
        cat.on("touchstart", function (event) {
            if(clickable) {
                clickable = false;
                cc.log("click == sheep");
                anim.pause(state.name);
                var seq = cc.sequence(cc.moveBy(0.5, 0, 130), cc.flipY(true), cc.moveBy(0.3, 0, -130), finished);
                cat.runAction(seq);
                score.string = parseInt(score.string) - 100 + "";
            }
        }, cat);
            
        var finished = cc.callFunc(function (target, isFinished) {
            var addNode = cc.instantiate(addScore);
            addNode.parent = self.node;
            addNode.setPosition(cat.x, cat.y + 75);
            var addscoreLabel = addNode.getComponent(cc.Label);
            addscoreLabel.string = -100;
            // addscoreLabel.color = new cc.Color(160,0,179);
            var addAction = cc.moveBy(0.5, 0, 40);
            addNode.runAction(addAction);
            setTimeout(function() {
                addNode.destroy();
            }, 2000);
            
            setTimeout(function() {
                anim.stop(state.name);
                clickable = true;
                var seq = cc.sequence(cc.moveBy(0.3, 1000, 1000), cc.flipY(false));
                cat.runAction(seq);
                cat.opacity = 0;
            }, 500);
        } , this , true);
        
    },
    
    update: function (dt) {
        this.acount -= dt;
        var count = this.acount.toFixed(0);
        if(count <= 0) {
            var r = cc.random0To1();
            if(r < 0.33) {
                this.playAnim(this.anim,this.preCat);
            }
            this.acount = 5;
        }
    },
    
    playAnim: function (anim) {
        this.preCat.opacity = 255;
        if(state === null || !state.isPlaying) {
            var o = cc.random0To1();
            if(o<=0.5) {
                anim.playAdditive("run_cat_l");
            }else{
                anim.playAdditive("run_cat_r");
            }
            if (o <= 0.125) {
               state = anim.playAdditive('left_monster_anim_top');
            }else if(o > 0.125 && o <= 0.25){
               state = anim.playAdditive('left_monster_anim');
            }else if(o > 0.25 && o <= 0.375){
                state = anim.playAdditive('left_monster_anim_b2t');
            }else if(o > 0.375 && o <= 0.5){
                state = anim.playAdditive('left_monster_anim_b2b');
            }else if(o > 0.5 && o <= 0.625){
                state = anim.playAdditive('monster_anim_b2b');
            }else if(o > 0.625 && o <= 0.75){
                state = anim.playAdditive('monster_anim_b2t');
            }else if(o > 0.75 && o <= 0.875){
                state = anim.playAdditive('monster_anim_top');
            }else {
                state = anim.playAdditive('monster_anim');
            }
            state.speed = 0.5;
        }
    },
});