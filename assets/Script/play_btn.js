cc.Class({
    extends: cc.Component,

    properties: {
     
    },

    // use this for initialization
    onLoad: function () {
        
        this.node.on('touchstart', function(event){
            cc.director.loadScene("scene_play");
        });
        cc.director.preloadScene('scene_play', function () {
            cc.log('Next scene preloaded');
        });
    },
});
