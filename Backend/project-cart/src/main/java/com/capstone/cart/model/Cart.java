package com.capstone.cart.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cart")
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cartid")
	private Long cartid;
	
	@Column(name = "userid")
	private Long userid;
	@Column(name = "restname")
	private String restName;
	@Column(name = "mid")
	private Long prodid;
	
	@Column(name = "mname")
	private String prodname;
	
	@Column(name = "mprice")
	private Long price;

	private String status;

	@Column(name="mpic")
	private String mpic;

	private int quantity;

	public Cart() {
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Long getCartid() {
		return cartid;
	}

	public void setCartid(Long cartid) {
		this.cartid = cartid;
	}

	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	public String getRestName() {
		return restName;
	}

	public void setRestName(String restName) {
		this.restName = restName;
	}

	public Long getProdid() {
		return prodid;
	}

	public void setProdid(Long prodid) {
		this.prodid = prodid;
	}

	public String getProdname() {
		return prodname;
	}

	public void setProdname(String prodname) {
		this.prodname = prodname;
	}

	public Long getPrice() {
		return price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMpic() {
		return mpic;
	}

	public void setMpic(String mpic) {
		this.mpic = mpic;
	}

	public Cart(Long cartid, Long userid, String restName, Long prodid,
				String prodname, Long price, String status,String mpic,int quantity) {
		this.cartid = cartid;
		this.userid = userid;
		this.restName = restName;
		this.prodid = prodid;
		this.prodname = prodname;
		this.price = price;
		this.status = status;
		this.mpic = mpic;
		this.quantity = quantity;
	}
}
