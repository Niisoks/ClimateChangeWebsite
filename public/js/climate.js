function processJSON(json){
	console.log(json);
	const response = document.querySelector('#response');
	const p = document.createElement('p');
	

    const email = document.getElementById("#email");

	p.innerHTML = '<h3> An email has been sent to: <br>' + json.fname + ' ' + json.lname + ' at  ' + json.email + '... <br> <strong> please check your emails!</strong></h3>';
	response.appendChild(p);
};

function validateEmail(email) 
    {
        const checking = /\S+@\S+\.\S+/;
        return checking.test(email);
    }

function onError(error){
	console.log(error);
};

function onResponse(response){
	console.log(response.status);
	response.json().then(processJSON);
};

function formatMessage( fname, lname, email, comment){
	let message = {
		fname: fname,
		lname: lname,
		email: email,
        comment: comment
	};
	return JSON.stringify(message);
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function toTop() {
  document.documentElement.scrollTop = 0;
}

function onSubmit(e){
	e.preventDefault();
    const fname = document.querySelector('#fname').value;
	const lname = document.querySelector('#lname').value;
    const email = document.querySelector('#email').value;
    const comment = document.querySelector('#comment').value;
	const serializedMessage = formatMessage( fname, lname, email, comment);
	if(fname.length == 0 || lname.length == 0 || email.length == 0){
		alert('Please make sure to enter at least 1 character in the required fields (*)');
	}else if(!validateEmail(email)) {
		alert('Please enter a valid email');
	}else {
		console.log(serializedMessage);
		fetch('/user', {  method: 'POST',
					  headers: {
						'Content-Type': 'application/json'
					  },
					  body:serializedMessage
				   }
			)
			.then(onResponse, onError);
		e.stopPropagation();
	}

};


mybutton = document.getElementById("homeButton");
window.onscroll = function() {scrollFunction()};

const submit = document.querySelector('#submit'); 
submit.addEventListener('click', onSubmit);
