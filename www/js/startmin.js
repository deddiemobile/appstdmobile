//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
var wurl='https://apps.deddie.gr/AppWS/AppServices/';
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});

//
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 						  
}


 function loadMain(lib) {   

          var relflg = sessionStorage.getItem('rel');
           var datac = localStorage.getItem('lib_'+lib);
            if ( datac != null && relflg == null ){
                var script = "<script type=\"text/javascript\">"+datac+" </script>";
                $('body').append(script);//incorporates and executes inmediatelly
                
            }
      
        else if ( localStorage.getItem("OfflineMode") != null ){
             //get the latest version from local storage
            var data = localStorage.getItem('lib_'+lib);
            if ( data != null ){
                var script = "<script type=\"text/javascript\">"+data+" </script>";
                $('body').append(script);//incorporates and executes inmediatelly
                
            }

          }//if 
         else{//online
         
         //------------------------
          $.ajax({
             url:"https://apps.deddie.gr/AppWS/AppServices/invokeMethod",
             type: "GET",
             timeout:3000,
             async: false,
             cache: false,
             success: function(data, textStatus, jqXHR) {

    	        	 $.ajax({
                    //url: wurl+'loadMainLib?token='+token+'&code='+lib,
                    url: wurl+'loadMainLib?token=&code='+lib,
                    headers:  {    					            
		             	'token' : token
		             },
    		        type: "GET",
    		        data: null,//{ s : "HELLO" },
    			    async:false,
    		        dataType: "text",
    		        success: function(data, textStatus, jqXHR) {
                
    		        	var script = "<script type=\"text/javascript\">"+data+" </script>";
                       
    		        	$('body').append(script);//incorporates and executes inmediatelly
                        
                        //keep the latest version in local storage
                        localStorage.setItem('lib_'+lib,data);                    
                                            
    
    
    		        },
    		        error: function(jqXHR, textStatus, errorThrown) {
    
                        alert(jqXHR.status + " " + jqXHR.statusText+" "+errorThrown);
    
    		        }

		        });
	         },
             error: function(jqXHR, textStatus, errorThrown) {
                   
		        	localStorage.setItem("OfflineMode","1");
                    loadMain(lib);//call with offline
		      }

    	    });
         //-----------------------
                    

         }//online                              


}//load js

function loadCSS(lib) {              
         
          var relflg = sessionStorage.getItem('rel');
           var datac = localStorage.getItem('lib_'+lib);
            if ( datac != null && relflg == null ){          
                $('head').append('<style>'+datac+'</style>');
                
            }
         else if ( localStorage.getItem("OfflineMode") != null ){
             //get the latest version from local storage
            var data = localStorage.getItem('css_'+lib);
            if ( data != null ){                
                $('head').append('<style>'+data+'</style>');
                
            }

          }//if
         else{//online
         
         
          $.ajax({
                 url:"https://apps.deddie.gr/AppWS/AppServices/invokeMethod",
                 type: "GET",
                 async: false,
                 timeout:3000,
                 cache: false,
                 success: function(data, textStatus, jqXHR) {
    
    	        	     $.ajax({
                            //url: wurl+'loadMainLib?token='+token+'&code='+lib,
                            url: wurl+'loadMainLib?token=&code='+lib,
                            headers:  {    					            
        	                'token' : token
                            },
                	        type: "GET",
            		        data: null,//{ s : "HELLO" },
            			    async:false,
            		        dataType: "text",
            		        success: function(data, textStatus, jqXHR) {
            
            		        	$('head').append('<style>'+data+'</style>');
                                
                                //keep the latest version in local storage
                                localStorage.setItem('css_'+lib,data);                    
                                
                                
            
            
            		        },
            		        error: function(jqXHR, textStatus, errorThrown) {
            
                                alert(jqXHR.status + " " + jqXHR.statusText+" "+errorThrown);
            
            		        }
            
            		    });
    	         },
                 error: function(jqXHR, textStatus, errorThrown) {
                       
    		        	localStorage.setItem("OfflineMode","1");
                        loadCSS(lib);
    		      }

    	    });
                    

         }//online                              


}//load js

 function loadJS(page) {

         if ( localStorage.getItem("OfflineMode") != null ){
             //get the latest version from local storage
            var data = localStorage.getItem('cache_'+page);
            if ( data != null ){
                var script = "<script type=\"text/javascript\">"+data+" </script>";
                $('body').append(script);//incorporates and executes inmediatelly
            }

          }//if
         else{//online

            $.ajax({
    	        //url: wurl+'loadJS?token='+token+'&code='+page,
                url: wurl+'loadJS?token=&code='+page,
                headers:  {    					            
                	'token' : token
                },
		        type: "GET",
		        data: null,//{ s : "HELLO" },
			    async:false,
		        dataType: "text",
		        success: function(data, textStatus, jqXHR) {

		        	var script = "<script type=\"text/javascript\">"+data+" </script>";
		        	$('body').append(script);//incorporates and executes inmediatelly

                    //keep the latest version in local storage
                    localStorage.setItem('cache_'+page,data);


		        },
		        error: function(jqXHR, textStatus, errorThrown) {

                    alert(jqXHR.status + " " + jqXHR.statusText+" "+errorThrown);

		        }

		    });

         }//online


		}//load js

    //--------------------
    function loadMapKey(page) {

         if ( localStorage.getItem("OfflineMode") != null ){
             //get the latest version from local storage
            var data = localStorage.getItem('cache_'+page);
            if ( data != null ){                
               var script = " <script async defer src=\""+data+"\"></script>";
                $('body').append(script);//incorporates and executes inmediatelly
            }

          }//if
         else{//online

            $.ajax({
    	        //url: wurl+'loadJS?token='+token+'&code='+page,
                url: wurl+'loadJS?token=&code='+page,
                headers:  {    					            
                	'token' : token
                },
		        type: "GET",
		        data: null,//{ s : "HELLO" },
			    async:false,
		        dataType: "text",
		        success: function(data, textStatus, jqXHR) {

		        	var script = " <script async defer src=\""+data+"\"></script>";
		        	$('body').append(script);//incorporates and executes inmediatelly

                    //keep the latest version in local storage
                    localStorage.setItem('cache_'+page,data);


		        },
		        error: function(jqXHR, textStatus, errorThrown) {

                    alert(jqXHR.status + " " + jqXHR.statusText+" "+errorThrown);

		        }

		    });

         }//online


		}//load map key


//---------------Login Page---------------------
      function getAppsByUser(){
        	
			var usr = document.getElementById('user').value;
			usr = usr.toLowerCase();
			
			if ( usr == '' )
				usr = 'dummy';//as criteria for not getting something
			
			//clear select values	 			
			$('option', '#sapp').remove();
			
			allapps = '';
						 	
		 	
		 	$.ajax({
	        url: wurl+'invokeMethod?methodName=getAppsByUser&criteriaW='+usr, 
	        type: "GET",
	        data: null,//{ s : "HELLO" },			        
	        dataType: "text", 
	        async:false,       			        
		        success: function(data, textStatus, jqXHR) {
		        	//rdata = $(data).text();
		        	var rdata = data; 
		        				        	
		        				        	
		        	var line = rdata.split("|nl|");
					 for ( ln in line ){														 	
						
						if ( ln == line.length-1)
							continue;	
							
						if ( ln == 0 )
							continue;							
					 	
					 	var vals = line[ln].split("|#|");
					 	
					 	var key = vals[0];
					 	var sval = vals[1];						 															
						
						
						$("#sapp").append($('<option></option>').attr("value", key).text(sval));
						
						//allapps
						allapps = allapps+key+':'+sval+'|,|';
																				
													
					 	
					 }//for line
					 						 
					 										 		
		        			        	 				 				 				
		        }
	        
	        });
		 		 	 
	 				 	 
		}//getAppsByUser        		 																	 	 	
	 	
	 	
	 	function loginMobileUser() {		 			 				 	             
                                
           // if ( $('#clr').attr("checked") ){            
                
                //keep possible executions
                var ofe = localStorage.getItem('offlineDynMethodsExecutions');
                var ofm = localStorage.getItem('offlineImageUploading');                
                localStorage.clear();
                
                //re -set the possible executions
                if ( ofe != null )
                    localStorage.setItem('offlineDynMethodsExecutions',ofe);
                if ( ofm != null )  
                    localStorage.setItem('offlineImageUploading', ofm);                
                                
            //}
            
	 		var usr = document.getElementById('user').value;
	 		var pwd = document.getElementById('pass').value;                                       
	 			 		
            //--
            $('#userErr').hide();
            $('#passErr').hide();
            $('#genErr').hide();
                        
            if ( $('select[name=sapp]').val() == null || $('select[name=sapp]').val() == '' ){
                 $('#genErr').html("Η Εφαρμογή Βρέθηκε Κενή!");
    		 	 $('#genErr').show();
                  
                  return;
			 								 								 			 			 	
            }
                      
            
            
                var data = { usr : usr, pwd: pwd, flg: "mobile" }; 
	 		
			    $.ajax({
                    
                    url: wurl+"loginPost", 
    		        type: "POST",
			        data: data,
			        //url: wurl+"login?usr="+encodeURIComponent(usr)+"&pwd="+encodeURIComponent(pwd), 
			        //type: "GET",
			        //data: null,//{ s : "HELLO" },			        
			        dataType: "text",        			        
			        success: function(data, textStatus, jqXHR) {
			           //var res = $(data).text();
			           var res = data;
			           				           
			            
			           if ( res.indexOf('USR') > -1 ){
			        	   var msg = getMsg(res);	
			        	   $('#userErr').html(msg);
			        	   $('#userErr').show();
			           }
			           else if ( res.indexOf('CHANGE_PWD') > -1 ){
			 				res = res.substring(0,res.indexOf('CHANGE_PWD')); 
			 				localStorage.setItem('token', res);
			 				localStorage.setItem('app_id', $('select[name=sapp]').val());
			 				localStorage.setItem('force_chpass', '1');
			 				window.location.href = 'mobile.html';
			 			}
			           else if ( res.indexOf('PWD') > -1 ){
			        	   var msg = getMsg(res);	
			        	   $('#passErr').html(msg);
			        	   $('#passErr').show();
			           }			        	   			           
			           else if ( res.indexOf("EMPTY") > -1 || res.indexOf("INVALID") > -1 || res.indexOf("INCORRECT") > -1 || res == "LOGIN_FAILED"){
			 				var msg = getMsg(res);
			 				 $('#genErr').html(msg);
			 				 $('#genErr').show();
			 								 								 			 
			 			}
			 			else{
			 				localStorage.setItem('token', res); 
			 				localStorage.setItem('app_id', $('select[name=sapp]').val());			 				
			 				window.location.href = 'mobile.html';
			 			}		 							 							 						 				 		
			           		          
			           
			        },
			        error: function(jqXHR, textStatus, errorThrown) {
			        	//alertify.alert(jqXHR.status + " " + jqXHR.statusText);
			        	 $('#genErr').html(jqXHR.status + " " + jqXHR.statusText);
		 				 $('#genErr').show();                       
			        }
			         			         
			    });				    				  
			    
			   
			    				    		    				    				   
			}
            
        function getMsg(code){
        
            //always cache
            if ( localStorage.getItem('msg_'+code) != null ){
                
                return localStorage.getItem('msg_'+code);
                
            }else{
                
                            
                var rdata = code;

        	 	$.ajax({
    	        url: wurl+'getMsg?code='+code,
    	        type: "GET",
    	        data: null,//{ s : "HELLO" },
    	        dataType: "text",
    	        async:false,
    		        success: function(data, textStatus, jqXHR) {
    		        	//rdata = $(data).text();
    		        	rdata = data;
                        localStorage.setItem('msg_'+code,rdata);
    		        }
    
    	        });
    
                
            }//else

		 	

		 	 return rdata;
	 }//getMsg
     
     function checkMobileVersion(){
            
    	
            //keep the latest version in local storage
            localStorage.setItem('current_version','3.04');

        	 if ( localStorage.getItem("OfflineMode") != null )
        		return;//when offline not check version
        
                    $.ajax({
                        //url: wsurl+'invokeMethod?methodName=getMobileVersion&token='+token,
                        url: wsurl+'invokeMethod?methodName=getMobileVersion&token=',
                        headers:  {        				            
                    	'token' : token
                        },
        		        type: "GET",
        		        data: null,//{ s : "HELLO" },
        			    async:false,
        		        dataType: "text",
        		        success: function(data, textStatus, jqXHR) {
        
                           var line = data.split("|nl|");
                           for ( ln in line ){
                            if ( ln == line.length-1)
                               continue;
                            if ( ln == 0 )
                              continue;
        
                           var vals = line[ln].split("|#|");
                           var last_version = vals[0];
                           var current_version = localStorage.getItem('current_version');
                           //if ( last_version != current_version )
                            //alert("Υπάρχει νέα έκδοση λογισμικού!");
        
                          }//for
        
        
        
        		        },
        		        error: function(jqXHR, textStatus, errorThrown) {
        
                            alert(jqXHR.status + " " + jqXHR.statusText+" "+errorThrown);
        
        		        }
        
        		    });
        
        }
	 		 	
	 	  
