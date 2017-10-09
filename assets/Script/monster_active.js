var speed = 0.1;
var state;
var kinds = 0;
var onces = 0;

var monsterActive = {
    
    clickMonster: function() {
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
        
    },
    
    addScore: function(lScore) {
        var adds = 0;
        if(kinds === 0){ adds = 100 }
        if(kinds === 1){ adds = 200 }
        if(kinds === 4){ adds = 400 }
        if(kinds === 2){ adds = 500 }
        lScore.string = parseInt(lScore.string) + adds + "";
    },
    
    playAnim: function(self, sprite, anim, bloom, clips) {
        sprite.runAction(cc.flipY(false));
        anim.play('run');
       
        var o = cc.random0To1();
        if (o <= 0.25) {
           state = anim.playAdditive(clips[0]);
        }else if(o > 0.25 && o <= 0.5){
           state = anim.playAdditive(clips[1]);
        }else if(o > 0.5 && o < 0.75){
            state = anim.playAdditive(clips[2]);
        }else{
            state = anim.playAdditive(clips[3]);
        }
        state.speed = speed;
        self.scheduleOnce(function(){
            var i = cc.random0To1();
            if(i >= 0.4){ speed = 0.35; sprite.color = new cc.Color(255, 255, 255); onces = 0; }
            if(i < 0.4) { speed = 0.5; sprite.color = new cc.Color(0, 216, 255); onces = 1; }
            if(i < 0.15){ speed = 0.2; sprite.color = new cc.Color(255, 34, 148); onces = 4; }
            if(i < 0.05){ speed = 0.4; sprite.color = new cc.Color(255, 180, 0); onces = 2; }

            kinds = onces;
            state.speed = speed;
            bloom.totalLength = 100;
            sprite.rotation = 0;
        }, 0.1);
    },
    
}

module.exports = monsterActive;