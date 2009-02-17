var sakai = sakai || {};


sakai.initFluidSiteSettingTable = function() {
    var resources = {
      users: {
        href: "js/demo_site_membership.json"
      },
      site: {
        href: "js/demo_site.json"
      }
    };
    
    function initPager() {
      
        var model = {
            site: JSON.parse(resources.site.resourceText),
            selecteds: [],
            users: JSON.parse(resources.users.resourceText)
        };
        var columnDefs = [ 
           {key: "selection",
            valuebinding: "selecteds.*.selected",
            sortable: true
            },
           {key: "user-link",
            valuebinding: "*.userDisplayName",  
            components: {
                target: "/dev/sn/profile.html?user=${*.userId}",
                linktext: fluid.VALUE},
            sortable:true
            },
           {key: "user-email",
            valuebinding: "*.userEmail",
            sortable: true,
            components: {
                linktext: fluid.VALUE,
                target: "mailto:${VALUE}"
                }
            },
           {key: "user-role",
            valuebinding: "*.memberRole",
            components: {
                selection: fluid.VALUE, 
                optionlist: {valuebinding: "site.userRoles"}
               },
            sortable: true
           },
           {key: "user-status",
            valuebinding: "*.active",
            components: {
                selection: fluid.VALUE,
                optionlist: {value: ["Active", "Inactive"]}
            },
            sortable: true}
          ];
           
  
    var pagerBarOptions = {
          type: "fluid.pager.pagerBar",
          options: {
            pageList: {
               type: "fluid.pager.renderedPageList",
               options: {
                 pageStrategy: fluid.pager.gappedPageStrategy(3, 1)
                 }
               }            
            }
        };
  
    var pager = fluid.pager(".ss-members", {
        dataModel: model,
        dataOffset: "users.membership_collection",
        columnDefs: columnDefs,
        annotateColumnRange: "user-link",
        pagerBar: pagerBarOptions,

        bodyRenderer: {
          type: "fluid.pager.selfRender",
          options: {
            root: ".site-setting-body",
            renderOptions: {debugMode: true}
          }
        }
    });
    }
    
    fluid.fetchResources(resources, initPager);
    
};

