
var CanvasMenu = {
    ctx: {},
    links: [],
    buttonHeight: 30,
    buttonWidth: 200,
    ActiveButton: -1,
    AniCnv: {},
    Lines: {},
    top: 70,
    left: 20
};

$(document).ready(function()
{
   //start the menu 
   $( '#canvasMenu' ).makeMenu();
});

jQuery.fn.makeMenu = function()
{
   CanvasMenu.canvas = $( this )[0];
   var css = {
      'z-index': "3",
      'cursor': 'pointer',
      'position': 'absolute',
      'top': CanvasMenu.top.toString() + 'px',
      'left': CanvasMenu.left.toString() + 'px',
   };

   $(CanvasMenu.canvas).css( css );
   CanvasMenu.ctx = CanvasMenu.canvas.getContext('2d'); 
    
   var menu = $(this).find('ul li');
    
    //set height of canvas element
    CanvasMenu.canvas.height = menu.length * CanvasMenu.buttonHeight;
    CanvasMenu.canvas.width = CanvasMenu.buttonWidth;
    
    menu.each( function( i, d )
    {
        var link = $(d).find('a');
        CanvasMenu.links.push( $(link) );
        $(link).createTextLink( i );
    });
    // add Event handlers
    $( CanvasMenu.canvas ).bind("mousemove",menu.length, buttonHover);
    $( CanvasMenu.canvas ).bind("mouseout" ,menu.length, mouseoutHandler);
    $( CanvasMenu.canvas ).bind("click", menu.length,  buttonActions);
    
    createAnimationLayer();
};

function mouseoutHandler(){
    // hide animation canvas
    $( CanvasMenu.AniCnv ).css( 'top', "-3000px" );
}


function buttonActions(  event )
{
    var ypos =  event.clientY - CanvasMenu.top;
    for( var i = 0; i < event.data; i++ )
    {
       if(ypos > i* CanvasMenu.buttonHeight && ypos < (i+1)* CanvasMenu.buttonHeight)
       {
            alert( CanvasMenu.links[i][0].href );
       }
    }
}

function buttonHover( event )
{   
    for( var i = 0; i < event.data; i++ )
    {
       var ypos =  event.clientY - CanvasMenu.top;
       if( ypos > i* CanvasMenu.buttonHeight && ypos < (i+1)* CanvasMenu.buttonHeight)
       {
           CanvasMenu.links[i].createHoverTextLink( i );
       }else{
           CanvasMenu.links[i].createTextLink( i );
       }
    }
}

jQuery.fn.createTextLink = function( index )
{
    CanvasMenu.ctx.textBaseline = 'top';
    CanvasMenu.ctx.font         = 'bold 30px sans-serif';
    CanvasMenu.ctx.fillStyle    = '#f00';
    CanvasMenu.ctx.fillText( $(this).text(), 10, index*CanvasMenu.buttonHeight); 
    CanvasMenu.ctx.fillStyle    = '#000';
    CanvasMenu.ctx.strokeText( $(this).text(), 10, index*CanvasMenu.buttonHeight); 
    
};

jQuery.fn.createHoverTextLink = function( index )
{
    CanvasMenu.ctx.textBaseline = 'top';
    CanvasMenu.ctx.font         = 'bold 30px sans-serif';
    CanvasMenu.ctx.fillStyle    = '#fff';
    CanvasMenu.ctx.fillText( $(this).text(), 10, index*CanvasMenu.buttonHeight);
    CanvasMenu.ctx.fillStyle    = '#000';
    CanvasMenu.ctx.strokeText( $(this).text(), 10, index*CanvasMenu.buttonHeight);
    
    // reposition the animation canvas
    var mtop = (index*CanvasMenu.buttonHeight) + CanvasMenu.top;
    $( CanvasMenu.AniCnv ).css( 'top', mtop ).css( 'left', CanvasMenu.left );
};

function createAnimationLayer()
{
    CanvasMenu.AniCnv = document.createElement('canvas');
     var css = {
        'z-index': "2",
        'position': "absolute",
        'top': "-3000px",
        'left': "0px"
     };
    $( CanvasMenu.AniCnv ).css( css );
    
    CanvasMenu.AniCnv.height=CanvasMenu.buttonHeight;
    CanvasMenu.AniCnv.width= CanvasMenu.buttonWidth;
    document.body.appendChild(CanvasMenu.AniCnv);

    var context = CanvasMenu.AniCnv.getContext('2d');

    // create the animation objects
    CanvasMenu.Lines = [];
    for( var i = 0; i < 10; i++ )
    {
        var rcolor = "rgba(" + Math.round(255 * Math.random() ) + ",0,0, " + 0.6 + ")";
        CanvasMenu.Lines.push(new Line( context, rcolor, Math.random()*10, CanvasMenu.buttonWidth, (Math.random()*20), (Math.random()*2 - 2) )  ); 
        CanvasMenu.Lines[i].Create();
    }
    // start animation
    setInterval(draw,40); 
}

function draw(){
    var context = CanvasMenu.AniCnv.getContext('2d');
    context.clearRect(0,0, 200,30);

    for (i in CanvasMenu.Lines) 
    {
        CanvasMenu.Lines[i].y += CanvasMenu.Lines[i].speedy;
        // Boundary checking
        CanvasMenu.Lines[i].Bounce();
        //create all the lines each frame
        CanvasMenu.Lines[i].Create();
    }
}

//animated object
function Line( ctx, color, linew, length, y, speedy )
{
    this.context = ctx;
    this.length = length;
    this.linew = linew;
    this.y  = y;
    this.speedy = speedy;
    this.color = color;
}

Line.prototype.Create = function ()
{    
    this.context.strokeStyle  = this.color;
    this.context.lineWidth = this.linew;
    this.context.beginPath();
    this.context.moveTo( 0, this.y );
    this.context.lineTo( this.length, this.y );
    this.context.closePath();
    this.context.stroke();
}

Line.prototype.Bounce = function ()
{   
    if (this.y >= (CanvasMenu.buttonHeight) || this.y <= 0 )
    {
            this.speedy *= -1;
    }
}