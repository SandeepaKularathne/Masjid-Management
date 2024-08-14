package lk.earth.earthuniversity.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;

@Entity
public class Withdraw {
    @Basic
    @Column(name = "dowithdraw")
    private Date dowithdraw;
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
    @JoinColumn(name = "account_id", referencedColumnName = "id", nullable = false)
    private Account account;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    public Date getDowithdraw() {
        return dowithdraw;
    }

    public void setDowithdraw(Date dowithdraw) {
        this.dowithdraw = dowithdraw;
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

        Withdraw withdraw = (Withdraw) o;

        if (dowithdraw != null ? !dowithdraw.equals(withdraw.dowithdraw) : withdraw.dowithdraw != null) return false;
        if (amount != null ? !amount.equals(withdraw.amount) : withdraw.amount != null) return false;
        if (description != null ? !description.equals(withdraw.description) : withdraw.description != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = dowithdraw != null ? dowithdraw.hashCode() : 0;
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

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
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
