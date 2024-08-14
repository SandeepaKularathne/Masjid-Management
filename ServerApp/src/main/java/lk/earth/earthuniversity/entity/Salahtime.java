package lk.earth.earthuniversity.entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.util.Objects;

@Entity
public class Salahtime {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "fajr")
    private Time fajr;
    @Basic
    @Column(name = "luhar")
    private Time luhar;
    @Basic
    @Column(name = "asr")
    private Time asr;
    @Basic
    @Column(name = "magrib")
    private Time magrib;
    @Basic
    @Column(name = "isha")
    private Time isha;
    @Basic
    @Column(name = "date")
    private Date date;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Time getFajr() {
        return fajr;
    }

    public void setFajr(Time fajr) {
        this.fajr = fajr;
    }

    public Time getLuhar() {
        return luhar;
    }

    public void setLuhar(Time luhar) {
        this.luhar = luhar;
    }

    public Time getAsr() {
        return asr;
    }

    public void setAsr(Time asr) {
        this.asr = asr;
    }

    public Time getMagrib() {
        return magrib;
    }

    public void setMagrib(Time magrib) {
        this.magrib = magrib;
    }

    public Time getIsha() {
        return isha;
    }

    public void setIsha(Time isha) {
        this.isha = isha;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Salahtime salahtime = (Salahtime) o;
        return id == salahtime.id && Objects.equals(fajr, salahtime.fajr) && Objects.equals(luhar, salahtime.luhar) && Objects.equals(asr, salahtime.asr) && Objects.equals(magrib, salahtime.magrib) && Objects.equals(isha, salahtime.isha) && Objects.equals(date, salahtime.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fajr, luhar, asr, magrib, isha, date);
    }
}
