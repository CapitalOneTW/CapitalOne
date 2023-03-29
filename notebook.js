<style>
$(document).ready(function() {
	// 初始化，讀取Excel文件中的數據，並顯示在頁面上
	var notes = [];
	var wb;
	var ws;
	var file = "notebook.xlsx";
	var reader = new FileReader();
	reader.onload = function(e) {
		var data = e.target.result;
		wb = XLSX.read(data, {type: 'binary'});
		ws = wb.Sheets[wb.SheetNames[0]];
		var range = XLSX.utils.decode_range(ws['!ref']);
		for(var row = range.s.r; row <= range.e.r; row++) {
			var note = {};
			note.id = XLSX.utils.encode_cell({c:0, r:row});
			note.content = ws[note.id].v;
			notes.push(note);
		}
		showNotes();
	};
	reader.readAsBinaryString(file);

	// 新增按鈕點擊事件處理函數
	$('#add-button').click(function() {
		var content = $('#note-input').val();
		if(content !== '') {
			var note = {};
			note.id = XLSX.utils.encode_cell({c:0, r:notes.length});
			note.content = content;
			notes.push(note);
			saveNotes();
			showNotes();
			$('#note-input').val('');
		}
	});

	// 刪除按鈕點擊事件處理函數
	$('#delete-button').click(function() {
var ids = [];
$('#note-list input:checked').each(function() {
ids.push($(this).attr('id'));
});
for(var i = 0; i < ids.length; i++) {
var index = parseInt(ids[i].substring(5));
notes.splice(index, 1);
}
saveNotes();
showNotes();
});
// 顯示所有記事的函數
function showNotes() {
	var html = '';
	for(var i = 0; i < notes.length; i++) {
		html += '<div><input type="checkbox" id="note-' + i + '"><span>' + notes[i].content + '</span></div>';
	}
	$('#note-list').html(html);
}

// 將數據保存到Excel文件的函數
function saveNotes() {
	var wb = XLSX.utils.book_new();
	var ws = XLSX.utils.json_to_sheet(notes);
	XLSX.utils.book_append_sheet(wb, ws, "Notes");
	var wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
	function s2ab(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for(var i = 0; i < s.length; i++) {
			view[i] = s.charCodeAt(i) & 0xFF;
		}
		return buf;
	}
	var blob = new Blob([s2ab(wbout)], {type: 'application/octet-stream'});
	saveAs(blob, file);
}
</style>
