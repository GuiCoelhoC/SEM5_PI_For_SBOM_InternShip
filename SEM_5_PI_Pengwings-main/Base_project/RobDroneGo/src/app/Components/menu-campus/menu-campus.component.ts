import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/SharedService';
import { Location } from '@angular/common';
@Component({
    selector: 'app-menu-campus',
    templateUrl: './menu-campus.component.html',
    styleUrls: ['./menu-campus.component.scss']
    })

export class MenuCampusComponent implements OnInit{

    constructor(private sharedService: SharedService, private _location: Location) { }

    ngOnInit(): void{
        this.sharedService.menuCampusSelected$.subscribe(() => {
            console.log('Campus menu has been selected');
        });
    }

    showBuildings(): void {
        this.sharedService.showBuildings();
    }

    showFloors(): void {
        this.sharedService.showFloors();
    }

    showElevators(): void {
        this.sharedService.showElevators();
    }

    showPassages(): void {
        this.sharedService.showPassages();
    }

    showRooms(): void {
        this.sharedService.showRooms();
    }

    selectVisualization3D(){
        this.sharedService.selectVisualization3D();
    }

    selectFloor(): void {
        this.sharedService.selectFloor();
    }

    back(){
        this._location.back();
    }
}
