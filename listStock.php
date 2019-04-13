<?php

	require_once('dbconnect.php');

	$id = $_GET['id'];
?>
	$stmt = $conn->prepare("SELECT * FROM Stocks WHERE UserID = :id);


	$stmt->execute(["id" => $id);

	$result = $stmt->fetch();	
	
	echo($result)
	
		//while($row = $result2->fetch()) {
		//	echo $row['Name'] ;
		//	echo "   at   ";
		//	echo $row['Location'] ;
		//	echo "</br>";
  		//}   	
?>