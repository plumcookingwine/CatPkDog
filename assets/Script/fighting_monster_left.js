var speed = 0.1;
var state;
var kinds = 0;
var onces = 0;

cc.Class({
    extends: cc.Component,
    
    properties: {
        anim : cc.Animation,
        score : {
            default : null,
            type : cc.Label
        },
        sprite : {
            default : null,
            type : cc.Node 
        },
        bloom : {
            default : null,
            type : cc.ProgressBar
        },
        addscore : {
            default : null,
            type : cc.Prefab
        },
        audioSource: {
             type: cc.AudioSource,
             default: null
         },
         parentNode : {
             default : null,
             type : cc.Node
         }
    },
    
    start : function () {
        playAnims(this);
    },
    
    onFinished: function(isCon){
        playAnims(this);
    },
    
    onLoad: function () {
        var anims = this.anim;
        var blooms = this.bloom;
        var lScore = this.score;
        var self = this;
        var nodes = this.sprite;
        var audio = this.audioSource;
       
        if(lScore === null){
            return;
        }
     
        
        this.node.on('touchstart', function ( event ) {
            var d = kinds === 0 ? 1 : kinds;
            if(blooms.totalLength > 0){
                blooms.totalLength  = blooms.totalLength - (1 / d) * 100;
            }
            onces--;
            if(kinds === 4) {
                if(onces === 3) {
                    nodes.color = new cc.Color(228, 12, 180);
                } else if (onces === 2) {
                    nodes.color = new cc.Color(189, 0, 178);
                } else {
                    nodes.color = new cc.Color(160, 0, 179);
                }
            }
            if(kinds === 2) {
                if(onces === 1) {
                   nodes.color = new cc.Color(255, 150, 0); 
                }
            }
            if(onces === 0 || (kinds === 0 && onces === -1)){
                audio.play();
                cc.log('onces ==' + onces);
                // nodes.color = new cc.Color(255, 255, 255);
                addScore(lScore);
                anims.stop(state.name);
                var seq = cc.sequence(cc.moveBy(0.5, 0, 100), cc.flipY(true), cc.rotateBy(0.1, 30), cc.moveBy(0.3, 0, -130), finished);
                nodes.runAction(seq);
            }
        });
        
        var finished = cc.callFunc(function(target, isFinished) {

                var addNode = cc.instantiate(self.addscore);
                addNode.parent = self.parentNode;
                addNode.setPosition(this.node.x, this.node.y + 75);
                var addscoreLabel = addNode.getComponent(cc.Label);
                if(kinds === 0) { 
                    addscoreLabel.string = '+100'; 
                    // addNode.color = new cc.Color(255, 255, 255); 
                }
                if(kinds === 1) { 
                    addscoreLabel.string = '+200';
                    // addNode.color = new cc.Color(0, 216, 255); 
                }
                if(kinds === 4) { 
                    addscoreLabel.string = '+400'; 
                    // addNode.color = new cc.Color(160, 0, 179); 
                }
                if(kinds === 2) { 
                    addscoreLabel.string = '+500'; 
                    // addNode.color = new cc.Color(255, 150, 0); 
                }
                var addAction = cc.moveBy(0.5, 0, 40);
                addNode.runAction(addAction);
                setTimeout(function() {
                    addNode.destroy();
                }, 2000);
                self.scheduleOnce(function () {
                    if(!state.isPlaying){
                        playAnims(self);
                    }
                }, 0.5);
       
        }, this, true);
    },
});

function addScore(lScore){
    var adds = 0;
    if(kinds === 0){ adds = 100 }
    if(kinds === 1){ adds = 200 }
    if(kinds === 4){ adds = 400 }
    if(kinds === 2){ adds = 500 }
    lScore.string = parseInt(lScore.string) + adds + "";
}

/**
 *  播放动画  
 */
function playAnims(self){
        self.sprite.runAction(cc.flipY(false));
        self.anim.play('run');
       
        var o = cc.random0To1();
        if (o <= 0.25) {
           state = self.anim.playAdditive('left_monster_anim_top');
        }else if(o > 0.25 && o <= 0.5){
           state = self.anim.playAdditive('left_monster_anim');
        }else if(o > 0.5 && o < 0.75){
            state = self.anim.playAdditive('left_monster_anim_b2t');
        }else{
            state = self.anim.playAdditive('left_monster_anim_b2b');
        }
        state.speed = speed;
        self.scheduleOnce(function(){
            var i = cc.random0To1();
            if(i >= 0.4){ speed = 0.35; self.sprite.color = new cc.Color(255, 255, 255); onces = 0; }
            if(i < 0.4) { speed = 0.5; self.sprite.color = new cc.Color(0, 216, 255); onces = 1; }
            if(i < 0.15){ speed = 0.2; self.sprite.color = new cc.Color(255, 34, 148); onces = 4; }
            if(i < 0.05){ speed = 0.4; self.sprite.color = new cc.Color(255, 180, 0); onces = 2; }

            kinds = onces;
            state.speed = speed;
            self.bloom.totalLength = 100;
            self.sprite.rotation = 0;
        }, 0.1);
}



