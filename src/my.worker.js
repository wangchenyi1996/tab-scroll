// 获取接口请求数据
function getData(data) {
  fetch("https://www.easy-mock.com/mock/5d3335cd9de4c138ca5a9d5f/example/charts/getCharts1")
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      postMessage({ method: 'sendWorkers', args: result });
    });
}

self.onmessage = function (e) {
  const result = e.data;
  if (result) {
    console.log(123)
    // getData(result)
    self.postMessage(result);
  } else {
    self.postMessage('没有传数据');
  }
}