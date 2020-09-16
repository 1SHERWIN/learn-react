import { Component, OnInit } from '@angular/core';
import { createPopper } from '@popperjs/core';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { UserService } from '../login/user.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  providers: [ UserService ]
})
export class ProgressComponent implements OnInit {

  // User's first name
  name = "loading";
  username = "loading";
    
  // String variable
  scannedString = "";

  // Integer variable to keep track of checkpoints
  checkpoints = 0;

  // Variable to connect to DataService, stores list of checkpoints
  message : string[];

  // Bolean value for game completion
  completed = false;


  constructor(private userService : UserService, private dataService : DataService) { }

  button: HTMLElement = document.querySelector('#button');
  tooltip: HTMLElement = document.querySelector('#tooltip');



  // This function runs on page startup
  ngOnInit(): void {

    // load name
    this.dataService.nameString$.subscribe(
      data => {
        this.name = data; 
      });

      this.dataService.usernameString$.subscribe(
        data => {
          this.username = data; 
        });
  
    // Create pop-up element
    createPopper(this.button, this.tooltip, {
      placement: 'right',
    });

    // This code connects the message variable to the shared service variable
    this.dataService.sharedMessage.subscribe(message => this.message = message);
    console.log(this.message);

    // Check the strings contained in message, and update the src files to highlight the images
    if(this.message != []){

      if(this.message.includes("checkpoint 1")){
        (document.getElementById("lungs-checkpoint") as HTMLImageElement).src = "/assets/img/checkpoints/lungs-colored.png";
        this.checkpoints++;
      }
      if(this.message.includes("checkpoint 2")){
        (document.getElementById("jewel-checkpoint") as HTMLImageElement).src = "/assets/img/checkpoints/jewel-colored.png";
        this.checkpoints++;
      }
      if(this.message.includes("checkpoint 3")){
        (document.getElementById("dino-checkpoint") as HTMLImageElement).src = "/assets/img/checkpoints/dinosaur-colored.png";
        this.checkpoints++;
      }
      if(this.message.includes("checkpoint 4")){
        (document.getElementById("spaceship-checkpoint") as HTMLImageElement).src = "/assets/img/checkpoints/spaceship-colored.png";
        this.checkpoints++;
      }
      if(this.message.includes("checkpoint 5")){
        (document.getElementById("football-checkpoint") as HTMLImageElement).src = "/assets/img/checkpoints/football-colored.png";
        this.checkpoints++;
      }    

    }

    // Ensure checkpoint counter doesn't exceed 5
    if(this.checkpoints > 5){
      this.checkpoints = 5;
    }

    // Call this function to update the progress bar
    this.updateProgressBar();

  }

  // Change the elements width and aria-value now
  updateProgressBar(){
    const bar = (document.getElementById("progress-bar") as HTMLDivElement);
    const value = (this.checkpoints/5) * 100;
    bar.setAttribute("style","width: " + value + "%");
    bar.setAttribute("aria-valuenow", "75");

    // If all checkpoints have been found, render the game exit button
    if(this.checkpoints == 5){
      this.completed = true;
    }
  }
  

}
