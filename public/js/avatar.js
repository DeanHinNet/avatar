$(document).ready(function(){
	$(window).click(function() {
			var $table = $('#tbl'),
	    $bodyCells = $table.find('tbody tr:first').children(), colWidth;
	   
	    // Get the tbody columns width array
	    colWidth = $bodyCells.map(function() {
	        return $(this).width();
	    }).get();
	    
	    // Set the width of thead columns
	    $table.find('thead tr').children().each(function(i, v) {
	        $(v).width(colWidth[i]);
	    });
	});
		
	$('#edit').click(function(){
		if($('#edit').is(':checked'))
		{
			$('#tbl > tbody > tr:not(:first) input[type=text]').removeClass('entry-off');
			$('#tbl > tbody > tr:not(:first) input[type=text]').addClass('entry-on');
			$('#col-up').removeClass('entry-off');
			$('#col-up').addClass('entry-on');
		}
		else
		{
			$('#tbl > tbody > tr:not(:first) input[type=text]').addClass('entry-off');
			$('#tbl > tbody > tr:not(:first) input[type=text]').removeClass('entry-on');
			$('#col-up').removeClass('entry-on');
			$('#col-up').addClass('entry-off');
		}
		$('.update-btn').toggle();
	});

	$('#doc-info-btn').click(function(){
		$('#doc-table').toggle();
	});
});