$(document).ready( function(){
	/**************************************************************
	 *
	 * イベントを定義
	 *
	 **************************************************************/
	//画像ファイルプレビュー表示のイベント追加 fileを選択時に発火するイベントを登録
	$('form').on('change', 'input[type="file"]', function(e) {

		$('#dudge_result').removeClass("alert-danger");
		$('#dudge_result').html("");

		var reader = new FileReader(),
			file = e.target.files[0],
			$preview = $(".preview");
			t = this;

		// 画像ファイル以外の場合は何もしない
		if(file.type.indexOf("image") < 0){
			return false;
		}

		// ファイル読み込みが完了した際のイベント登録
		reader.onload = (function(file) {
			return function(e) {
				//既存のプレビューを削除
				$preview.empty();
				// .prevewの領域の中にロードした画像を表示するimageタグを追加
				$preview.append($('<img>').attr({
					src: e.target.result,
					width: "200px",
					class: "preview",
					title: file.name
				}));
			};
		})(file);
		reader.readAsDataURL(file);
	});

	// 画像判定
	$('#dudge_image').on('click',function(){

		$('#dudge_result').removeClass("alert-danger");
		$('#dudge_result').html("＊＊＊判定中＊＊＊");

		var fd = new FormData();
		fd.append( "file", $("input[name='userfile']").prop("files")[0] );

		// 画像判定
		$.ajax({
			type :  "POST",
			url : "judgeImage.php",
			dataType : "json",
			data : fd,
			processData : false,
			contentType : false
		}).done(function( msg ) {
			// 結果を表示
			show_result(msg)
		}).fail(function() {
			show_result("error")
		});
	});
});

function show_result(msg)
{
	var message = "";
	var add_msg = "";
	if(40 <= msg.t && msg.t < 60)
	{
		add_msg = "うーん、、、微妙なところです。";
	}
	message = "投手である確率" + msg.t +"％、野手である確率" + msg.y + "％です。" + add_msg;

	$('#dudge_result').addClass("alert-danger");
	$('#dudge_result').html(message);
}

