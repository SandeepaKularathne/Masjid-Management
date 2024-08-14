package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Withdraw;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.Optional;

public interface WithdrawDao extends JpaRepository<Withdraw,Integer> {

    Withdraw findByDowithdraw (Date dowithdraw);
    Optional<Withdraw> findById(Integer id);

      Withdraw findWithdrawByMasjid_Id(Integer Masjidid);
//    Optional<Withdraw> findById(Integer id);

    //Help for Delete Mapping in controller
    @Query("select e from Withdraw e where e.id = :id")
    Withdraw findByMyId(@Param("id") Integer id);


}

