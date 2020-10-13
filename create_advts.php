<?php
include 'connect.php';

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$name = $data->name;
$phone = $data->phone;
$address = $data->address;
$zip = $data->zip;
$city = $data->city;
$invoiceaddress = $data->invoiceaddress;
$invoicezip = $data->invoicezip;
$invoicecity = $data->invoicecity;

$sql1 = "SELECT Advts_OrgNr FROM Tbl_Advertiser WHERE Advts_OrgNr = '$id'";

$result = mysqli_query($conn, $sql1);

if (mysqli_num_rows($result) > 0) {

  $sql2 = "UPDATE `Tbl_Advertiser` SET Advts_Name='$name', Advts_PhoneNr='$phone',
  Advts_Address='$address', Advts_Zip='$zip', Advts_City='$city',
  Advts_Invoice_Address='$invoiceaddress', Advts_Invoice_Zip='$invoicezip',
  Advts_Invoice_City='$invoicecity' WHERE Advts_OrgNr='$id'";
}
else{

  $sql2 = "INSERT INTO `Tbl_Advertiser` (Advts_Name, Advts_OrgNr, Advts_PhoneNr,
    Advts_Address, Advts_Zip, Advts_City, Advts_Invoice_Address,
    Advts_Invoice_Zip, Advts_Invoice_City)
    VALUES ('$name', '$id', '$phone', '$address', '$zip', '$city',
      '$invoiceaddress', '$invoicezip', '$invoicecity')";


}

if (mysqli_query($conn, $sql2)) {
  echo "New record created successfully";
} else {
      echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
}


mysqli_close($conn);
?>
