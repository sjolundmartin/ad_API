<?php
include 'connect.php';

$data = json_decode(file_get_contents("php://input"));
$heading = $data->heading;
$content = $data->content;
$price = $data->price;
$id = $data->id;

//Get Advts_ID
$sql1 = "SELECT Advts_ID FROM Tbl_Advertiser WHERE Advts_OrgNr = '$id'";

$result = mysqli_query($conn, $sql1);
$data = array();

if (mysqli_num_rows($result) > 0) {
  // output data of each row
  while($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }
} else {
    echo "0 results";
}

//Insert with Advts_ID
$Advts_ID = $data[0][0];

$sql2 = "INSERT INTO `Tbl_Ads` (Ad_ProductPrice, Ad_Content, Ad_Title,
    Ad_AdPrice, Ad_Advts)
    VALUES ('$price', '$content', '$heading','40','$Advts_ID')";

if (mysqli_query($conn, $sql2)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
