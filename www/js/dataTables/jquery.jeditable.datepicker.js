/*
 * Datepicker for Jeditable
 *
 * Copyright (c) 2011 Piotr 'Qertoip' Włodarek
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Depends on jQuery UI Datepicker
 *
 * Project home:
 *   http://github.com/qertoip/jeditable-datepicker
 *
 */

// add :focus selector
jQuery.expr[':'].focus = function( elem ) {
  return elem === document.activeElement && ( elem.type || elem.href );
};

$.editable.addInputType( 'datepicker', {

    /* create input element */
    element: function( settings, original ) {
      var form = $( this ),
          input = $( '<input />' );
      input.attr( 'autocomplete','off' );
      form.append( input );
      return input;
    },
    
    /* attach jquery.ui.datepicker to the input element */
    plugin: function( settings, original ) {
      var form = this,
          input = form.find( "input" );

      // Don't cancel inline editing onblur to allow clicking datepicker
      settings.onblur = 'nothing';

      datepicker = {
        onSelect: function() {
          // clicking specific day in the calendar should
          // submit the form and close the input field
          form.submit();         
        },
        
        onClose: function() {
          setTimeout( function() {
            if ( !input.is( ':focus' ) ) {
              // input has NO focus after 150ms which means
              // calendar was closed due to click outside of it
              // so let's close the input field without saving
              original.reset( form );
            } else {
              // input still HAS focus after 150ms which means
              // calendar was closed due to Enter in the input field
              // so lets submit the form and close the input field
              form.submit();
            }
            
            // the delay is necessary; calendar must be already
            // closed for the above :focus checking to work properly;
            // without a delay the form is submitted in all scenarios, which is wrong
          }, 150 );
        },
        dateFormat: 'dd-mm-yy',
        monthNames: [ "Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος",
            			"Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος" ],
        monthNamesShort: [ "Ιαν","Φεβ","Μαρ","Απρ","Μαι","Ιουν",
		          			"Ιουλ","Αυγ","Σεπ","Οκτ","Νοε","Δεκ" ],
		dayNames: [ "Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο" ],
		dayNamesShort: [ "Κυρ","Δευ","Τρι","Τετ","Πεμ","Παρ","Σαβ" ],
		dayNamesMin: [ "Κυ","Δε","Τρ","Τε","Πε","Πα","Σα" ]
        
      };
    
      if (settings.datepicker) {
        jQuery.extend(datepicker, settings.datepicker);
      }
      
      var datearray = { dateFormat: 'dd-mm-yy', monthNames: [ "Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος",
          			"Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος" ],
          			monthNamesShort: [ "Ιαν","Φεβ","Μαρ","Απρ","Μαι","Ιουν",
          			"Ιουλ","Αυγ","Σεπ","Οκτ","Νοε","Δεκ" ],
          			dayNames: [ "Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο" ],
          			dayNamesShort: [ "Κυρ","Δευ","Τρι","Τετ","Πεμ","Παρ","Σαβ" ],
          			dayNamesMin: [ "Κυ","Δε","Τρ","Τε","Πε","Πα","Σα" ] };

      input.datepicker(datepicker);      
      //input.datepicker(datearray);
      
    }
} );

$.editable.addInputType( 'datetimepicker', {

    /* create input element */
    element: function( settings, original ) {
      var form = $( this ),
          input = $( '<input />' );
      input.attr( 'autocomplete','off' );
      form.append( input );
      return input;
    },
    
    /* attach jquery.ui.datepicker to the input element */
    plugin: function( settings, original ) {
      var form = this,
          input = form.find( "input" );

      // Don't cancel inline editing onblur to allow clicking datepicker
      settings.onblur = 'nothing';

      datepicker = {        
        
        onClose: function() {
          form.submit();
        },
        dateFormat: 'dd-mm-yy',
        monthNames: [ "Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος",
            			"Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος" ],
        monthNamesShort: [ "Ιαν","Φεβ","Μαρ","Απρ","Μαι","Ιουν",
		          			"Ιουλ","Αυγ","Σεπ","Οκτ","Νοε","Δεκ" ],
		dayNames: [ "Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο" ],
		dayNamesShort: [ "Κυρ","Δευ","Τρι","Τετ","Πεμ","Παρ","Σαβ" ],
		dayNamesMin: [ "Κυ","Δε","Τρ","Τε","Πε","Πα","Σα" ]
        
      };
    
      if (settings.datepicker) {
        jQuery.extend(datepicker, settings.datepicker);
      }
      
      var datearray = { dateFormat: 'dd-mm-yy', monthNames: [ "Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος",
          			"Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος" ],
          			monthNamesShort: [ "Ιαν","Φεβ","Μαρ","Απρ","Μαι","Ιουν",
          			"Ιουλ","Αυγ","Σεπ","Οκτ","Νοε","Δεκ" ],
          			dayNames: [ "Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο" ],
          			dayNamesShort: [ "Κυρ","Δευ","Τρι","Τετ","Πεμ","Παρ","Σαβ" ],
          			dayNamesMin: [ "Κυ","Δε","Τρ","Τε","Πε","Πα","Σα" ] };

      input.datetimepicker(datepicker);      
      //input.datepicker(datearray);
      
    }
} );

