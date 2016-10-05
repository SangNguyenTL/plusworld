var abc = '';
jQuery(".read_content img").each(function(e){
	abc+=jQuery(this).attr("src").replace(/\/\w\d+\//," ")+"\n";
});
abc;