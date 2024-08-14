package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.util.Objects;

@Entity
public class Trustee {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "name")
    @Pattern(regexp = "^[A-Z\\s]+$", message = "Cannot enter Numbers & only Upper Case"   )
    private String name;


    @ManyToOne
    @JoinColumn(name = "masjid_id", referencedColumnName = "id", nullable = false)
    private Masjid masjid;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Trustee)) return false;
        Trustee trustee = (Trustee) o;
        return getId() == trustee.getId() && Objects.equals(getName(), trustee.getName()) && Objects.equals(masjid, trustee.masjid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), masjid);
    }

    public Masjid getMasjid() {
        return masjid;
    }

    public void setMasjid(Masjid masjid) {
        this.masjid = masjid;
    }
}
