<?php

$file_path = $_FILES["file"]["tmp_name"];
$cmd = "python3 judgeImage.py ".$file_path;
$result = exec($cmd);

$result = str_replace(array("(","[",")","]"),"",$result);
$list  = explode(',',$result);

$arr = array('t'=>substr($list[1]*100, 0, 2),'y'=>substr($list[3]*100, 0, 2));
print(json_encode($arr));

