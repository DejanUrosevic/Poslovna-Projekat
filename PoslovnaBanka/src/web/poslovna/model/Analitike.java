package web.poslovna.model;


import java.sql.Date;

public class Analitike {

	private Integer id;
	private String duznik;
	private String svrha;
	private String poverilac;
	private Date datumPrijema;
	private Date datumValute;
	private String racunDuznika;
	private Double modelZaduzenja;
	private String pbZaduzenja;
	private String racunPoverioca;
	private Double modelOdobrenja;
	private String pbOdobrenja;
	private Boolean hitno;
	private Double iznos;
	private Double tipGreske;
	private String status;
	
	private Double idVrstePlacanja;
	private String nazivPlacanja;
	private Integer idNaselje;
	private String naselje;
	private Integer idValute;
	private String valuta;
	
	private Integer idIzvoda;

	public Analitike() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Analitike(Integer id, String duznik, String svrha,
			String poverilac, Date datumPrijema, Date datumValute,
			String racunDuznika, Double modelZaduzenja, String pbZaduzenja,
			String racunPoverioca, Double modelOdobrenja,
			String pbOdobrenja, Boolean hitno, Double iznos,
			Double tipGreske, String status, Double idVrstePlacanja,
			String nazivPlacanja, Integer idNaselje, String naselje,
			Integer idValute, String valuta, Integer idIzvoda) {
		super();
		this.id = id;
		this.duznik = duznik;
		this.svrha = svrha;
		this.poverilac = poverilac;
		this.datumPrijema = datumPrijema;
		this.datumValute = datumValute;
		this.racunDuznika = racunDuznika;
		this.modelZaduzenja = modelZaduzenja;
		this.pbZaduzenja = pbZaduzenja;
		this.racunPoverioca = racunPoverioca;
		this.modelOdobrenja = modelOdobrenja;
		this.pbOdobrenja = pbOdobrenja;
		this.hitno = hitno;
		this.iznos = iznos;
		this.tipGreske = tipGreske;
		this.status = status;
		this.idVrstePlacanja = idVrstePlacanja;
		this.nazivPlacanja = nazivPlacanja;
		this.idNaselje = idNaselje;
		this.naselje = naselje;
		this.idValute = idValute;
		this.valuta = valuta;
		this.idIzvoda = idIzvoda;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDuznik() {
		return duznik;
	}

	public void setDuznik(String duznik) {
		this.duznik = duznik;
	}

	public String getSvrha() {
		return svrha;
	}

	public void setSvrha(String svrha) {
		this.svrha = svrha;
	}

	public String getPoverilac() {
		return poverilac;
	}

	public void setPoverilac(String poverilac) {
		this.poverilac = poverilac;
	}

	public Date getDatumPrijema() {
		return datumPrijema;
	}

	public void setDatumPrijema(Date datumPrijema) {
		this.datumPrijema = datumPrijema;
	}

	public Date getDatumValute() {
		return datumValute;
	}

	public void setDatumValute(Date datumValute) {
		this.datumValute = datumValute;
	}

	public String getRacunDuznika() {
		return racunDuznika;
	}

	public void setRacunDuznika(String racunDuznika) {
		this.racunDuznika = racunDuznika;
	}

	public Double getModelZaduzenja() {
		return modelZaduzenja;
	}

	public void setModelZaduzenja(Double modelZaduzenja) {
		this.modelZaduzenja = modelZaduzenja;
	}

	public String getPbZaduzenja() {
		return pbZaduzenja;
	}

	public void setPbZaduzenja(String pbZaduzenja) {
		this.pbZaduzenja = pbZaduzenja;
	}

	public String getRacunPoverioca() {
		return racunPoverioca;
	}

	public void setRacunPoverioca(String racunPoverioca) {
		this.racunPoverioca = racunPoverioca;
	}

	public Double getModelOdobrenja() {
		return modelOdobrenja;
	}

	public void setModelOdobrenja(Double modelOdobrenja) {
		this.modelOdobrenja = modelOdobrenja;
	}

	public String getPbOdobrenja() {
		return pbOdobrenja;
	}

	public void setPbOdobrenja(String pbOdobrenja) {
		this.pbOdobrenja = pbOdobrenja;
	}

	public Boolean getHitno() {
		return hitno;
	}

	public void setHitno(Boolean hitno) {
		this.hitno = hitno;
	}

	public Double getIznos() {
		return iznos;
	}

	public void setIznos(Double iznos) {
		this.iznos = iznos;
	}

	public Double getTipGreske() {
		return tipGreske;
	}

	public void setTipGreske(Double tipGreske) {
		this.tipGreske = tipGreske;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Double getIdVrstePlacanja() {
		return idVrstePlacanja;
	}

	public void setIdVrstePlacanja(Double idVrstePlacanja) {
		this.idVrstePlacanja = idVrstePlacanja;
	}

	public String getNazivPlacanja() {
		return nazivPlacanja;
	}

	public void setNazivPlacanja(String nazivPlacanja) {
		this.nazivPlacanja = nazivPlacanja;
	}

	public Integer getIdNaselje() {
		return idNaselje;
	}

	public void setIdNaselje(Integer idNaselje) {
		this.idNaselje = idNaselje;
	}

	public String getNaselje() {
		return naselje;
	}

	public void setNaselje(String naselje) {
		this.naselje = naselje;
	}

	public Integer getIdValute() {
		return idValute;
	}

	public void setIdValute(Integer idValute) {
		this.idValute = idValute;
	}

	public String getValuta() {
		return valuta;
	}

	public void setValuta(String valuta) {
		this.valuta = valuta;
	}

	public Integer getIdIzvoda() {
		return idIzvoda;
	}

	public void setIdIzvoda(Integer idIzvoda) {
		this.idIzvoda = idIzvoda;
	}
	
}
