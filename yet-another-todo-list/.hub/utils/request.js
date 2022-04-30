import http from "http";

export default {
  get (route) {
    return new Promise((resolve, reject) => {
      http.request({
        hostname: 'localhost',
        port: 5000,
        path: route,
        method: 'GET'
      }, res => {
        let response = '';
        
        res.setEncoding('utf8');

        res.on('data', chunk => {
          response += chunk;
        });

        res.on('end', () => {
          resolve({ status: res.statusCode, data: JSON.parse(response) });
        });

        res.on('error', err => {
          reject(err);
        });
      }).end();
    });
  },

  post (route, data) {
    return new Promise((resolve, reject) => {
      const serializedData = JSON.stringify(data);

      const req = http.request({
        hostname: 'localhost',
        port: 5000,
        path: route,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(serializedData)
        }
      }, res => {
        let response = '';
        
        res.setEncoding('utf8');

        res.on('data', chunk => {
          response += chunk;
        });

        res.on('end', () => {
          resolve({ status: res.statusCode, data: JSON.parse(response) });
        });

        res.on('error', err => {
          reject(err);
        });
      });

      req.write(serializedData);
      req.end();
    });
  }
}
