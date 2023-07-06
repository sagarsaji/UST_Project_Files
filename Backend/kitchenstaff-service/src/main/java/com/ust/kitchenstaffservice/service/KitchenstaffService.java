package com.ust.kitchenstaffservice.service;

import com.ust.kitchenstaffservice.exception.CartNotFoundException;
import com.ust.kitchenstaffservice.modal.Kitchenstaff;
import com.ust.kitchenstaffservice.repository.KitchenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class KitchenstaffService {

    @Autowired
    private KitchenRepo kitchenRepo;

    public Kitchenstaff addOrders(Kitchenstaff kitchen) {
        return kitchenRepo.save(kitchen);
    }



    public List<Kitchenstaff> getAllOrdersbyRestuarentname(String restname) {
        return kitchenRepo.findAllByRestname(restname);
    }

    public Kitchenstaff updateStatus(Long cartid) throws CartNotFoundException {
        Kitchenstaff c = null;
        Optional<Kitchenstaff> opt = kitchenRepo.findByCartid(cartid);
        if(opt.isPresent()){
            c = opt.get();
            c.setStatus("Ready");
        }
        return kitchenRepo.save(c);
    }

    public List<Kitchenstaff> getOrderByUserId(Long userid) {
        Optional<List<Kitchenstaff>> op = kitchenRepo.getByUserid(userid);
        if (op.isPresent()) {
            List<Kitchenstaff> kitchenstaff = op.get();
            return kitchenstaff;
        } else {
            return null;
        }
    }

    public ResponseEntity<List<Kitchenstaff>> getByStatus() {
        return ResponseEntity.ok(kitchenRepo.getByStatus());
    }

}
