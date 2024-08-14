package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Employee;
import lk.earth.earthuniversity.entity.Masjid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MasjidDao extends JpaRepository<Masjid,Integer> {

    Masjid findByRegno(String regno);
    Masjid findByName(String name);

    Optional<Masjid> findById(Integer id);


    Masjid findByMsjtype(String msjtypeid);
    Masjid findByMsjstatus  (String msjstatusid);


//      @Override
//      Optional<Masjid> findById(Integer integer);



    @Query("select m from Masjid m where m.id = :id")
    Masjid findByMyId(@Param("id") Integer id);

    @Query("SELECT NEW Masjid(m.id,m.name) from Masjid m ")
    default List<Masjid> findAllById() {
        return null;
    }

}

