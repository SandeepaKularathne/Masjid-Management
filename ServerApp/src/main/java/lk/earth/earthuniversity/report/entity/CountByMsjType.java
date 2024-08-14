package lk.earth.earthuniversity.report.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class CountByMsjType {

    private Integer id;
    private String msjtype;
    private Long count;
    private double percentage;

    public CountByMsjType() {  }

    public CountByMsjType(String msjtype, Long count) {
        this.msjtype = msjtype;
        this.count = count;
    }

    public String getMsjtype() {
        return msjtype;
    }
    public void setMsjtype(String msjtype) {
        this.msjtype = msjtype;
    }
    public Long getCount() {
        return count;
    }
    public void setCount(Long count) {
        this.count = count;
    }
    public double getPercentage() {
        return percentage;
    }
    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    public Integer getId() {
        return id;
    }

}
