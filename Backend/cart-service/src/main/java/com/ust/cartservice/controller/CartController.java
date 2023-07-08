package com.ust.cartservice.controller;

import com.ust.cartservice.modal.Cart;
import com.ust.cartservice.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.ws.rs.Path;
import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartServ;

    /**
     * Retrieves cart details by cart ID.
     *
     * @param cId The ID of the cart.
     * @return ResponseEntity containing the cart details if found, otherwise an error message.
     */
    @GetMapping("/viewBycart/{cId}")
    public ResponseEntity<?> getDetailsByCartId(@PathVariable Long cId) {
        Cart c = cartServ.getByCartId(cId);
        if (c != null)
            return new ResponseEntity<Cart>(c, HttpStatus.OK);
        else
            return new ResponseEntity<String>("Cart not available", HttpStatus.NOT_FOUND);
    }

    /**
     * Retrieves cart details by user ID.
     *
     * @param userid The ID of the user.
     * @return ResponseEntity containing a list of cart details if found, otherwise an error message.
     */
    @GetMapping("/viewByuser/{userid}")
    public ResponseEntity<?> getDetailsByUserId(@PathVariable Long userid) {
        List<Cart> cList = cartServ.getByUserId(userid);
        if (cList != null)
            return new ResponseEntity<List<Cart>>(cList, HttpStatus.OK);
        else
            return new ResponseEntity<String>("User not available", HttpStatus.NOT_FOUND);
    }

    /**
     * Retrieves all orders.
     *
     * @return ResponseEntity containing a list of all orders.
     */
    @GetMapping("/orders")
    public ResponseEntity<List<Cart>> getAllOrders() {
        return ResponseEntity.ok(cartServ.getAllOrders());
    }

    /**
     * Updates the status of an order.
     *
     * @param cartid The ID of the cart/order to be updated.
     * @return ResponseEntity containing the updated cart.
     */
    @PutMapping("/update/orderstatus/{cartid}")
    public ResponseEntity<Cart> updateStatus(@PathVariable Long cartid) {
        return ResponseEntity.ok(cartServ.updateStatus(cartid));
    }

    /**
     * Retrieves cart details by restaurant name.
     *
     * @param restname The name of the restaurant.
     * @return ResponseEntity containing a list of cart details if found, otherwise an error message.
     */
    @GetMapping("/{restname}")
    public ResponseEntity<List<Cart>> viewByRestname(@PathVariable String restname) {
        List<Cart> opt = cartServ.getByRestname(restname);
        if (opt != null) {
            return ResponseEntity.ok(opt);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Adds a new item to the cart.
     *
     * @param cNew The new cart item to be added.
     * @return ResponseEntity containing the added cart item.
     */
    @PostMapping("/addCart")
    public ResponseEntity<?> addCart(@RequestBody Cart cNew) {
        Cart c = cartServ.addCart(cNew);
        return new ResponseEntity<Cart>(c, HttpStatus.OK);
    }

    /**
     * Deletes a cart item by cart ID and user ID.
     *
     * @param cartid The ID of the cart item to be deleted.
     * @param userid The ID of the user associated with the cart item.
     * @return ResponseEntity with a success message.
     */
    @DeleteMapping("/del/{cartid}/{userid}")
    public ResponseEntity<String> deleteCart(@PathVariable Long cartid, @PathVariable Long userid) {
        cartServ.deleteCartByCartIdAndUserId(cartid, userid);
        return ResponseEntity.ok("Cart deleted successfully.");
    }

    /**
     * Deletes all cart items by user ID.
     *
     * @param userid The ID of the user associated with the cart items.
     * @return ResponseEntity with a success message.
     */
    @DeleteMapping("/del/{userid}")
    @Transactional
    public ResponseEntity<Void> deleteItem(@PathVariable Long userid) {
        cartServ.deleteByUserId(userid);
        return ResponseEntity.ok().build();
    }

    /**
     * Deletes a cart item by cart ID.
     *
     * @param cartid The ID of the cart item to be deleted.
     * @return ResponseEntity with a success message.
     */
    @DeleteMapping("/del/cart/{cartid}")
    @Transactional
    public ResponseEntity<Void> deleteByCart(@PathVariable Long cartid) {
        cartServ.deleteByCartId(cartid);
        return ResponseEntity.ok().build();
    }

    /**
     * Increments the quantity of items in the cart.
     *
     * @param cartid The ID of the cart item to be updated.
     * @return ResponseEntity containing the updated cart item.
     */
    @CrossOrigin
    @PutMapping("/incrementUpdateQuantity/{cartid}")
    public ResponseEntity<Cart> iupdateQuantity(@PathVariable Long cartid) {
        return ResponseEntity.ok(cartServ.iupdateQuantity(cartid));
    }

    /**
     * Decrements the quantity of items in the cart.
     *
     * @param cartid The ID of the cart item to be updated.
     * @return ResponseEntity containing the updated cart item.
     */
    @CrossOrigin
    @PutMapping("/decrementUpdateQuantity/{cartid}")
    public ResponseEntity<Cart> dupdateQuantity(@PathVariable Long cartid) {
        return ResponseEntity.ok(cartServ.dupdateQuantity(cartid));
    }

    /**
     * Retrieves the total amount of a cart.
     *
     * @param cartid The ID of the cart.
     * @return ResponseEntity containing the total amount of the cart.
     */
    @GetMapping("/gettotal/{cartid}")
    public ResponseEntity<Long> getTotal(@PathVariable Long cartid) {
        return ResponseEntity.ok(cartServ.getTotalAmount(cartid));
    }

    /**
     * Retrieves cart details by status.
     *
     * @return ResponseEntity containing a list of cart details.
     */
    @GetMapping("/sortbystatus")
    public ResponseEntity<List<Cart>> getByStatus() {
        return new ResponseEntity<List<Cart>>(cartServ.getByStatus(), HttpStatus.OK);
    }
}
