package lk.earth.earthuniversity.report.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class CountByMsjCity {

    private Integer id;
    private String msjcity;
    private Long count;
    private double percentage;

    public CountByMsjCity() {  }

    public CountByMsjCity(String msjcity, Long count) {
        this.msjcity = msjcity;
        this.count = count;
    }

    public String getMsjcity() {
        return msjcity;
    }
    public void setMsjcity(String msjcity) {
        this.msjcity = msjcity;
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
