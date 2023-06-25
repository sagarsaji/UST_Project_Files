package com.ust.cartservice.service;

import com.ust.cartservice.exception.CartnotFoundException;
import com.ust.cartservice.modal.Cart;
import com.ust.cartservice.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepo;

    /**
     * Retrieves a Cart by its cartId.
     *
     * @param cartId the cartId to search for
     * @return the Cart object if found, otherwise null
     */
    @Transactional
    public Cart getByCartId(Long cartId) {
        Optional<Cart> cart = cartRepo.findById(cartId);
        if (cart.isPresent())
            return cart.get();
        else
            return null;
    }

    /**
     * Retrieves a list of Carts by a userId.
     *
     * @param userId the userId to search for
     * @return the list of Cart objects if found, otherwise null
     */
    @Transactional
    public List<Cart> getByUserId(int userId) {
        List<Cart> userCarts = cartRepo.findByUserid(userId);
        if (userCarts != null)
            return userCarts;
        else
            return null;
    }

    /**
     * Adds a new Cart.
     *
     * @param c the Cart object to be added
     * @return the saved Cart object
     */
    @Transactional
    public Cart addCart(Cart c) {
        Cart exist = null;
        Optional<Cart> opt = cartRepo.findByProdid(c.getProdid());
        if (opt.isPresent()) {
            exist = opt.get();
            exist.setQuantity(exist.getQuantity() + 1);
            Long total = exist.getQuantity() * exist.getPrice();
            exist.setPrice(total);
            return cartRepo.save(exist);
        } else {
            c.setStatus("In progress");
            c.setQuantity(1L);
            Cart saveCart = cartRepo.save(c);
            System.out.println("added");
            return saveCart;
        }
    }


    /**
     * Deletes a Cart by its cartId and userId.
     *
     * @param cartId the cartId to delete
     * @param userId the userId to delete
     */
    @Transactional
    public void deleteCartByCartIdAndUserId(Long cartId, Long userId) {
        cartRepo.deleteByCartidAndUserid(cartId, userId);
        System.out.println("deleted");
    }

//    @Autowired
//    private JavaMailSender mailSender;

    /**
     * Sends a simple email using the provided details.
     *
     * @param toEmail  the recipient's email address
     * @param subject  the email subject
     * @param body     the email body
     */
//    public void sendSimpleEmail(String toEmail, String subject, String body) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("farmersust@gmail.com");
//        message.setTo(toEmail);
//        message.setText(body);
//        message.setSubject(subject);
//        mailSender.send(message);
//        System.out.println("Mail Send...");
//    }

    /**
     * Updates the quantity of a Cart by incrementing it by 1.
     *
     * @param cartid the cartId of the Cart to update
     * @return the updated Cart object
     */
    public Cart iupdateQuantity(Long cartid) {
        Cart c = cartRepo.findById(cartid).orElse(null);
        if(c!=null){
            c.setQuantity(c.getQuantity() + 1);
            Long total = c.getQuantity() * c.getPrice();
            c.setPrice(total);
        }
        cartRepo.save(c);
        return c;
    }

    /**
     * Updates the quantity of a Cart by decrementing it by 1.
     *
     * @param cartid the cartId of the Cart to update
     * @return the updated Cart object
     */
    public Cart dupdateQuantity(Long cartid) {
        Cart c = cartRepo.findById(cartid).orElse(null);
        if(c!=null){
            if(c.getQuantity()>0) {
                c.setQuantity(c.getQuantity() - 1);
                Long total = c.getQuantity() * c.getPrice();
                c.setPrice(total);
            }
        }
        cartRepo.save(c);
        return c;
    }

    public List<Cart> getByRestname(String restname) {
        return cartRepo.findAllByRestname(restname);
    }

    public Cart updateQuan(Cart cart) {
        Cart exist = null;
        Optional<Cart> existing = cartRepo.findByProdid(cart.getProdid());
        if(existing.isPresent()){
            exist = existing.get();
            exist.setQuantity(cart.getQuantity()+1);
        }
        return cartRepo.save(exist);
    }



}
