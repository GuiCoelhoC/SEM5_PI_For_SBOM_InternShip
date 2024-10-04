import { Component } from '@angular/core';
import { SharedService } from 'src/app/service/SharedService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private sharedService: SharedService) {}

}
