 /*!
 * Name: ibm.com v18 production file
 * Release: 147.0.0
 * Built: 2020-05-13 9:38:21 AM
 * Owner: Michael Santelia, Vlad Saling
 * Copyright (c) 2020 IBM Corporation
 * Description: Official file for production use
 */
 !function(_,y){
     y.namespace(y,"common.widget.dyntabs");
     var E=[],A="ibmdyntabs.";
     function a(e){
         var a,i,s,o,n,l,c,r,d=this,m={remembertab:!0},u=[];
         function h(t){
            return t.replace(/^#/,"")
        }
        function f(t,e){
            var a="li a[href='#"+h(t)+"']";
            e&&c.not(a).removeClass("ibm-active").attr("aria-selected","false").end(),
            c.filter(a).addClass("ibm-active").attr("aria-selected","true").end()
        }
        function b(t,e){
            var a=h(t);
            e&&r.not("#"+a).hide().attr("aria-hidden","true").end(),
            r.filter("#"+a).show().attr("aria-hidden","false").end(),
            _(document.getElementById(a)).find(".ibm-widget-processed[data-widget='setsameheight']")[0]&&_(document.getElementById(a)).find(".ibm-widget-processed[data-widget='setsameheight']").each(function(){_(this).data("widget").adjustHeights(!0)})
        }
        function v(t,e){
            var a=h(e);
            y.common.util.statshelper.fireEvent({
                ibmEV:"widget",ibmEvGroup:"Dynamic tabs",ibmEvName:t,ibmEvAction:a
            })
        }
        function g(){
            var t,e,a,i=null,n=location.href.split("#"),r=(e=location.href.split("#")[0],a=l[0].id,y.common.util.storage.getItem(A+e+"#"+a));
            return 1<n.length&&null!==n[1].match(/^tab_/)?(t=n[1].replace(/^tab_/,""),-1<u.indexOf(t)&&(i=t)):o.activetabid&&(i=o.activetabid),!i&&r&&o.remembertab&&(i=r),0===c.is("[href='#"+i+"']").length&&(i=null),i||(i=_(c[0]).attr("href")),i
        }
        function p(t){
            var e,a,i,n,r,o=h(t);
            "__show_all_tabs__"!==o?(s=o,f(t,!0),b(t,!0),e=t,a=location.href.split("#")[0],i=l[0].id,n=h(e),
                r=IBMCore.www.module.truste.getUiAllowedStorageTtl(14400),
                y.common.util.storage.setItem(A+a+"#"+i,n,r),
                _("#"+o).find("[data-widget='carousel']").each(
                function(){
                    _(this).slick&&_(this).slick("resize")
                })
                ):w()
            }
            function w(){
                f(s="__show_all_tabs__",!0),
                _.each(u,
                    function(t,e){
                        b(e,!1)
                    })
            }
            d.destroy=function(){
                return c.each(function(){
                    _(this).removeAttr("aria-controls")
                }),
                r.each(function(){
                    _(this).removeAttr("style").removeAttr("role").removeAttr("aria-hidden")
                }),
                a.replaceWith(i),i
            },
            d.init=function(t){
                a=_(t),
                i=a.clone(!0),
                a.data("widget",d),
                l=(n=a).find("ul.ibm-tabs"),
                c=l.find("a"),
                l.find("li:has(a[href='#__show_all_tabs__'])"),
                o=_.extend(!0,{},m,a.data(),e),
                n.addClass("ibm-dyntabs"),
                r=c.map(function(){
                    return _(this.getAttribute("href"))[0]
                });
                try{
                    c.each(function(){
                    var t=h(_(this).attr("href"));
                    u.push(t)
                }),
                l[0].id||l.attr("id","ibm_dyntablist_"+E.length),
                n.attr("role","toolbar").attr("aria-label","Tab Navigation"),
                l.attr("role","tablist"),
                c.each(function(){
                    var t=_(this),
                    e=t.attr("href"),
                    a=e.replace(/^#/,"");
                    this.id||(this.id="dtitem-"+a),
                    t.attr("role","tab").attr("aria-controls",a),
                    _(document.getElementById(a)).attr("aria-labelledby",t[0].id)
                }),
                r.each(function(){_(this).attr("role","tabpanel")}),
                c.on("click",function(t){
                    t.preventDefault();
                    var e,a,i=_(t.delegateTarget);
                    e=i.is("li")?i.find("a"):i,
                    p(a=e.attr("href").split("#")[1]),
                    v("click",a)
                }),
                p(g()),
                v("load",g()),
                y.common.widget.manager.dispatchInitEvent(a[0])
            }catch(t){
                throw t
            }
        },
        d.showTab=p,
        d.showAllTabs=w,
        d.activeTabId=function(){return s}
    }
    function t(){
        var a=_(document.getElementsByClassName("ibm-mobilemenu")[0]).find("[data-type='dyntabs']"),
        e="ibm-active ibm-mobilemenu-nav-selected";
        function i(t){
            a.find("[aria-selected='true']").parent().attr("aria-selected",!1).removeClass(e),
            t.parent().attr("aria-selected",!0).addClass(e)
        }
        a[0]&&(_("#ibm-primary-tabs.ibm-dyntabs").on("click","a",
            function(t){
                var e=_(this).parent().attr("aria-controls");
                i(a.find("li[aria-controls='"+e+"'] a"))
            }),
            a.on("click","a",function(t){
                var e=_(this);
                t.preventDefault(),
                t.stopPropagation(),
                i(e),y.common.module.mobilemenu.hide()
            })
        )
    }
    _.fn.dyntabs=function(e){
        return this.each(
            function(){
                var t;
                (t=new a(e),E.push(t),t).init(this)
            }
        )
    },
    y.common.module.mobilemenu.subscribe("ready","dyntabs",t).runAsap(t)
}(jQuery,IBMCore);