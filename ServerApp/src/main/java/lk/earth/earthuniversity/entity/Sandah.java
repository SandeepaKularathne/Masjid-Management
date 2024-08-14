package lk.earth.earthuniversity.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Time;
import java.util.Collection;

@Entity
public class Sandah {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "amount")
    private BigDecimal amount;
    @Basic
    @Column(name = "referencenumber")
    private String referencenumber;
    @Basic
    @Column(name = "date")
    private Date date;
    @Basic
    @Column(name = "time")
    private Time time;
    @Basic
    @Column(name = "description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "sandahstatus_id", referencedColumnName = "id", nullable = false)
    private Sandahstatus sandahstatus;
    @ManyToOne
    @JoinColumn(name = "sandahtype_id", referencedColumnName = "id", nullable = false)
    private Sandahtype sandahtype;
    @ManyToOne
    @JoinColumn(name = "sandahmode_id", referencedColumnName = "id", nullable = false)
    private Sandahmode sandahmode;


    @ManyToOne
    @JoinColumn(name = "house_id", referencedColumnName = "id", nullable = false)
    private House house;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id", nullable = false)
    private Member memberByMemberId;
    @OneToMany(mappedBy = "sandah")
    private Collection<Receive> receives;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getReferencenumber() {
        return referencenumber;
    }

    public void setReferencenumber(String referencenumber) {
        this.referencenumber = referencenumber;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Sandah sandah = (Sandah) o;

        if (id != sandah.id) return false;
        if (amount != null ? !amount.equals(sandah.amount) : sandah.amount != null) return false;
        if (referencenumber != null ? !referencenumber.equals(sandah.referencenumber) : sandah.referencenumber != null)
            return false;
        if (date != null ? !date.equals(sandah.date) : sandah.date != null) return false;
        if (time != null ? !time.equals(sandah.time) : sandah.time != null) return false;
        if (description != null ? !description.equals(sandah.description) : sandah.description != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (amount != null ? amount.hashCode() : 0);
        result = 31 * result + (referencenumber != null ? referencenumber.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (time != null ? time.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
    }

    public Sandahstatus getSandahstatus() {
        return sandahstatus;
    }

    public void setSandahstatus(Sandahstatus sandahstatus) {
        this.sandahstatus = sandahstatus;
    }

    public Sandahtype getSandahtype() {
        return sandahtype;
    }

    public void setSandahtype(Sandahtype sandahtype) {
        this.sandahtype = sandahtype;
    }

    public Sandahmode getSandahmode() {
        return sandahmode;
    }

    public void setSandahmode(Sandahmode sandahmode) {
        this.sandahmode = sandahmode;
    }

    public House getHouse() {
        return house;
    }

    public void setHouse(House house) {
        this.house = house;
    }

    public Member getMemberByMemberId() {
        return memberByMemberId;
    }

    public void setMemberByMemberId(Member memberByMemberId) {
        this.memberByMemberId = memberByMemberId;
    }

    public Collection<Receive> getReceives() {
        return receives;
    }

    public void setReceives(Collection<Receive> receives) {
        this.receives = receives;
    }
}
