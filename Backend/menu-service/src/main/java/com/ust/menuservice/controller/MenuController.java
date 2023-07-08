package com.ust.menuservice.controller;

import com.ust.menuservice.modal.Menu;
import com.ust.menuservice.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/menu")
@CrossOrigin("*")
public class MenuController {

    @Autowired
    private MenuService menuService;

    /**
     * Adds a menu item.
     *
     * @param menu The menu item to be added.
     * @return ResponseEntity containing the added menu item.
     */
    @PostMapping("/addmenu")
    public ResponseEntity<?> addMenu(@RequestBody Menu menu) {
        return ResponseEntity.ok().body(menuService.addMenu(menu));
    }

    /**
     * Deletes a menu item by menu ID.
     *
     * @param mid The ID of the menu item to be deleted.
     */
    @DeleteMapping("/delete/menu/{mid}")
    public void deletemenu(@PathVariable Long mid) {
        menuService.deleteMenu(mid);
        ResponseEntity.ok().build();
    }

    /**
     * Updates a menu item by menu ID.
     *
     * @param mid  The ID of the menu item to be updated.
     * @param menu The updated menu item.
     * @return ResponseEntity containing the updated menu item.
     */
    @PutMapping("/update/{mid}")
    public ResponseEntity<?> updatemenu(@PathVariable Long mid, @RequestBody Menu menu) {
        return ResponseEntity.ok().body(menuService.updateMenu(mid, menu));
    }

    /**
     * Retrieves menu items by restaurant name.
     *
     * @param restname The name of the restaurant.
     * @return ResponseEntity containing a list of menu items.
     */
    @GetMapping("/find/{restname}")
    public ResponseEntity<List<Menu>> getByRestName(@PathVariable String restname) {
        return ResponseEntity.ok().body(menuService.getByRestname(restname));
    }

    /**
     * Retrieves all menu items.
     *
     * @return ResponseEntity containing a list of all menu items.
     */
    @GetMapping("/getAllMenu")
    public ResponseEntity<List<Menu>> getAllMenu() {
        return ResponseEntity.ok().body(menuService.getAllMenu());
    }

    /**
     * Retrieves a menu item by menu ID.
     *
     * @param mid The ID of the menu item to be retrieved.
     * @return ResponseEntity containing the retrieved menu item.
     */
    @GetMapping("/getbyid/menu/{mid}")
    public ResponseEntity<Menu> getbymid(@PathVariable Long mid) {
        return ResponseEntity.ok().body(menuService.getByMenuid(mid));
    }

}
