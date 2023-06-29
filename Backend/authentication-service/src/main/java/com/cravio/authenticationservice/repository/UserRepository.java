package com.cravio.authenticationservice.repository;

import com.cravio.authenticationservice.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    Optional<User> findByUserid(long userid);

    User findByUserName(String userName);
}