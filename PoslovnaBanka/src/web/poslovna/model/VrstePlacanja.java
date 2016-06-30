package web.poslovna.model;

import java.math.BigDecimal;

public class VrstePlacanja
{
	private BigDecimal oznaka;
	private String naziv;
	
	public VrstePlacanja()
	{
		
	}

	public VrstePlacanja(BigDecimal oznaka, String naziv) {
		super();
		this.oznaka = oznaka;
		this.naziv = naziv;
	}

	public BigDecimal getOznaka() {
		return oznaka;
	}

	public void setOznaka(BigDecimal oznaka) {
		this.oznaka = oznaka;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	

}
