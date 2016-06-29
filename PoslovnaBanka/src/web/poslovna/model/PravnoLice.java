package web.poslovna.model;

public class PravnoLice {

	private String pib;
	private int jmbgKlijenta;
	private String imeKlijenta;
	private String prezimeKlijenta;
	private String naziv;
	private String adresa;
	private String email;
	private String web;
	private String telefon;
	private String fax;
	private boolean banka;
	
	public PravnoLice() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PravnoLice(String pib, int jmbgKlijenta, String imeKlijenta,
			String prezimeKlijenta, String naziv, String adresa, String email, String web,
			String telefon, String fax, boolean banka) {
		super();
		this.pib = pib;
		this.jmbgKlijenta = jmbgKlijenta;
		this.imeKlijenta = imeKlijenta;
		this.prezimeKlijenta = prezimeKlijenta;
		this.adresa = adresa;
		this.naziv = naziv;
		this.email = email;
		this.web = web;
		this.telefon = telefon;
		this.fax = fax;
		this.banka = banka;
	}

	public String getAdresa() {
		return adresa;
	}

	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}

	public String getPib() {
		return pib;
	}

	public void setPib(String pib) {
		this.pib = pib;
	}

	public int getJmbgKlijenta() {
		return jmbgKlijenta;
	}

	public void setJmbgKlijenta(int jmbgKlijenta) {
		this.jmbgKlijenta = jmbgKlijenta;
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

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getWeb() {
		return web;
	}

	public void setWeb(String web) {
		this.web = web;
	}

	public String getTelefon() {
		return telefon;
	}

	public void setTelefon(String telefon) {
		this.telefon = telefon;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public boolean isBanka() {
		return banka;
	}

	public void setBanka(boolean banka) {
		this.banka = banka;
	}
	
	
}
