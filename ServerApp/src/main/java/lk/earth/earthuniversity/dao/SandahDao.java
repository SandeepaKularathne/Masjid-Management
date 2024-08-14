package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Sandah;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SandahDao extends JpaRepository<Sandah,Integer> {

    Sandah findByReferencenumber(String Referencenumber);
    Optional<Sandah> findById(Integer Id);

    //    Sandah findByNic(String nic);
//    Optional<Sandah> findById(Integer id);

    //Help for Delete Mapping in controller
    @Query("select e from Sandah e where e.id = :id")
    Sandah findByMyId(@Param("id") Integer id);

//    @Query("SELECT NEW Sandah (e.id, e.callingname) FROM Sandah e")
//    List<Sandah> findAllNameId();

}

