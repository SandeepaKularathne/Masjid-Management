package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.WithdrawDao;
import lk.earth.earthuniversity.entity.Withdraw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/withdraws")
public class WithdrawController {

    @Autowired
    private WithdrawDao withdrawdao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('withdraw-select')")
    public List<Withdraw> get(@RequestParam HashMap<String, String> params) {

        List<Withdraw> withdraws = this.withdrawdao.findAll();

        if(params.isEmpty()) return withdraws;

        String date    = params.get("dowithdraw");
        String masjidid =params.get("masjidid");
        String accountid= params.get("accountid");


        Stream<Withdraw> estream = withdraws.stream();

        if(date!=null) estream = estream.filter(e -> e.getDowithdraw().equals(date));
        if(masjidid!=null) estream = estream.filter(e -> e.getMasjid().getId()==Integer.parseInt(masjidid));
        if(accountid!=null) estream = estream.filter(e -> e.getAccount().getId()==Integer.parseInt(accountid));


        return estream.collect(Collectors.toList());

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // @PreAuthorize("hasAuthority('Withdraw-Insert')")
    public HashMap<String,String> add(@RequestBody Withdraw withdraw){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(responce!=null)
            errors = errors+"<br> Withdraw is null";

        if(errors=="")
            withdrawdao.save(withdraw);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(withdraw.getId()));
        responce.put("url","/withdraws/"+withdraw.getId());
        responce.put("errors",errors);

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Withdraw-Update')")
    public HashMap<String,String> update(@RequestBody Withdraw withdraw){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Withdraw emp1 = withdrawdao.findByMyId(withdraw.getId());
        if(emp1!=null)
            errors = errors+"<br> Withdraw is null";


        if(errors=="") withdrawdao.save(withdraw);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(withdraw.getId()));
        responce.put("url","/withdraws/"+withdraw.getId());
        responce.put("errors",errors);

        return responce;
    }


    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id)  {

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        //Extracted from Dao
        Withdraw emp1 = withdrawdao.findByMyId(id);
        if(emp1==null)
            errors = errors+"<br> Withdraw Does Not Existed";

        if(errors=="") withdrawdao.delete(emp1);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/withdraws/"+id);
        responce.put("errors",errors);

        return responce;
    }

}




