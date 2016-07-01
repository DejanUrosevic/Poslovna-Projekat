package web.poslovna.model;

import java.sql.Date;

public class RacuniKlijenata {

	private int id; //ID_RACUNA
	private int jmbg; //JMBG_KLIJENTA, null
	private String imeKlijenta;
	private String prezimeKlijenta;
	private int valuta; //ID_VALUTE
	private String nazivValute;
	private String pibKlijenta; //PR_PIB, null
	private String nazivKlijenta;
	private String pibBanke; //BAN_PR_PIB
	private String nazivBanke;
	private String brRacuna; //BAR_RACUN
	private Date datumOtvaranja; //BAR_DATOTV
	private boolean vazeci; //BAR_VAZI
	
	

	public RacuniKlijenata(int id, int jmbg, String imeKlijenta,
			String prezimeKlijenta, int valuta, String nazivValute,
			String pibKlijenta, String nazivKlijenta, String pibBanke,
			String nazivBanke, String brRacuna, Date datumOtvaranja,
			boolean vazeci) {
		super();
		this.id = id;
		this.jmbg = jmbg;
		this.imeKlijenta = imeKlijenta;
		this.prezimeKlijenta = prezimeKlijenta;
		this.valuta = valuta;
		this.nazivValute = nazivValute;
		this.pibKlijenta = pibKlijenta;
		this.nazivKlijenta = nazivKlijenta;
		this.pibBanke = pibBanke;
		this.nazivBanke = nazivBanke;
		this.brRacuna = brRacuna;
		this.datumOtvaranja = datumOtvaranja;
		this.vazeci = vazeci;
	}

	public RacuniKlijenata() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getJmbg() {
		return jmbg;
	}
	
	public void setJmbg(int jmbg) {
		this.jmbg = jmbg;
	}
	
	public String getImeKlijenta() {
		return imeKlijenta;
	}
	
	public void setImeKlijenta(String imeKlijenta) {
		this.imeKlijenta = imeKlijenta;
	}
	
	public String getPrezimeKlijenta() {
		return prezimeKlijenta;
	}
	
	public void setPrezimeKlijenta(String prezimeKlijenta) {
		this.prezimeKlijenta = prezimeKlijenta;
	}
	
	public int getValuta() {
		return valuta;
	}
	
	public void setValuta(int valuta) {
		this.valuta = valuta;
	}

	public String getNazivValute() {
		return nazivValute;
	}
	
	public void setNazivValute(String nazivValute) {
		this.nazivValute = nazivValute;
	}
	
	public String getPibKlijenta() {
		return pibKlijenta;
	}
	
	public void setPibKlijenta(String pibKlijenta) {
		this.pibKlijenta = pibKlijenta;
	}
	
	public String getNazivKlijenta() {
		return nazivKlijenta;
	}
	
	public void setNazivKlijenta(String nazivKlijenta) {
		this.nazivKlijenta = nazivKlijenta;
	}
	
	public String getPibBanke() {
		return pibBanke;
	}
	
	public void setPibBanke(String pibBanke) {
		this.pibBanke = pibBanke;
	}
	
	public String getNazivBanke() {
		return nazivBanke;
	}
	
	public void setNazivBanke(String nazivBanke) {
		this.nazivBanke = nazivBanke;
	}
	
	public String getBrRacuna() {
		return brRacuna;
	}
	
	public void setBrRacuna(String brRacuna) {
		this.brRacuna = brRacuna;
	}
	
	public Date getDatumOtvaranja() {
		return datumOtvaranja;
	}
	
	public void setDatumOtvaranja(Date datumOtvaranja) {
		this.datumOtvaranja = datumOtvaranja;
	}
	
	public boolean isVazeci() {
		return vazeci;
	}
	
	public void setVazeci(boolean vazeci) {
		this.vazeci = vazeci;
	}
	
	
}
