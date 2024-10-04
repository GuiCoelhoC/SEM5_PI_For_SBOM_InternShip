import { Component } from '@angular/core';
import { BuildingService } from 'src/app/service/BuildingService';

@Component({
  selector: 'app-path-finder',
  templateUrl: './path-finder.component.html',
  styleUrls: ['./path-finder.component.css']
})

export class PathFinderComponent {

  constructor(private BuildingService: BuildingService) { }

  findPaths() {
    const room1 = (<HTMLInputElement>document.getElementById('floatingRoom1')).value;
    const room2 = (<HTMLInputElement>document.getElementById('floatingRoom2')).value;

    console.log(room1);
    console.log(room2);
    /*
    if (this.isValid(room1) && this.isValid(room2)) {
      this.BuildingService.findPaths(room1, room2);
    } else {
      alert('Invalid Room Code!');
    }
    */
    this.BuildingService.testProlog(room1, room2).subscribe(
      (data: any) => {
        console.log(data);
      }
    );

  }

  isValid(value: string): boolean {
    return (value != null || value != undefined);
  }
    
}
