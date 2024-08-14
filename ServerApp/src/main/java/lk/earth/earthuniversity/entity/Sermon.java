package lk.earth.earthuniversity.entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
public class Sermon {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "date")
    private Date date;
    @Basic
    @Column(name = "description")
    private String description;
    @Basic
    @Column(name = "start")
    private Time start;
    @Basic
    @Column(name = "end")
    private Time end;
    @Basic
    @Column(name = "dateupdate")
    private Timestamp dateupdate;
    @ManyToOne
    @JoinColumn(name = "masjid_id", referencedColumnName = "id", nullable = false)
    private Masjid masjid;
    @ManyToOne
    @JoinColumn(name = "moulavi_id", referencedColumnName = "id", nullable = false)
    private Moulavi moulavi;
    @ManyToOne
    @JoinColumn(name = "sermonstatus_id", referencedColumnName = "id", nullable = false)
    private Sermonstatus sermonstatus;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Time getStart() {
        return start;
    }

    public void setStart(Time start) {
        this.start = start;
    }

    public Time getEnd() {
        return end;
    }

    public void setEnd(Time end) {
        this.end = end;
    }

    public Timestamp getDateupdate() {
        return dateupdate;
    }

    public void setDateupdate(Timestamp dateupdate) {
        this.dateupdate = dateupdate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sermon sermon = (Sermon) o;
        return Objects.equals(date, sermon.date) && Objects.equals(description, sermon.description) && Objects.equals(start, sermon.start) && Objects.equals(end, sermon.end) && Objects.equals(dateupdate, sermon.dateupdate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, description, start, end, dateupdate);
    }

    public Masjid getMasjid() {
        return masjid;
    }

    public void setMasjid(Masjid masjid) {
        this.masjid = masjid;
    }

    public Moulavi getMoulavi() {
        return moulavi;
    }

    public void setMoulavi(Moulavi moulavi) {
        this.moulavi = moulavi;
    }

    public Sermonstatus getSermonstatus() {
        return sermonstatus;
    }

    public void setSermonstatus(Sermonstatus sermonstatus) {
        this.sermonstatus = sermonstatus;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
