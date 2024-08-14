package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Date;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Member {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "fullname")
    private String fullname;
    @Basic
    @Column(name = "callingname")
    private String callingname;
    @Basic
    @Column(name = "dob")
    private Date dob;
    @Basic
    @Column(name = "nic")
    private String nic;
    @Basic
    @Column(name = "doregister")
    private Date doregister;
    @ManyToOne
    @JoinColumn(name = "civilstatus_id", referencedColumnName = "id", nullable = false)
    private Civilstatus civilstatus;
    @ManyToOne
    @JoinColumn(name = "memberstatus_id", referencedColumnName = "id", nullable = false)
    private Memberstatus memberstatus;
    @ManyToOne
    @JoinColumn(name = "jobstatus_id", referencedColumnName = "id", nullable = false)
    private Jobstatus jobstatus;
    @ManyToOne
    @JoinColumn(name = "membertype_id", referencedColumnName = "id", nullable = false)
    private Membertype membertype;

    @ManyToOne
    @JoinColumn(name = "gender_id", referencedColumnName = "id", nullable = false)
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @ManyToOne
    @JoinColumn(name = "house_id", referencedColumnName = "id", nullable = false)
    private House house;

    @JsonIgnore
    @OneToMany(mappedBy = "memberByMemberId")
    private Collection<Sandah> sandahs;

    @JsonIgnore
    @OneToMany(mappedBy = "member")
    private Collection<Receive> receives;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getCallingname() {
        return callingname;
    }

    public void setCallingname(String callingname) {
        this.callingname = callingname;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public Date getDoregister() {
        return doregister;
    }

    public void setDoregister(Date doregister) {
        this.doregister = doregister;
    }

    public Civilstatus getCivilstatus() {
        return civilstatus;
    }

    public void setCivilstatus(Civilstatus civilstatus) {
        this.civilstatus = civilstatus;
    }

    public Memberstatus getMemberstatus() {
        return memberstatus;
    }

    public void setMemberstatus(Memberstatus memberstatus) {
        this.memberstatus = memberstatus;
    }

    public Jobstatus getJobstatus() {
        return jobstatus;
    }

    public void setJobstatus(Jobstatus jobstatus) {
        this.jobstatus = jobstatus;
    }

    public Membertype getMembertype() {
        return membertype;
    }

    public void setMembertype(Membertype membertype) {
        this.membertype = membertype;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public House getHouse() {
        return house;
    }

    public void setHouse(House house) {
        this.house = house;
    }

    public Collection<Sandah> getSandahs() {
        return sandahs;
    }

    public void setSandahs(Collection<Sandah> sandahs) {
        this.sandahs = sandahs;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Member)) return false;
        Member member = (Member) o;
        return getId() == member.getId() && Objects.equals(getFullname(), member.getFullname()) && Objects.equals(getCallingname(), member.getCallingname()) && Objects.equals(getDob(), member.getDob()) && Objects.equals(getNic(), member.getNic()) && Objects.equals(getDoregister(), member.getDoregister()) && Objects.equals(getCivilstatus(), member.getCivilstatus()) && Objects.equals(getMemberstatus(), member.getMemberstatus()) && Objects.equals(getJobstatus(), member.getJobstatus()) && Objects.equals(getMembertype(), member.getMembertype()) && Objects.equals(getGender(), member.getGender()) && Objects.equals(getEmployee(), member.getEmployee()) && Objects.equals(getHouse(), member.getHouse()) && Objects.equals(getSandahs(), member.getSandahs());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getFullname(), getCallingname(), getDob(), getNic(), getDoregister(), getCivilstatus(), getMemberstatus(), getJobstatus(), getMembertype(), getGender(), getEmployee(), getHouse(), getSandahs());
    }

    public Collection<Receive> getReceives() {
        return receives;
    }

    public void setReceives(Collection<Receive> receives) {
        this.receives = receives;
    }
}
