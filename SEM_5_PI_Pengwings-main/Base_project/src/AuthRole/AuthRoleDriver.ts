import {reject} from "lodash";
import {Service} from "typedi";

@Service()
export default class AuthRoleDriver{



  public async getRequestRole(token: string): Promise<string>{
    const https = require('https');

    return new Promise<string>((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 7005,
        path: '/api/Users/role?token=' + token,
        method: 'GET',
        rejectUnauthorized: false, // Ignore certificate validation errors
      };

      const req = https.request(options, (resp: any) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk: any) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            resolve(data.trim());
        });
      });

      req.on("error", (err: any) => {
        console.error("Error: " + err.message);
        reject("Error: " + err.message);
      });

      req.end();
    });
  }
}
