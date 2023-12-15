<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>データ登録</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <style>
        div {
            padding: 10px;
            font-size: 16px;
        }
    </style>
</head>

<body>

    <!-- Head[Start] -->
    <header>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header"><a class="navbar-brand" href="select.php">データ一覧</a></div>
            </div>
        </nav>
    </header>
    <!-- Head[End] -->

    <!-- Main[Start] -->
    <form method="POST" action="insert.php">
        <div class="jumbotron">
            <fieldset>
                <legend>寿司ネタ登録</legend>
                <label>ユーザID:<input type="text" name="sushiya_id"></label><br>
                <label>ネタ：<input type="text" name="neta"></label><br>
                <label>かたち（握り、軍艦、巻物etc,）：<input type="text" name="form"></label><br>
                <label>調理(生、漬けetc,)：<input type="text" name="cooking"></label><br>
                <label>説明（英語）<textArea name="explanation" rows="4" cols="40"></textArea></label><br>
                <input type="submit" value="送信">
            </fieldset>
        </div>
    </form>
    <!-- Main[End] -->


</body>

</html>
