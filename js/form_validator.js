(function() {

    // counter fields

    var counterFields = 0;
    var counterErrros = 0;
    var spanError  = "<span class='error-label-form-validator'>";
    var spanErrorFin  = "</span>";
    var ERROR_ES = "Error el campo es requerido ";
    // Define function constructor
    this.AjaxValidator = function(params) {

       if(params === null || params === undefined || checkObject(params) === 0){
                console.log(" Error atribute params can not be empty ");
                return false;
         }else{
                // clear existing errors
                $('.error-label-form-validator').remove();

                // check if has fields param
                if(params.hasOwnProperty('fields') === true ){

                    counterFields =  params.fields.length;

                    for(var counter = 0; counter < params.fields.length;counter++ ){

                        counterErrros += validateSize(params.fields[counter]);

                    }



                }else{

                    console.log(" The validation form need the fields specification ");
                    return false;
                }


       }
    }


    // library functions
    AjaxValidator.prototype.getValidation = function() {

        return counterErrros > 0 ? false : true ;

    }


    // Internal lib funciones

    /*
        Validate size content field
    */

    function validateSize(field){
        if( $('#'+field).val() === "" || $('#'+field).val()  === null   ){

                $(spanError+ERROR_ES+spanErrorFin).insertAfter("#"+field).css('color','red');

                return 1;
        }

        return 0;
    }

    /*
        Check if object is empty
    */
    function checkObject(obj){
        return Object.keys(obj).length;
    }

}());