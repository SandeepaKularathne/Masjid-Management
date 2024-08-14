package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Date;
import java.util.Collection;

@Entity
public class House {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "huid")
    private String huid;
    @Basic
    @Column(name = "address")
    private String address;
    @Basic
    @Column(name = "adultcount")
    private Integer adultcount;
    @Basic
    @Column(name = "childrencount")
    private Integer childrencount;
    @Basic
    @Column(name = "telephone")
    private String telephone;
    @Basic
    @Column(name = "description")
    private String description;
    @Basic
    @Column(name = "doregister")
    private Date doregister;
    @ManyToOne
    @JoinColumn(name = "rout_id", referencedColumnName = "id", nullable = false)
    private Rout rout;
    @ManyToOne
    @JoinColumn(name = "housetype_id", referencedColumnName = "id", nullable = false)
    private Housetype housetype;
    @ManyToOne
    @JoinColumn(name = "housesstate_id", referencedColumnName = "id", nullable = false)
    private Housesstate housesstate;

    @JsonIgnore
    @OneToMany(mappedBy = "house")
    private Collection<Member> members;

    @JsonIgnore
    @OneToMany(mappedBy = "house")
    private Collection<Sandah> sandahsById;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHuid() {
        return huid;
    }

    public void setHuid(String huid) {
        this.huid = huid;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getAdultcount() {
        return adultcount;
    }

    public void setAdultcount(Integer adultcount) {
        this.adultcount = adultcount;
    }

    public Integer getChildrencount() {
        return childrencount;
    }

    public void setChildrencount(Integer childrencount) {
        this.childrencount = childrencount;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDoregister() {
        return doregister;
    }

    public void setDoregister(Date doregister) {
        this.doregister = doregister;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        House house = (House) o;

        if (id != house.id) return false;
        if (huid != null ? !huid.equals(house.huid) : house.huid != null) return false;
        if (address != null ? !address.equals(house.address) : house.address != null) return false;
        if (adultcount != null ? !adultcount.equals(house.adultcount) : house.adultcount != null) return false;
        if (childrencount != null ? !childrencount.equals(house.childrencount) : house.childrencount != null)
            return false;
        if (telephone != null ? !telephone.equals(house.telephone) : house.telephone != null) return false;
        if (description != null ? !description.equals(house.description) : house.description != null) return false;
        if (doregister != null ? !doregister.equals(house.doregister) : house.doregister != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (huid != null ? huid.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (adultcount != null ? adultcount.hashCode() : 0);
        result = 31 * result + (childrencount != null ? childrencount.hashCode() : 0);
        result = 31 * result + (telephone != null ? telephone.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (doregister != null ? doregister.hashCode() : 0);
        return result;
    }

    public Rout getRout() {
        return rout;
    }

    public void setRout(Rout rout) {
        this.rout = rout;
    }

    public Housetype getHousetype() {
        return housetype;
    }

    public void setHousetype(Housetype housetype) {
        this.housetype = housetype;
    }

    public Housesstate getHousesstate() {
        return housesstate;
    }

    public void setHousesstate(Housesstate housesstate) {
        this.housesstate = housesstate;
    }

    public Collection<Member> getMembers() {
        return members;
    }

    public void setMembers(Collection<Member> members) {
        this.members = members;
    }

    public Collection<Sandah> getSandahsById() {
        return sandahsById;
    }

    public void setSandahsById(Collection<Sandah> sandahsById) {
        this.sandahsById = sandahsById;
    }
}
