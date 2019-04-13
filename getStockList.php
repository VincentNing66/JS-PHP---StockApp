<?php

	require_once('./dbconnect.php');

	$userLoginID = $_GET['userLoginID'];
		
	$stmt = $conn->prepare("SELECT Stocks.id, Stocks.companyname from Stocks LEFT JOIN userStock ON Stocks.id=userStock.stockID AND userStock.userLoginID=:userLoginID WHERE userStock.stockID is NULL;");

	$stmt->bindParam(':userLoginID', $userLoginID);

	$stmt->execute();

	while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		echo $row['id'].",".$row['companyname'].",";
	}

	 /* 	This php is called when getStockList() function is triggered
      	 	this brings all information about unadded stockes to the adding drop down select teag beside the add button form Stocks table and userStock table 
		then retun to the js file to print it in the content box		*/


?>