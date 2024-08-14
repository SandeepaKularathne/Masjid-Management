package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.MemberDao;
import lk.earth.earthuniversity.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/members")
public class MemberController {

    @Autowired
    private MemberDao memberdao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('member-select')")
    public List<Member> get(@RequestParam HashMap<String, String> params) {

        List<Member> members = this.memberdao.findAll();

        if(params.isEmpty()) return members;

        String nic = params.get("nic");
        String civilstatusid= params.get("civilstatusid");

        Stream<Member> estream = members.stream();

        if(civilstatusid!=null) estream = estream.filter(e -> e.getCivilstatus().getId()==Integer.parseInt(civilstatusid));
        if(nic!=null) estream = estream.filter(e -> e.getNic().equals(nic));


        return estream.collect(Collectors.toList());

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // @PreAuthorize("hasAuthority('Member-Insert')")
    public HashMap<String,String> add(@RequestBody Member member){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(memberdao.findByNic(member.getNic())!=null)
            errors = errors+"<br> Existing NIC Number";

        if(errors=="")
            memberdao.save(member);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(member.getId()));
        responce.put("url","/members/"+member.getId());
        responce.put("errors",errors);

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Member-Update')")
    public HashMap<String,String> update(@RequestBody Member member){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Member emp1 = memberdao.findByNic(member.getNic());
        if(emp1!=null && member.getId()!=emp1.getId())
            errors = errors+"<br> Existing NIC Number";


        if(errors=="") memberdao.save(member);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(member.getId()));
        responce.put("url","/members/"+member.getId());
        responce.put("errors",errors);

        return responce;
    }


    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id)  {

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Member emp1 = memberdao.findByMyId(id);
        if(emp1==null)
            errors = errors+"<br> Member Does Not Existed";

        if(errors=="") memberdao.delete(emp1);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/members/"+id);
        responce.put("errors",errors);

        return responce;
    }

}




