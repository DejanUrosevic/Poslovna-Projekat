package web.poslovna.model;

public class KodoviBanke 
{
	private String sifra;
	private String swift;
	private String pibPravnogLica;
	private String nazivPravnogLica;
	
	public KodoviBanke()
	{
		
	}

	public KodoviBanke(String sifra, String swift, String pibPravnogLica, String nazivPravnogLica) {
		super();
		this.sifra = sifra;
		this.swift = swift;
		this.pibPravnogLica = pibPravnogLica;
		this.nazivPravnogLica = nazivPravnogLica;
	}

	public String getSifra() {
		return sifra;
	}

	public void setSifra(String sifra) {
		this.sifra = sifra;
	}

	public String getSwift() {
		return swift;
	}

	public void setSwift(String swift) {
		this.swift = swift;
	}

	public String getPibPravnogLica() {
		return pibPravnogLica;
	}

	public void setPibPravnogLica(String pibPravnogLica) {
		this.pibPravnogLica = pibPravnogLica;
	}

	public String getNazivPravnogLica() {
		return nazivPravnogLica;
	}

	public void setNazivPravnogLica(String nazivPravnogLica) {
		this.nazivPravnogLica = nazivPravnogLica;
	}
	
	

}
