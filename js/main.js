initEditor();

function initEditor() {
	
	var editor = ace.edit('md-editor');
	editor.setTheme('ace/theme/monokai');
	editor.getSession().setMode('ace/mode/markdown');
	editor.getSession().setTabSize(4);
	editor.getSession().setUseWrapMode(true);
	editor.setValue(localStorage.localData || "");
	
	var viewer = parseMarkdown(editor);
	fixScrollBar(editor, viewer);
	
	editor.getSession().on('change', function(e) {
		parseMarkdown(editor);
	});
}

function parseMarkdown(editor) {
	var viewer = $('#md-viewer');
	
	var data = editor.getValue();
	localStorage.localData = data;
	data = marked(data);
	viewer.html(data);
	
	highlightCode(viewer);
	
	return viewer;
}

function highlightCode(viewer) {
	 $('pre > code', viewer).each(function () {
	    hljs.highlightBlock(this);
	  });
}


function fixScrollBar(editor, viewer) {
  var session = editor.getSession();
	console.log(session)
  session.setScrollTop(0);

  session.on('changeScrollTop', function () {
    var sTop = session.getScrollTop();
    viewer.scrollTop(sTop);
  });

  viewer.on('scroll', function () {
    var sTop = viewer.scrollTop();
    session.setScrollTop(sTop);
  });
}