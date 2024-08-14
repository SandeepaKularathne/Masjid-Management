package lk.earth.earthuniversity.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
public class Receive {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "date")
    private Timestamp date;
    @Basic
    @Column(name = "amount")
    private BigDecimal amount;
    @Basic
    @Column(name = "description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "receivecategory_id", referencedColumnName = "id", nullable = false)
    private Receivecategory receivecategory;
    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "sandah_id", referencedColumnName = "id")
    private Sandah sandah;
    @ManyToOne
    @JoinColumn(name = "receivestatus_id", referencedColumnName = "id", nullable = false)
    private Receivestatus receivestatus;
    @ManyToOne
    @JoinColumn(name = "masjid_id", referencedColumnName = "id", nullable = false)
    private Masjid masjid;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
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
        Receive receive = (Receive) o;
        return id == receive.id && Objects.equals(date, receive.date) && Objects.equals(amount, receive.amount) && Objects.equals(description, receive.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, date, amount, description);
    }

    public Receivecategory getReceivecategory() {
        return receivecategory;
    }

    public void setReceivecategory(Receivecategory receivecategory) {
        this.receivecategory = receivecategory;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public Sandah getSandah() {
        return sandah;
    }

    public void setSandah(Sandah sandah) {
        this.sandah = sandah;
    }

    public Receivestatus getReceivestatus() {
        return receivestatus;
    }

    public void setReceivestatus(Receivestatus receivestatus) {
        this.receivestatus = receivestatus;
    }

    public Masjid getMasjid() {
        return masjid;
    }

    public void setMasjid(Masjid masjid) {
        this.masjid = masjid;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
