package com.cravio.authenticationservice.controller;

import com.cravio.authenticationservice.dto.UserRegistrationRequest;
import com.cravio.authenticationservice.model.User;
import com.cravio.authenticationservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Initializes roles and users upon controller initialization.
     */
    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }

    /**
     * Registers a new user.
     *
     * @param userRegistrationRequest The registration request containing user details.
     * @return ResponseEntity containing the registered user.
     */
    @PostMapping({"/registerNewUser"})
    public ResponseEntity<User> registerNewUser(@RequestBody @Valid UserRegistrationRequest userRegistrationRequest) {
        return userService.registerNewUser(userRegistrationRequest);
    }

    /**
     * Registers a new kitchen staff.
     *
     * @param userRegistrationRequest The registration request containing kitchen staff details.
     * @return ResponseEntity containing the registered kitchen staff.
     */
    @PostMapping({"/registerNewKitchenStaff"})
    public ResponseEntity<User> registerNewKitchenStaff(@RequestBody @Valid UserRegistrationRequest userRegistrationRequest) {
        return userService.registerNewKitchenStaff(userRegistrationRequest);
    }

    /**
     * Retrieves a message accessible only to users with the 'Admin' role.
     *
     * @return A message accessible only to admins.
     */
    @GetMapping({"/forAdmin"})
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin() {
        return "This URL is only accessible to the admin";
    }

    /**
     * Retrieves a message accessible only to users with the 'User' role.
     *
     * @return A message accessible only to users.
     */
    @GetMapping({"/forUser"})
    @PreAuthorize("hasRole('User')")
    public String forUser() {
        return "This URL is only accessible to the user";
    }

    /**
     * Retrieves a message accessible only to users with the 'KitchenStaff' role.
     *
     * @return A message accessible only to kitchen staff.
     */
    @GetMapping({"/forKitchenStaff"})
    @PreAuthorize("hasRole('KitchenStaff')")
    public String forKitchenstaff() {
        return "This URL is only accessible to the kitchen staff";
    }

    /**
     * Retrieves a user by user ID.
     *
     * @param userid The ID of the user.
     * @return ResponseEntity containing the retrieved user.
     */
    @GetMapping("/getUserByUserid/{userid}")
    public ResponseEntity<User> getUserByUserid(@PathVariable long userid) {
        return userService.getUserByUserid(userid);
    }

    /**
     * Retrieves a user by username.
     *
     * @param userName The username of the user.
     * @return The retrieved user.
     */
    @GetMapping("/getUserByUsername/{userName}")
    public User getUserByUsername(@PathVariable String userName) {
        return userService.getUserByUserName(userName);
    }
}
