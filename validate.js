
var stringInvalid;

function invalidField(id, string) {
    document.getElementById("formFeedback").style.color = "red";
    stringInvalid += string;
    document.getElementById(id).focus();
}

function validField() {
    document.getElementById("formFeedback").style.color = "green";
    document.getElementById("formFeedback").innerHTML = "Ok!";
}



function validateDate() {
    var date = Date.parse(document.getElementById("bday").value);

    var myAge = ~~((Date.now() - date) / (31557600000));

    if (myAge < 18) {
        invalidField("bday", "Ainda não atingiu a maioridade.\n")
        return false;
    } else if ((date > Date.now()) || isNaN(date)) {
        invalidField("bday", "Data inválida.\n")
        return false;
    }

}

function validEmail() {
    var email = document.getElementById("email").value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.match(mailformat)) {
        invalidField("email", "Email Inválido.\n");
        return false;
    }
}

function validateNIF() {
    var nif = document.getElementById("nif").value;
    if (nif.length == 9) {
        added = ((nif[7] * 2) + (nif[6] * 3) + (nif[5] * 4) + (nif[4] * 5) + (nif[3] * 6) + (nif[2] * 7) + (nif[1] * 8) + (nif[0] * 9));
        mod = added % 11;

        if (mod == 0 || mod == 1)
            control = 0;
        else
            control = 11 - mod;

        if (nif[8] != control) {
            invalidField("nif", "NIF inválido.\n");
            return false;
        }

    } else {
        invalidField("nif", "NIF inválido.\n");
        return false;
    }
}


function validateCC() {
    var cc = document.getElementById("cc").value;
    if (isNaN(cc) || cc.length < 8 || cc.length > 8) {
        invalidField("cc", "CC inválido.")
        return false;
    }

}

function validateForm() {

    stringInvalid = "Erros:\n";
    // colocar aqui todas as validações
    // devolve false se falhar alguma regra, true caso contrário
    // utilizar a variável formFeedback para indicar os erros


    validateDate();
    validateNIF();
    validEmail();
    validateCC();

    if (stringInvalid === "Erro(s):\n")
        validField();
    else
        document.getElementById("formFeedback").textContent = stringInvalid;

    return false;
    //return true;
}

function callSecurityAPI() {
    // Em primeiro lugar, vamos obter o IP da nossa máquina
    var xhttp = new XMLHttpRequest();
    var ipClient = "";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);
            //var myArr = JSON.parse(this.responseText);
            //document.getElementById("securityinfo").innerHTML = "Segurança: " + this.responseText;
            ipClient = this.responseText;
        }
    };
    xhttp.open("GET", "https://api.ipify.org", true);
    xhttp.send();

    // Vamos de seguida obter informações sobre o nosso IP chamando outra API
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);
            var myArr = JSON.parse(this.responseText);
            document.getElementById("securityinfo").innerHTML = "Dados deste computador: " + this.responseText;

            document.getElementById("city").value = myArr.region;

            document.getElementById("latitude").value = myArr.latitude;

            document.getElementById("longitude").value = myArr.longitude;

        }
    };
    var urlToCall = "https://ipapi.co/" + ipClient + "/json/";
    xhttp2.open("GET", urlToCall, true);
    xhttp2.send();
}

function callThinkingAPI() {
    //document.getElementById("pensamento").innerHTML = "Thinking!";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var myArr = JSON.parse(this.responseText);
            // Estamos a ir buscar o campo activity do objecto JSON
            document.getElementById("pensamento").innerHTML = "Pensamento do dia: " + myArr.activity;
        }
    };
    xhttp.open("GET", "https://www.boredapi.com/api/activity?type=recreational", true);
    xhttp.send();
}

function callPostalCodeAPI(postalcode) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var myArr = JSON.parse(this.responseText);

            document.getElementById("latitude").value = myArr.latitude;

            document.getElementById("longitude").value = myArr.longitude;
        }
    };
    var postalCodeC = postalcode[0] + postalcode[1] + postalcode[2] + postalcode[3]
    xhttp.open("GET", "http://codigospostais.appspot.com/cp4?codigo=" + postalCodeC, true);
    xhttp.send();
}

function updateCord() {
    //if(document.getElementById("cp").value.length >= 4)
    //callPostalCodeAPI(document.getElementById("cp").value); supostamente devia dar, mas a api recusa-se a dar info...
}