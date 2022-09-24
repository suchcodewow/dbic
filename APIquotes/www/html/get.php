<?php
require 'vendor/autoload.php';
$connection = new MongoDB\Client("mongodb://root:password@quotesdb:27017/");
//$response = [];
$collection = $connection->dbic->quotes;
$result = $collection->find()->toArray();
$response = json_encode($result);
// foreach ($cursor as $item) {
//     array_push($response, (object)[
//         ''
//     ])
//      var_dump($item);
// };
print_r($response);

?>