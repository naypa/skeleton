requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //paths config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        Raphael: 'raphael'
    }
});

// Espace global de l'application
define('window', [], window);

// 
require(
    ['window', 'Raphael'],
    function(
        window, Raphael
    ) {                
        var body = document.getElementsByTagName('body')[0], myDiv = document.createElement('div');
        
        body.appendChild(myDiv);
        myDiv.id = 'holder';
        
        Raphael.fn.ball = function (x, y, r, h) {
            var hue = h || '0.7', s;
            
            s = this.set(
                this.ellipse(x, y + r - r / 5, r, r / 2).attr({fill: "rhsba(" + hue + ", 1, .25, 1.0)-hsba(" + hue + ", 1, .25, 0.0)", stroke: "none"}),
                this.ellipse(x, y, r, r).attr({fill: "r(.5,.9)hsba(" + hue + ", 1, .75, 1.0)-hsba(" + hue + ", .5, .25, 1.0)", stroke: "none"}),
                this.ellipse(x, y, r - r / 5, r - r / 20).attr({stroke: "none", fill: "r(.5,.1)rgba(200,200,200,1)-rgba(200,200,200,0)", })
            );
                        
            return s;
        };
        
        var R = Raphael('holder'), b1, b2, b3;
            
        R.setSize(600, 600);
        
        b1 = R.ball(100, 100, 80, Math.random()); 
        b2 = R.ball(100, 300, 80, Math.random());
        b3 = R.ball(100, 500, 80, Math.random());
        
        b2.scale(2, 1, 20, 300);
        b3.scale(3, 1, 20, 500);
    }
);