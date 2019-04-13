
//main AJAX request function that will be called each time when request to the database
function ajaxRequest(url, method, data, callback) {

	let request = new XMLHttpRequest();

	request.open(method, url, true);
	if (method == "POST") {
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			if (request.status == 200) {
				response = request.responseText;
				callback(response);
			}
			else {
				handleError(request.statusText);
			}
		}
	};
	request.send(data);
}

//this function will be called when the login button clicked, then it sends the value of username and password to php file, and then call back function direct to listStock function. 
function checkLogin() {
	let userID = document.getElementById("user").value;
	let password = document.getElementById("pass").value;
	url = "checkLogin.php?id=" + userID + "&password=" + password;
	ajaxRequest(url, "GET", "", listStock);
}

//this function will be called when the logout button clicked, it shows the login form again and hidde the content
function handleLogout() {
	document.getElementById("login").style.display = 'block';
	document.getElementById("afterLogin").style.display = 'none';

}

//this function will be called when there is some error occured
function handleError(errorText){
	alert("An error occurred " + errorText);
}

//This function is the callback funtion after checkLogin php is called, it checkes if the username and password are valid, if they do, show the welcome message, dispaly login form and show the content form, then call the function getUserStock first, getStockList secondly. 
function listStock(response){
	if(response === "-99"){
		alert("Invalid Username or password!");
	}
	else{

		let id_name = response.split(',');
		userLoginID = id_name[0];
		userName = id_name[1];
		document.getElementById("login").style.display = 'none';
		document.getElementById("afterLogin").style.display = 'block';
		document.getElementById("welcome").innerHTML = 'Welcome to the Stock Tracker , Mr/Mrs '+ userName.charAt(0).toUpperCase() + userName.slice(1)
		
		getUserStock();
		getStockList();
	}
}

// The first function will be called after a successful login, it gets the value that checklogin paged returned, then send it to getUserStock php file to get the value for the login user.
function getUserStock(){
	let url = "./getUserStock.php?userLoginID=" + userLoginID;
	ajaxRequest(url, "GET","", showUserStock);
}

//The callback function of getUserStock funtion, it gets the that getUserStock.php returned, the assign the value in to the content box in html page.
function showUserStock(response){

	let userStocks = response.split(',');
	let userStockList = "";

	for(let i=0; i<userStocks.length; i+=2)
	{
		if(userStocks[i] != "")
		{
			userStockList += "<option value='"+userStocks[i]+"'>"+userStocks[i+1]+"</option>";
		}
	}
	document.getElementById("userStock").innerHTML = userStockList;	
}

//The second function will be called after a successful login, it send a request to database though getStockList.php, adding values to the select element beside the add button for adding stocks purpose
function getStockList(){
	url = "./getStockList.php?userLoginID="+userLoginID;
	ajaxRequest(url, "GET","", showStockList);
}

// The callback function which gets value through getStockList.php, then assign them in to the select element beside the add button for adding stocks purpose
function showStockList(response){

	let companies = response.split(',');
	let stockList = "<option value='0'>Select one to add</option>";

	for(let i=0; i<companies.length; i+=2)
	{
		if(companies[i] != "")
		{
			stockList += "<option value='"+companies[i]+"'>"+companies[i+1]+"</option>";
		}
	}
		
	let em_stockList = document.getElementById("stockList");
	em_stockList.innerHTML = stockList;
}

//This function will be called when when a option(the company name in the content box) is clicked, it gets the value of the tock which is clicked, then makes a request to getFullInfo.php to get the full information about the stock.
function getStockDetails()
{
	var em_userStock = document.getElementById("userStock");
	var userStockID = em_userStock.options[em_userStock.selectedIndex].value;
	url = "./getFullInfo.php?userStockID="+userStockID;
	ajaxRequest(url, "GET","", showStockDetails);
}

//This is the callback function of getStockDetails, when get the returned value from database through the php file, it displays them into the the display box.
function showStockDetails(response)
{
	let details = response.split(',');
	let fullInfo = "";
	
	for(let i=0; i<details.length; ++i)
	{
		if(details[i] != "")
		{
			fullInfo += "<option>"+details[i]+"</option>";
		}
	}
	document.getElementById("details").innerHTML = fullInfo;	
}

// This function will be called when the add button clicked, it gets the value from the select tag, then send it to addStocks.php to make a request to the database to add that
function addUserStock(e)
{
	var em_stockList = document.getElementById('stockList');
	var stockID = em_stockList.options[em_stockList.selectedIndex].value;
	
	url = "./addStocks.php?userLoginID="+userLoginID+"&stockID="+stockID;
	ajaxRequest(url, "GET","", userStockAdded);
	
	em_stockList.selectedIndex = 0;
}

//This is the callback function of addUserStock, check if the adding the user is complete by reading the out put of returned value
function userStockAdded(response)
{
	if(response != "complete")
	{
		alert("Addition Failure!");
	}

	// refresh user stock list
	getUserStock();
	getStockList();
}

// This function will be called when the remove button is clicked, it reads what is selected in the content box, then send it to removeStock.php to make a request to the database to delete that
function removeUserStock(e)
{
	var em_userStock = document.getElementById('userStock');
	
	if(em_userStock.selectedIndex < 0)
	{
		alert("Please, select one of stocks in listbox.");
		return;
	}
	
	var userStockID = em_userStock.options[em_userStock.selectedIndex].value;
	
	console.log(userStockID);
	url = "./removeStock.php?userStockID="+userStockID;
	ajaxRequest(url, "GET","", userStockRemoved);

	em_userStock.selectedIndex = -1;
}

//This is the callback function of removeStock, check if the removing the user is complete by reading the output of the returned value.
function userStockRemoved()
{
	if(response != "complete")
	{
		alert("Addition Failure!");
	}
	var em_userStock = document.getElementById('userStock');

	// If nothing is selected, empty the display details box
	if(em_userStock.selectedIndex < 0)
	{
		document.getElementById("details").innerHTML = ''
	}

	// refresh user stock list
	getUserStock();
	getStockList();
}

////This function will be called when the unselect button is clicked, make it select nothing then if nothing is selected, empty the dispaly box.
function UnselectStock(){
	var em_userStock = document.getElementById('userStock');
	
	em_userStock.selectedIndex = -1;
	if(em_userStock.selectedIndex < 0)
	{
		document.getElementById("details").innerHTML = ''
	}

}

// The onload function runs at the begining to assign some functions to buttons
function init()
{
	document.getElementById("addStock").addEventListener('click', addUserStock);
	document.getElementById("removeStock").addEventListener('click', removeUserStock);
	document.getElementById("userStock").addEventListener('change', getStockDetails);
	document.getElementById("Unselect").addEventListener('click', UnselectStock);

}