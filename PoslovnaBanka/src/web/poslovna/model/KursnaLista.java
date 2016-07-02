package web.poslovna.model;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Date;

public class KursnaLista 
{
	private Integer id;
	private Date datum;
	private BigDecimal brojListe;
	private Date primenjujeSeOd;
	
	private String pib;
	private String nazivBanke;
	
	public KursnaLista()
	{
		
	}

	public KursnaLista(Integer id, Date datum, BigDecimal brojListe,
			Date primenjujeSeOd, String pib, String nazivBanke) {
		super();
		this.id = id;
		this.datum = datum;
		this.brojListe = brojListe;
		this.primenjujeSeOd = primenjujeSeOd;
		this.pib = pib;
		this.nazivBanke = nazivBanke;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getDatum() {
		return datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}

	public BigDecimal getBrojListe() {
		return brojListe;
	}

	public void setBrojListe(BigDecimal brojListe) {
		this.brojListe = brojListe;
	}

	public Date getPrimenjujeSeOd() {
		return primenjujeSeOd;
	}

	public void setPrimenjujeSeOd(Date primenjujeSeOd) {
		this.primenjujeSeOd = primenjujeSeOd;
	}

	public String getPib() {
		return pib;
	}

	public void setPib(String pib) {
		this.pib = pib;
	}

	public String getNazivBanke() {
		return nazivBanke;
	}

	public void setNazivBanke(String nazivBanke) {
		this.nazivBanke = nazivBanke;
	}
	
}
