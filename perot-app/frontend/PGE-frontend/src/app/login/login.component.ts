import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { UserService } from './user.service';
import { DataService } from '../data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Array to store user info retreived from backend
  userdata : Object
  
  // Input variable
  name : string
  username : string

  // Checkpoints array connection
  checkpoints : string[]

  constructor(private userService : UserService, private dataService : DataService, private router: Router) { }

  ngOnInit(): void {
    // Subscribe to data service
    this.dataService.sharedMessage.subscribe(message => this.checkpoints = message);
  }

  // Function to load user info into backend
  getReturningUser(){
    // console.log("User Entered Nickname: " + this.username);

    // Obtain userdata
    const data = this.username;
    // console.log(data);
    this.userService.getUserData(data).subscribe(res => {
      this.userdata = res;

      // Pass userdate to data service
      this.sendData();
      
      // Route to progress page
      this.router.navigate(['/progress']);
    });
    
    
  }

  // Function to register a new user
  getNewUser(){
    // console.log("User Entered Name: " + this.name);

    // Obtain username
    const data = new HttpParams().set('name', this.name)
    console.log(data);
    this.userService.getNickname(data).subscribe(res => {
      this.username = res;
      console.log(this.username);
      this.passName(this.name)
      this.passUsername(this.username)
    });
  }
  passName(value){ 
    this.dataService.passName(value);
    // console.log("passed " + value);
  }
  passUsername(value){ 
    this.dataService.passUsername(value);
    // console.log("passed " + value);
  }


  // Pass user data to data service
  sendData(){

    // For each checkpoint boolean, append the corresponding string to the checkpoints list
    console.log(this.userdata)

    if(this.userdata["checkpoint1"] == true){
      this.add("checkpoint 1");
    }
    if(this.userdata["checkpoint2"] == true){
      this.add("checkpoint 2");
    }
    if(this.userdata["checkpoint3"] == true){
      this.add("checkpoint 3");
    }
    if(this.userdata["checkpoint4"] == true){
      this.add("checkpoint 4");
    }
    if(this.userdata["checkpoint5"] == true){
      this.add("checkpoint 5");
    }
    
  }

  // Update message with string
  add(input : string){
    this.dataService.addMessage(input);
  }


}
