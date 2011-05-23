var model = {
    context: {},
    cnv: {},
    angle: 0,
    width: 100,
    bgColor: "#ff0000"
};

$(document).ready(function(){
    //start the menu 
    $( '#canvas' ).css( "background-color", "#000000" ).setUpCanvas();
});

jQuery.fn.setUpCanvas = function(){
    // setup canvas
    model.cnv = $( this )[0];
    model.context = model.cnv.getContext('2d'); 
   
    var cX, cY;
    var mX, mY = 0;
    var offX, offY;
    
    //init canvas
    function updateRectangle(ang){
        model.context.clearRect(0, 0, 300, 300);
        model.cnv.width = model.cnv.width;
        
        offX = model.cnv.offsetLeft;
        offY = model.cnv.offsetTop;
        
        model.context.setTransform(1,0,0,1,0,0);
        var x = 100;
        var y = 100;
        var width = model.width;
        var height = 100;
        cX = x + width*0.5;
        cY = y + height*0.5;
        model.context.translate(x + .5*width, y + .5*height);
        model.context.rotate(ang);
        model.context.fillStyle = model.bgColor;
        model.context.fillRect(-0.5*width, -0.5*height, width, height);
    }
    updateRectangle(model.angle);// display the rectangle/square
    
    $( model.cnv ).mousedown(function(event){
        // calculate click angle minus the last angle
        var clickAngle = getAngle( cX + offX, cY + offY, event.clientX, event.clientY  ) - model.angle;
        $( model.cnv ).bind("mousemove", clickAngle, function(event){
            // calculate move angle minus the angle onclick
            model.angle =  ( getAngle( cX + offX, cY + offY, event.clientX, event.clientY  ) - clickAngle);
            updateRectangle(model.angle);
        });
    });
   
   /**
    * Remove listener
    */
    $( model.cnv ).mouseup(function(){
        $( model.cnv ).unbind("mousemove" );
    });
    
    /**
     * switch button for demonstration
     */
    $('#switchButton').toggle(
       function(){
          $(this).text("change to square");
          model.width = 150;
          model.bgColor = "#0000ff";
          updateRectangle(model.angle);
       },
       function(){
           $(this).text("change to rectangle");
           model.width = 100;
           model.bgColor = "#ff0000";
           updateRectangle(model.angle);
       });
   
};

/**
 * angle helper function
 */
function getAngle( cX, cY, mX, mY ){
    var angle = Math.atan2(mY - cY, mX - cX);
    return angle;
}
