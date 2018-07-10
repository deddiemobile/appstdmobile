jQuery.fn.tableToCSV = function() {
    
    var clean_text = function(text){
        text = text.replace(/"/g, '""');
        return '"'+text+'"';
    };
    
	$(this).each(function(){
			var table = $(this);
			var caption = $(this).find('caption').text();
			var title = [];
			var rows = [];

			$(this).find('tr').each(function(){
				var data = [];
				$(this).find('th').each(function(){
                    var text = clean_text($(this).text());
					title.push(text);
					});
				$(this).find('td').each(function(){
                    var text = clean_text($(this).text());
					data.push(text);
					});
				data = data.join(",");
				rows.push(data);
				});
			title = title.join(",");
			rows = rows.join("\n");

			var csv = title + rows;
			
			var ms_ie = false;
		    var ua = window.navigator.userAgent;
		    var old_ie = ua.indexOf('MSIE ');
		    var new_ie = ua.indexOf('Trident/');
		    if (old_ie > -1 || new_ie > -1) {
		        ms_ie = true;
		    }
			if (ms_ie ) {    
			    var oWin = window.open();
			    oWin.document.write('sep=,\r\n' + csv);
			    oWin.document.close();
			    oWin.document.execCommand('SaveAs', true, "export" + ".txt");
			    oWin.close();
			 } else{
				 
				 	var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
					var download_link = document.createElement('a');
					download_link.href = uri;
					var ts = "export"
					if(caption==""){
						download_link.download = ts+".txt";
					} else {
						download_link.download = caption+"-"+ts+".txt";
					}
					document.body.appendChild(download_link);
					download_link.click();
					document.body.removeChild(download_link);
				 
			 }//  
			
			
	});
    
};
