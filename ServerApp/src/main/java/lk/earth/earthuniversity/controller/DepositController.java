package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.DepositDao;
import lk.earth.earthuniversity.entity.Deposit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/deposits")
public class DepositController {

    @Autowired
    private DepositDao depositdao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('deposit-select')")
    public List<Deposit> get(@RequestParam HashMap<String, String> params) {

        List<Deposit> deposits = this.depositdao.findAll();

        if(params.isEmpty()) return deposits;

        String date    = params.get("date");
        String masjidid =params.get("masjidid");
        String accountid= params.get("accountid");


        Stream<Deposit> estream = deposits.stream();

        if(date!=null) estream = estream.filter(e -> e.getDate().equals(date));
        if(masjidid!=null) estream = estream.filter(e -> e.getMasjid().getId()==Integer.parseInt(masjidid));
        if(accountid!=null) estream = estream.filter(e -> e.getAccount().getId()==Integer.parseInt(accountid));


        return estream.collect(Collectors.toList());

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // @PreAuthorize("hasAuthority('Deposit-Insert')")
    public HashMap<String,String> add(@RequestBody Deposit deposit){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(responce!=null)
            errors = errors+"<br> Deposit is null";

        if(errors=="")
            depositdao.save(deposit);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(deposit.getId()));
        responce.put("url","/deposits/"+deposit.getId());
        responce.put("errors",errors);

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Deposit-Update')")
    public HashMap<String,String> update(@RequestBody Deposit deposit){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Deposit emp1 = depositdao.findByMyId(deposit.getId());
        if(emp1!=null)
            errors = errors+"<br> Deposit is null";


        if(errors=="") depositdao.save(deposit);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(deposit.getId()));
        responce.put("url","/deposits/"+deposit.getId());
        responce.put("errors",errors);

        return responce;
    }


    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id)  {

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        //Extracted from Dao
        Deposit emp1 = depositdao.findByMyId(id);
        if(emp1==null)
            errors = errors+"<br> Deposit Does Not Existed";

        if(errors=="") depositdao.delete(emp1);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/deposits/"+id);
        responce.put("errors",errors);

        return responce;
    }

}




