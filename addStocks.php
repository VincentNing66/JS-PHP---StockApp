<?php
	
	require_once('./dbconnect.php');
	
	$userLoginID = $_GET["userLoginID"];
	$stockID = $_GET["stockID"];

	$stmt = $conn->prepare("INSERT INTO userStock (userLoginID, stockID) VALUES (:userLoginID, :stockID);");


	$stmt->bindParam(':userLoginID', $userLoginID);
	$stmt->bindParam(':stockID', $stockID);

	if($stmt->execute()){ echo "complete"; }
	else { echo "failure"; }

	    /* 	This php is called when addUserStock() function is triggered
      	 	it gets a value from the selected list add the stock into the userStock for the user	*/
?>