package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Moulavi {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "regnumber")
    private String regnumber;

    @JsonIgnore
    @OneToMany(mappedBy = "moulavi")
    private Collection<Sermon> sermons;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRegnumber() {
        return regnumber;
    }

    public void setRegnumber(String regnumber) {
        this.regnumber = regnumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Moulavi moulavi = (Moulavi) o;
        return id == moulavi.id && Objects.equals(name, moulavi.name) && Objects.equals(regnumber, moulavi.regnumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, regnumber);
    }

    public Collection<Sermon> getSermons() {
        return sermons;
    }

    public void setSermons(Collection<Sermon> sermons) {
        this.sermons = sermons;
    }
}
