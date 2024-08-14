package lk.earth.earthuniversity.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;

@Entity
public class Payment {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "dopaid")
    private Date dopaid;
    @Basic
    @Column(name = "amount")
    private BigDecimal amount;
    @Basic
    @Column(name = "description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "masjid_id", referencedColumnName = "id", nullable = false)
    private Masjid masjid;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @ManyToOne
    @JoinColumn(name = "paymenttype_id", referencedColumnName = "id", nullable = false)
    private Paymenttype paymenttype;
    @ManyToOne
    @JoinColumn(name = "paymentstatus_id", referencedColumnName = "id", nullable = false)
    private Paymentstatus paymentstatus;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDopaid() {
        return dopaid;
    }

    public void setDopaid(Date dopaid) {
        this.dopaid = dopaid;
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

        Payment payment = (Payment) o;

        if (id != payment.id) return false;
        if (dopaid != null ? !dopaid.equals(payment.dopaid) : payment.dopaid != null) return false;
        if (amount != null ? !amount.equals(payment.amount) : payment.amount != null) return false;
        if (description != null ? !description.equals(payment.description) : payment.description != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (dopaid != null ? dopaid.hashCode() : 0);
        result = 31 * result + (amount != null ? amount.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
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

    public Paymenttype getPaymenttype() {
        return paymenttype;
    }

    public void setPaymenttype(Paymenttype paymenttype) {
        this.paymenttype = paymenttype;
    }

    public Paymentstatus getPaymentstatus() {
        return paymentstatus;
    }

    public void setPaymentstatus(Paymentstatus paymentstatus) {
        this.paymentstatus = paymentstatus;
    }
}
