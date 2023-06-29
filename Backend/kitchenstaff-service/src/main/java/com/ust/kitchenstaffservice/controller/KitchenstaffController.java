package com.ust.kitchenstaffservice.controller;

import com.ust.kitchenstaffservice.exception.CartNotFoundException;
import com.ust.kitchenstaffservice.modal.Cart;
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

    @Autowired
    private ControllerConsumer controllerConsumer;

    @PostMapping("/addOrders")
    public ResponseEntity<Kitchenstaff> addOrder(@RequestBody Kitchenstaff kitchen){
        return ResponseEntity.ok(service.addOrders(kitchen));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Cart>> getAllOrders(){
        return controllerConsumer.getAllOrders();
    }

    @GetMapping("/sortbystatus")
    public ResponseEntity<List<Cart>> getByStatus(){
        return controllerConsumer.getByStatus();
    }

    //get item by res
    @GetMapping("/ordersbyrestuarent/{restname}")
    public ResponseEntity<List<Kitchenstaff>> getAllOrdersbyRestuarentname(@PathVariable String restname){
        return ResponseEntity.ok(service.getAllOrdersbyRestuarentname(restname));
    }

    @PutMapping("/orders/{cartid}")
    public ResponseEntity<?> updateStatus(@PathVariable Long cartid) throws CartNotFoundException {
        return controllerConsumer.updateStatus(cartid);
    }

}
