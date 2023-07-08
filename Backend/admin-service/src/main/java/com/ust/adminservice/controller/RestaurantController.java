package com.ust.adminservice.controller;

import com.ust.adminservice.modal.Restaurant;
import com.ust.adminservice.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/restaurant/")
@CrossOrigin("*")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    /**
     * Creates a new restaurant.
     *
     * @param rest The restaurant object to be created.
     * @return ResponseEntity containing the created restaurant.
     */
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Restaurant rest) {
        return ResponseEntity.ok().body(restaurantService.addRestaurant(rest));
    }

    /**
     * Retrieves all restaurants.
     *
     * @return ResponseEntity containing a list of all restaurants.
     */
    @GetMapping("/all")
    public ResponseEntity<List<Restaurant>> getall() {
        return ResponseEntity.ok().body(restaurantService.getAllRest());
    }

    /**
     * Deletes a restaurant by ID.
     *
     * @param id The ID of the restaurant to be deleted.
     */
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        restaurantService.deleteRest(id);
        ResponseEntity.ok().build();
    }

    /**
     * Updates a restaurant by ID.
     *
     * @param id   The ID of the restaurant to be updated.
     * @param rest The updated restaurant object.
     * @return ResponseEntity containing the updated restaurant.
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Restaurant rest) {
        return ResponseEntity.ok().body(restaurantService.updateRest(id, rest));
    }

    /**
     * Retrieves a restaurant by ID.
     *
     * @param id The ID of the restaurant to be retrieved.
     * @return ResponseEntity containing the retrieved restaurant.
     */
    @GetMapping("/getbyid/{id}")
    public ResponseEntity<Restaurant> getbyid(@PathVariable Long id) {
        return ResponseEntity.ok().body(restaurantService.getRestById(id));
    }

}
