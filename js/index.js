$(function(){
	
	var BASE_URL = 'file:///C:/Users/andre.figueira.PRISM-DM/Documents/GitHub/jQuery-Autosuggest/';

	$('#test').autosuggest({
		ajaxUrl: BASE_URL + 'ajax/autosuggest.php',
		callback: function(){
				
			$('[rel=#search-query]').find('.autosuggest-result').click(function(){
				
				window.location = $(this).data('title');
				
			});
			
		}
	});
	
});