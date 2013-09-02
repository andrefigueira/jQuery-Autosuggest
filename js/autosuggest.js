/**
 * Autosuggest plugin for drop downs
 *
 *
 * Ajax call needs to return following format:
 *
 * {success: (bool), message: (string), result: (array)}
 *
 * Library: jQuery 1.7+
 *
 * @author     André Figueira <andre.figueira@me.com>
 * @copyright  2013 WideZike
 */
 $.fn.autosuggest = function(options)
{

	var defaults = {
		ajaxUrl: '',
		classes: '',
		width: 200,
		height: null,
		callback: function(){},
		ajaxDelay: 0
	}
	
	var options = $.extend(defaults, options);
	
	var timer = null;
	var elementId =  '#' + $(this).attr('id');
	
	//On click away remove the drop down
	$('body').click(function(e){
	
		$('[rel=' + elementId + ']').remove();
   
   });
   
   //Prevent body click even from propagating on the element itself
   $('.autosuggest-results .autosuggest-result').click(function(e){
	   
	   e.stopPropagation();
	   
   });
   
   //Prevent body click even from propagating on the element itself
   $(elementId).click(function(e){
	   
	   e.stopPropagation();
	   
   });
	
	//The typing even handler
	$(this).keyup(function(e){
	
		//If the key pressed is escape remove the drop down otherwise run the ajax
		if(e.keyCode == 27) //Esc
		{
			
			$('[rel=' + elementId + ']').remove();
			
		}
		else
		{
	
			showAjaxLoader();
			
			//Clears the timeout, this will make the call run when the user stops typing for x seconds
			clearTimeout(timer);
			timer = setTimeout(runAutosuggestAjax, options.ajaxDelay);
		
		}
		
	});
	
	function showAjaxLoader()
	{
	
		var html = '<div class="autosuggest-loader"></div>';
							
		//If the suggest box doesn't exist create it
		if($('[rel=' + elementId + ']').size() < 1)
		{
		
			$(elementId).after('<div rel="' + elementId + '" class="autosuggest-results ' + options.classes + '" style="width:' + options.width + '; height:' + options.height + ';"> ' + html + '</div>');
			
		}
		else
		{
		
			if($('.autosuggest-loader').size() < 1){ $('[rel=' + elementId + ']').append(html);}
			
		}
		
	}
	
	function runAutosuggestAjax()
	{
	
		var query = $(elementId).val();
		
		if(query != '')
		{
		
			$.ajax({
	 			type: 'POST',
				url: options.ajaxUrl,
				data: { 
					query: query
				},
				dataType: 'json',
				success: function(data){
				
					if(data.success)
					{
					
						//There are results, Iterate and create html
						if(data.result != null || data.result != undefined || data.result != 0 || data.result != '')
						{
						
							var html = '';
						
							for(var i = 0; i < data.result.length; i++) 
							{
							
								html = html + '<div class="autosuggest-result autosuggest-result clearfix" data-id="' + data.result[i].id + '" data-title="' + data.result[i].title + '">' +
								'<h1>' + data.result[i].title + '</h1>' +
								'</div>';
							    
							}
							
							$('[rel=' + elementId + ']').html(html);
							
							if($.isFunction(options.callback)) { options.callback.call(this); }
						
						}
						else
						{
							
							//If the suggest box exists remove it
							if($('[rel=' + elementId + ']').size() > 0)
							{
							
								$('[rel=' + elementId + ']').remove();
								
							}
							
						}
						
					}
					else
					{
						
						alert(data.message);
						
					}
				
				}
			});
		
		}
		else
		{
		
			$('[rel=' + elementId + ']').remove();
			
		}
		
	}
 
};