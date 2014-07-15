casper.start('/Users/dfox-powell/dev/phantomcss/test/files/index.html')
.then(function() {
  phantomcss.screenshot('body', 'Main app');
});