<?php
include 'connect.php';

$sql = "SELECT * FROM Tbl_Ads WHERE Ad_AdPrice = 0";
$result = mysqli_query($conn, $sql);
$data = array();

if (mysqli_num_rows($result) > 0) {
  // output data of each row
  while($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }
} else {
    echo "0 results";
}

mysqli_close($conn);
echo json_encode($data);
?>
