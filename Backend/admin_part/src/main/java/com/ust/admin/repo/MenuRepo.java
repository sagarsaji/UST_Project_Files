package com.ust.admin.repo;

import com.ust.admin.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepo extends JpaRepository<Menu,Long> {


    List<Menu> findByRestname(String restname);
}
