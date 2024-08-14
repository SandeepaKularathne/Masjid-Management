package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.EventDao;
import lk.earth.earthuniversity.entity.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
//import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/events")
public class EventController {

    @Autowired
    private EventDao eventdao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('event-select')")
    public List<Event> get(@RequestParam HashMap<String, String> params) {

        List<Event> events = this.eventdao.findAll();
        Stream<Event> estream = events.stream();

        if (params.isEmpty()) return events;
        if (params.get("date") != null) {
            Date date = Date.valueOf(params.get("date"));
            if (date != null) estream = estream.filter(e -> e.getDate().equals(date));
        }

        String eventtypeid = params.get("eventtypeid");
        System.out.println("moulavi" + eventtypeid);

        if (eventtypeid != null)
            estream = estream.filter(e -> e.getEventtype().getId() == Integer.parseInt(eventtypeid));

        return estream.collect(Collectors.toList());

//        String eventstatusid = params.get("eventstatusid");
//        if (eventstatusid != null)
//            estream = estream.filter((e -> e.getEventstatus().getId() == Integer.parseInt(eventstatusid)));
//        return estream.collect(Collectors.toList());

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // @PreAuthorize("hasAuthority('Event-Insert')")
    public HashMap<String,String> add(@RequestBody Event event){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

         if(eventdao.findByMyId(event.getId())!=null)
            errors = errors+"<br> Existing Event , please use add new";

        if(errors=="")
            eventdao.save(event);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(event.getId()));
        responce.put("url","/events/"+event.getId());
        responce.put("errors",errors);

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Event-Update')")
    public HashMap<String,String> update(@RequestBody Event event){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Event emp1 = eventdao.findByMyId(event.getId());
//        if(emp1!=null && event.getId()!=emp1.getId())
//            errors = errors+"<br> Existing NIC Number";


        if(errors=="") eventdao.save(event);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(event.getId()));
        responce.put("url","/events/"+event.getId());
        responce.put("errors",errors);

        return responce;
    }


    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id)  {

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Event emp1 = eventdao.findByMyId(id);
        if(emp1==null)
            errors = errors+"<br> Event Does Not Existed";

        if(errors=="") eventdao.delete(emp1);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/events/"+id);
        responce.put("errors",errors);

        return responce;
    }

}




