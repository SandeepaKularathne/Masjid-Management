package lk.earth.earthuniversity.report.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class CountByMsj {

    private Integer id;
    private String msj;
    private Long count;
    private double percentage;

    public CountByMsj() {  }

    public CountByMsj(String msj, Long count) {
        this.msj = msj;
        this.count = count;
    }

    public String getmsj() {
        return msj;
    }
    public void setmsj(String msj) {
        this.msj = msj;
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
