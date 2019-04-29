function testjs(centralPointsArr, coinCentersArr) {
  console.log('test.js is here');

  // misc function helper
  function findEndpoints(x1, y1, x2, y2, height, width) {
    let slope = (y2 - y1) / (x2 - x1);
    let intercept = y1 - slope * x1;
  }

  // ajax call from front to server
  async function sendToServer() {
    var url = '/api/';
    var data = { centralPointsArr, coinCentersArr };
    await fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response =>
        console.log('DataReceivedBackfromPostRoute:', JSON.stringify(response))
      )
      .catch(error => console.error('Error:', error));
  }
  sendToServer();

  // ajax call from server to front
  async function recieveFromServer() {
    try {
      const result = await fetch('/api/');
      const data = await result.json();

      console.log(data, 'dataReceivedfromGetRoute');
    } catch (error) {
      console.error(error);
    }
  }
  recieveFromServer();
}

document.testjs = testjs;
