package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lk.earth.earthuniversity.util.RegexPattern;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.sql.Date;
import java.util.Arrays;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Masjid {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "regno")
//    @Pattern(regexp = "^R/\\d{4}/[A-Z]{2}/\\d{5}$", message = "Number should be R/0000/AZ/0000")
    private String regno;

    @Basic
    @Column(name = "name")
//    @Pattern(regexp = "^[A-Z\\s]+$", message = "Cannot enter Numbers & only Upper Case"   )
    private String name;

    @Basic
    @Column(name = "address")
//    @Pattern(regexp = "^([\\w\\/\\-,\\s]{2,})$", message = "Invalid Address")
    private String address;


    @Basic
    @Column(name = "email")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid Email Address")
    private String email;

    @Basic
    @Column(name = "phone")
    @Pattern(regexp = "^0\\d{9}$", message = "Invalid Landphone Number")
    private String phone;

    @Basic
    @Column(name = "nohouse")
    private Integer nohouse;

    @Basic
    @Column(name = "doestablished")
    @RegexPattern(reg = "^\\d{2}-\\d{2}-\\d{2}$", msg = "Invalid Date Format")
    private Date doestablished;

    @Basic
    @Column(name = "photo")
    private byte[] photo;



    @ManyToOne
    @JoinColumn(name = "city_id", referencedColumnName = "id", nullable = false)
    private City city;

    @ManyToOne
    @JoinColumn(name = "msjtype_id", referencedColumnName = "id", nullable = false)
    private Msjtype msjtype;

    @ManyToOne
    @JoinColumn(name = "msjstatus_id", referencedColumnName = "id", nullable = false)
    private Msjstatus msjstatus;

    @JsonIgnore
    @OneToMany(mappedBy = "masjid")
    private Collection<Trustee> trustees;

    @JsonIgnore
    @OneToMany(mappedBy = "masjid")
    private Collection<Employee> employeesById;

    @JsonIgnore
    @OneToMany(mappedBy = "masjid")
    private Collection<Rout> routsById;

    @JsonIgnore
    @OneToMany(mappedBy = "masjid")
    private Collection<Sermon> sermons;

    @JsonIgnore
    @OneToMany(mappedBy = "masjid")
    private Collection<Event> events;

    @JsonIgnore
    @OneToMany(mappedBy = "masjid")
    private Collection<Receive> receives;

    @JsonIgnore
    @OneToMany(mappedBy = "masjid")
    private Collection<Deposit> deposits;
    @JsonIgnore
    @OneToMany(mappedBy = "masjid")
    private Collection<Payment> payments;

    @JsonIgnore
    @OneToMany(mappedBy = "masjid")
    private Collection<Withdraw> withdrawsById;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRegno() {
        return regno;
    }
;

    public void setRegno(String regno) {
        this.regno = regno;
    }

    public String   getName() { return name;}

    public void setName(String name) { this.name = name; }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getNohouse() {
        return nohouse;
    }

    public void setNohouse(Integer nohouse) {
        this.nohouse = nohouse;
    }

    public Date getDoestablished() {
        return doestablished;
    }

    public void setDoestablished(Date doestablished) {
        this.doestablished = doestablished;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;


        Masjid masjid = (Masjid) o;

        if (id != masjid.id) return false;
        if (regno != null ? !regno.equals(masjid.regno) : masjid.regno != null) return false;
        if (name != null ? !name.equals(masjid.name) : masjid.name != null) return false;
        if (address != null ? !address.equals(masjid.address) : masjid.address != null) return false;
        if (email != null ? !email.equals(masjid.email) : masjid.email != null) return false;
        if (phone != null ? !phone.equals(masjid.phone) : masjid.phone != null) return false;
        if (nohouse != null ? !nohouse.equals(masjid.nohouse) : masjid.nohouse != null) return false;
        if (doestablished != null ? !doestablished.equals(masjid.doestablished) : masjid.doestablished != null) return false;
        if (!Arrays.equals(photo, masjid.photo)) return false;

        return true;

    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (regno != null ? regno.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (phone != null ? phone.hashCode() : 0);
        result = 31 * result + (nohouse != null ? nohouse.hashCode() : 0);
        result = 31 * result + (doestablished != null ? doestablished.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(photo);
        return result;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Msjtype getMsjtype() {
        return msjtype;
    }

    public void setMsjtype(Msjtype msjtype) { this.msjtype = msjtype; }

    public Msjstatus getMsjstatus() {
        return msjstatus;
    }

    public void setMsjstatus(Msjstatus msjstatus) {
        this.msjstatus = msjstatus;
    }

    public Collection<Trustee> getTrustees() {
        return trustees;
    }

    public void setTrustees(Collection<Trustee> trustees) {
        this.trustees = trustees;
    }

    public Collection<Employee> getEmployeesById() {
        return employeesById;
    }

    public void setEmployeesById(Collection<Employee> employeesById) {
        this.employeesById = employeesById;
    }

    public Collection<Rout> getRoutsById() {
        return routsById;
    }

    public void setRoutsById(Collection<Rout> routsById) {
        this.routsById = routsById;
    }

    public Collection<Sermon> getSermons() {
        return sermons;
    }

    public void setSermons(Collection<Sermon> sermons) {
        this.sermons = sermons;
    }

    public Collection<Event> getEvents() {
        return events;
    }

    public void setEvents(Collection<Event> events) {
        this.events = events;
    }

    public Collection<Receive> getReceives() {
        return receives;
    }

    public void setReceives(Collection<Receive> receives) {
        this.receives = receives;
    }

    public Collection<Deposit> getDeposits() {
        return deposits;
    }

    public void setDeposits(Collection<Deposit> deposits) {
        this.deposits = deposits;
    }

    public Collection<Payment> getPayments() {
        return payments;
    }

    public void setPayments(Collection<Payment> payments) {
        this.payments = payments;
    }

    public Collection<Withdraw> getWithdrawsById() {
        return withdrawsById;
    }

    public void setWithdrawsById(Collection<Withdraw> withdrawsById) {
        this.withdrawsById = withdrawsById;
    }
}
