/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var View = function () {
	var updateView = function ( todos ) {	
            $('#todoList li').remove();
            for( var i = 0, len = todos.length; i < len; i++ ){
                $('#todoList').append( "<li>" + todos[i] + " <a data-index='" + i + "' href='#'>remove</a></li>" );
            }
	};
        
        //set the handlers for the view
        var initView = function(){
            //add
            $("#addTodoButton").on("click", function(){
                var event = jQuery.Event("addItem");
                event.todo = $('#addTodo')[0].value;
                $('body').trigger(event);
                $('#addTodo')[0].value = '';
            });
            // track enter key
            $('#addTodo').on("keypress", function(e){
              if(e.which == 13){
                var event = jQuery.Event("addItem");
                event.todo = $('#addTodo')[0].value;
                $('body').trigger(event);
                $('#addTodo')[0].value = '';
               }
              });

            //delete
            $('#todoList a').live("click", function(e){
                var $todo = e.currentTarget;
                var event = jQuery.Event("deleteItem");
                event.index = $($todo).attr('data-index');
                $('body').trigger(event);
            }); 
        };
        initView();
        
	return  {
		updateView: function (todos) {
                    updateView(todos);
		}
	};
};





