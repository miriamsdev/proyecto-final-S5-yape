"use strict";
const RegisterUser = (update)=> {
    const resource = resources.userRegister;
    const containerRegister = $('<section class="container"></section>');
    const formVerfication = $('<form class="form-control flex"></form>');
    const name = $(`<input id="name" type="text" placeholder="Nombre" required>`);
    const email = $(`<input id="email" type="email" placeholder="correo@ejemplo.com">`);
    const password = $(`<input id="passwd" type="password" pattern="[0-9]{6}" placeholder="Ingresa clave de 6 digitos" required>`);
    const button = $('<button id="create" type="submit" class="disabled" disabled>CREAR CUENTA</button>');

    formVerfication.append(name);
    formVerfication.append(email);
    formVerfication.append(password);
    formVerfication.append(button);
    containerRegister.append(Instructions(resource.image, resource.title, resource.description));
    containerRegister.append(formVerfication);

    name.on('blur',(e)=>{
        if(e.wich>64 && e.wich <122){
            valida(name.val(),email,password.val());
        }else {
            $('#name').css('border-color','#f44336');
        }
    });

    email.on('blur',_=>{
        valida(name.val(),email,password.val());
    });

    password.on('keyup',_=>{
        valida(name.val(),email,password.val());
    });
    button.on('click',(e)=>{
        e.preventDefault();
        createUser(state.phone,name.val(),email.val(),password.val())
            .then((data) => {
                state.userCode = data.code;
                //state.phone = data.phone;
                console.log(state.phone);
                update();
            })
            .catch((err) => {
                button.after(`<p>${err}</p>`);
                update();
            });
    });


    return containerRegister;
};
const regexEmail = /([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/;

function valida(name,email,pass){

    if(name.trim()!= 0 && regexEmail.test(email.val()) && pass.length == 6){
        //$('input').removeClass('js-error');
        $('#create').removeAttr('disabled');
    }else {
        $('#email').css('border-bottom-color','#f44336');
        $('#create').attr('disabled','disabled');
    }
}
