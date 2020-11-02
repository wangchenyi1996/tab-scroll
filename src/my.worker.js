onmessage = function(e) {
  if (e.data) {
    postMessage(e.data);
  } else {
    postMessage('没有传数据');
  }
}