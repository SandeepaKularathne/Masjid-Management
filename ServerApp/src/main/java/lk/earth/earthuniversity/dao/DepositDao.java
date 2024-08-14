package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Deposit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DepositDao extends JpaRepository<Deposit,Integer> {

    Deposit findByDate(String date);
    Optional<Deposit> findById(Integer Id);

//      Deposit findByAccount(String account)
//    Optional<Deposit> findById(Integer id);

    //Help for Delete Mapping in controller
    @Query("select e from Deposit e where e.id = :id")
    Deposit findByMyId(@Param("id") Integer id);

//    @Query("SELECT NEW Deposit (e.id, e.callingname) FROM Deposit e")
//    List<Deposit> findAllNameId();

}

