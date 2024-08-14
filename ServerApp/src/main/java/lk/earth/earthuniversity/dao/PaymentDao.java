package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.Optional;

public interface PaymentDao extends JpaRepository<Payment,Integer> {

    Payment findByDopaid(Date dopaid);
    Optional<Payment> findById(Integer Id);

      Payment findPaymentByPaymenttype(String paymenttype);
//    Optional<Payment> findById(Integer id);

    //Help for Delete Mapping in controller
    @Query("select e from Payment e where e.id = :id")
    Payment findByMyId(@Param("id") Integer id);

//    @Query("SELECT NEW Payment (e.id, e.callingname) FROM Payment e")
//    List<Payment> findAllNameId();

}

