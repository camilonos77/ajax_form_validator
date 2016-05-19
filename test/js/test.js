QUnit.test( "Load library correct", function( assert ) {
  
            var a = new AjaxValidator({ form: 'form_test'});
            assert.ok( a.getValidation()  === true , "Ok Test ok!" );
                  
});


QUnit.test( "Load library correct with params fields ", function( assert ) {
  
            var a = new AjaxValidator({ form: 'form_test', fields: ['pwd'] });
            assert.ok( a.getValidation()  === true , "Ok Test ok!" );
                  
});

QUnit.test( "Get the data correct  ", function( assert ) {
  
            var a = new AjaxValidator({ form: 'form_test', fields: ['pwd']});
            //var a = new AjaxValidator({ form: 'form_test' });
            // get the size data 
            console.log((a.getData()))
            var len = $.map(a.getData(), function(n, i) { return i; }).length;
            assert.strictEqual( len ,2 , "Ok Test ok!" );
                  
});