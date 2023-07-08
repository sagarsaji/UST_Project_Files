package com.ust.kitchenstaffservice.controller;

import com.ust.kitchenstaffservice.exception.CartNotFoundException;
import com.ust.kitchenstaffservice.modal.Kitchenstaff;
import com.ust.kitchenstaffservice.service.KitchenstaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/staff")
@CrossOrigin("*")
public class KitchenstaffController {

    @Autowired
    private KitchenstaffService service;

    /**
     * Adds an order to the kitchen staff.
     *
     * @param kitchen The order details to be added.
     * @return ResponseEntity containing the added order.
     */
    @PostMapping("/addOrders")
    public ResponseEntity<Kitchenstaff> addOrder(@RequestBody Kitchenstaff kitchen) {
        return ResponseEntity.ok(service.addOrders(kitchen));
    }

    /**
     * Retrieves orders sorted by status.
     *
     * @return ResponseEntity containing a list of orders.
     */
    @GetMapping("/sortbystatus")
    public ResponseEntity<List<Kitchenstaff>> getByStatus() {
        return service.getByStatus();
    }

    /**
     * Retrieves orders by user ID.
     *
     * @param userid The ID of the user.
     * @return ResponseEntity containing a list of orders.
     */
    @GetMapping("/getbyuserid/{userid}")
    public ResponseEntity<List<Kitchenstaff>> getByUserId(@PathVariable Long userid) {
        return ResponseEntity.ok(service.getOrderByUserId(userid));
    }

    /**
     * Retrieves orders by restaurant name.
     *
     * @param restname The name of the restaurant.
     * @return ResponseEntity containing a list of orders.
     */
    @GetMapping("/ordersbyrestuarent/{restname}")
    public ResponseEntity<List<Kitchenstaff>> getAllOrdersbyRestuarentname(@PathVariable String restname) {
        return ResponseEntity.ok(service.getAllOrdersbyRestuarentname(restname));
    }

    /**
     * Updates the status of an order.
     *
     * @param cartid The ID of the order to be updated.
     * @return ResponseEntity containing the updated order.
     * @throws CartNotFoundException if the order is not found.
     */
    @PutMapping("/orders/{cartid}")
    public ResponseEntity<?> updateStatus(@PathVariable Long cartid) throws CartNotFoundException {
        return ResponseEntity.ok(service.updateStatus(cartid));
    }

}
