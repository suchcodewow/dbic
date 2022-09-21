<!DOCTYPE html>  
     <head>  
      <title>Hello World!</title>
     </head>  

     <body>  
      <h1>oi!!</h1>
      <?php
require 'vendor/autoload.php'; // include Composer's autoloader

$client = new MongoDB\Client("mongodb://root:password@quotesdb:27017/");
$collection = $client->dbic->quotes;

// $result = $collection->insertOne( [ 'name' => 'Hinterland', 'brewery' => 'BrewDog' ] );

// echo "Inserted with Object ID '{$result->getInsertedId()}'";
echo "hi";
$cursor = $collection->find([],['limit' => 5,
'name' => ['name' => 1,
'borough' => 1,
'cuisine' => 1,]]);
foreach ($cursor as $item) {
     var_dump($item);
};
// echo "all '{$cursor}'";
?>
     </body>
