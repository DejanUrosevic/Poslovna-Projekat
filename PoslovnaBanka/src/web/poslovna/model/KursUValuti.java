package web.poslovna.model;

import java.math.BigDecimal;
import java.sql.Date;

public class KursUValuti 
{
	private BigDecimal redniBroj;
	private BigDecimal kupovni;
	private BigDecimal srednji;
	private BigDecimal prodajni;
	
	private Integer idKursneListe;
	private Date primenjujeSeOd;
	
	private Integer idOsnovneValute;
	private String nazivOsnovneValute;
	
	private Integer idPremaValuti;
	private String nazivPremaValuti;
	
	public KursUValuti()
	{
		
	}

	public KursUValuti(BigDecimal redniBroj, BigDecimal kupovni,
			BigDecimal srednji, BigDecimal prodajni, Integer idKursneListe,
			Date primenjujeSeOd, Integer idOsnovneValute,
			String nazivOsnovneValute, Integer idPremaValuti,
			String nazivPremaValuti) {
		super();
		this.redniBroj = redniBroj;
		this.kupovni = kupovni;
		this.srednji = srednji;
		this.prodajni = prodajni;
		this.idKursneListe = idKursneListe;
		this.primenjujeSeOd = primenjujeSeOd;
		this.idOsnovneValute = idOsnovneValute;
		this.nazivOsnovneValute = nazivOsnovneValute;
		this.idPremaValuti = idPremaValuti;
		this.nazivPremaValuti = nazivPremaValuti;
	}

	public BigDecimal getRedniBroj() {
		return redniBroj;
	}

	public void setRedniBroj(BigDecimal redniBroj) {
		this.redniBroj = redniBroj;
	}

	public BigDecimal getKupovni() {
		return kupovni;
	}

	public void setKupovni(BigDecimal kupovni) {
		this.kupovni = kupovni;
	}

	public BigDecimal getSrednji() {
		return srednji;
	}

	public void setSrednji(BigDecimal srednji) {
		this.srednji = srednji;
	}

	public BigDecimal getProdajni() {
		return prodajni;
	}

	public void setProdajni(BigDecimal prodajni) {
		this.prodajni = prodajni;
	}

	public Integer getIdKursneListe() {
		return idKursneListe;
	}

	public void setIdKursneListe(Integer idKursneListe) {
		this.idKursneListe = idKursneListe;
	}

	public Date getPrimenjujeSeOd() {
		return primenjujeSeOd;
	}

	public void setPrimenjujeSeOd(Date primenjujeSeOd) {
		this.primenjujeSeOd = primenjujeSeOd;
	}

	public Integer getIdOsnovneValute() {
		return idOsnovneValute;
	}

	public void setIdOsnovneValute(Integer idOsnovneValute) {
		this.idOsnovneValute = idOsnovneValute;
	}

	public String getNazivOsnovneValute() {
		return nazivOsnovneValute;
	}

	public void setNazivOsnovneValute(String nazivOsnovneValute) {
		this.nazivOsnovneValute = nazivOsnovneValute;
	}

	public Integer getIdPremaValuti() {
		return idPremaValuti;
	}

	public void setIdPremaValuti(Integer idPremaValuti) {
		this.idPremaValuti = idPremaValuti;
	}

	public String getNazivPremaValuti() {
		return nazivPremaValuti;
	}

	public void setNazivPremaValuti(String nazivPremaValuti) {
		this.nazivPremaValuti = nazivPremaValuti;
	}
	
	
	
}
