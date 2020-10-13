<?php
include 'connect.php';

$data = json_decode(file_get_contents("php://input"));
$heading = $data->heading;
$content = $data->content;
$price = $data->price;


$sql = "INSERT INTO `Tbl_Ads` (Ad_ProductPrice, Ad_Content, Ad_Title, Ad_AdPrice, Ad_Advts)
VALUES ('$price', '$content', '$heading','0','1')";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
