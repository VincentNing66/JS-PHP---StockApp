<?php

	require_once('./dbconnect.php');

	$userLoginID = $_GET['userLoginID'];

	$stmt = $conn->prepare("SELECT userStock.id as userStockID, Stocks.id as stockID, Stocks.companyname FROM userStock INNER JOIN Stocks ON userStock.userLoginID=:userLoginID and userStock.stockID=Stocks.id;");


	$stmt->bindParam(':userLoginID', $userLoginID);

	$stmt->execute();

	while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		echo $row['userStockID'].",".$row['companyname'].",";
	}

	 /* 	This php is called when getUserStock() function is triggered
      	 	after a successful login it brings the stocks for the user that are retrieved from the userLogin table
		then retun to the js file to print it in the content box		*/

?>