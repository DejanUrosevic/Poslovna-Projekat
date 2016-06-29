package web.poslovna.model;

public class Valute {

	private Integer IDValute;
	private String zvanicnaSifra;
	private String naziv;
	private boolean domicilna;
	private String drzavaSifra;
	private String drzavaNaziv;
	
	public Valute()
	{
		
	}

	public Valute(Integer iDValute, String zvanicnaSifra, String naziv,
			boolean domicilna, String drzavaSifra, String drzavaNaziv) {
		super();
		IDValute = iDValute;
		this.zvanicnaSifra = zvanicnaSifra;
		this.naziv = naziv;
		this.domicilna = domicilna;
		this.drzavaSifra = drzavaSifra;
		this.drzavaNaziv = drzavaNaziv;
	}

	
	public String getDrzavaNaziv() {
		return drzavaNaziv;
	}

	public void setDrzavaNaziv(String drzavaNaziv) {
		this.drzavaNaziv = drzavaNaziv;
	}

	public Integer getIDValute() {
		return IDValute;
	}

	public void setIDValute(Integer iDValute) {
		IDValute = iDValute;
	}

	public String getZvanicnaSifra() {
		return zvanicnaSifra;
	}

	public void setZvanicnaSifra(String zvanicnaSifra) {
		this.zvanicnaSifra = zvanicnaSifra;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public boolean isDomicilna() {
		return domicilna;
	}

	public void setDomicilna(boolean domicilna) {
		this.domicilna = domicilna;
	}

	public String getDrzavaSifra() {
		return drzavaSifra;
	}

	public void setDrzavaSifra(String drzavaSifra) {
		this.drzavaSifra = drzavaSifra;
	}
	
	
	
}
