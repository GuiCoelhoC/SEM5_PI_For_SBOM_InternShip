export class API_URL {
    static nodejs_url: string = 'http://127.0.0.1:3000/api';
    constructor() {}
    //nodejs_url = 'http://vs1073.dei.isep.ipp.pt:3000/api';
    static dotnet_url: string = 'https://localhost:7005/api';

    static tasks: string[] = [
      "Delivery",
      "Survailance",
      "Desinfection"
    ]
}
