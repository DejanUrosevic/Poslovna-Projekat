package web.poslovna.model;

public class NaseljenoMesto {
	
	private int sifra;
	private String naziv;
	private String sifra_drzava;
	private String naziv_drzave;
	private String ptt_oznaka;
	
	
	public NaseljenoMesto(int sifra, String naziv, String sifra_drzava,
			String naziv_drzave, String ptt_oznaka) {
		super();
		this.sifra = sifra;
		this.naziv = naziv;
		this.sifra_drzava = sifra_drzava;
		this.naziv_drzave = naziv_drzave;
		this.ptt_oznaka = ptt_oznaka;
	}

	public NaseljenoMesto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getSifra() {
		return sifra;
	}

	public void setSifra(int sifra) {
		this.sifra = sifra;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getSifra_drzava() {
		return sifra_drzava;
	}

	public void setSifra_drzava(String sifra_drzava) {
		this.sifra_drzava = sifra_drzava;
	}

	public String getNaziv_drzave() {
		return naziv_drzave;
	}

	public void setNaziv_drzave(String naziv_drzave) {
		this.naziv_drzave = naziv_drzave;
	}
	
	public String getPtt_oznaka() {
		return ptt_oznaka;
	}

	public void setPtt_oznaka(String ptt_oznaka) {
		this.ptt_oznaka = ptt_oznaka;
	}

}
