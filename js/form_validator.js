(function() {

    // counter fields

    var counterFields = 0;
    var counterErrros = 0;
    var spanError  = "<span class='error-label-form-validator'>";
    var spanErrorFin  = "</span>";
    var ERROR_ES = "Error el campo es requerido ";
    var ERROR_EMAIL_ES = "Error el campo  correo no es válido ";
    var parametros  = {};
    // Define function constructor
    this.AjaxValidator = function(params) {

       parametros =  params;
       if(params === null || params === undefined || checkObject(params) === 0){
                console.error(" Error atribute params can not be empty ");
                return false;
         }else{
                // clear existing errors
                $('.error-label-form-validator').remove();
                counterErrros = 0;


                // check if use default form on the page or use the form selected by user

                if(params.hasOwnProperty('form') === true){

                    var formById = document.getElementById(params.form);
                    

                    if(formById === null){  
                        //throw "Sorry, the ID "+params.form+" for the form tag not exists";
                        console.error("Sorry, the ID "+params.form+" for the form tag not exists"); 
                        return false;
                    }else{

                       

                        if(params.hasOwnProperty('fields') === true ){

                            counterFields =  params.fields.length;

                            for(var counter = 0; counter < params.fields.length;counter++ ){

                                counterErrros += validateSize(params.fields[counter]);
                            }
                        }

                        // Validate fields by param required
                        var formNodes = formById.elements;
                       
                        for(var counter = 0; counter < formNodes.length;counter++ ){

                                if(formNodes[counter].hasAttribute('required')){
                                     if(formNodes[counter].id!== null){

                                        counterErrros += validateSize( formNodes[counter].id );
                                     }      
                                }
                               
                        }

                      


                    }

                }else{
                        // check if has fields param
                        if(params.hasOwnProperty('fields') === true ){

                            counterFields =  params.fields.length;

                            for(var counter = 0; counter < params.fields.length;counter++ ){

                                counterErrros += validateSize(params.fields[counter]);
                            }
                        }else{

                            //console.log(" The validation form need the fields specification ");
                            return false;
                        }

            }
       }
    }


    // library functions
    AjaxValidator.prototype.getValidation = function() {

        return counterErrros > 0 ? false : true ;

    }


    // Internal lib funciones


    /*
        Return all data from form
    */

    AjaxValidator.prototype.getData = function(){
        var dataReturn = {};
        if(parametros === null || parametros === undefined || checkObject(parametros) === 0){
                console.error(" Error atribute params can not be empty ");
                return false;
         }else{

            // Add validation form selection

            if(parametros.hasOwnProperty('form') === true){


                var formById = document.getElementById(parametros.form);
                    

                    if(formById === null){  
                        //throw "Sorry, the ID "+params.form+" for the form tag not exists";
                        console.error("Sorry, the ID "+parametros.form+" for the form tag not exists"); 
                        return false;
                    }else{

                       

                        if(parametros.hasOwnProperty('fields') === true ){

                            counterFields =  parametros.fields.length;

                            for(var counter = 0; counter < parametros.fields.length;counter++ ){

                                                           
                                var idNode =  parametros.fields[counter];
                                        
                                if($('#'+idNode).attr('type')!== "submit"){
                                    dataReturn[''+idNode] = $('#'+idNode).val();
                                }
                            }
                        }

                        // Validate fields by param required
                        var formNodes = formById.elements;
                       
                        for(var counter = 0; counter < formNodes.length;counter++ ){
                                
                                     if(formNodes[counter].id!== null){

                                        
                                        var idNode =  formNodes[counter].id;
                                        
                                        if($('#'+idNode).attr('type')!== "submit"){
                                            dataReturn[''+idNode] = $('#'+idNode).val();
                                        }
                                     }      
                        }
                    }    

                     return dataReturn;

            }else{

                if(parametros.fields.length > 0 ){
                   
                    var form = $('#'+parametros.fields[0]).closest("form")[0];
                    var myparams = [];      
                    $.each( form.elements, function( k, object ){                   
                         
                             if($('#'+object.id).attr('type')!== "submit"){
                    
                    dataReturn[''+$('#'+object.id).attr('id')] = $('#'+object.id).val();
                             }
                    });

                    
                    return dataReturn;

                }else{

                    return {};
                }
            }
         }
    }


    /*
        Validate size content field
    */

    function validateSize(field){

        var inputType = $('#'+field).attr('type'); // get type field
        var returnValue = 0;
        
        switch(inputType){

            case "text":

                    if( $('#'+field).val() === "" || $('#'+field).val()  === null   ){

                        $(spanError+ERROR_ES+spanErrorFin).insertAfter("#"+field).css('color','red');

                           returnValue = 1;
                     }else{

                            returnValue = 0;

                     }
        

            break;

            case "password":

                    if( $('#'+field).val() === "" || $('#'+field).val()  === null   ){

                        $(spanError+ERROR_ES+spanErrorFin).insertAfter("#"+field).css('color','red');

                           returnValue = 1;
                     }else{

                            returnValue = 0;

                     }
        

            break;

            case "email":

                        if(checkEmail($("#"+field).val()) === false ){

                                $(spanError+ERROR_EMAIL_ES+spanErrorFin).insertAfter("#"+field).css('color','red');
                                returnValue = 1;
                        }else{

                            returnValue = 0;
                     }
            break;


            default:

                    if( $('#'+field).val() === "" || $('#'+field).val()  === null   ){

                        $(spanError+ERROR_ES+spanErrorFin).insertAfter("#"+field).css('color','red');

                            returnValue = 1;
                     }else{

                            returnValue = 0;

                     }

            break;
        }

        return returnValue;

        
    }

    /*
        Check if field is email
    */
    function checkEmail(valor) {
            var email = valor;
            var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+(([a-zA-Z0-9-])+\.)*([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(email)) {
                return false;
            }else{
                return true;    
            }
    }


    /*
        Check if object is empty
    */
    function checkObject(obj){
        return Object.keys(obj).length;
    }

}());
