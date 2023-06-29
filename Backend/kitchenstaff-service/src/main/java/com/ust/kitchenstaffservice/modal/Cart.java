package com.ust.kitchenstaffservice.modal;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cartid")
    private long cartid;

    @Column(name = "userid")
    private Long userid;
    @Column(name = "restname")
    private String restname;
    @Column(name = "prodid")
    private Long prodid;

    @Column(name = "prodname")
    private String prodname;

    @Column(name = "price")
    private Long price;

    private String status;
    private Long quantity;

    @Column(name = "mpic")
    private String mpic;

    @Column(name = "total")
    private Long total;

}
