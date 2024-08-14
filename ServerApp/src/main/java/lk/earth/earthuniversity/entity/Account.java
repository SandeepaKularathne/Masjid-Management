package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Account {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "bank")
    private String bank;
    @Basic
    @Column(name = "accno")
    private String accno;
    @Basic
    @Column(name = "balance")
    private BigDecimal balance;
    @JsonIgnore
    @OneToMany(mappedBy = "account")
    private Collection<Deposit> deposits;
    @JsonIgnore
    @OneToMany(mappedBy = "account")
    private Collection<Withdraw> withdraws;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getAccno() {
        return accno;
    }

    public void setAccno(String accno) {
        this.accno = accno;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return id == account.id && Objects.equals(bank, account.bank) && Objects.equals(accno, account.accno) && Objects.equals(balance, account.balance);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, bank, accno, balance);
    }

    public Collection<Deposit> getDeposits() {
        return deposits;
    }

    public void setDeposits(Collection<Deposit> deposits) {
        this.deposits = deposits;
    }

    public Collection<Withdraw> getWithdraws() {
        return withdraws;
    }

    public void setWithdraws(Collection<Withdraw> withdraws) {
        this.withdraws = withdraws;
    }
}
