<?php

/**
 * 1. index.phpのフォームの部分がおかしいので、ここを書き換えて、
 * insert.phpにPOSTでデータが飛ぶようにしてください。
 * 2. insert.phpで値を受け取ってください。
 * 3. 受け取ったデータをバインド変数に与えてください。
 * 4. index.phpフォームに書き込み、送信を行ってみて、実際にPhpMyAdminを確認してみてください！
 */

//1. POSTデータ取得
$sushiya_id = $_POST['sushiya_id'];
$neta = $_POST['neta'];
$form = $_POST['form'];
$cooking = $_POST['cooking'];
$explanation = $_POST['explanation'];
//2. DB接続します
try {
  //ID:'root', Password: xamppは 空白 ''
  $pdo = new PDO('mysql:dbname=sushi_business;charset=utf8;host=localhost','root',''); // PDO（PHP Data Objects）インスタンスを作成してMySQLデータベースに接続
} catch (PDOException $e) {
  exit('DBConnectError:'.$e->getMessage());
}

//３．データ登録SQL作成

// 1. SQL文を用意
$stmt = $pdo->prepare("
  INSERT INTO 
    neta(id, sushiya_id, neta, cooking, form, explanation)
  VALUES (NULL, :sushiya_id, :neta, :form, :cooking, :explanation)");
//  2. バインド変数を用意
// Integer 数値の場合 PDO::PARAM_INT
// String文字列の場合 PDO::PARAM_STR

$stmt->bindValue(':sushiya_id', $sushiya_id, PDO::PARAM_INT);
$stmt->bindValue(':neta', $neta, PDO::PARAM_STR);
$stmt->bindValue(':form', $form, PDO::PARAM_STR);
$stmt->bindValue(':cooking', $cooking, PDO::PARAM_STR);
$stmt->bindValue(':explanation', $explanation, PDO::PARAM_STR);

//  3. 実行
$status = $stmt->execute();

//４．データ登録処理後
if($status === false){
  //SQL実行時にエラーがある場合（エラーオブジェクト取得して表示）
  $error = $stmt->errorInfo();
  exit('ErrorMessage:'.$error[2]);
}else{
  //５．index.phpへリダイレクト
  // echo 'test';
header('Location: index.php');
}
?>
