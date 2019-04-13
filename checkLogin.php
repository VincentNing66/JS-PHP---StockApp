<?php
	require_once('./dbconnect.php');

	$id = $_GET['id'];
	$password = $_GET['password'];
	
	$stmt = $conn->prepare("SELECT id, userID, Password FROM userLogin WHERE userID=:id and Password=:pass");
	
	$stmt->bindParam(':id', $id);
	$stmt->bindParam(':pass', $password);  
	
	$stmt->execute();

	$user = $stmt->fetch(PDO::FETCH_ASSOC);
	
	if($user['userID'] == $id){
		echo $user['id'].','.$user['userID'];	
	}
	else {
		echo -99;
	}

	    /* 	This php is called when checkLogin() function is triggered
      	 	it brings the username and password and compare the data that are retrieved from the userLogin table
		it is matches, return the id id and the username, otherwise, return -99 		*/

?>