package com.jpmc.perotMuseumScavengerHunt.controller;

import com.jpmc.perotMuseumScavengerHunt.model.User;
import com.jpmc.perotMuseumScavengerHunt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="*", allowedHeaders="*")
@EnableAutoConfiguration
public class UserController {

    private final UserService serviceObject;

    @Autowired
    public UserController(UserService serviceObject) {
        this.serviceObject = serviceObject;
    }

    @PostMapping("/createUser")
    @ResponseBody
    public String createUser(@RequestParam("name") String name) {
        return serviceObject.createUser(name);
    }

    @RequestMapping("/getUser")
    public User getUser(@RequestParam("nickname") String nickname) {
        return serviceObject.getUser(nickname);
    }

    @PutMapping("/updateProgress")
    public int updateUser(@RequestParam("checkpoint") String checkpoint, @RequestParam("nickname") String nickname) {
        return serviceObject.updateProgress(checkpoint, nickname);
    }

    @PutMapping("/updateEmail")
    public int updateEmail(@RequestParam("email") String email, @RequestParam("nickname") String nickname) {
        return serviceObject.updateEmail(email, nickname);
    }

}
