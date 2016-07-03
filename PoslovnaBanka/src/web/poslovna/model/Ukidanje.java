package web.poslovna.model;

import java.sql.Date;

public class Ukidanje {

	private Integer id;
	private Integer idRacuna;
	private String brRacuna;
	private String nazivVlasnika;
	private String banka;
	private Date datum;
	private String racunZaPrebacivanje;
	private String vlasnikRacunaZaPrebacivanje;
	
	public Ukidanje() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Ukidanje(Integer id, Integer idRacuna, String brRacuna,
			String nazivVlasnika, String banka, Date datum,
			String racunZaPrebacivanje, String vlasnikRacunaZaPrebacivanje) {
		super();
		this.id = id;
		this.idRacuna = idRacuna;
		this.brRacuna = brRacuna;
		this.nazivVlasnika = nazivVlasnika;
		this.banka = banka;
		this.datum = datum;
		this.racunZaPrebacivanje = racunZaPrebacivanje;
		this.vlasnikRacunaZaPrebacivanje = vlasnikRacunaZaPrebacivanje;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getIdRacuna() {
		return idRacuna;
	}

	public void setIdRacuna(Integer idRacuna) {
		this.idRacuna = idRacuna;
	}

	public String getBrRacuna() {
		return brRacuna;
	}

	public void setBrRacuna(String brRacuna) {
		this.brRacuna = brRacuna;
	}

	public String getNazivVlasnika() {
		return nazivVlasnika;
	}

	public void setNazivVlasnika(String nazivVlasnika) {
		this.nazivVlasnika = nazivVlasnika;
	}

	public String getBanka() {
		return banka;
	}

	public void setBanka(String banka) {
		this.banka = banka;
	}

	public Date getDatum() {
		return datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}

	public String getRacunZaPrebacivanje() {
		return racunZaPrebacivanje;
	}

	public void setRacunZaPrebacivanje(String racunZaPrebacivanje) {
		this.racunZaPrebacivanje = racunZaPrebacivanje;
	}

	public String getVlasnikRacunaZaPrebacivanje() {
		return vlasnikRacunaZaPrebacivanje;
	}

	public void setVlasnikRacunaZaPrebacivanje(String vlasnikRacunaZaPrebacivanje) {
		this.vlasnikRacunaZaPrebacivanje = vlasnikRacunaZaPrebacivanje;
	}
	
}
