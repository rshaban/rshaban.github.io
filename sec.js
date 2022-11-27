uppercase = "ABCDEFGHIJKLMNOPQRSTUVQXYZ".split("");
lowercase = "abcdefghijklmnopqrstuvwxyz".split("");
number = "0123456789".split("");

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
//

function do_check(){
    upper = false;
    lower = false;
    num = false;
    other = false;

    password = document.querySelector("#passwordInput").value;

    document.querySelector(".progress-bar").style.width = "" +
        String((20 * entropy(password))) + "%"

    passwordList = password.split("")
    passwordList.forEach(ch => {
        if (!lower && lowercase.includes(ch)){
            lower = true;
        }
        if (!upper && uppercase.includes(ch)){
            upper = true;
        }
        if (!num && number.includes(ch)){
            num = true;
        }
    });
    feedback(upper, lower, num, other)
}

function feedback(upper, lower, num, other){
    box1 = document.querySelector("#feedbackDetect")
    box2 = document.querySelector("#feedbackSuggest")
    rec = "Use a mix of "
    if(upper && lower || other){
        box1.innerHTML = "booty";
    }
}

document.querySelector("#passwordInput").
    addEventListener('input', do_check);