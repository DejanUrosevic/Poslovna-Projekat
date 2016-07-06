package web.poslovna.model;

import java.sql.Date;

public class Kliring {

	private Integer id;
	private Date datumValute;
	private Date datum;
	private String sifra;
	private Integer idRacunBankeDuznika;
	private Integer idRacunBankePoverioca;
	private Double ukupno;
	private String racunBankeDuznika;
	private String racunBankePoverioca;
	private String nazivBankeDuznika;
	private String nazivBankePoverioca;
	
	public Kliring() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Kliring(Integer id, Date datumValute, Date datum, String sifra,
			Integer idRacunBankeDuznika, Integer idRacunBankePoverioca,
			Double ukupno, String racunBankeDuznika,
			String racunBankePoverioca, String nazivBankeDuznika,
			String nazivBankePoverioca) {
		super();
		this.id = id;
		this.datumValute = datumValute;
		this.datum = datum;
		this.sifra = sifra;
		this.idRacunBankeDuznika = idRacunBankeDuznika;
		this.idRacunBankePoverioca = idRacunBankePoverioca;
		this.ukupno = ukupno;
		this.racunBankeDuznika = racunBankeDuznika;
		this.racunBankePoverioca = racunBankePoverioca;
		this.nazivBankeDuznika = nazivBankeDuznika;
		this.nazivBankePoverioca = nazivBankePoverioca;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getDatumValute() {
		return datumValute;
	}

	public void setDatumValute(Date datumValute) {
		this.datumValute = datumValute;
	}

	public Date getDatum() {
		return datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}

	public String getSifra() {
		return sifra;
	}

	public void setSifra(String sifra) {
		this.sifra = sifra;
	}

	public Integer getIdRacunBankeDuznika() {
		return idRacunBankeDuznika;
	}

	public void setIdRacunBankeDuznika(Integer idRacunBankeDuznika) {
		this.idRacunBankeDuznika = idRacunBankeDuznika;
	}

	public Integer getIdRacunBankePoverioca() {
		return idRacunBankePoverioca;
	}

	public void setIdRacunBankePoverioca(Integer idRacunBankePoverioca) {
		this.idRacunBankePoverioca = idRacunBankePoverioca;
	}

	public Double getUkupno() {
		return ukupno;
	}

	public void setUkupno(Double ukupno) {
		this.ukupno = ukupno;
	}

	public String getRacunBankeDuznika() {
		return racunBankeDuznika;
	}

	public void setRacunBankeDuznika(String racunBankeDuznika) {
		this.racunBankeDuznika = racunBankeDuznika;
	}

	public String getRacunBankePoverioca() {
		return racunBankePoverioca;
	}

	public void setRacunBankePoverioca(String racunBankePoverioca) {
		this.racunBankePoverioca = racunBankePoverioca;
	}

	public String getNazivBankeDuznika() {
		return nazivBankeDuznika;
	}

	public void setNazivBankeDuznika(String nazivBankeDuznika) {
		this.nazivBankeDuznika = nazivBankeDuznika;
	}

	public String getNazivBankePoverioca() {
		return nazivBankePoverioca;
	}

	public void setNazivBankePoverioca(String nazivBankePoverioca) {
		this.nazivBankePoverioca = nazivBankePoverioca;
	}
			
}
