package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Receive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ReceiveDao extends JpaRepository<Receive,Integer> {

    Receive findByDate(String date);
    Optional<Receive> findById(Integer Id);

    //    Receive findByNic(String nic);
//    Optional<Receive> findById(Integer id);

    //Help for Delete Mapping in controller
    @Query("select e from Receive e where e.id = :id")
    Receive findByMyId(@Param("id") Integer id);

//    @Query("SELECT NEW Receive (e.id, e.callingname) FROM Receive e")
//    List<Receive> findAllNameId();

}

