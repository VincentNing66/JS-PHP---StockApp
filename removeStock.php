<?php

	require_once('./dbconnect.php');
	
	$userStockID = $_GET["userStockID"];

	$stmt = $conn->prepare("DELETE FROM userStock WHERE id=:userStockID;");

	$stmt->bindParam(':userStockID', $userStockID);

	if($stmt->execute()){ echo "complete"; }
	else { echo "failure"; }

	    /* 	This php is called when removeUserStock() function is triggered
      	 	it gets a value from the selected item from the content box then remove it from the userStock table for the user	*/


?>