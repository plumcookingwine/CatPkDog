
cc.Class({
    extends: cc.Component,

    properties: {
        target: {
          default: null,
          type: cc.Prefab,
        },
    },
    
    
    start : function () {
   
    },

    // use this for initialization
    onLoad: function () {
        // var anim = this.anim;
        var node = this.node;
        var self = this;
        var tar = this.target;

        node.on('touchstart', function(event){
            var touches = event.getTouches();
            for(var i=0;i<touches.length;i++){
                var x = touches[i].getLocationX();
                var y = touches[i].getLocationY();
                var scene = cc.director.getScene();
                var boomNode = cc.instantiate(self.target);
            
                boomNode.parent = scene;
                boomNode.setPosition(x, y);
                // 1.3 秒后销毁目标节点
                setTimeout(function () {
                  boomNode.destroy();
                }.bind(self), 1250);
     
            }
            
        }).bind(this);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
