package com.beauty.tendency;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by on 2015. 5. 10..
 */
@Controller
public class HealthCheck {

    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public ModelAndView beautyTendencyHealthCheck() {
        System.out.println("come in main");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("healthCheck");
        return mav;
    }
}
