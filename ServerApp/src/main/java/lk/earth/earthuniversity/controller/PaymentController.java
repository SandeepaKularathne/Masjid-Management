package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.PaymentDao;
import lk.earth.earthuniversity.entity.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/payments")
public class PaymentController {

    @Autowired
    private PaymentDao paymentdao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('payment-select')")
    public List<Payment> get(@RequestParam HashMap<String, String> params) {

        List<Payment> payments = this.paymentdao.findAll();

        if(params.isEmpty()) return payments;

        String date    = params.get("dopaid");
        String masjidid =params.get("masjidid");
        String paymentypeid= params.get("paymentypeid");


        Stream<Payment> estream = payments.stream();

        if(date!=null) estream = estream.filter(e -> e.getDopaid().equals(date));
        if(masjidid!=null) estream = estream.filter(e -> e.getMasjid().getId()==Integer.parseInt(masjidid));
        if(paymentypeid!=null) estream = estream.filter(e -> e.getPaymenttype().getId()==Integer.parseInt(paymentypeid));


        return estream.collect(Collectors.toList());

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // @PreAuthorize("hasAuthority('Payment-Insert')")
    public HashMap<String,String> add(@RequestBody Payment payment){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(responce!=null)
            errors = errors+"<br> Payment is null";

        if(errors=="")
            paymentdao.save(payment);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(payment.getId()));
        responce.put("url","/payments/"+payment.getId());
        responce.put("errors",errors);

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Payment-Update')")
    public HashMap<String,String> update(@RequestBody Payment payment){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Payment emp1 = paymentdao.findByMyId(payment.getId());
        if(emp1!=null)
            errors = errors+"<br> Payment is null";


        if(errors=="") paymentdao.save(payment);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(payment.getId()));
        responce.put("url","/payments/"+payment.getId());
        responce.put("errors",errors);

        return responce;
    }


    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id)  {

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        //Extracted from Dao
        Payment emp1 = paymentdao.findByMyId(id);
        if(emp1==null)
            errors = errors+"<br> Payment Does Not Existed";

        if(errors=="") paymentdao.delete(emp1);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/payments/"+id);
        responce.put("errors",errors);

        return responce;
    }

}




