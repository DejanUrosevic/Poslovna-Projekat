package web.poslovna.model;

import java.sql.Date;

public class DnevnoStanje {

	private Integer id;
	private String racuna;
	private String vlasnikRacuna;
	private String banka;
	private double staroStanje;
	private double naTeret;
	private double uKorist;
	private double novoStanje;
	private Date datum;
	
	public DnevnoStanje() {
		super();
		// TODO Auto-generated constructor stub
	}

	public DnevnoStanje(Integer id, String idRacuna, String vlasnikRacuna, String banka,
			double staroStanje, double naTeret, double uKorist,
			double novoStanje, Date datum) {
		super();
		this.id = id;
		this.racuna = idRacuna;
		this.vlasnikRacuna = vlasnikRacuna;
		this.banka = banka;
		this.staroStanje = staroStanje;
		this.naTeret = naTeret;
		this.uKorist = uKorist;
		this.novoStanje = novoStanje;
		this.datum = datum;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getRacuna() {
		return racuna;
	}

	public void setRacuna(String idRacuna) {
		this.racuna = idRacuna;
	}

	public String getVlasnikRacuna() {
		return vlasnikRacuna;
	}

	public void setVlasnikRacuna(String vlasnikRacuna) {
		this.vlasnikRacuna = vlasnikRacuna;
	}

	public String getBanka() {
		return banka;
	}

	public void setBanka(String banka) {
		this.banka = banka;
	}

	public double getStaroStanje() {
		return staroStanje;
	}

	public void setStaroStanje(double staroStanje) {
		this.staroStanje = staroStanje;
	}

	public double getNaTeret() {
		return naTeret;
	}

	public void setNaTeret(double naTeret) {
		this.naTeret = naTeret;
	}

	public double getuKorist() {
		return uKorist;
	}

	public void setuKorist(double uKorist) {
		this.uKorist = uKorist;
	}

	public double getNovoStanje() {
		return novoStanje;
	}

	public void setNovoStanje(double novoStanje) {
		this.novoStanje = novoStanje;
	}

	public Date getDatum() {
		return datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}
	
	
}
