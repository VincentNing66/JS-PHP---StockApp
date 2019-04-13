<?php
	require_once('./dbconnect.php');

	$userStockID = $_GET['userStockID'];

	$stmt = $conn->prepare("SELECT * FROM Stocks INNER JOIN userStock on Stocks.id=userStock.stockID WHERE userStock.id=:userStockID;");


	$stmt->bindParam(':userStockID', $userStockID);

	$stmt->execute();

	// 'companyname`, `currentprice`, `recentchange`, `annualtrend`, `recentchangedirection
	while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		echo "Company: ".$row['companyname'].",";
		echo "Current Price: ".$row['currentprice'].",";
		echo "Recent Change: ".$row['recentchange'].",";
		echo "Annual Trend: ".$row['annualtrend'].",";
		echo "Recent Change Direction: ".$row['recentchangedirection'].",";
	}



	    /* 	This php is called when getStockDetails() function is triggered
      	 	it gets a value of selected stock then serach in the Stock table to get more information about it
		then print them to the display box though js 		*/

?>