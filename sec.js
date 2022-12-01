var uppercase = "ABCDEFGHIJKLMNOPQRSTUVQXYZ".split("");
var lowercase = "abcdefghijklmnopqrstuvwxyz".split("");
var number = "0123456789".split("");

// Shannon entropy  github.com/ppseprus/entropy-in-short.js
const entropy = str => {
    return [...new Set(str)]
      .map(chr => {
        return str.match(new RegExp(chr, 'g')).length;
      })
      .reduce((sum, frequency) => {
        let p = frequency / str.length;
        return sum + p * Math.log2(1 / p);
      }, 0);
  };

// truncated do_check for speedy feedback as the user types
function check(){
    // remove parentheses for proper regex parsing
    password = document.querySelector("#passwordInput").value;
    var validatedPassword = password.replace(/\(|\)/g, "!")

    // update password strength bar
    document.querySelector(".progress-bar").style.width = "" +
        String((20 * entropy(validatedPassword))) + "%"
}

function do_check(){
    upper = false;
    lower = false;
    num = false;
    other = false;
    count = 0;
    
    // remove parentheses for proper regex parsing
    password = document.querySelector("#passwordInput").value;
    var validatedPassword = password.replace(/\(|\)/g, "!")

    // update password strength bar
    document.querySelector(".progress-bar").style.width = "" +
        String((20 * entropy(validatedPassword))) + "%"


    // find out what characters are in the password
    passwordList = password.split("")
    passwordList.forEach(ch => {
        count++;
        if (!lower && lowercase.includes(ch)){
            lower = true;
        } else if (!upper && uppercase.includes(ch)){
            upper = true;
        } else if (!num && number.includes(ch)){
            num = true;
        } else if (!uppercase.includes(ch) && !lowercase.includes(ch) && !number.includes(ch)){
            other = true;
        }
    });
    
    box1 = document.querySelector("#feedbackDetect")
    box2 = document.querySelector("#feedbackSuggest")
    // creating recommendations
    recList = []
    rec = "It is recommended to add "
    if(count <= 10){
        
        rec += "more characters"
        if (!(upper && lower && num && other)){
            rec += ", like "
        }
        box1.innerHTML = "A password under 10 characters long can be cracked in hours.";
    }
    if(!upper){
        recList.push("uppercase letters")
    }
    if(!lower){
        recList.push("lowercase letters")
    }
    if(!num){
        recList.push("numbers")
    }
    if(!other){
        recList.push("special characters")
    }


    // Grammar for password recommendations
    var c = 0
    var listLen = recList.length
    if (listLen == 0){
        rec += "."
    }
    recList.forEach(element => {
        c++
        rec += element
        if(c < listLen){
            rec += ", "
        }
        if(listLen > 2 && c+1 == listLen){
            rec += "and "
        }
        if(c == listLen){
            rec += "."
        }
    });

    // best case scenario
    if(upper && lower && num && other && count >= 10){
        box1.innerHTML = "This is a strong password!";
        rec = "";
    }
    box2.innerHTML = rec;
}

// initialize JS in document
document.querySelector("form").
    addEventListener("submit", function(e){e.preventDefault()})
document.querySelector("#passwordInput").
    addEventListener('input', check);